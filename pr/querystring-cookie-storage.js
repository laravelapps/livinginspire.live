define(['utils/js.cookie'], function (cookie) {
    return {
        init: function () {
            var queryObject = { 'utm_source': '', 'utm_medium': '', 'utm_term': '', 'utm_content': '', 'utm_campaign': '', 'DS_C': '', 'DS_T': '', 'DS_PG': '', 'referring_url': '', 'kpid' : '', 'xid' : '' };
            var queryCookie = cookie.get('querystring');

            if (queryCookie)
                queryObject = JSON.parse(queryCookie);

            var referringUrl = getReferringUrl();
            if (referringUrl)
                queryObject['referring_url'] = referringUrl;

            if (document.location.search.length) {
                for (var key in queryObject) {
                    var param = queryObject[key];

                    if (getQueryString(key)) {
                        queryObject[key] = getQueryString(key);
                    }
                }
            }

            cookie.set('querystring', JSON.stringify(queryObject));
        }
    };

    function getParamByName(queryCookie, paramName) {
        return queryCookie.filter(
            function (data) {
                return data.name === paramName
            }
        );
    };

    function getReferringUrl() {
        var referrer = document.referrer;
        
        if (referrer) {
            var referringSite = referrer.split('/')[2];
            if (referringSite != window.location.hostname)
                return referringSite;
        }

        return null;
    };

    function getQueryString(field) {
        var href = window.location.href;
        var reg = new RegExp('[?&]' + field + '=([^&#]*)', 'i');
        var string = reg.exec(href);
        return string ? string[1] : null;
    };
});
