//Toggle Header Communities Search

define(['velocity'],function(velocity) {

	return {
		settings: {
			$communityHeader: $('.community-search-header'),
			$communityBtn: $('.js-community-header-toggle'),
			$recentlyViewed: $('.community-search-header__visited-container'),
			$mainContent: $('.main-container'),
			$mainBody: $('body'),			

			$mainMenuBtn: $('.js-mobile-menu-toggle'),
		},

		init: function() {

			var _ = this;

			//get current onmediquery context
			var currentContext = MQ.getContext();

			if (currentContext == "desktop") {
				_.initDesktop();
			} else if (currentContext == "mobile") {
				_.appendRecentlyViewed();
			} else {
				_.toggleMainNav();
			}

			_.communityToggle();
		},

		communityToggle: function(){
			var _ = this;
				
			_.settings.$communityBtn.on('click.communityBtn',function(){

				var $this = $(this),
				    className = 'expanded',
				    direction = $this.hasClass(className) ? 'slideUp' : 'slideDown';

				$this.toggleClass(className);
				_.settings.$communityHeader.velocity(direction, { duration: 300});
				
				_.settings.$mainBody.toggleClass('fixed');

				_.settings.$mainContent.on('click.mainContent',function(){
					if($(_.settings.$communityBtn).hasClass('expanded')){
						_.settings.$communityBtn.removeClass('expanded');
						_.settings.$communityHeader.velocity('slideUp', { duration: 300});			
					}
				});				
			})
		},

		toggleMainNav: function(){
			var _ = this;

			_.settings.$mainMenuBtn.on('click.mainMenuBtn',function(){
				_.settings.$communityHeader.velocity("slideUp", { duration: 300});
				_.settings.$communityBtn.removeClass('expanded');
			})		
		},

		initDesktop: function() {
			$(".find-community__community-name").click(function(e) {
				e.stopPropagation();
			});
		},

		appendRecentlyViewed: function() {
			var _ = this;

			_.settings.$recentlyViewed.insertBefore('.community-search-header__search-block');
		},		

		destroy: function() {
			var _ = this;

			_.settings.$communityHeader.removeAttr('style');

			_.settings.$communityBtn
				.off('click.communityBtn')
				.removeClass('expanded');
		}

	};

});