<?php
  session_start();
  $title = "Zombies - Guida";
  $section = 1;
  $include_css = ['article'];
  include_once("includes/header.php");
?>
<main>
  <article>
	<h1>Guida</h1>
	<table style="width:100%;">
		<tbody>
			<tr>
				<td><h2>Obiettivo</h2>
				<p>Distruggere i tuoi nemici per guadagnare punti e cercare di sopravvivere.<br>Il solo contatto con i nemici ti danneggia, ma ogni nemico ucciso ti fa guadagnare<br>punti vita segnati dalla barra in alto a sinistra</p></td>
				<td><h2>Comandi</h2>
				<p>Utilizza le frecce per muoverti, il tasto Z per sparare e P per mettere in pausa</p></td>
			</tr>
		</tbody>
	</table>
	<table>
		<tbody>
			<tr>
				<td><img class="" src="img/92508.png" alt="player"/></td>
				<td><p>Giocatore:<br>Spara sfere energetiche in grado di polverizzare i nemici</p></td>
			</tr>
			<tr>
				<td><img class="" src="img/74114.png" alt="green"/></td>
				<td><p>Pianta Zombie(5pt):<br>Continuera&grave;  ad inseguirti, una volta raggiunto ti attacchera&grave;</p></td>
			</tr>
			<tr>
				<td><img class="" src="img/74113.png" alt="dark"/></td>
				<td><p>Fungo Zombie(20pt):<br>Oltre ad inseguirti, spara sfere energetiche negative</p></td>
			</tr>
		</tbody>
	</table>
    
  </article>
</main>
<?php include_once("includes/footer.php"); ?>
