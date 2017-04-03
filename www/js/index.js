$(document).on('deviceready', function() {

     // determinem amplada alçada DISPOSITIU ------------------
 
     /*		
	en aquest cas faig alçada = width i amplada = height per treballar en horitzontal
	potser millor definir en landscape el dispositiu (?)
     */
     var alcada_pantalla = screen.width ;		// 720px  --> SG_Note2
     var amplada_pantalla = screen.height ; 		// 1280px
     var alcada_pantalla_CSS = window.innerWidth ; 	// 360px
     var amplada_pantalla_CSS = (window.innerHeight) + 24;	// 616px -> 640
     /////////////////////////////////////////////////////////
     
     // REDIMENSIONEM EL CANVAS
     var canvas = document.getElementById('canvas');
     var ctx = canvas.getContext('2d');
     ctx.canvas.width  =amplada_pantalla_CSS  ;
     ctx.canvas.height = alcada_pantalla_CSS  ;
     
	// centre pantalla ?
	var centre_x = amplada_pantalla_CSS / 2 ;
	var centre_y = alcada_pantalla_CSS / 2 ;  // var centre_y = window.innerHeight / 2 ; //
	
	ctx.font="30px Verdana";
	// Create gradient
	var gradient=ctx.createLinearGradient(0,0,canvas.width,0);
	gradient.addColorStop("0","magenta");
	gradient.addColorStop("0.5","blue");
	gradient.addColorStop("1.0","red");
	// Fill with gradient
	ctx.fillStyle=gradient;
	ctx.fillText("Toca la pantalla per començar",10,90);
	
	
	// Quina posició la bola ? Temin present que la bola ocupa un espai 	// quina mida la bola ?
	/*
	var mida_x_bola = amplada_pantalla_CSS * ( 10 / 100 ) ; 
	var mida_y_bola = mida_x_bola ;  // 36 ;
	var posicio_x_bola = centre_x - ( mida_x_bola / 2 ) ;
	var posicio_y_bola = centre_y - ( mida_y_bola / 2 ) ;
	*/	  
				  
	document.addEventListener("offline", function() { 
		// alert("ara NO HI HA internet");
	}, false);
 
	$(window).resize(function() {
		//alert("has girat el dispositiu");
	}, false); 
	
	document.addEventListener('touchstart', function(e) {
	     	
		var touchobj = e.changedTouches[0] ; // referència al primer punt tocat (pex: el primner dit)
		var startx = parseInt(touchobj.clientX) ; // quina és la posició x en referència al costat esquerra de la pantalla
		var starty = parseInt(touchobj.clientY) ;
		
		e.preventDefault() ;
		//alert("Touch_x : " + startx + " --- Touch_y : " + starty);
		
		draw(startx,starty,amplada_pantalla_CSS,alcada_pantalla_CSS,centre_x,centre_y)	;
		
	});	
	
	document.addEventListener('touchmove', function(e) {
	      	
		var touchobj = e.changedTouches[0] ; // referència al primer punt tocat (pex: el primner dit)
		var startx = parseInt(touchobj.clientX) ; // quina és la posició x en referència al costat esquerra de la pantalla
		var starty = parseInt(touchobj.clientY) ;
		
		e.preventDefault() ;
		//alert("Touch_x : " + startx + " --- Touch_y : " + starty);
		
	 });
	
	
	
});	
	


function draw(startx,starty,amplada_pantalla_CSS,alcada_pantalla_CSS,centre_x,centre_y) {
	
		// alert("cridada la funció DRAW");
		
		var canvas = document.getElementById('canvas');
		var ctx = canvas.getContext('2d');
		
		// en primier lloc he de netejar el canvas
		canvas.width=canvas.width;
		canvas.style.backgroundColor = '#000000' ;
	
		// linia 1/2 camp
		ctx.fillStyle="#FFFFFF";
		ctx.fillRect(0,(amplada_pantalla_CSS/2)-1,alcada_pantalla_CSS,3);
	
		 // Formas rectangulares
		ctx.fillStyle="#FFFFFF";
          	ctx.fillRect(startx,starty,20,20);
          
		
		
		
}
