define(['utils/js.cookie'], function (cookie) {
    return {
        init: function () {
			var leadResponse = cookie.get('leadresponse');

            if (leadResponse) {
                var responseJSON = $.parseJSON(leadResponse);
                if (responseJSON) {
                    var leadid = responseJSON.leadid;
                    var commLead = responseJSON.commlead;
                    if (leadid && commLead) {
                        var dataLayer = window.dataLayer = window.dataLayer || [];
                        dataLayer.push({
                            'event': 'successful-form-submission',
                            'leadid': leadid.toString(),
                            'community': commLead.toString()
                        });
                    }
                }

                cookie.remove('leadresponse');
            }
        }
    };
});
