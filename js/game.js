// Classe oggetto generico
function  GObject(width, height, spriteURI){
	var that = this;

	
	//grandezza oggetto
	this.width = width;
	this.height = height;
	
	// devi scrivere come trattare l'immagine dell'oggetto con spites
	// L'immagine dell'oggetto nel gioco
	this.spriteURI = spriteURI;
	this.nSprite = 1;                 //quanti sprite ci sono nell'immagine
	if (spriteURI != null){
		this.sprite = mLoader.get(spriteURI);
	}
	this.currentSprite = 0;           // parte sempre dal primo sprite dell'immagine
	this.spriteInterval = undefined;  // dipende dall'animazione
	this.spriteCounter = 0;           // timer
	this.type = null; //tipo movimento
	this.widthT = null;
	this.heightT = null;
	this.raggio = this.width * 0.25;

	
	this.position = {'x':0,'y':0};
	
	//Imposta lo sprite
	this.changeSprite = function (spriteURI, width, height, nSprite, spriteInterval, type, widthT, heightT){
		this.spriteURI = spriteURI;
		if (spriteURI != null){
			this.sprite = mLoader.get(spriteURI);
		}
		this.width = width;
		this.height = height;
		this.nSprite = nSprite;
		this.spriteInterval = spriteInterval;
		this.type = type;
		this.widthT = widthT;
		this.heightT = heightT;
		this.raggio = (this.widthT != null) ? (this.widthT * 0.25) : (this.width * 0.25);
	};

	
	
	// Sposta l'oggetto nella posizione desiderata
	this.moveTo = function(x, y){
		if (x < 0){ // l'oggetto è completamente uscito a sinistra
			this.position.x = -Game.PADDING;
			if(this.type != null){this.position.x = 0;}
			else{this.position.x = -Game.PADDING;}
		}
		else if (x > Game.WIDTH){  // uscito a destra
			if(this.type != null){this.position.x = Game.WIDTH;}
			else{this.position.x = Game.WIDTH + Game.PADDING;}
		}
		else {this.position.x = x;}

		if (y < 0){ // l'oggetto è completamente uscito in alto
			if(this.type != null){this.position.y = 0;}
			else{this.position.y = -Game.PADDING;}
		}
		else if (y > Game.HEIGHT){  // uscito in basso
			if(this.type != null){this.position.y = Game.HEIGHT;}
			else{this.position.y = Game.HEIGHT + Game.PADDING;}
		}
		else {this.position.y = y;}
	};
	
	// Sposta l'oggetto
	this.move = function(deltaX, deltaY){
		this.moveTo(this.position.x + deltaX, this.position.y + deltaY);
	};
	
	
	// Funzione che disegna nel canvas
	// Disegna l'oggetto nel canvas il cui context è ctx
	this.draw = function (){
		if (this.spriteInterval !== undefined){
			if(this.spriteCounter % this.spriteInterval == 0){ // cambio sprite
				this.currentSprite = Math.floor(this.spriteCounter / this.spriteInterval);
				if (this.currentSprite == this.nSprite){
					this.currentSprite = 0;
					this.spriteCounter = 0;
				}
			}
		this.spriteCounter ++;
		} 
		else {
			this.currentSprite = 0;
		}
		

		var spritePosition = {
			'x': this.currentSprite * this.width,
			'y': 0
		};
	
		if (this.type == 0 || this.type == 3){
			spritePosition.y = this.heightT;
		}
		else if(this.type == 1 || this.type == 2){
			spritePosition.y = this.height + this.heightT;
		}
		
		var scale = mGame.canvas.width/Game.WIDTH;
		var ctx = mGame.context;
		// Salvo il context per poterlo ripristinare dopo
		ctx.save();
		// Vado nella posizione dove voglio inserire l'oggetto
		ctx.translate(this.position.x * scale, this.position.y * scale);
		// Disegno l'immagine al centro del nuovo SR		da pensarci
		if (this.type == null){
			ctx.drawImage(this.sprite,              //imageObj
				spritePosition.x,         //sourceX
				spritePosition.y,         //sourceY
				this.width,               //sourceWidth
				this.height,              //sourceHeight
				-this.width/2 * scale,    //destX
				-this.height/2 * scale,   //destY
				this.width * scale,       //destWidth
				this.height * scale       //destHeight
			);
		}
	else if (this.type == 0){//avanti
		//disegno la testa
		ctx.drawImage(this.sprite,              //imageObj
					  0,         //sourceX
					  0,         //sourceY
					  this.widthT,               //sourceWidth
					  this.heightT,              //sourceHeight
					  -this.widthT/2 * scale,    //destX
					  -this.heightT/2 * scale,   //destY
					  this.widthT * scale,       //destWidth
					  this.heightT * scale       //destHeight
		);
		//disegno corpo
		ctx.drawImage(this.sprite,              //imageObj
					  spritePosition.x,         //sourceX
					  spritePosition.y,         //sourceY
					  this.width,               //sourceWidth
					  this.height,              //sourceHeight
					  -this.width/2 * scale,    //destX
					  -1,   //destY
					  this.width * scale,       //destWidth
					  this.height * scale       //destHeight
		);
	}
	else if (this.type == 3){//indietro
		//disegno la testa
		ctx.drawImage(this.sprite,              //imageObj
					  4 * this.widthT,         //sourceX
					  0,         //sourceY
					  this.widthT,               //sourceWidth
					  this.heightT,              //sourceHeight
					  -this.widthT/2 * scale,    //destX
					  -this.heightT/2 * scale,   //destY
					  this.widthT * scale,       //destWidth
					  this.heightT * scale       //destHeight
		);
		//disegno corpo
		ctx.drawImage(this.sprite,              //imageObj
					  spritePosition.x,         //sourceX
					  spritePosition.y,         //sourceY
					  this.width,               //sourceWidth
					  this.height,              //sourceHeight
					  -this.width/2 * scale,    //destX
					  -1,   //destY
					  this.width * scale,       //destWidth
					  this.height * scale       //destHeight
		);
	}
	else if (this.type == 1){//sinistra
		//disegno la testa
		ctx.scale(-1,1);
		ctx.drawImage(this.sprite,              //imageObj
					  2 * this.widthT,         //sourceX
					  0,         //sourceY
					  this.widthT,               //sourceWidth
					  this.heightT,              //sourceHeight
					  -this.widthT/2 * scale,    //destX
					  -this.heightT/2 * scale,   //destY
					  this.widthT * scale,       //destWidth
					  this.heightT * scale       //destHeight
		);
		ctx.scale(-1,1);
		//disegno corpo
		ctx.drawImage(this.sprite,              //imageObj
					  spritePosition.x,         //sourceX
					  spritePosition.y,         //sourceY
					  this.width,               //sourceWidth
					  this.height,              //sourceHeight
					  -this.width/2 * scale,    //destX
					  -1,   //destY
					  this.width * scale,       //destWidth
					  this.height * scale       //destHeight
		);
	}
	else if (this.type == 2){//destra
		//disegno la testa
		ctx.drawImage(this.sprite,              //imageObj
					  2 * this.widthT,         //sourceX
					  0,         //sourceY
					  this.widthT,               //sourceWidth
					  this.heightT,              //sourceHeight
					  -this.widthT/2 * scale,    //destX
					  -this.heightT/2 * scale,   //destY
					  this.widthT * scale,       //destWidth
					  this.heightT * scale       //destHeight
		);
		//disegno corpo
		ctx.scale(-1,1);
		ctx.drawImage(this.sprite,              //imageObj
					  spritePosition.x,         //sourceX
					  spritePosition.y,         //sourceY
					  this.width,               //sourceWidth
					  this.height,              //sourceHeight
					  -this.width/2 * scale,    //destX
					  -1,   //destY
					  this.width * scale,       //destWidth
					  this.height * scale       //destHeight
		);
		ctx.scale(-1,1);
	}
    // Ripristino il context precedente
    ctx.restore();
  };
}

