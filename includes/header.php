<!DOCTYPE html>
<html lang='it'>
  <head>
    <title><?php if(isset($title)) echo $title;?></title>

    <meta charset="UTF-8">
    
    <meta name="author" content="Ayoub El Ourrak">

    <link rel="icon" type="image/png" href="img/64681.png"/>

    <link rel="stylesheet" type="text/css" href="style/fonts.css">
    <link rel="stylesheet" type="text/css" href="style/styles.css">
    <?php
      if (isset($include_css)){
        foreach ($include_css as $key => $value) {
          echo "    <link rel='stylesheet' type='text/css' href='style/{$value}.css'>\n";
        }
      }
      if (isset($include_js)){
        foreach ($include_js as $key => $value) {
          echo "    <script src='js/{$value}.js'></script>\n";
        }
      }
    ?>
  </head>
  <body>
    <header>
      <nav>
        <ul>
          <li><a href="index.php" title="Gioca"
            <?php if(isset($section) && $section==0) echo 'class="active"'?>
            <?php if(isset($section) && $section==0) echo 'onclick="return askUser();"'?>
            >Gioca</a></li>
          <li><a href="guide.php" title="Guida"
            <?php if(isset($section) && $section==1) echo 'class="active"'?>
            <?php if(isset($section) && $section==0) echo 'onclick="return askUser();"'?>
            >Guida</a></li>
        </ul>
      </nav>
      <a href="index.php"><img src="img/logo1.png" alt="Zombies"/></a>
      <nav>
        <ul>
          <li><a href="rankings.php" title="Classifica"
            <?php if(isset($section) && $section==2) echo 'class="active"'?>
            <?php if(isset($section) && $section==0) echo 'onclick="return askUser();"'?>
            >Classifica</a></li>
          <?php
            if (isset($_SESSION["login"]) && $_SESSION["login"] && isset($_SESSION['username'])){
              if(isset($isProfilePage) && $isProfilePage){
                $type = 2;
				}
              else{
                $type = 1;
				}
            }else{
              $type = 0;
			}
          ?>

          <li><a href="<?php echo $type==0?"login.php":($type==1?"stats.php":"exit.php");?>"
                 title="<?php echo $type==0?"Accedi":($type==1?"Profilo":"Esci");?>"
            <?php if(isset($section) && $section==3) echo 'class="active"'?>
            <?php if(isset($section) && $section==0) echo 'onclick="return askUser();"'?>
            >
            <?php echo $type==0?"Accedi":($type==1?$_SESSION['username']:"Esci");?>
          </a></li>
        </ul>
      </nav>
    </header>
