<!DOCTYPE html>

<script>
	if(navigator.userAgent.match(/Android/i)){
		window.location.href = '/tetris/android';
	}
</script>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

<html>
<head>

	<?php header('Content-type: text/html; charset=UTF-8');?>
	<meta charset="UTF-8">
	<link rel="stylesheet" href="style.css">

	<script>
	
		function validateForm() {
			
			var name = document.forms["play-form"]["player_name"].value;
			var error_message;
			
			if(!name.match(/^[a-zA-Z0-9_\sěščřžýáíéďĚŠČŘŽÝÁÍÉĎ]*$/)) error_message = "Jméno obsahuje nepovolené znaky!";
			
			if (name.length > 25) error_message = "Jméno může mít maximálně 25 znaků!";
			
			if (name.length < 3) error_message = "Jméno musí mít minimálně 3 znaky!";
			
			if (name == "") error_message = "Zadej jméno nebo přezdívku!";
			
			if(error_message != null){
				$('#error').text(error_message);
				return false;
			}
		}
		
	</script>

</head>
<body>

<?php // LOAD PLAYERS SIZE FROM DB
  
	$mysqli = new mysqli("185.221.124.205", "user", "", "tetris");
	
	// SETTINGS
	$page = 0;
	$page_items = 15; 
	
	if(ISSET($_GET['page'])){
		$page = $_GET['page'];
	}
	
	$startIndex = $page * $page_items +1;
	$endIndex = ($page+1) * $page_items ;
	
	$sql = "SELECT * FROM leaderboard";
  	$query = $mysqli->query($sql);
	$players_size = $query->num_rows;
	
	$last_page = floor($players_size/$page_items);
	
?>

<div id="content">
	<img class="logo" src="images/tetris_logo.png">
	
	<?php if(isset($_POST['score'])) include("score.html"); else include("play.html");?>

	<div class="title">
    <p>Skóre hráčů</p><hr>
  </div>

  <div class="score-table">
		<?php
		
			$mysqli = new mysqli("185.221.124.205", "user", "", "tetris");
		
			$sql = "WITH temp as (SELECT *,ROW_NUMBER() OVER (ORDER BY score DESC) AS RowNr FROM leaderboard) SELECT * FROM temp WHERE RowNr BETWEEN ".$startIndex." AND ".$endIndex.";";
			$query = $mysqli->query($sql);
		
      $rank = $startIndex;
      while($player = $query->fetch_assoc()){
    ?>
			<div class="row <?php if($page==0) echo "first-page";?>">
				<div class="name"><?php echo("$rank. " . $player['name'])?></div>
				<div class="score"><?php echo($player['score'])?></div>
				<div class="duration"><?php echo gmdate("i:s", $player['duration'])?></div>
			</div>
    <?php $rank++; } ?>
	</div>
	
<?php
		
		$linksAroundCount = 2;
		
		$linksDispleyedTotal = 1+2*$linksAroundCount;
		
		$start = $page - $linksAroundCount;
		if($start < 0) $start = 0;
		
		$end = $start + $linksDispleyedTotal;
		$start = min($start, $last_page - $linksDispleyedTotal);
		
		
		if($last_page < $linksDispleyedTotal){
			$start = 0;
			$end = $last_page;
		}
		
?>

<div class="center">
  <div class="pagination">
		<a href="<?php if($page > 0) echo'?page='.($page-1);?>">&laquo;</a>

		<?php for($i = $start; $i < $end & $i < $last_page; $i++) { ?>
			<a href="?page=<?php echo $i;?>" <?php if($page == $i)echo "class='active'";?>>
				<?php echo $i+1;?> 
			</a>
		<?php } ?>
		
		<a href="<?php if($page < $last_page-1) echo'?page='.($page+1);?>">&raquo;</a>
  </div>
 </div>

	<div class="title">
    <p>Novinky a plány</p><hr>
  </div>
	
	<div class="middle-text">
	
		<p>Novinky<p>
		
		<div class="small-text">
		<ul>
			<li>Možnost překlikávání stránek v tabulce skóre</li>
			<li>Celkový počet účastí v tabulce</li>
		</ul>  
		</div>
		
		<p>Plány<p>
		
		<div class="small-text">
		<ul>
			<li>Streamování hry, mobilní a ostatní uživatelé mohou sledovat hru</li>
			<li>Mobilní verze stránky pro dotykové ovládání</li>
			<li>Duely, dva hráči si spolu dají match</li>
			<li>Tlačítko na pozastavení ve hře</li>
			<li>Pouze jedno jméno v tabulce, s největším skóre</li>
			<li>Registrace hráčů</li>
		</ul>  
		</div>
		
	</div>
	
</div>
</body>
</html>
