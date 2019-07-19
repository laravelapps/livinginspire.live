define(['utils/js.storage'], function (storage) {
    settings = {};

    function updateLastVisitedCommunity(lastVisitedCommunity) {
        if (lastVisitedCommunity) {
            var url = "/data-api/personalization/getlastvisitedcommunity/" + lastVisitedCommunity;

            $.ajax({
                dataType: "json",
                method: "GET",
                url: url,
                success: function (result) {
                    if (result) {
                        var community = result;

                        if (community) {
                            settings.$lastVisitedCommunityNameAndLink.html("<a href=\"" + community.communityurl + "\">" + community.communityname + "</a>");

                            var mobileCheck = false;
                            //get current onmediquery context
                            var currentContext = MQ.getContext();

                            if (currentContext == "mobile") {
                                mobileCheck = true;
                            }

                            if (!mobileCheck) {
                                settings.$findAnotherSunrise.show();
                                settings.$findASunrise.hide();
                            }

                            settings.$findASunriseSearch.hide();
                            settings.$findCommunityDefaultImage.hide();
                            settings.$findCommunityImageLink.attr("href", community.communityurl);
                            settings.$findCommunityImageLink.append("<img src=\"" + community.communityimage + "\" alt=\"" + community.communityimagealt + "\" />");
                            settings.$findCommunityImageLink.show();
                            if (community.communitysalesphonenumber) {
                                settings.$communitySearchHeaderContact.attr("href", "tel:" + community.communitysalesphonenumber);
                                settings.$communitySearchHeaderPhone.html(community.communitysalesphonenumber);
                            }
                        }
                    }
                },
                error: function (results, status) {
                    setDefaultExperience();
                }
            });
        }
    }

    function setDefaultExperience() {
        settings.$findAnotherSunrise.hide();
        settings.$findASunrise.show();
        settings.$findASunriseSearch.show();
    }

    function getLastVisitedCommunity() {
        var recentOuNumbers = storage.localStorage.get('recentounumbers');

        if (recentOuNumbers) {
            // console.log(recentOuNumbers);
            recentOuNumbers = recentOuNumbers.toString();
            recentOuNumbers = recentOuNumbers.split(',');
            var lastCommunity = recentOuNumbers[0];

            // if (recentOuNumbers.length > 0) {
            //     lastCommunity = recentOuNumbers.slice(0, recentOuNumbers.indexOf(","));
            // }


            return lastCommunity;
        }
    }

    return {
        init: function () {
            settings = {
                $lastVisitedCommunityNameAndLink: $('#last-visited-community-name'),
                $findAnotherSunrise: $('#find-another-sunrise'),
                $findASunrise: $('#find-a-sunrise'),
                $findASunriseSearch: $('#find-a-sunrise-search'),
                $findCommunityImageLink: $('#find-community-image-link'),
                $findCommunityDefaultImage: $('#find-community-default-image'),
                $communitySearchHeaderContact: $('.community-search-header__contact'),
                $communitySearchHeaderPhone: $('.community-search-header__phone')
            }

            lastVisitedCommunity = getLastVisitedCommunity();

            if (lastVisitedCommunity)
                updateLastVisitedCommunity(lastVisitedCommunity);
        }
    };
});