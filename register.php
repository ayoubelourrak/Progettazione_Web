<?php
  session_start();

  function no_register($message = '', $username = '', $email = ''){
    $title = "Zombies - Registrati";
    $section = -1;
    $include_js = ['register'];
    $include_css = ['form'];
    include_once("includes/header.php");
?>
  <main>
    <form name="register" action="register.php" method="POST" onsubmit="return validateForm();">
      <h2>Registrazione</h2>
      <p id="error"><?php echo $message != ''?$message:"error";?></p>
      <div class="form-item">
        <p>Username</p>
        <input type="text" placeholder="Username" name="username" value="<?php echo $username;?>" required>
      </div>
      <div class="form-item">
        <p>Email</p>
        <input type="email" placeholder="Email" name="email" value="<?php echo $email;?>" required>
      </div>
      <div class="form-item">
        <p>Ripeti email</p>
        <input type="email" placeholder="Ripeti Email" name="email_repeat" value="<?php echo $email;?>" required>
      </div>
      <div class="form-item">
        <p>Password</p>
        <input type="password" placeholder="Password" name="password" required>
      </div>
      <div class="form-item">
        <p>Ripeti Password</p>
        <input type="password" placeholder="Ripeti Password" name="password_repeat" required>
      </div>
      <button type="submit">Registrati</button>
    </form>

  </main>
<?php
    if($message != ''){
?>
    <script type="text/javascript">
      document.getElementById("error").style.display = 'block';
    </script>
<?php
    }
    include_once("includes/footer.php");
  }

  function ok_register(){
    $title = "Zombies - Registrazione effettuata";
    $message_text = "Registrazione avvenuta con successo!";
    include_once("includes/message.php");
  }

  if (isset($_POST['username']) && isset($_POST['password']) && isset($_POST['email'])){
    if (!preg_match('/^[A-Za-z0-9]{4,}$/', $_POST['username'])){
		no_register("L'username deve contenere almeno 4 caratteri alfanumerici", $_POST['username'], $_POST['email']);
	} else if (!preg_match('/^[A-Za-z0-9]{8,}$/', $_POST['password'])){
		no_register("La password deve contenere almeno 8 caratteri alfanumerici", $_POST['username'], $_POST['email']);
    } else if(!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)){
		no_register("L'indirizzo email non &egrave; valido", $_POST['username'], $_POST['email']);
    } else {
		include_once("includes/db_helper.php");
		$db = new DBHelper;
		$register_result = $db->register($_POST['username'], $_POST['email'], $_POST['password']);
		$db->close();
		switch($register_result){
			case 0:
				ok_register();
				break;
			case 1:
				no_register('Username gi&agrave; in uso', $_POST['username'], $_POST['email']);
				break;
			case 2:
				no_register('Email gi&agrave; in uso', $_POST['username'], $_POST['email']);
				break;
			default:
				no_register('Errore indefinito', $_POST['username'], $_POST['email']);
				break;
		}
    }
  } 
  else{
		no_register();
	}
?>
