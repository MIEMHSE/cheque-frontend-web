$(document).ready(function() {
    Webcam.set({
        width: 320,
        height: 240,
        image_format: 'jpeg',
        jpeg_quality: 90
    });

    $('#show_camera_btn').click(function() {
        Webcam.attach('#my_camera');
        $('#save_snapshot_btn').show();
        $('#results').show();
    });

    $('#take_snapshot_btn').click(function() {
        Webcam.snap(function (data_uri) {
            $('#results').html(
                '<img id="base64image" src="' + data_uri + '"/><br><br>' +
                '<button id="save_as" class="btn btn-primary" onclick="SaveSnap();">Сохранить чек</button>'
            );
        });
    });

    function progressHandlingFunction(e){
        if(e.lengthComputable){
            $('progress').attr({value:e.loaded,max:e.total});
        }
    }

    function outputArguments() {
        console.log(arguments);
    }

    $('#save_snapshot_btn').click(function(){
        $('#save_as').html('Saving, please wait...');
        var file = $('#base64image').attr('src');
        var formData = new FormData();
        formData.append('base64image', file);
        $.ajax({
            url: 'api/v1/cheque/',
            type: 'POST',
            xhr: function() {
                var myXhr = $.ajaxSettings.xhr();
                if(myXhr.upload) {
                    myXhr.upload.addEventListener('progress', progressHandlingFunction, false);
                }
                return myXhr;
            },
            beforeSend: outputArguments,
            success: outputArguments,
            error: outputArguments,
            data: formData,
            cache: false,
            contentType: false,
            processData: false
        });
    });

    function uploadCompleted(event) {
        $('#save_as').html("Сохранено");
        document.getElementById("save_as").disabled = true;
        var image_return = event.target.responseText;
        console.log(event.target.responseText);
        var showup = document.getElementById("save_as").src = image_return;
    }

})(window);
