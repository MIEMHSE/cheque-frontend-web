$(document).ready(function() {
    Webcam.set({
        width: 320,
        height: 240,
        image_format: 'png'
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
        $('progress').show();
        $('#save_as').html('Saving, please wait...');
        var file = $('#base64image').attr('src');
        var formData = new FormData();
        formData.append('image', file);
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
            success: uploadCompleted,
            error: uploadError,
            data: formData,
            cache: false,
            contentType: false,
            processData: false
        });
    });

    function uploadCompleted(jqXHR, textStatus) {
        var sa = $('#save_as');
        sa.html("Сохранено");
        sa.prop("disabled", true);
        console.log(textStatus);
        console.log(jqXHR.responseJSON);
    }

    function uploadError(jqXHR, textStatus, errorThrown) {
        var sa = $('#save_as');
        sa.html("Ошибка при сохранении");
        sa.prop("disabled", true);
        console.log(textStatus);
        console.log(jqXHR.responseJSON);
    }

});
