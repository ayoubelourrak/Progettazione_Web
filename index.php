<?php
  session_start();

  $loggedIn = isset($_SESSION["login"]) && $_SESSION["login"];
  if ($loggedIn){
    include_once("includes/db_helper.php");
    $db = new DBHelper;
    $db->loadStats($_SESSION['username']);
    $db->close();
  }

  $title = "Zombies";
  $isGame = true;
  $include_js = ['loader', 'ajax', 'keyboard', 'game', 'main'];
  $include_css = ['game'];
  $section = 0;
  include_once("includes/header.php");
?>
<main>
  <div id="game_area">
    <p class="game_info left" id="score"><?php
      if ($loggedIn){
        echo "[RECORD {$_SESSION['highscore']}] ";
      }
    ?>PUNTI     0</p>
    <canvas id="game_canvas">Peccato, il tuo browser non supporta i canvas</canvas>
  </div>
</main>

<script>
  loggedIn = <?php echo $loggedIn?"true":"false";?>;
  highscore = <?php echo $loggedIn?$_SESSION["highscore"]:0;?>;
</script>

<?php include_once("includes/footer.php"); ?>
