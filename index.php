<!DOCTYPE html>

<html lang="en">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">

	<link rel="stylesheet" href="css/bootstrap.min.css" type="text/css" media="all">
	<link rel="stylesheet" href="css/cheque.css" type="text/css" media="all">

	<script type="text/javascript" src="js/webcam.min.js"></script>
	<script type="text/javascript" src="js/jquery.min.js"></script>
	<script type="text/javascript" src="js/cheque.js"></script>

	<title>Cheque Web Frontend</title>
</head>
<body>
	<div id="results" style="display:none">Сфотографированный чек будет показан здесь...</div>

	<h1 style="margin-left: 30px;">Приложение по учёту покупок</h1>

	<form>
        <p style="margin-top: 20px; margin-left: 30px;">
            <input class="btn btn-success" id="show_camera_btn" type="button" value="Использовать камеру">
            <!-- input class="btn btn-info" type="button" value="Выбрать файл">
            <input class="btn btn-warning" type="button" value="Ввести вручную" -->
        </p>
        <div id="my_camera" style="margin-left: 30px;"></div>
        <input type="button" id="take_snapshot_btn" value="Сфотографировать чек"
            style="display:none;margin-top: 20px;margin-left: 30px;" class="btn btn-primary">

        <progress style="display:none;"></progress>
        <textarea id="got_text" style="display:none;" cols="100" rows="60"></textarea>
	</form>
</body>
</html>
