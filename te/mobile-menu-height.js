define(function() {

	return {
		init: function() {
			//get current onmediquery context
			var currentContext = MQ.getContext();
			
			if (currentContext == "mobile") {
				$('.main-nav__list-container').height($(window).height() - $('.site-header').height());
				$('.community-search-header').height($(window).height() - $('.site-header').height());
			}
		},

		destroy: function() {

		}
	};
});
