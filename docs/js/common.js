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

		if ($kshtSelectionContainerCols4.exists()) {
			$kshtSelectionContainerCols4.slick({
				infinite: true,
				slidesToShow: 4,
				appendArrows: '.ksht-selection-arrows-cols-4'
			});
		}
	});



}, window.jQuery, window.Zepto));