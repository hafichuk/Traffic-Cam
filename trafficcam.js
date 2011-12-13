javascript:(function(){
    var pageTitle = 'Calgary Traffic Cams';

    var newWindow = window.open('', pageTitle);
    newWindow.document.head.innerHTML = '<title>' + pageTitle + '</title>';

    // City of Calgary currently has 79 (somewhat) active traffic cameras
    var numImages = 79;
    var baseUrl = 'http://trafficcam.calgary.ca/loc%d.jpg';

    // Adds the image tags to the page
    function addImages() {

	// Clear the contents of this page in case that someone re-runs this script (i.e. if there already is a 'Calgary Traffic Cams' page)
	newWindow.document.body.innerHTML = '';

	for (i = 0; i <= numImages; i++) {
	    imgUrl = baseUrl.replace(/%d/, i);
	    newWindow.document.write('<img id="cam_' + i + '" style="float: left; margin: 5px;" src="' + imgUrl + '" /> ');
	}
    }

    function refreshImages() {
	for (i = 0; i <= numImages; i++) {
	    imgUrl = baseUrl.replace(/%d/, i);
	    newWindow.document.getElementById('cam_' + i).src = imgUrl;
	}
    }

    addImages();
    setInterval(refreshImages, 30000);
})();
