define(function() {

	return {
		init: function() {
			//Prevent page reload when clicked
			$('button.show-arrow').on('click focus', function(e) {
				e.preventDefault();
			})
			//function to toggle main submenus on hover or focus
			$('button.show-arrow').parent().on('focusin mouseover', function(e) {
				var $allDropDowns = $('button.show-arrow');
				$allDropDowns.parent().removeClass("expanded");//reset any submenus already open
				$allDropDowns.attr('aria-expanded', 'false');//reset any submenus already open
				
				$(this).addClass("expanded");
				$(this).find('button.show-arrow').attr('aria-expanded', 'true');
				
			})
			$('button.show-arrow').parent().on('focusout mouseout', function(e) {
				
				$(this).removeClass("expanded");
				$(this).find('button.show-arrow').attr('aria-expanded', 'false');
				
			})
		},
		destroy: function() {
		}
	};

});