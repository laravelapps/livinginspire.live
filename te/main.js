require.config({
	paths: {
		async: 'lib/requirejs-plugins/src/async',
		velocity: '//cdn.jsdelivr.net/velocity/1.2.2/velocity.min',
        krpano: '../../../krpano2/krpano',
        slick: 'plugins/slick',
        jquery: 'plugins/jquery.min',
		'pikaday': 'plugins/pikaday',
	}
});

require(['lib/onmediaquery', 'utils/isMobile', 'utils/delphic.loader', 'utils/delphic.utils', 'components/modal', 'utils/delphic.ace', 'utils/picturefill', 'utils/svg4everybody.min'], function (MQ, isM, loader, utils, modal, ace) {

	if(isMobile.phone){
		$('body').addClass('is-phone')
	}

	if(isMobile.tablet){
		$('body').addClass('is-tablet');
	}

	var mediaQueries = [{
		context: 'mobile',
		match: function() {
			require(['components/mobile'], function(component){
				component.init();
			})
		},
		unmatch: function() {
			//http://requirejs.org/docs/api.html#modulenotes-console
			require('components/mobile').destroy();
		}
	}]

	MQ.init(mediaQueries);

	loader.init();

	modal.init();

	svg4everybody();

	//Support legacy data track labels
	$('*[data-track-event]').each(function(){
		var $elm= $(this),
				trackEvent = $elm.data('track-event'),
				trackLabel = $elm.data('track-label') || window.location.pathname;

			$elm.ace(trackEvent+','+trackLabel);
	})


	var fieldId = $("#professionals-newsletter, #blog-newsletter, .join-newsletter, .community-newsletter-spotlight").find('input[type=text]').attr('id');
	var defaultValue = $("#" + fieldId).val();
	$("#" + fieldId).click(function() {
		var field = $(this);
		if (field.val() == defaultValue)
			field.val("");
		});
		$("#" + fieldId).blur(function() {
			var field = $(this);
			if (field.val() == "")
				field.val(defaultValue);
		});

});