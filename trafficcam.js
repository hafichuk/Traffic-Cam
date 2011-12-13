javascript:(function(){
    var pageTitle = 'Calgary Traffic Cams';
    var refreshEvery = 30; // seconds

    // City of Calgary currently has 79 (somewhat) active traffic cameras
    var numImages = 79;
    var baseUrl = 'http://trafficcam.calgary.ca/loc%d.jpg';

    // Open a new window for the traffic cams
    var newWindow = window.open('', pageTitle);
    newWindow.document.head.innerHTML = '<title>' + pageTitle + '</title>';

    /**
     * Add the images to the page
     */
    function addImages() {

        // Clear the contents of this page in case that someone re-runs this script (i.e. if there already is a 'Calgary Traffic Cams' page)
        if (newWindow.document.body !== null) {
            newWindow.document.body.innerHTML = '';
        }

        for (var i = 0; i <= numImages; i++) {
            var imgUrl = baseUrl.replace(/%d/, i);
            newWindow.document.write('<img id="cam_' + i + '" style="float: left; margin: 5px;" src="' + imgUrl + '" /> ');
        }
    }

    /**
     * Refresh the images in place on the page
     */
    function refreshImages() {
        for (var i = 0; i <= numImages; i++) {
            // Append a timestamp to the url to force the browser not to cache it
            var timestamp = new Date().getTime();
            var imgUrl = baseUrl.replace(/%d/, i) + '?' + timestamp;

            newWindow.document.getElementById('cam_' + i).src = imgUrl;
        }
    }

    /**
     * Update the refresh countdown
     */
    function updateRefreshCountdown() {
        if (newWindow.document.getElementById('refresh_counter') == null) {
            newWindow.document.write('<div id="refresh_counter" data-elapsed="0" data-max="' + refreshEvery + '" style="font-size: 11px; position: absolute; top: 0; right: 0; border: 1px solid #aaa; padding: 2px 3px; margin: 1px;"></div>');
        }

        var refreshCounter = newWindow.document.getElementById('refresh_counter');
        var elapsedSeconds = parseInt(refreshCounter.getAttribute("data-elapsed")) + 1;
        var totalSeconds = parseInt(refreshCounter.getAttribute("data-max"));

        if (elapsedSeconds >= totalSeconds) {
            elapsedSeconds = 0;
            refreshImages();
        }

        refreshCounter.setAttribute("data-elapsed", elapsedSeconds);
        refreshCounter.innerHTML = (totalSeconds - elapsedSeconds) + ' seconds until refresh';
    }

    addImages();
    updateRefreshCountdown();
    setInterval(updateRefreshCountdown, 1000);
})();
