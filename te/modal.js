define(['plugins/jquery.fancybox', 'plugins/js.cookie', './questionnaire-modal', './modal-photo-gallery'],function(fancybox, cookie, questionnaireModal, modalPhotoGallery) {

	return {

		init: function() {
			var self = this;

			modalPhotoGallery.init();

				$(".js-modal, .colorbox-video-link")
					.fancybox({
						autoSize: false,
						type: 'iframe',
						beforeLoad : function() {
							this.width  = parseInt(this.element.data('fancybox-width')) || 800;
							this.height = parseInt(this.element.data('fancybox-height')) || 600;
						}
					});

				
				$('.compliance-disclaimer-modal').on('click', function(e){
					e.preventDefault(); 
					fancyBoxThis($(this), {
						closeClick: false,
						type: 'iframe',
						autoSize: false,
						height: 350,
						openEffect: 'none',
						closeEffect: 'none'
					});
				});

				fancyBoxThis($('.compliance-disclaimer-modal'), {
					closeClick: false,
					type: 'iframe',
					autoSize: false,
					height: 460,
					openEffect: 'none',
					closeEffect: 'none'
				});

				//to stop the link opening the iframe in a new window
				function fancyBoxThis(el, settings) {
					$(el).fancybox(settings);
				}

				$(".news-modal")
					.fancybox({
						autoSize: false,
						type: 'iframe',
						width: '100%',
						height: '100%',
						maxWidth: 450,
						maxHeight: 500
				});			

				$(".events-modal")
					.fancybox({
						closeClick: false,
						autoSize: false,
					});

				$(".FloorPlanOptionsModalNew")
				.fancybox({
					closeClick: false,
					autoSize: false,
					width: '100%',
					height: '100%',
					maxWidth: 900,
					maxHeight: 700,
					openEffect: 'none',
					closeEffect: 'none'
				});

				$(".FloorPlanOptionsModal")
				.fancybox({
					closeClick: false,
					autoSize: false,
					width: '100%',
					height: '100%',
					maxWidth: 900,
					maxHeight: 700,
					openEffect: 'none',
					closeEffect: 'none'
				});

			questionnaireModal.init();
			this.autoOpenChecks();

		},

		autoOpenChecks: function(){
			var recentConversionCookieVal = $('.hdnRecentConversionCookieName').val(),
			    recentConversionCookie = cookie.get(recentConversionCookieVal),
			    conversionOnlyModal = $(".hdnIsConversionOnlyModal").val();

			if(!conversionOnlyModal){
				//not a conversion modal
				this.autoOpen();
			}else if(cookie) {
				//is a conversion modal, so check cookie
				this.autoOpen();
				cookie.remove(recentConversionCookieVal);
			}
		},

		autoOpen: function () {
			var currentContext = MQ.getContext();

			if($(".care-questionnaire-btn").length){
				if(currentContext != "mobile"){
					$('.js-modal--auto-open').trigger('click');
				}
			} else {
				$('.js-modal--auto-open').trigger('click');
			}
		},
		destroy: function() {

		}
	};

});