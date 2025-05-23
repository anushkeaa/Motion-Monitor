;(function(App) {
    
    "use strict";
    
    App.WebCamCapture = function(videoElement) {

        var webCamWindow = false;
        var width = 640;
        var height = 480;

        function initialize(videoElement) {
            if(typeof videoElement != 'object') {
                webCamWindow = document.getElementById(videoElement);
            } else {
                webCamWindow = videoElement;
            }

            if(hasSupport()) {
                if(webCamWindow) {
                    webCamWindow.width = width;
                    webCamWindow.height = height;
                    startStream();
                }
            } else {
                alert('No support found');
            }
        }

        function startStream() {
            (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia).call(
                navigator, 
                {video: true}, 
                function(localMediaStream) {
                    if(webCamWindow) {
                        var vendorURL = window.URL || window.webkitURL;
                        if (navigator.mozGetUserMedia) {
                            webCamWindow.mozSrcObject = localMediaStream;
                            webCamWindow.play();
                        } else {
                            try {
                                webCamWindow.srcObject = localMediaStream;
                            } catch (error) {
                                webCamWindow.src = vendorURL.createObjectURL(localMediaStream);
                            }
                        }
                    }
                }, 
                console.error
            );
        }

        function captureImage(append) {
            var canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            canvas.getContext('2d').drawImage(webCamWindow, 0, 0, width, height);

            var pngImage = canvas.toDataURL("image/png"); 
            
            if(append) {
                append.appendChild(canvas);    
            }

            return canvas;
        }

        function setSize(w, h) {
            width = w;
            height = h;
        }

        function hasSupport(){
            return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
                navigator.mozGetUserMedia || navigator.msGetUserMedia);
        }

        initialize(videoElement);

        return {
            setSize: setSize,
            hasSupport: hasSupport,
            captureImage: captureImage
        };

    }

})(MotionDetector);
