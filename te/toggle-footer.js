//Toggle Footer (mobile)

//Actions for mobile menu

define(['velocity'],function(velocity) {

	return {
		settings: {
			$expandToggle: $(".site-footer__header")
		},

		init: function() {
			var _ = this;

			//get current onmediquery context
			var currentContext = MQ.getContext();

			if (currentContext == "mobile") {
				_.accordion();
			}
		},

		accordion: function(){
			var _ = this;

			_.settings.$expandToggle.on('click.expandToggle',function(){

				var $this = $(this),
				    $parent = $this.parent(),
				    className = 'expanded',
				    direction = $parent.hasClass(className) ? 'slideUp' : 'slideDown';

				$parent.toggleClass(className);
				$parent.find('ul:first').velocity(direction, { duration: 300});
			})
		},

		destroy: function() {
			var _ = this;

			_.settings.$expandToggle
				.off('click.expandToggle')
				.removeClass('expanded');

			_.settings.$expandToggle
				.parent()
				.removeClass('expanded')
				.find('ul:first')
				.removeAttr('style');
		}

	};

});