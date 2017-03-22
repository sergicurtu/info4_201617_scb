$(document).on('deviceready', function() {

     // determinem amplada alçada DISPOSITIU ------------------
     var amplada_pantalla = screen.width ;		// 720px  --> SG_Note2
     var alcada_pantalla = screen.height ; 		// 1280px
     var amplada_pantalla_CSS = window.innerWidth ; 	// 360px
     var alcada_pantalla_CSS = window.innerHeight ;	// 616px 
     /////////////////////////////////////////////////////////
     
     // REDIMENSIONEM EL CANVAS
     var canvas = document.getElementById('canvas');
     var ctx = canvas.getContext('2d');
     ctx.canvas.width  = window.innerWidth;
     ctx.canvas.height = window.innerHeight;
     
	// centre pantalla ?
	var centre_x = amplada_pantalla_CSS / 2 ;
	var centre_y = alcada_pantalla_CSS / 2 ;  // var centre_y = window.innerHeight / 2 ; //
		
	// Quina posició la bola ? Temin present que la bola ocupa un espai 	// quina mida la bola ?
	var mida_x_bola = amplada_pantalla_CSS * ( 10 / 100 ) ; 
	var mida_y_bola = mida_x_bola ;  // 36 ;
	var posicio_x_bola = centre_x - ( mida_x_bola / 2 ) ;
	var posicio_y_bola = centre_y - ( mida_y_bola / 2 ) ;
 	
 	
	document.addEventListener("offline", function() { 
		// alert("ara NO HI HA internet");
	}, false);
 
	$(window).resize(function() {
		//alert("has girat el dispositiu");
	}, false); 
	
	document.addEventListener('touchstart', function(e) {
	     alert("Clicat") ;
	});	
	
	document.addEventListener('touchmove', function(e) {
	      alert("has arrastrat el dit");
	 });
	
	var nivell = 1 ;
	draw(amplada_pantalla_CSS,alcada_pantalla_CSS,posicio_x_bola,posicio_y_bola,mida_x_bola,mida_y_bola,nivell)	 ;
	
});	
	


function draw(amplada_pantalla_CSS,alcada_pantalla_CSS,posicio_x_bola,posicio_y_bola,mida_x_bola,mida_y_bola,nivell) {
	
		alert("cridada la funció DRAW");
	
		var canvas = document.getElementById('canvas');
		var ctx = canvas.getContext('2d');
		
		 // Formas rectangulares
          	ctx.fillRect(25,25,100,100);
          	ctx.clearRect(45,45,60,60);
	        ctx.strokeRect(50,50,50,50);
		
		
		
}
