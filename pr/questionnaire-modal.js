define(['plugins/jquery.fancybox', 'plugins/js.cookie'],function(fancybox, cookie) {

	return {

		init: function() {
			var self = this;


			this.initCareQustionnaireModal();

		},

		initCareQustionnaireModal: function(){

			var self = this;
			self.close=false;
			var currentContext = MQ.getContext();

			if(currentContext != "mobile") {
			var confirmToolTipHTML = [
				'<div class="close-confirm-tooltip">',
					'<p>Are you sure you would like to exit this Care Questionnaire?</p>',
					'<div class="button-actions">',
						'<a class="js-modal-close" href="javascript:;">Yes</a>',
						'<a class="js-confirm-close" href="javascript:;">No</a>',
					'</div>',
				'</div>'].join('');

			$('.js-modal--care-questionnaire, .open-care-questionnaire')
					.fancybox({
						closeClick: false,
						hideOnOverlayClick: false,
						type: 'iframe',
						autoSize: false,
						fitToView: false,
						padding: 0,
						margin: 0,
						height: '90%',
						width: '80%',
						maxWidth: 980,
						wrapCSS: 'fancybox-care-questionnaire',
						iframe: {
								preload: true
						},
						helpers : {
							overlay : { closeClick: false }
						},
						tpl: {
							wrap :'<div class="fancybox-wrap" tabIndex="-1"><div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"></div>'+confirmToolTipHTML+'</div></div></div>',
						},
						beforeClose: function(){
							var $tip = $('.close-confirm-tooltip');

							$tip.show();

							$('.js-modal-close').click(function(){
								self.close = true;
								$.fancybox.close();
							})

							$('.js-confirm-close').click(function(){
								$tip.hide();
							})

							return self.close;
						},
						afterClose: function(){
							self.close=false;
						}

				});
			}
		},

		destroy: function() {

		}
	};

});