// Classe essere
function Being(width, height, spriteURI, position, speed){
	//inheritance
	this.base = GObject;
	this.base(width, height, spriteURI);
	
	
	if (position != null){
		this.moveTo(position.x, position.y);
	}
	

	this.verso = function(x, y){
	if(x != null){
		this.direction.x = x;
	}
	if(y != null){
		this.direction.y = y;
	}
	if(x == null && y == null){this.speed = 0;}
	else{this.speed = speed;}
	};
	
	
	this.direction = {'x':0, 'y':0};
	
	
	this.speed = speed;
	
	this.movement = function(){
		this.move(this.speed * this.direction.x, this.speed * this.direction.y);
	};
	
}

Being.prototype = new GObject;

function GreenB(){
	//parent
	this.base = Being;
	var width = 32;
	var height = 32;
	var widthT = 64;
	var heightT = 64;
	

	//completare con i dati
	this.base(width, height, 'green.png', null, 1);
	
	var posx = posCasuale(Game.WIDTH);
	var posy = posCasuale(Game.HEIGHT);
	this.moveTo(posx, posy);
	
	//fare la funzione moveToPlayer
	this.moveToPlayer = function(posPlayer){
		var dx = posPlayer.x - this.position.x;
		var dy = posPlayer.y - this.position.y;
		var denom = Math.sqrt(Math.pow(dx,2) + Math.pow(dy,2));
		this.verso(dx/denom, dy/denom);
		
		//changeSprite(spriteURI, width, height, nSprite, spriteInterval, type, widthTesta, heightTesta)
		if (Math.abs(this.direction.x) > Math.abs(this.direction.y)){
			if (this.direction.x > 0){
				this.changeSprite(this.spriteURI, this.width, this.height, 10, 2, 2, widthT, heightT);
			}
			else{
				this.changeSprite(this.spriteURI, this.width, this.height, 10, 2, 1, widthT, heightT);
			}
		}
		else{
			if (this.direction.y > 0){
				this.changeSprite(this.spriteURI, this.width, this.height, 10, 2, 0, widthT, heightT);
			}
			else{
				this.changeSprite(this.spriteURI, this.width, this.height, 10, 2, 3, widthT, heightT);
			}
		}
	};
	
	
	this.score = 5;
}

