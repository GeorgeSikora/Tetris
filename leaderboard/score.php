
	<div class="title"><p>Game Over!</p></div>

	<p class="player-score">Skóre: <?php echo $_POST['score'];?></p>
	
	<form class="input-play-again" name="play-form" action="/tetris/index.php" method="post">
			<input type="hidden" id="name" name="player_name" placeholder="jméno nebo přezdívka" autocomplete="off" value="<?php echo $_POST['name'];?>"></input>
			<button class="play-again-button" type="submit">Hrát znovu</button>
	</form>
	