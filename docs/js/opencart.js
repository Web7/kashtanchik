(function(){
    $(document).on('submit', 'form', function (e) {
        var element = this;

        if (e.originalEvent !== undefined && e.originalEvent.submitter !== undefined) {
            var button = e.originalEvent.submitter;
        } else {
            var button = '';
        }

        var status = false;

        var ajax = $(element).attr('data-oc-toggle');

        if (ajax == 'ajax') {
            status = true;
        }

        var ajax = $(button).attr('data-oc-toggle');

        if (ajax == 'ajax') {
            status = true;
        }

        if (status) {
            e.preventDefault();

            // Form attributes
            var form = e.target;

            var action = $(form).attr('action');

            var method = $(form).attr('method');

            if (method === undefined) {
                method = 'post';
            }

            var enctype = $(form).attr('enctype');

            if (enctype === undefined) {
                enctype = 'application/x-www-form-urlencoded';
            }

            // Form button overrides
            var formaction = $(button).attr('formaction');

            if (formaction !== undefined) {
                action = formaction;
            }

            var formmethod = $(button).attr('formmethod');

            if (formmethod !== undefined) {
                method = formmethod;
            }

            var formenctype = $(button).attr('formenctype');

            if (formenctype !== undefined) {
                enctype = formenctype;
            }

            if (button) {
                var formaction = $(button).attr('data-type');
            }

            // console.log(e);
            // console.log('element ' + element);
            // console.log('action ' + action);
            // console.log('button ' + button);
            // console.log('formaction ' + formaction);
            // console.log('method ' + method);
            // console.log('enctype ' + enctype);
            // console.log($(element).serialize());

            // https://github.com/opencart/opencart/issues/9690
            if (typeof CKEDITOR != 'undefined') {
                for (instance in CKEDITOR.instances) {
                    CKEDITOR.instances[instance].updateElement();
                }
            }

            $.ajax({
                url: action.replaceAll('&amp;', '&'),
                type: method,
                data: $(form).serialize(),
                dataType: 'json',
                contentType: enctype,
                beforeSend: function () {
                    $(button).button('loading');
                },
                complete: function () {
                    $(button).button('reset');
                },
                success: function (json, textStatus) {
                    console.log(json);
                    console.log(textStatus);

                    $('.alert-dismissible').remove();
                    $(element).find('.is-invalid').removeClass('is-invalid');
                    $(element).find('.invalid-feedback').removeClass('d-block');

                    if (json['redirect']) {
                        location = json['redirect'];
                    }

                    if (typeof json['error'] == 'string') {
                        $('#alert').prepend('<div class="alert alert-danger alert-dismissible"><i class="fa-solid fa-circle-exclamation"></i> ' + json['error'] + ' <button type="button" class="btn-close" data-bs-dismiss="alert"></button></div>');
                    }

                    if (typeof json['error'] == 'object') {
                        if (json['error']['warning']) {
                            $('#alert').prepend('<dirv class="alert alert-danger alert-dismissible"><i class="fa-solid fa-circle-exclamation"></i> ' + json['error']['warning'] + ' <button type="button" class="btn-close" data-bs-dismiss="alert"></button></dirv>');
                        }

                        for (key in json['error']) {
                            $('#input-' + key.replaceAll('_', '-')).addClass('is-invalid').find('.form-control, .form-select, .form-check-input, .form-check-label').addClass('is-invalid');
                            $('#error-' + key.replaceAll('_', '-')).html(json['error'][key]).addClass('d-block');
                        }
                    }

                    if (json['success']) {
                        $('#alert').prepend('<div class="alert alert-success alert-dismissible"><i class="fa-solid fa-circle-check"></i> ' + json['success'] + ' <button type="button" class="btn-close" data-bs-dismiss="alert"></button></div>');

                        // Refresh
                        var url = $(form).attr('data-oc-load');
                        var target = $(form).attr('data-oc-target');

                        if (url !== undefined && target !== undefined) {
                            $(target).load(url);
                        }
                    }

                    // Replace any form values that correspond to form names.
                    for (key in json) {
                        $(element).find('[name=\'' + key + '\']').val(json[key]);
                    }
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    console.log(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
                }
            });
        }
    });
})();