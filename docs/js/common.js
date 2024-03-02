(function (factory, jQuery, Zepto) {
	if (typeof define === 'function' && define.amd) {
		define(['jquery'], factory);
	} else if (typeof exports === 'object' && typeof Meteor === 'undefined') {
		module.exports = factory(require('jquery'));
	} else {
		factory(jQuery || Zepto);
	}
}(function($){
	'use strict';

	$.fn.exists = function () {
		return this.length !== 0;
	};

	var kshtLettersContainerPS;
	var kshtBasketItemsContainerPS;

	var $kshtLettersContainer = $('.ksht-letters-container');
	var $kshtBasketItemsContainer = $('.ksht-basket-items-container');
	var $kshtBasketItemName = $('.ksht-basket-item-name');

	var updateLettersContainerScroll = function() {
		if ($kshtLettersContainer.exists()) {
			$kshtLettersContainer.scrollTop(0);
		}
		if (kshtLettersContainerPS) {
			kshtLettersContainerPS.update();
		}
	};

	var updateBasketItemsContainerScroll = function() {
		if ($kshtBasketItemsContainer.exists()) {
			$kshtBasketItemsContainer.scrollTop(0);
		}
		if (kshtBasketItemsContainerPS) {
			kshtBasketItemsContainerPS.update();
		}
	};

	$(function (){
		var $kshtSelectionContainerCols4 = $('.ksht-selection-container-cols-4');
		var $kshtSelectionContainerCols2 = $('.ksht-selection-container-cols-2');
		var $kshtProductCarouselItems = $('.ksht-product-carousel-items');

		if ($kshtLettersContainer.exists()) {
			kshtLettersContainerPS = new PerfectScrollbar('.ksht-letters-container', {wheelPropagation: false})
		}

		if ($kshtBasketItemsContainer.exists()) {
			kshtBasketItemsContainerPS = new PerfectScrollbar('.ksht-basket-items-container', {wheelPropagation: false})
		}

		if ($kshtBasketItemName.exists()) {
			$kshtBasketItemName.each(function() {
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


		updateLettersContainerScroll();
	});

	$(window).on('resize', function () {
		updateLettersContainerScroll();
	});


}, window.jQuery, window.Zepto));