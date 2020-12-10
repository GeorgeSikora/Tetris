<!DOCTYPE html>
<html>
<head>

	<?php header('Content-type: text/html; charset=utf-8'); ?>
	<meta charset="UTF-8">
	<link rel="stylesheet" href="style.css">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

</head>
<body>

<div id="content">

	<img class="logo" src="images/tetris_logo.png">
	
	<?php if(isset($_POST['score'])) include("score.php"); else header("location: ../") ?>

	<br>
	<br>

</div>

</body>
</html>
