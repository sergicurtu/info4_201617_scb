$(document).on('deviceready', function() {

     // determinem amplada alçada DISPOSITIU ------------------
 
     /*		
	en aquest cas faig alçada = width i amplada = height per treballar en horitzontal
	potser millor definir en landscape el dispositiu (?)
     */
     screen.orientation.lock('landscape');			
	
     var alcada_pantalla = screen.width ;		// 720px  --> SG_Note2 // mate 9 -> 1080
     var amplada_pantalla = screen.height ; 		// 1280px // 1920
     var alcada_pantalla_CSS = window.innerWidth ; 	// 360px  // 360
     var amplada_pantalla_CSS = (window.innerHeight) ;	// 640px  // 640
	
	//alert("alçada física : " + alcada_pantalla);   // -> 
	//alert("amplada física : " + amplada_pantalla); // -> 
	//alert("alçada : " + alcada_pantalla_CSS);   // -> 360
	//alert("amplada : " + amplada_pantalla_CSS); // -> 640
		
     /////////////////////////////////////////////////////////
     
     // REDIMENSIONEM EL CANVAS
     var canvas = document.getElementById('canvas');
     var ctx = canvas.getContext('2d');
     ctx.canvas.width  = window.innerWidth  ;
     ctx.canvas.height = window.innerHeight  ;
     
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
	
	 // http://stackoverflow.com/questions/3167928/drawing-rotated-text-on-a-html5-canvas //
	 ctx.save();
	 ctx.translate(50, 50);
	 ctx.rotate(Math.PI/2);
	 ctx.textAlign = "center";
	 ctx.fillText("Toca la pantalla per començar", 10, 90);
	 ctx.restore();
	
	// ctx.fillText("Toca la pantalla per començar",10,90);
	
	
	// Quina posició la bola ? Temin present que la bola ocupa un espai 	// quina mida la bola ?
	var mida_x_bola = amplada_pantalla_CSS * ( 2/100 ) ; 
	var mida_y_bola = mida_x_bola ;  // 36 ;
	var posicio_x_bola = centre_x - ( mida_x_bola / 2 ) ;
	var posicio_y_bola = centre_y - ( mida_y_bola / 2 ) ;
	
	var estat_joc = 0 ;
				  
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
		
		draw(estat_joc,startx,starty,amplada_pantalla_CSS,alcada_pantalla_CSS,centre_x,centre_y,mida_x_bola,mida_y_bola,posicio_x_bola,posicio_y_bola)	;
		
		/*
		   el estat del joc ens indica com hem de dibuixar les coses
		   estat = 0 vol dir que acabem de carregar 
		   estat = 1 vol dir que la bola s'hauria de moure sola
		*/   
		if ( estat_joc == 0 ) { estat_joc = 1 ; }
		
		
	});	
	
	document.addEventListener('touchmove', function(e) {
	      	
		var touchobj = e.changedTouches[0] ; // referència al primer punt tocat (pex: el primner dit)
		var startx = parseInt(touchobj.clientX) ; // quina és la posició x en referència al costat esquerra de la pantalla
		var starty = parseInt(touchobj.clientY) ;
		
		e.preventDefault() ;
		//alert("Touch_x : " + startx + " --- Touch_y : " + starty);
		
	 });
	
	
	
});	
	


function draw(estat_joc,startx,starty,amplada_pantalla_CSS,alcada_pantalla_CSS,centre_x,centre_y,mida_x_bola,mida_y_bola,posicio_x_bola,posicio_y_bola) {
	
		// alert("cridada la funció DRAW");
		
		var canvas = document.getElementById('canvas');
		var ctx = canvas.getContext('2d');
		
		// en primier lloc he de netejar el canvas
		canvas.width=canvas.width;
		canvas.style.backgroundColor = '#000000' ;
	
		// linia 1/2 camp
		ctx.fillStyle="#FFFFFF";
		ctx.fillRect(0,(amplada_pantalla_CSS/2)-1,alcada_pantalla_CSS,3);
	
		// Dibuixar PILOTA
		// ctx.fillStyle="#FFFFFF";
          	// ctx.fillRect(startx,starty,20,20);
		
		if (estat_joc == 0) 
		{
			ctx.beginPath();
			ctx.arc(posicio_x_bola, posicio_y_bola, mida_x_bola, 0, 2 * Math.PI, false);
			ctx.fillStyle = 'white';
			ctx.fill();
			ctx.lineWidth = 2;
			ctx.strokeStyle = 'yellow';
			ctx.stroke();
		}
	
		if (estat_joc == 1) 
		{
			ctx.beginPath();
			ctx.arc(startx, starty, mida_x_bola, 0, 2 * Math.PI, false);
			ctx.fillStyle = 'white';
			ctx.fill();
			ctx.lineWidth = 2;
			ctx.strokeStyle = 'yellow';
			ctx.stroke();
		}
	
	

		
		
		
}
