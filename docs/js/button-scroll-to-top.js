/*global $:false, jQuery:false, window:false, document:false*/

/*
Select JS v.0.0.1
by Oleksandr Nikitin (a.nikitin@i.ua)
https://github.com/alexshnur/select-js
*/

function isFunction(functionToCheck) {
    var getType = {};
    return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}

function mixin(defaultData, data) {
    var tempData = {};
    for (var index in data) {
        if ((typeof tempData[index] === "undefined") || (tempData[index] !== data[index])) {
            defaultData[index] = data[index];
        }
    }

    if (document.all && !document.isOpera) {
        var p = data.toString;
        if (typeof p === "function" && p !== defaultData.toString && p !== tempData.toString &&
            p !== "\nfunction toString() {\n[native code]\n}\n") {
            defaultData.toString = data.toString;
        }
    }
}

if (!isFunction(exists)) {
    var exists = function (element) {
        return element.length !== 0;
    };
}

function scrollToTop() {
    if (window.scrollY !== 0) {
        window.scrollTo(0, 0);
    }
}

var buttonScrollToTop = function(otions) {
    var defaultOptions = {
        arrow: 'arrow',
        typeButton: 'circle',
        color: '',
        opacity: true,
        duration: 100,
        onMouseShow: false,
        showingHeightButton: 500
    };

    mixin(defaultOptions, otions || {});

    var body = document.body;

    if (!exists(body)) {
        console.info('Body is not found!');
        return false;
    }

    var onScroll = function () {
        if (!defaultOptions.showingHeightButton) {
            return false;
        }
        var scrolled = window.pageYOffset || document.documentElement.scrollTop;
        if (scrolled <= defaultOptions.showingHeightButton) {
            button.style = 'z-index: -1; opacity: 0;';
        } else {
            button.style = '';
        }
    };
    var classes = [];
    classes.push(defaultOptions.typeButton);
    classes.push(defaultOptions.arrow + '-up');
    classes.push(defaultOptions.color);
    classes.push(defaultOptions.onMouseShow ? 'opacity' : '');
    classes.push('button-scroll-to-top');

    body.insertAdjacentHTML('beforeend', '<div id="button-scroll-to-top" class="' + classes.join(' ') + '"></div>');

    var button = document.getElementById('button-scroll-to-top');

    button.onclick = function () {
        scrollToTop();
    };

    onScroll();

    document.onscroll = onScroll;
}