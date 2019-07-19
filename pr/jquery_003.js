
(function ($) {
	//Shortcut for fancyBox object
	var F = $.fancybox;

	//Add helper object
	F.helpers.mobile = {
		defaults : {
		},

		beforeLoad: function (opts, obj) {
			$('body').addClass('is-fancybox-phone');
			//Make room for mobile top and bottom buttons
			obj.margin[2]+=25;
			obj.margin[0]+=25;
		},

		afterShow: function (opts, obj) {
			$('.fancybox-close.fancybox-close-mobile').remove();

			$('.fancybox-close')
				.detach()
				.appendTo('.fancybox-overlay')
				.addClass('fancybox-close-mobile');

			$('.fancybox-nav.fancybox-nav-mobile').remove();
			$('.fancybox-nav')
				.detach()
				.appendTo('.fancybox-overlay')
				.addClass('fancybox-nav-mobile');

			$('.fancybox-image').click(function(){
				$.fancybox.next()
			})
		}
	}

}(jQuery));