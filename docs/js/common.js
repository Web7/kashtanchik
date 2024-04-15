(function () {

	$.fn.exists = function () {
		return this.length !== 0;
	};

	$.fn.toggleAttrVal = function(attr, val1, val2) {
		var test = $(this).attr(attr);
		if ( test === val1) {
			$(this).attr(attr, val2);
			return this;
		}
		if ( test === val2) {
			$(this).attr(attr, val1);
			return this;
		}
		$(this).attr(attr, val1);
		return this;
	};


	var kshtLettersContainerPS;
	// var kshtBasketItemsContainerPS;
	var deliveryContainerPS;
	var placingAnOrderItemsContainerPS;
	var $kshtProductImages;
	var $productImagesCounter;
	var innerWidth;
	var isSlickProductImages = false;

	var $deliveryContainer = $('.delivery-container');
	var $kshtLettersContainer = $('.ksht-letters-container');
	// var $kshtBasketItemsContainer = $('.ksht-basket-items-container');
	var $placingAnOrderItemsContainer = $('.placing-an-order-items-container');
	var $kshtBasketItemName = $('.ksht-basket-item-name');
	var $dotdotdotName = $('.dotdotdot-name');

	var selectJsListPS;
	var $selectJsList = $('.select-js-list');

	var updateSelectJsListScroll = function() {
		if ($selectJsList.exists()) {
			$selectJsList.scrollTop(0);
		}

		if (selectJsListPS) {
			selectJsListPS.update();
		}
	}

	var updatePlacingAnOrderItemsContainerScroll = function() {
		if ($placingAnOrderItemsContainer.exists()) {
			$placingAnOrderItemsContainer.scrollTop(0);
		}

		if (placingAnOrderItemsContainerPS) {
			placingAnOrderItemsContainerPS.update();
		}
	};

	var updateDeliveryContainerScroll = function() {
		if ($deliveryContainer.exists()) {
			$deliveryContainer.scrollTop(0);
		}
		if (deliveryContainerPS) {
			deliveryContainerPS.update();
		}
	};

	var updateLettersContainerScroll = function() {
		if ($kshtLettersContainer.exists()) {
			$kshtLettersContainer.scrollTop(0);
		}
		if (kshtLettersContainerPS) {
			kshtLettersContainerPS.update();
		}
	};

	var updateProductImagesSlick = function() {
		if (innerWidth < 540) {
			if ($kshtProductImages.exists()) {
				$kshtProductImages.slick({
					infinite: true,
					slidesToShow: 1,
					arrows: false,
					autoplay: true,
					dots: true
				});
				isSlickProductImages = true;
			}
		} else {
			if ($kshtProductImages.exists() && isSlickProductImages) {
				$kshtProductImages.slick('unslick');
				isSlickProductImages = false;
			}
		}
	}

	// var updateBasketItemsContainerScroll = function() {
	// 	if ($kshtBasketItemsContainer.exists()) {
	// 		$kshtBasketItemsContainer.scrollTop(0);
	// 	}
	// 	if (kshtBasketItemsContainerPS) {
	// 		kshtBasketItemsContainerPS.update();
	// 	}
	// };

	var init = function() {
		innerWidth = window.innerWidth;
		updateProductImagesSlick();
		updateLettersContainerScroll();
		updateDeliveryContainerScroll();
		updatePlacingAnOrderItemsContainerScroll();
		updateSelectJsListScroll();
	};


	// var $header = document.querySelector('.header-sticky')
	// if ($header) {
	// 	var observer = new IntersectionObserver(
	// 		([e]) => e.target.classList.toggle('short', e.intersectionRatio < 1),
	// 		{threshold: [1]}
	// 	);
	// 	observer.observe($header);
	// }

	$(function (){
		var $kshtSelectionContainerCols4 = $('.ksht-selection-container-cols-4');
		var $kshtSelectionContainerCols2 = $('.ksht-selection-container-cols-2');
		var $kshtProductCarouselItems = $('.ksht-product-carousel-items');
		var $formDatepicker = $('.form-datepicker');
		var $selectContainer = $('.select-container');
		var $formPhone = $('.form-phone');
		$kshtProductImages = $('.ksht-product-images');
		$productImagesCounter = $('.product-images-counter');
		// var $header =

		buttonScrollToTop();

		if ($formPhone.exists()) {
			$formPhone.each(function(){
				$(this).intlTelInput({
					showSelectedDialCode: true,
					initialCountry: 'auto',
					geoIpLookup: callback => {
						fetch('https://ipapi.co/json')
							.then(res => res.json())
							.then(data => callback(data.country_code))
							.catch(() => callback('uk'));
					},
					i18n: {
						searchPlaceholder: 'Пошук країни'
					}

					// utilsScript: '/intl-tel-input/js/utils.js'
				});
			});
		}

		if ($selectContainer.exists()) {
			$selectContainer.selectJS({});
		}

		if ($formDatepicker.exists()) {
			$formDatepicker.each(function() {
				var $inputDatepicker = $(this).closest('.input-datepicker');
				$(this).datepicker({
					language: 'uk',
					autoclose: true,
					container: $inputDatepicker
				});
			});
		}

		if ($selectJsList.exists()) {
			$selectJsList.each(function() {
				new PerfectScrollbar(this, {wheelPropagation: true})
			});

		}

		if ($placingAnOrderItemsContainer.exists()) {
			placingAnOrderItemsContainerPS = new PerfectScrollbar('.placing-an-order-items-container', {wheelPropagation: true})
		}

		if ($deliveryContainer.exists()) {
			deliveryContainerPS = new PerfectScrollbar('.delivery-container', {wheelPropagation: true})
		}

		if ($kshtLettersContainer.exists()) {
			kshtLettersContainerPS = new PerfectScrollbar('.ksht-letters-container', {wheelPropagation: true})
		}

		// if ($kshtBasketItemsContainer.exists()) {
		// 	kshtBasketItemsContainerPS = new PerfectScrollbar('.ksht-basket-items-container', {wheelPropagation: false})
		// }

		if ($dotdotdotName.exists()) {
			$dotdotdotName.each(function() {
				new Dotdotdot(this);
			});
		}

		if ($kshtProductCarouselItems.exists()) {
			$kshtProductCarouselItems.each(function() {
				var $this = $(this);
				var $kshtProductCarouselArrows = $this.closest('section').find('.ksht-product-carousel-arrows');
				$this.slick({
					infinite: true,
					slidesToShow: 5,
					appendArrows: $kshtProductCarouselArrows,
					variableWidth: false,
					responsive: [
						{
							breakpoint: 768,
							settings: {
								slidesToShow: 2,
							}
						},
						{
							breakpoint: 992,
							settings: {
								slidesToShow: 3,
							}
						},
						{
							breakpoint: 1200,
							settings: {
								slidesToShow: 4,
							}
						},
						{
							breakpoint: 1400,
							settings: {
								slidesToShow: 5,
							}
						}
					]
				});
			});
		}

		if ($kshtSelectionContainerCols4.exists()) {
			$kshtSelectionContainerCols4.each(function() {
				var $this = $(this);
				var $kshtSelectionArrowsCols4 = $this.closest('section').find('.ksht-selection-arrows-cols-4');
				$this.slick({
					infinite: true,
					slidesToShow: 4,
					appendArrows: $kshtSelectionArrowsCols4,
					variableWidth: false,
					responsive: [
						{
							breakpoint: 1320,
							settings: {
								variableWidth: true,
							}
						}
					]
				});
			});
		}

		if ($kshtSelectionContainerCols2.exists()) {
			$kshtSelectionContainerCols2.slick({
				infinite: true,
				slidesToShow: 2,
				appendArrows: '.ksht-selection-arrows-cols-2',
				variableWidth: false,
				responsive: [
					{
						breakpoint: 1320,
						settings: {
							variableWidth: true,
						}
					}
				]
			});
		}

		init();

		// buttonScrollToTop({
		// 	typeButton: 'circle-o',
		// 	color: 'color-warning',
		// 	onMouseShow: true
		// });
	});

	$(window).on('resize', function () {
		init();
	})

	$(document).on('click', '.btn-password', function(e) {
		var $this = $(this);
		var $inputGroup = $this.closest('.input-group');
		var $formPhone = $inputGroup.find('.form-phone');

		$formPhone.toggleAttrVal('type', 'password', 'text');
		$this.find('i').toggleClass('d-none');

		e.preventDefault();
		e.stopPropagation();
		return false;
	});

	$(document).on('click', '[data-bs-toggle="collapse"]', function(e) {
		$(this).toggleClass('open');

		e.preventDefault();
		e.stopPropagation();
		return false;
	});

	$(document).on('init reInit afterChange', '.ksht-product-images', function(event, slick, currentSlide, nextSlide) {
		var i = (currentSlide ? currentSlide : 0) + 1;
		$productImagesCounter.text(i + '/' + (slick.$dots[0].children.length));
	});

	$(document).on('click', '.collapse-order-status', function(e) {
		var $this = $(this);
		var $i = $this.find('i');
		var $orderStatusContainer = $this.closest('.order-status-container');
		$orderStatusContainer.toggleClass('open');
		$i.toggleClass(['ci-Chevron_Down','ci-Chevron_Up']);

		e.preventDefault();
		e.stopPropagation();
		return false;
	});


})();