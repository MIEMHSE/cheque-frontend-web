$(document).ready(function() {
    Webcam.set({
        width: 320,
        height: 240,
        image_format: 'png'
    });

    $('#show_camera_btn').click(function() {
        Webcam.attach('#my_camera');
        $('#take_snapshot_btn').show();
        $('#results').show();
    });

    $('#take_snapshot_btn').click(function() {
        Webcam.hooks.uploadProgress = progressHandlingFunction;
        Webcam.hooks.uploadComplete = function(status, responseText, statusText) {
            console.log('Upload completed!');
            console.log(status);
            console.log(responseText);
            console.log(statusText);
        };
        Webcam.hooks.error = function() {
            console.log(arguments);
        };

        Webcam.snap(function (data_uri) {
            $('#results').html(
                '<img id="base64image" src="' + data_uri + '"/><br><br>' +
                '<button id="save_snapshot_btn" class="btn btn-primary">Сохранить чек</button>'
            );
            $('#save_snapshot_btn').click(function() {
                $('progress').show();
                $('#save_snapshot_btn').html('Saving, please wait...');
                var file_content = $('#base64image').attr('src');
                var formData = new FormData();
                formData.append('image', file);
                Webcam.upload(file_content, 'api/v1/cheque/', function() {
                    var sa = $('#save_snapshot_btn');
                    sa.html("Сохранено");
                    sa.prop("disabled", true);
                });
            });
        });
    });

    function progressHandlingFunction(e){
        if(e.lengthComputable){
            $('progress').attr({value:e.loaded,max:e.total});
        }
    }

});
