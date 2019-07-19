define(['utils/js.storage', 'utils/js.cookie', 'components/community-ou-storage', 'components/get-location', 'components/last-visited-community', 'components/bat-featured-community', 'components/lead-gen-data-layer'], function (storage, cookie, communityOuStorage, getLocation, lastVisitedCommunity, batFeaturedCommunity, leadGenDataLayer) {
    var settings = {};

    function initializeLocation() {
        getLocation.getLocation(initializeData);
    }

    function initializeData(location) {
        var recentOUNumbers = storage.localStorage.get('recentounumbers');

        if (recentOUNumbers) {
            settings.$communitySearchHeader.removeClass('hide-recently-viewed');
            updateRecentCommunities(recentOUNumbers.toString());
            lastVisitedCommunity.init();
        }
        else {
            settings.$communitySearchHeader.addClass('hide-recently-viewed');
            updateNearbyCommunitiesCount(location);
        }  

        if (location) {
            updateHeaderLocationStates(location);
            updateViewCommunitiesNear(location);          
        }
    }

    function updateHeaderLocationStates(location) {
        settings.$headerSearchBox.val(location);
        settings.$headerSearchLabel.text(location);
    }

    function updateRecentCommunities(recentOUNumbers) {
        var url = encodeURI("/data-api/personalization/getrecentlyvisitedcommunities/" + recentOUNumbers);
        $.ajax({
            dataType: "html",
            method: "GET",
            url: url,
            success: function (result) {
                if (result) {
                    settings.$recentlyVisited.html(result);
                }
            },
            error: function (results, status) {
                settings.$recentlyVisited.hide();
            }
        });
    }

    function updateViewCommunitiesNear(location) {
        var url = encodeURI("/data-api/personalization/getviewcommunitiesnearsearchurl/" + location);
        $.ajax({
            dataType: "json",
            method: "GET",
            url: url,
            success: function (result) {
                if (result) {
                    if (result.communitiesAreNearby) {
                        settings.$viewCommunitiesNearZip.text(location + ' ');
                        settings.$viewCommunitiesNearLink.attr('href', result.url);
                        settings.$viewCommunitiesNearLink.show();
                    }
                    else {
                        settings.$viewCommunitiesNearLink.hide();
                    }
                }
            },
            error: function (results, status) {
                settings.$viewCommunitiesNearLink.hide();
            }
        });
    }

    function updateNearbyCommunitiesCount(location) {
        var _ = this;

        if (location) {
            url = "/data-api/personalization/getnearbycommunitiescount/" + location;

            $.ajax({
                dataType: "text",
                method: "GET",
                url: url,
                success: function (result) {
                    if (result) {
                        var count = result;

                        if (count && count > 0) {
                            var mobileCheck = false;
                            //get current onmediquery context
                            var currentContext = MQ.getContext();

                            if (currentContext == "mobile") {
                                mobileCheck = true;
                            }

                            if (!mobileCheck) {
                                settings.$lastVisitedCommunityNameAndLink.html(count + " Nearby Communities");
                                settings.$lastVisitedCommunityNameAndLink.show();
                                settings.$findAnotherSunrise.html("Find a Sunrise ");
                                settings.$findAnotherSunrise.show();
                                settings.$findASunrise.hide();
                                settings.$findASunriseSearch.hide();
                            }
                        }
                    }
                },
                error: function (results, status) {
                    _.setDefaultExperience();
                }
            });
        }
    }

    return {
        init: function () {
            settings = {
                $communitySearchHeader: $('#communitySearchHeader'),
                $findAnotherSunrise: $('#find-another-sunrise'),
                $findASunrise: $('#find-a-sunrise'),
                $findASunriseSearch: $('#find-a-sunrise-search'),
                $headerSearchLabel: $('.community-search-header__search-zip'),
                $headerSearchBox: $('.header-community-search-text-box'),
                $lastVisitedCommunityNameAndLink: $('#last-visited-community-name'),
                $recentlyVisited: $('#recentlyVisited'),
                $viewCommunitiesNearLink: $('#viewCommunitiesNearLink'),
                $viewCommunitiesNearZip: $('#viewCommunitiesNearZip')
            };

            communityOuStorage.updateStorage(initializeLocation);

            leadGenDataLayer.init();
        }
    };
});