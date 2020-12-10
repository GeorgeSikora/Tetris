<html>
<head>
	<title>Tetris</title>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- PLEASE NO CHANGES BELOW THIS LINE (UNTIL I SAY SO) -->
  <script language="javascript" type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.1.9/p5.min.js"></script>
		
	<form method="post" id="endForm" action="leaderboard/">
	<input id="score-input" name="score" type="hidden">
	</form>
	
	
  <script language="javascript" type="text/javascript" src="game.js"></script>
  <script language="javascript" type="text/javascript" src="shapes.js"></script>
  <script language="javascript" type="text/javascript" src="tetris.js"></script>
  <!-- OK, YOU CAN MAKE CHANGES BELOW THIS LINE AGAIN -->


  <!-- SOCKET.IO -->
  <script type="text/javascript" src="https://cdn.socket.io/socket.io-1.4.5.js"></script>

  <!-- This line removes any default padding and style.
       You might only need one of these values set. -->
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

<body>
</body>
</html>