GreenB.prototype = new Being;

function DarkB(){
	//parent
	this.base = Being;
	var width = 32;
	var height = 32;
	var widthT = 64;
	var heightT = 64;
	
	//completare con i dati
	this.base(width, height, 'dark.png', null, 2);
	
	var posx = posCasuale(Game.WIDTH);
	var posy = posCasuale(Game.HEIGHT);
	this.moveTo(posx, posy);
	
	//fare la funzionemoveToPlayer
	this.moveToPlayer = function(posPlayer){
		var dx = posPlayer.x - this.position.x;
		var dy = posPlayer.y - this.position.y;
		var denom = Math.sqrt(Math.pow(dx,2) + Math.pow(dy,2));
		this.verso(dx/denom, dy/denom);
		
		//changeSprite(spriteURI, width, height, nSprite, spriteInterval, type, widthTesta, heightTesta)
		if (Math.abs(this.direction.x) > Math.abs(this.direction.y)){
			if (this.direction.x > 0){
				this.changeSprite(this.spriteURI, this.width, this.height, 10, 2, 2, widthT, heightT);
			}
			else{
				this.changeSprite(this.spriteURI, this.width, this.height, 10, 2, 1, widthT, heightT);
			}
		}
		else{
			if (this.direction.y > 0){
				this.changeSprite(this.spriteURI, this.width, this.height, 10, 2, 0, widthT, heightT);
			}
			else{
				this.changeSprite(this.spriteURI, this.width, this.height, 10, 2, 3, widthT, heightT);
			}
		}
	};
	
	//per sparare
	var SHOOT_COOLDOWN = 100;
	this.shootCooldown = 0;
	this.fireSound = mLoader.get('shot.mp3');
	

	this.shoot = function(){
		//controllo sparo da modificare
		if (this.shootCooldown > 0){
			this.shootCooldown --;
		}
		else{
			mGame.bullets.push(new Bullet(1,this.position,this.direction));
			this.fireSound.play();
			this.shootCooldown = SHOOT_COOLDOWN;
		}
	};
	
	
	this.score = 20;
}

DarkB.prototype = new Being;

