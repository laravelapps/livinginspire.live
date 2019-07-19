define(function () {

	/*
	This replicates the removed jQuery .toggle functions.
	http://api.jquery.com/toggle-event/
	*/

	$.fn.clickToggle = function(a, b) {
		var functions=arguments, iteration=0
		return this.on('click.delphic',function(){
			functions[iteration].apply(this,arguments)
			iteration= (iteration+1) %functions.length
		})
	};

	$.fn.extend({
		center: function () {
			return this.each(function() {
				var top = ($(window).height() - $(this).outerHeight()) / 2;
				var left = ($(window).width() - $(this).outerWidth()) / 2;
				$(this).css({position:'absolute', margin:0, top: (top > 0 ? top : 0)+'px', left: (left > 0 ? left : 0)+'px'});
			});
		}
	});

});