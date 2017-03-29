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
	     	
		var touchobj = e.changedTouches[0] ; // referència al primer punt tocat (pex: el primner dit)
		startx = parseInt(touchobj.clientX) ; // quina és la posició x en referència al costat esquerra de la pantalla
		starty = parseInt(touchobj.clientY) ;
		
		e.preventDefault() ;
		//alert("Touch_x : " + startx + " --- Touch_y : " + starty);
		
		draw(startx,starty)	;
		
	});	
	
	document.addEventListener('touchmove', function(e) {
	      	
		var touchobj = e.changedTouches[0] ; // referència al primer punt tocat (pex: el primner dit)
		startx = parseInt(touchobj.clientX) ; // quina és la posició x en referència al costat esquerra de la pantalla
		starty = parseInt(touchobj.clientY) ;
		
		e.preventDefault() ;
		//alert("Touch_x : " + startx + " --- Touch_y : " + starty);
		
	 });
	
	
	
});	
	


function draw(startx,starty) {
	
		// alert("cridada la funció DRAW");
		
		var canvas = document.getElementById('canvas');
		var ctx = canvas.getContext('2d');
		
		// en primier lloc he de netejar el canvas
		canvas.width=canvas.width;
	
		 // Formas rectangulares
          	ctx.fillRect(startx,starty,100,100);
          
		
		
		
}
