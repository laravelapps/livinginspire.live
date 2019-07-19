define(['utils/js.storage'], function (storage) {
    return {
        init: function () {

        },

        updateCommunityFormCompletedStorage: function (storageItemName, ouNumber) {
            if (!ouNumber) {
                ouNumber = $('.community-ou-number').val();
            }

            var communityList = storage.localStorage.get(storageItemName);

            if (communityList && ouNumber) {
                if (ouNumber.length > 0) {
                    var commmunitySubmissionList = communityList.toString();
                    if (commmunitySubmissionList.indexOf(ouNumber) < 0) {
                        commmunitySubmissionList += "," + ouNumber;
                        storage.localStorage.set(storageItemName, commmunitySubmissionList);
                    }
                }
            }
            else if (ouNumber) {
                storage.localStorage.set(storageItemName, ouNumber);
            }
        },

        didThisCommunitySubmitForm: function (storageItemName) {
            var communityList = storage.localStorage.get(storageItemName),
                ouNumber = $('.community-ou-number').val();

            if (communityList && ouNumber) {
                if (ouNumber.length > 0) {
                    var commmunitySubmissionList = communityList.toString();
                    return commmunitySubmissionList.indexOf(ouNumber) >= 0;
                }
            }

            return false;
        }
    };
});
