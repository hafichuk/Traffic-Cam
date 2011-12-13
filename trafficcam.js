javascript:(function(){
    var pageTitle = 'Calgary Traffic Cams';

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
        newWindow.document.body.innerHTML = '';

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
            var imgUrl = baseUrl.replace(/%d/, i);
            newWindow.document.getElementById('cam_' + i).src = imgUrl;
        }
    }

    addImages();
    setInterval(refreshImages, 30000);
})();
