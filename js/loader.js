// Classe per caricare le risorse del gioco
function Loader(){
  // Oggetto per i callback
  var that = this;

  // Attributi
  this.elements = {};
  this.status = {};

  var baseURI = 'assets/';

  // Ritorna l'immagine caricata
  this.get = function (elementURI){
    if (elementURI in this.elements){
      return this.elements[elementURI];
	}
    else{
      console.warn(elementURI + " not found!");
    }
  };

  // Richiedi il caricamento di un elemento
	this.load = function (URI, type){
		switch(type){
			case 'image':
				this.elements[URI] = new Image;
				this.elements[URI].src = baseURI + URI;
				this.status[URI] = false;
				this.elements[URI].onload = function (){
					// quando viene caricata setta true lo status
					that.status[URI] = true;
				};
				break;
			case 'audio':
				this.elements[URI] = new Audio(baseURI + URI);
				this.status[URI] = false;
				this.elements[URI].oncanplaythrough  = function (){
					// quando viene caricata setta true lo status
					that.status[URI] = true;
				};
				break;
			default:
				console.warn("Unrecognized type " + type);
		}
	};

  // Richiedi il progresso in percentuale
  this.getProgress = function (){
    var total = Object.keys(mLoader.elements).length;
    var count = 0;
    for (var s in this.status){
      count += this.status[s]?1:0;
	}
    var progress = count/total * 100;
    return progress;
  };
}

// Inizializza l'oggetto globale per ottenere le risorse caricate
var mLoader = new Loader;

// Carica le risorse necessarie

// immagini
mLoader.load('angel.png', 'image');
mLoader.load('green.png', 'image');
mLoader.load('dark.png', 'image');
mLoader.load('basement.png', 'image');
mLoader.load('ball.png', 'image');
mLoader.load('plasmaball1.png', 'image');
mLoader.load('VIDA_0.png', 'image');
mLoader.load('VIDA_1.png', 'image');
mLoader.load('VIDA_2.png', 'image');
mLoader.load('VIDA_3.png', 'image');
mLoader.load('VIDA_4.png', 'image');
mLoader.load('VIDA_5.png', 'image');
mLoader.load('VIDA_6.png', 'image');
mLoader.load('VIDA_7.png', 'image');
mLoader.load('VIDA_8.png', 'image');
mLoader.load('VIDA_9.png', 'image');
mLoader.load('VIDA_10.png', 'image');

// audio
mLoader.load('morte.wav', 'audio');
mLoader.load('game_over.wav', 'audio');
mLoader.load('shot.mp3', 'audio');
mLoader.load('zombie.mp3', 'audio');