function Player(){
	//parent
	this.base = Being;
	var width = 64;
	var height = 50;
	
	
	//completa i dati
	this.base(width,height,'angel.png', null,6);
	
	var SHOOT_COOLDOWN = 10;
	this.shootCooldown = 0;
	
	//posizione iniziale
	this.moveTo(Game.WIDTH/2, Game.HEIGHT/2);
	
	
	
	this.fireSound = mLoader.get('shot.mp3');
	
	//changeSprite(spriteURI, width, height, nSprite, spriteInterval, type, widthTesta, heightTesta)
	this.changeSprite(this.spriteURI, this.width, this.height, 7, 2, 0, this.width, this.height);
		
	this.shoot = function(){
		//controllo sparo
		if (this.shootCooldown > 0){
			this.shootCooldown --;
		}
		else if(keyboard[Z_KEY]){
		  	mGame.bullets.push(new Bullet(0,this.position,this.direction));
			this.fireSound.play();
			this.shootCooldown = SHOOT_COOLDOWN;
		}
	};
	
	
	this.getDirection = function(){
		var dx = null, dy = null;
		if (keyboard[UP_KEY] && keyboard[RIGHT_KEY]){
			dx=1;dy=-1;
		}
		else if (keyboard[UP_KEY] && keyboard[LEFT_KEY]){
			dx=-1;dy=-1;
		}
		else if (keyboard[UP_KEY]){
			dx=0;dy=-1;
		}
		else if (keyboard[DOWN_KEY] && keyboard[LEFT_KEY]){
			dx=-1;dy=1;
		}
		else if (keyboard[DOWN_KEY] && keyboard[RIGHT_KEY]){
			dx=1;dy=1;
		}
		else if (keyboard[DOWN_KEY]){
			dx=0;dy=1;
		}
		else if (keyboard[LEFT_KEY]){
			dx = -1;
			dy=0;
		}
		else if (keyboard[RIGHT_KEY]){
			dx=1;
			dy=0;
		}
		this.verso(dx, dy);
		
	//changeSprite(spriteURI, width, height, nSprite, spriteInterval, type, widthTesta, heightTesta)
		if (this.direction.x != 0){
			if (this.direction.x > 0){
				this.changeSprite(this.spriteURI, this.width, this.height, 7, 2, 2, this.width, this.height);
			}
			else{
				this.changeSprite(this.spriteURI, this.width, this.height, 7, 2, 1, this.width, this.height);
			}
		}
		else{
			if (this.direction.y > 0){
				this.changeSprite(this.spriteURI, this.width, this.height, 7, 2, 0, this.width, this.height);
			}
			else{
				this.changeSprite(this.spriteURI, this.width, this.height, 7, 2, 3, this.width, this.height);
			}
		}
	};
	
}

Player.prototype = new Being;

function Bullet(type, pos, dir){
	//parent
	this.base = Being;
	
	//trovare sprite con il type
	var spriteFile;
	var width;
	var height;
	var speed;
	
	if (type == 0){
		spriteFile = 'ball.png';
		width = 25;
		height = 20;
		speed = 30;
	}
	else{
		spriteFile = 'plasmaball1.png';
		width = 32;
		height = 32;
		speed = 15;
	}
	
	//completa con i dati
	this.base(width,height,spriteFile,null,speed);
	
	this.verso(dir.x, dir.y);
	this.moveTo(pos.x, pos.y);
	
	this.tempo = 40;
	
	this.changeSprite(spriteFile, width, height, 3, 2, null, null, null);
	
	this.checkDeath = function(){
		return (this.tempo <= 0);
	};
}

Bullet.prototype = new Being;

function Barra(){
	//parent
	this.base = GObject;
	var width = 189;
	var height = 19;
	
	//completa
	this.base(width,height,'VIDA_10.png');
	
	//posizione,sprite
	this.moveTo(width/2, height/2);
	
	var MAXLIFE = 10;
	this.life = 10;
	
	//funzione danno
	this.damage = function(damage){
		this.life -= damage;
		this.change();
	};
	
	//funzione guadagna vita
	this.heal = function(dato){
		this.life += dato;
		if (this.life > MAXLIFE){
			this.life = MAXLIFE;
		}
		this.change();
	};
	
	this.change = function(){
		var spriteFile = 'VIDA_' + Math.ceil(this.life) + '.png';
		this.changeSprite(spriteFile, width, height, 1, null, null, null, null);
	};
}

Barra.prototype = new GObject;



