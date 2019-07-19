/**
 * Creates the markup for the "book a tour" banner and returns it
 */
define(['utils/js.storage', 'utils/js.cookie', 'components/community-form-submission-storage'], 
function (storage, cookie, communityFormStorage) {

	function ajaxRequest(url, callback) {
		$.ajax({
			dataType: "text",
			method: "GET",
			url: url,
			success: function (result) {
				if (result) {
					callback(result);
				}
			},
			error: function (results, status) {
				//nothing yet
			}
		});
	}

	function getRadius(batLead, callback) {
		var location = storage.localStorage.get('location'),
			url = "/data-api/personalization/getbatfeaturedcommunityradius/" + location + "/" + batLead;
		ajaxRequest(url, callback);
	};

	function getMarkup(batLead, callback) {
		var url = "/data-api/personalization/getbatfeaturedcommunity/" + batLead;
		ajaxRequest(url, callback);
    };

    function getGenericMarkup(callback) {
        var url = "/data-api/personalization/getbatgenericexperience";
        ajaxRequest(url, callback);
    };
	
	return {
        getLead: function () {
            var batResponse = cookie.get('batresponse'),
                batLead = null,
                commLead = null;

            //The batResponse object set in the response has two properties:
            //commlead = the community that was assigned the lead
            //batlead = the community that was assigned the lead that is BAT eligible
            if (batResponse) {
                //If the batresponse cookie exists, grab the commlead value and store it in localstorage
                var responseJSON = $.parseJSON(batResponse);
                if (responseJSON) {
                    storage.localStorage.set('commlead', responseJSON.commlead);
                    commLead = responseJSON.commlead;

                    //Update the list of communities that received a lead so the BAT form is triggered on community pages
                    communityFormStorage.updateCommunityFormCompletedStorage('csfcList', commLead);

                    if (responseJSON.batlead) {
                        //If we have a batlead from the batresponse cookie, grab it and store it in localstorage
                        storage.localStorage.set('batlead', responseJSON.batlead);
                        batLead = responseJSON.batlead;
                    }
                }
            }

            if (batLead) {
                return batLead;
            }

            return null;
        },
		getMarkup: function (batLead, callback) {
			if (!batLead) {
				return;
			}

			//first call the api to get the markup for the banner
			getMarkup(batLead, function(markup){
				//then call another api to get the radius
				getRadius(batLead, function(radius){
					markup = markup.replace("<div class=\"community-search-results-list__distance-label\">", "<div class=\"community-search-results-list__distance-label\">" + radius);
					callback(markup);
				});
			});
        },
        getGenericMarkup: function (callback) {
            getGenericMarkup(callback);
        },
        isGenericBATExperience: function() {
            return document.location.href.indexOf('utm_term=bat_lead') > 0;
        }
	};
});
