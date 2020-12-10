
<!-- CECK IF THE CLIENT COME WITH NAME POST -->
<?php
	if(isset($_POST['player_name'])){
		$name = $_POST['player_name'];
	} else {
		header('Location: /tetris/leaderboard/');
	}
?>

<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- IMPORT P5 -->
  <script language="javascript" type="text/javascript" src="libraries/p5.min.js"></script>
	
	<!-- SET INITIAL VALUES FROM POST -->
  <script language="javascript" type="text/javascript">
		var player_name = "<?php echo $name ?>";
	</script>
	
	<!-- HIDDEN FORM FOR RETURN TO MAIN PAGE -->
	<form method="post" id="endForm" action="/tetris/leaderboard/index.php">
		<input id="name-input" name="name" value="<?php echo $name ?>" type="hidden">
		<input id="score-input" name="score" type="hidden">
	</form>
	
	<!-- SOCKET.IO -->
  <script language="javascript" type="text/javascript" src="game.js"></script>
  <script language="javascript" type="text/javascript" src="shapes.js"></script>
  <script language="javascript" type="text/javascript" src="table.js"></script>
  <script language="javascript" type="text/javascript" src="tetris.js"></script>

  <!-- SOCKET.IO -->
  <script type="text/javascript" src="https://cdn.socket.io/socket.io-1.4.5.js"></script>

  <style> 
		body { 
			padding: 0; 
			margin: 0; 
			background-color: #141414;
		} 

		canvas {
			padding: 0;
			margin: auto;
			display: block;
			position: absolute;
			top: 0;
			bottom: 0;
			left: 0;
			right: 0;
		}
	</style>

</head>
</html>