<!doctype html>

<html lang="en">
<head>
	<link rel='stylesheet' href='webcamjs-master/css/bootstrap.min.css' type='text/css' media='all'>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<!-- First, include the Webcam.js JavaScript Library -->
	<script type="text/javascript" src="webcamjs-master/webcam.js"></script>
	<title>ChekFix</title>
	<style type="text/css">
		body { font-family: Helvetica, sans-serif; }
		h2, h3 { margin-top:0; }
		form { margin-top: 15px; }
		form > input { margin-right: 15px; }
		#results { float:right; margin:20px; padding:20px; border:1px solid; background:#ccc; }
	</style>
</head>
<body>
	<div id="results" style="display:none">Сфотографированный чек будет показан здесь...</div>

	<h1 style="margin-left: 30px;">Приложение по учёту покупок</h1>




	<!-- Configure a few settings and attach camera -->
	<script language="JavaScript">
		Webcam.set({
			width: 320,
			height: 240,
			image_format: 'jpeg',
			jpeg_quality: 90,
		});
		// Webcam.attach( '#my_camera' );
	</script>


	<!-- Code to handle taking the snapshot and displaying it locally -->
	<script language="JavaScript">
		function show_button()
		{
			Webcam.attach( '#my_camera' );
			document.getElementById('fhotos').style.display = '';
			document.getElementById('results').style.display = '';
		};
		function take_snapshot() {
			// take snapshot and get image data
			// document.getElementById('save_as').style.display = 'none';
			Webcam.snap(function(data_uri) {
			document.getElementById('results').innerHTML = '<img id="base64image" src="'+data_uri+'"/><br><br><button id="save_as" class="btn btn-primary" onclick="SaveSnap();">Сохранить чек</button>';
			} );
		}
		function SaveSnap()
		{
			document.getElementById("save_as").innerHTML="Saving, please wait...";
			var file =  document.getElementById("base64image").src;
			var formdata = new FormData();
			formdata.append("base64image", file);
			var ajax = new XMLHttpRequest();
			ajax.addEventListener("load", function(event) { uploadcomplete(event);}, false);
			ajax.open("POST", "upload.php");
			ajax.send(formdata);
		}
		function uploadcomplete(event)
		{
			document.getElementById("save_as").innerHTML="Сохранено";
			document.getElementById("save_as").disabled = true;;
			var image_return=event.target.responseText;
			console.log(event.target.responseText);
			var showup=document.getElementById("save_as").src=image_return;
		}

	</script>
<p style="margin-top: 20px; margin-left: 30px;">
	<input class="btn btn-success" onclick="show_button()" type=button value="Сфотографировать чек" >
	<input class="btn btn-info" type=button value="Выбрать файл" >
	<input class="btn btn-warning" type=button value="Ввести вручную" >
</p>
	<div id="my_camera" style="margin-left: 30px;"></div>
	<input type=button id="fhotos" value="Сфотографировать чек" onClick="take_snapshot()" style="display:none;margin-top: 20px;margin-left: 30px;" class="btn btn-primary"  >
</body>
</html>