function Game(){
	//costanti
	var that = this;
	
	// variabile stato gioco
	this.running = false;
	this.started = false;
	
	// il canvas è inizializzato dal main tramite il metodo setCanvas
	this.canvas = null;
	this.context = null;
	this.setCanvas = function (canvas){
		this.canvas = canvas;
		this.context = canvas.getContext('2d');
		};
  
	// game object
	this.player = new Player;
	this.barra = new Barra;
	this.bullets = new Array();
	this.darks = new Array();
	this.greens = new Array();
  
	//audio gioco
	this.sound = mLoader.get('zombie.mp3');
	this.deathSound = mLoader.get('game_over.wav');
	this.morte = mLoader.get('morte.wav');
	this.sound.loop = true;
  
	//sfondo
	this.background = mLoader.get('basement.png');
  
	//punteggio livello
	this.score = 0;
  

	//callback per il termine del gioco
	this.onEnd = null;
	//callback per aggiornare elementi esterni al canvas ad ogni loop
	this.onLoop = null;
	//callback per il gioco in pausa
	this.onPause = null;
	  
	// id dell'interval
	var loopInterval;
	  
	//inizia il gioco
	this.start = function(){
		this.running = true;
		this.started = true;
		
		this.score = 0;
		this.sound.play();
		loopInterval = setInterval('mGame.loop()', 30);
	};
	  
	//mettere in pausa
	this.pause = function (){
		this.running = false;

		clearInterval(loopInterval);

		//scrivere messaggio di pausa
		this.drawMessage("PAUSA", 40, false);
		this.drawSubMessage("Clicca di nuovo per continuare", 20, 40);
		
		//pausare musica, da modificare
		this.sound.pause();
		
		if (this.onPause != null){
		  this.onPause();
		}
	}

	// riprendi il gioco dalla pausa
	this.resume = function(){
		this.running = true;

		//ripartire musica
		this.sound.play();
		
		loopInterval = setInterval('mGame.loop()', 30);
	}

	// termina il gioco
	this.end = function(){
		this.running = false;
		this.started = false;

		clearInterval(loopInterval);
		
		
		// disegna tutte le scritte
		this.drawMessage('GAME OVER', 50, false);
		this.drawSubMessage('PUNTEGGIO: ' + this.score, 25, 50);
		this.drawSubMessage('Clicca di nuovo per rigiocare', 12, 220);
		if(loggedIn){
			if (this.score > highscore){
				this.drawSubMessage('NUOVO RECORD', 25, -70);
			}
		}

		//fa partire l'audio
		this.deathSound.play();

		// ferma la musica di sottofondo
		if (!this.sound.paused){
			this.sound.pause();
		}
		// chiama il callback se definito
		if (this.onEnd != null){
			this.onEnd();
		}
	};
	  
	//azzera le variabili per ricominciare
	this.reset = function(){
		// Oggetti di gioco
		this.player = new Player;
		this.barra = new Barra;
		this.bullets = new Array();
		this.darks = new Array();
		this.greens = new Array();

		// Audio di gioco
		this.soundCounter = 0;
		
		//punteggio e livello
		this.score = 0;
	};
	
	//funzione per rimuovere i mostri
	this.killGreen = function (Id){
		this.greens.splice(Id, 1);
		this.morte.play();
	};
	
	this.killDark = function (Id){
		this.darks.splice(Id, 1);
		this.morte.play();
	};
	 
	//game loop
	this.loop = function(){
		//variabili per callback, non sono sicuro
		var scoreChanged = false;
		//funzione check game over
		if (this.barra.life < 0){
			this.end();
			return;
		}
		
		
		// INIZIALIZZAZIONE
		
		//cancello frame precedente
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
		
		//canvas sfondo
		this.context.drawImage(this.background, 0, 0, this.canvas.width, this.canvas.height);
		
		//Creazioni mostri
		
		while(this.greens.length <= this.score/60){
			var green = new GreenB;
			this.greens.push(green);
		}
		
		while(this.darks.length <= this.score/150){
			var dark = new DarkB;
			this.darks.push(dark);
		}
		
		//MOVIMENTO
		
		//player
		this.player.getDirection();
		this.player.movement();
		this.player.shoot();
		//green
		for (var i in this.greens){
			this.greens[i].moveToPlayer(this.player.position);
			this.greens[i].movement();
		}
		//dark
		for (var i in this.darks){
			this.darks[i].moveToPlayer(this.player.position);
			this.darks[i].movement();
			this.darks[i].shoot();
		}
		
		//proiettili
		for (var i=this.bullets.length-1; i>=0; i--){
			if (!this.bullets[i].checkDeath()){ //se "vivi"
				this.bullets[i].movement();
				this.bullets[i].tempo --;
			} else {  // se "morti"
			this.bullets.splice(i,1);
			}
		}
		
		
		//controllo collisioni
		//collisioni green e bullet
		for (var i in this.greens){
			for (var j in this.bullets){
				if (collision(this.greens[i], this.bullets[j])){
					if (this.bullets[j].speed == 30){
						this.score += this.greens[i].score;
						scoreChanged = true;
						this.barra.heal(0.5);
						this.killGreen(i);
						this.bullets.splice(j,1);
					}
				}
			}
		}
		//collisioni dark e bullet
		for (var i in this.darks){
			for (var j in this.bullets){
				if (collision(this.darks[i], this.bullets[j])){
					if (this.bullets[j].speed == 30){
						this.score += this.darks[i].score;
						scoreChanged = true;
						this.barra.heal(1);
						this.killDark(i);
						this.bullets.splice(j,1);
					}
					
				}
			}
		}
		//collisioni player e bullet
		for (var j in this.bullets){
			if (collision(this.player, this.bullets[j])){
				if (this.bullets[j].speed == 15){
						this.barra.damage(0.5);
						this.bullets.splice(j,1);
					}
			}
		}
		//collisioni green e player
		for (var j in this.greens){
			if (collision(this.player, this.greens[j])){
				this.barra.damage(0.05);
			}
		}
		//collisioni dark e player
		for (var j in this.darks){
			if (collision(this.player, this.darks[j])){
				this.barra.damage(0.1);
			}
		}
		//DISEGNO
		
		// Proiettili
		for (var i in this.bullets){
		  this.bullets[i].draw();
		}
		
		// green
		for (var i in this.greens){
		  this.greens[i].draw();
		}
		
		// dark
		for (var i in this.darks){
		  this.darks[i].draw();
		}
		
		// player
		this.player.draw();
		
		// barra
		this.barra.draw();
		
		//AZIONI FINALI
		
		// Chiama il callback da modificare
		if(this.onLoop != null){
		  this.onLoop(scoreChanged);
		 }

		// Verifica che l'utente non voglia mettere in pausa
		if(keyboard[P_KEY] || keyboard[ESC_KEY]){
		  this.pause();
		}
	};
	  
	// Cambia la dimensione del canvas in base a width e height della window
	this.resize = function(width, height){
		var SCALE = 0.7;  // costante
		var w, h;

		if (width/height > Game.WIDTH/Game.HEIGHT){ // se lo schermo è più largo del gioco 
		  w = height * Game.WIDTH/Game.HEIGHT * SCALE;
		  h = height * SCALE;
		} else if (width/height < Game.WIDTH/Game.HEIGHT){ // se lo schermo è più stretto del gioco 
		  w = width * SCALE;
		  h = width * Game.HEIGHT/Game.WIDTH * SCALE;
		} else{
		  w = width * SCALE;
		  h = height * SCALE;
		}
		
		this.canvas.width = w;
		this.canvas.height = h;
		return w;
		
	};
	  
	// Disegna un messaggio centrato con stritto text di grandezza fontSize
	// Può essere specificato se lasciare il canvas così com'è o se "pulirlo" (wipe)
	this.drawMessage = function(text, fontSize, wipe){
		var x = this.canvas.width / 2;
		var y = this.canvas.height / 2;

		// Scala il font in base alla dimensione del canvas
		fontSize = Math.floor(fontSize * this.canvas.width/Game.WIDTH);

		// pulisco tutto se richiesto
		if(wipe){
			this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
		}

		// disegno
		this.context.save();
		this.context.font = fontSize + 'px Shlop';
		this.context.textAlign = 'center';
		this.context.fillStyle = 'orange';
		this.context.fillText(text, x, y, this.canvas.width);
		this.context.restore();
	};

	// Disegna un messaggio con stritto text di grandezza fontSize
	// Il messaggio è centrato orizzontalmente e si discosta di verticalShift dal
	// centro verticale
	this.drawSubMessage = function(text, fontSize, verticalShift){
		var x = this.canvas.width / 2;
		var y = this.canvas.height / 2 + verticalShift;
	
		// Scala il font in base alla dimensione del canvas
		fontSize = Math.floor(fontSize * this.canvas.width/Game.WIDTH);
	
		// disegno
		this.context.save();
		this.context.font = fontSize + 'px Shlop';
		this.context.textAlign = 'center';
		this.context.fillStyle = 'orange';
		this.context.fillText(text, x, y, this.canvas.width);
		this.context.restore();
	};
}//FINE CLASSE GAME

//Dimensioni del gioco
Game.WIDTH = 640;
Game.HEIGHT = 480;
Game.PADDING = 10;

//funzioni di supporto

function posCasuale(lato){
	var x = Math.random() * (Game.PADDING * 2);
	if (x < Game.PADDING){
		x = -Game.PADDING / 2;
	}
	else{
		x = (Game.PADDING / 2) + lato;
	}
	return x;
}

function collision(a, b){
	if (Math.pow(a.position.x - b.position.x,2) + Math.pow(a.position.y - b.position.y,2) < Math.pow(a.raggio + b.raggio,2)){
		return true;
	}
	return false;
}