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

	$(function (){
		var $kshtSelectionContainerCols4 = $('.ksht-selection-container-cols-4');
		var $kshtSelectionContainerCols2 = $('.ksht-selection-container-cols-2');
		var $kshtProductCarouselItems = $('.ksht-product-carousel-items');

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
							breakpoint: 1320,
							settings: {
								variableWidth: true,
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
	});



}, window.jQuery, window.Zepto));