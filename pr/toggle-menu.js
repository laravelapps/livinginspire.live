// //Toggle Menu (mobile)

define(['velocity'],function(velocity) {

	return {
		settings: {
			$upperContainer: $('.main-nav__container'),
			$mainNav: $('.main-nav__list-container'),
			$mainNavContainer: $('.main-nav__list'),
			$mainMenuBtn: $('.js-mobile-menu-toggle'),
			$mainToggle: $('.menu-toggle'),
			$mainToggleText: $('.menu-toggle-text'),
			$mainBody: $('body'),

			$communityBtn: $('.js-community-header-toggle'),
		},

		init: function() {
			var _ = this;

			//get current onmediquery context
			var currentContext = MQ.getContext();

			if (currentContext == "desktop") {

			} else {
				_.toggleCommunity();
			}

			_.mainToggle();

			$("input").focus(function(){
				$(this).parent().addClass("input-focus");
			}).blur(function(){
				$(this).parent().removeClass("input-focus");
			})
		},

		mainToggle: function(){
			var _ = this;

			_.settings.$mainMenuBtn.on('click.mainMenuBtn',function(){

				var $this = $(this),
				    className = 'expanded',
				    direction = $this.hasClass(className) ? 'slideUp' : 'slideDown';

				$this.toggleClass(className);
				_.settings.$mainNav.velocity(direction, { duration: 300});

				_.settings.$mainNavContainer.toggleClass('mobile');
				_.settings.$mainToggle.toggleClass('expanded');
				_.settings.$mainToggleText.toggleClass('expanded');
				_.settings.$upperContainer.toggleClass('expanded');
				_.settings.$mainBody.toggleClass('fixed');
			})
		},

		toggleCommunity: function(){
			var _ = this;

			_.settings.$communityBtn.on('click.communityBtn',function(){
				_.settings.$mainNav.velocity("slideUp", { duration: 300});
				_.settings.$mainMenuBtn.removeClass('expanded');
				_.settings.$mainToggle.removeClass('expanded');
			})
		},

		destroy: function() {

		}

	};

});