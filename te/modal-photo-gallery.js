define(['velocity','plugins/jquery.fancybox-thumbs', 'plugins/jquery.fancybox-mobile'],function() {

	return {

		init: function() {
			var self = this;
			$(".photo-gallery-button").click(function() {
				self.openPhotosFancyBox();
			});
		},

		openPhotosFancyBox: function(){
			var photoArray = new Array();

			$("#hidden-photo-container").children(".photo-item, .community-photo-item").each(function() {
				photoArray.push({ href: $(this).attr('data-href'), title: $(this).attr('data-title'), alt: $(this).attr('data-title') });
			});


			var helpers = (function() {
				var obj;
				if (isMobile.phone){
					obj = {
						mobile : true,
						title : { type : 'outside' },
						overlay: {fixed: true, locked: true, closeClick : false}
					}
				}else{
					obj = {
						thumbs: {
							width: 75,
							height: 50
						},
						title : { type : 'over' }
					}
				}
				return obj;
			})();

			if (photoArray.length > 0) {
				$.fancybox.open(photoArray, {
					//minWidth: '80%',
					//minHeight: '80%',
					openEffect: 'none',
					closeEffect: 'none',
					nextEffect: 'fade',
					prevEffect: 'fade',
					pixelRatio: (isMobile.phone?2:1),
					helpers: helpers,
					 beforeShow: function () {
							var imgAlt = $(this)[0].title;
							if (imgAlt) {
								$(".fancybox-image").attr("alt", imgAlt);
							}
						}
				});
			}

		},
		destroy: function() {

		}
	};

});