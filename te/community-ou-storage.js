define(['utils/js.storage'], function (storage) {

    return {
        init: function () {
            var _ = this;
            _.updateStorage(null);
        },

        updateStorage: function (callback) {
            var _ = this,
                path = window.location.pathname,
                communityPath = "/communities/";

            if (path.indexOf(communityPath) >= 0) {
                var communityOuNumber = $('.community-ou-number');
                if (communityOuNumber.length > 0) {
                    _.setStorage(communityOuNumber.val());
                    if (callback)
                        callback();
                }
                else {
                    var startIndex = path.indexOf(communityPath) + communityPath.length,
                    endIndex = path.indexOf("/", startIndex),
                    communityName = path.substring(startIndex, endIndex);

                    var url = "/data-api/personalization/getounumber/" + communityName;

                    $.ajax({
                        dataType: "json",
                        method: "GET",
                        url: url,
                        success: function (result) {
                            if (result) {
                                var ouNumber = result;

                                if (ouNumber) {
                                    _.setStorage(ouNumber);
                                    if (callback)
                                        callback();
                                }
                            }
                        },
                        error: function (results, status) {
                            if (callback)
                                callback();
                        }
                    });
                }
            }
            else if (callback) {
                callback();
            }
        },

        setStorage: function (ouNumber) {
            var _ = this,
                recentOuNumbers = storage.localStorage.get('recentounumbers');

            //Has the user looked at any communities yet?
            if (recentOuNumbers) {
                recentOuNumbers = recentOuNumbers.toString();
                recentOuNumbers = recentOuNumbers.split(',');

                var lastCommunity = recentOuNumbers[0];

                if (recentOuNumbers.length > 1)
                    lastCommunity = recentOuNumbers[0];
                
                //Are we just browsing community sub pages?
                if (ouNumber != lastCommunity) {
                    //Has the user looked at this community before?
                    if (recentOuNumbers.indexOf(ouNumber) >= 0) {
                        //Remove reference of this community being visited
                        var index = recentOuNumbers.indexOf(ouNumber);
                        if (index !== -1 ) {
                            recentOuNumbers.splice(index, 1)
                        }
                    }
                    //Add this community as the most recently visited community
                    recentOuNumbers.unshift(ouNumber);
                    // Only keep 3 communities in the list at atime
                    if (recentOuNumbers.length > 3) {
                        //Remove the last community that was visited
                        recentOuNumbers = recentOuNumbers.slice(0, 3);
                    }

                    // console.log(recentOuNumbers);

                    recentOuNumbers = recentOuNumbers.toString();
                    storage.localStorage.set('recentounumbers', recentOuNumbers);
                }
            }
            else {
                storage.localStorage.set('recentounumbers', ouNumber);
            }
        }
    };
});