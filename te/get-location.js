define(['utils/js.storage', 'utils/js.cookie'], function (storage, cookie) {

    return {
        init: function () {

        },

        getLocation: function (callback) {
            var _ = this,
                shouldExpireGeolocation = _.checkGeolocationExpirationTime();

            if (cookie.get('location')) {
                _.setLocation(cookie.get('location'));
                cookie.remove('location');
                _.setGeolocationTime();
            }

            var location = storage.localStorage.get('location');

            if (shouldExpireGeolocation && location) {
                storage.localStorage.remove('location');
                location = null;
            }

            //If location isn't stored, go get it from the server side
            if (!location) {
                var url = "/data-api/personalization/getlocation";
                $.ajax({
                    dataType: "text",
                    method: "GET",
                    url: url,
                    success: function (result) {
                        if (result) {
                            var locationResult = result;

                            //If we got a zip code returned
                            if (locationResult) {
                                _.declareGeolocationEvent('located', locationResult);
                                _.setLocation(locationResult);

                                if (callback)
                                    callback(locationResult);
                            } else {
                                _.declareGeolocationEvent('unfound');

                                if (callback)
                                    callback(null);
                            }
                        }
                        else {
                            _.declareGeolocationEvent('unfound');

                            if (callback)
                                callback(null);
                        }
                    },
                    error: function () {
                        _.declareGeolocationEvent('unfound');

                        if (callback)
                            callback(null);
                    }
                });
            } else {
                _.setGeolocationTime();
                if (callback)
                    callback(location);
            }
        },

        setLocation: function (location) {
            var _ = this;
            storage.localStorage.set('location', location);
            _.setGeolocationTime();
        },

        setGeolocationTime: function () {
            storage.localStorage.set('geolocationTime', Date.now());
        },

        checkGeolocationExpirationTime: function () {
            var geolocationTimeStorage = storage.localStorage.get('geolocationTime');
            if (geolocationTimeStorage) {
                var geolocationTime = new Date(geolocationTimeStorage);
                var expirationTime = new Date(new Date(geolocationTime).setMinutes(geolocationTime.getMinutes() + 30));

                var currentTime = new Date(Date.now());

                return currentTime > expirationTime;
            }
            else {
                return false;
            }
        },

        declareGeolocationEvent: function (status, location) {
            var dataLayer = window.dataLayer = window.dataLayer || [];

            if (location) {
                dataLayer.push({
                    'event': 'location-status',
                    'geolocation': status,
                    'location': location
                });
            }
            else {
                dataLayer.push({
                    'event': 'location-status',
                    'geolocation': status
                });
            }
        },

        declareManualGeolocationEvent: function (location) {
            var dataLayer = window.dataLayer = window.dataLayer || [];

            if (location) {
                dataLayer.push({
                    'event': 'location-status',
                    'geolocation': 'manually-entered',
                    'manualLocation': location
                });
            }
        }
    };
});