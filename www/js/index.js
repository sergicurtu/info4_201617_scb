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
		
     window.marcador_E = 0 ;
     window.marcador_D = 0 ;	
	
	
     // REDIMENSIONEM EL CANVAS
     var canvas = document.getElementById('canvas');
     var ctx = canvas.getContext('2d');
     ctx.canvas.width  = window.innerWidth  ;
     ctx.canvas.height = window.innerHeight  ;
		
	
	// centre pantalla ?
	var centre_x = amplada_pantalla_CSS / 2 ;
	var centre_y = alcada_pantalla_CSS / 2 ;  // var centre_y = window.innerHeight / 2 ; //
	window.centre_x = centre_x ;
	window.centre_y = centre_y ;
	
	
	ctx.font="30px Verdana";
	
	// Create gradient
	var gradient=ctx.createLinearGradient(0,0,canvas.width,0);
	gradient.addColorStop("0","magenta");
	gradient.addColorStop("0.5","blue");
	gradient.addColorStop("1.0","red");
	
	// Fill with gradient
	ctx.fillStyle=gradient;
	
	 // http://stackoverflow.com/questions/3167928/drawing-rotated-text-on-a-html5-canvas //
	 // http://www.w3resource.com/html5-canvas/html5-canvas-translation-rotation-scaling.php // 
	 ctx.save();
	 ctx.translate(centre_x,centre_y); // el centre de gir és la meitat de la pantalla
	 ctx.rotate(Math.PI/2);  //  Math.PI == 180º => -(3/2) * 180 = -270  - que seria el mateix que +90 -> 180 / 2 ) 
	 ctx.textAlign = "center";
	 ctx.fillText("Gira la pantalla ...", 100, 90);
	 ctx.fillText("i toca per començar", 100, 130);
	 ctx.restore();
	
	// ctx.fillText("Toca la pantalla per començar",10,90);
	
	
	// Quina posició INICIAL de la bola ? Temin present que la bola ocupa un espai 	// quina mida la bola ?
	var mida_x_bola = amplada_pantalla_CSS * ( 2/100 ) ; 
	var mida_y_bola = mida_x_bola ;  // 36 ;
	window.mida_x_bola = mida_x_bola ;
	window.mida_y_bola = mida_y_bola ;
	window.radi_bola =  window.mida_x_bola / 2 ;
	
	
	// x,y => y,x ja que està girada la pantalla // 
	window.pos_x_bola = ( alcada_pantalla_CSS / 2 )  - ( mida_x_bola / 2 ) ;
	window.pos_y_bola = ( amplada_pantalla_CSS / 2 ) - ( mida_y_bola / 2 ) ; ;
	
	// DEFINIM LES PALES i LES SEVES POSICIONS INICALS
	// posicio_x_pala_E,posicio_y_pala_E,mida_x_pala_E,mida_y_pala_E
	// posicio_x_pala_D,posicio_y_pala_D,mida_x_pala_D,mida_y_pala_D
	
	// vermell
	window.color_pala_E = '#FA5858' ;
	window.posicio_x_pala_E = 200  ;
	window.posicio_y_pala_E = 10  ;
	window.mida_x_pala_E =  100 ;
	window.mida_y_pala_E =  20 ;
	
	// verd
	window.color_pala_D = '#ACFA58' ;
	window.posicio_x_pala_D = 220  ;
	window.posicio_y_pala_D = 610  ;
	window.mida_x_pala_D =  100 ;
	window.mida_y_pala_D =  20 ;
	
	
	
	
	var estat_joc = 0 ;
	window.estat_joc = 0 ;
				  
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
		
		// les assignem a variables de sistema // 
		window.clic_x = startx ;
		window.clic_y = starty ;
		
		e.preventDefault() ;
		//alert("Touch_x : " + startx + " --- Touch_y : " + starty);
		
		/*
		   el estat del joc ens indica com hem de dibuixar les coses
		   estat = 0 vol dir que acabem de carregar . El primer clic fa desapateixer la pantalla amb el text
		   estat = 1 vol dir que la bola s'hauria de moure sola
		   setInterval comença a executar la funció cridada cada 10 milisegons
		*/   
		if ( estat_joc == 0 ) { 
		
			// dibuixem la bola per primera vegada //
			draw() ;
			
			// ara entrem a la fase del joc 0 --> 1 //
			estat_joc = 1 ; 
			window.estat_joc = 1 ;
			
			// ara cridem la funció draw (un loop) cada 10 milisegons 
			setInterval( draw , 10 );
							
		
		}
		
		
	});	
	
	document.addEventListener('touchmove', function(e) {
	      	
		var touchobj = e.changedTouches[0] ; // referència al primer punt tocat (pex: el primner dit)
		var startx = parseInt(touchobj.clientX) ; // quina és la posició x en referència al costat esquerra de la pantalla
		var starty = parseInt(touchobj.clientY) ;
		
		e.preventDefault() ;
		//alert("Touch_x : " + startx + " --- Touch_y : " + starty);
		
	 });
	
	
});	

function dibuixar_pala_esquerra(ctx,posicio_x_pala_E,posicio_y_pala_E,mida_x_pala_E,mida_y_pala_E){
	
	ctx.beginPath();
	   ctx.fillStyle = window.color_pala_E ; // vermella per testejar
	   ctx.fillRect(posicio_x_pala_E,posicio_y_pala_E,mida_x_pala_E,mida_y_pala_E);
	ctx.closePath();
	
}

function dibuixar_pala_dreta(ctx,posicio_x_pala_D,posicio_y_pala_D,mida_x_pala_D,mida_y_pala_D){
	
	ctx.beginPath();
	   ctx.fillStyle = window.color_pala_D ; // verda per testejar
	   ctx.fillRect(posicio_x_pala_D,posicio_y_pala_D,mida_x_pala_D,mida_y_pala_D);
	ctx.closePath();
	
}

function dibuixar_bola(ctx,posicio_x_bola, posicio_y_bola, mida_x_bola) {
	
	ctx.beginPath();
	   ctx.arc(posicio_x_bola, posicio_y_bola, mida_x_bola, 0, 2 * Math.PI, false);
	   ctx.fillStyle = 'white';
	   ctx.fill();
	   ctx.lineWidth = 2;
	   ctx.strokeStyle = 'yellow';
	   ctx.stroke();
	ctx.closePath();
			
	
	
}

function marcador(ctx) {
	
	 ctx.font="60px Verdana";
	 ctx.fillStyle='#FF0000'; // color 
	 ctx.save();
		 ctx.translate(window.centre_x,window.centre_y); // el centre de gir és la meitat de la pantalla
		 ctx.rotate(Math.PI/2);  //  Math.PI == 180º => -(3/2) * 180 = -270  - que seria el mateix que +90 -> 180 / 2 ) 
		 ctx.textAlign = "center";
		
		 var marcador_E = window.marcador_E.toString() ;
		 var marcador_D = window.marcador_D.toString() ;
	
		 ctx.fillText(marcador_E, 100, -10);
		 ctx.fillText(marcador_D, 200, -10);
		 //ctx.fillText("UN TEXT LLARG PER PANTALLA2", 100, 10);
		 
		 
	
	 ctx.restore();
			
	
	
}


function sleep(miliseconds) {
   var currentTime = new Date().getTime();

   while (currentTime + miliseconds >= new Date().getTime()) {
   }
}

function numeroAleatorio(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}



function draw() {
	
		// alert("cridada la funció DRAW");
		
		var canvas = document.getElementById('canvas');
		var ctx = canvas.getContext('2d');
		
		var estat_joc = window.estat_joc ;
		var mida_x_bola = window.mida_x_bola ;
		var mida_y_bola = window.mida_y_bola ;
		
		var posicio_x_bola = window.pos_x_bola ;
		var posicio_y_bola = window.pos_y_bola ;
	
	
		if (estat_joc == 0) 
		{
			// aquesta és la primera vegada que redibuixem la pantalla
			ctx.canvas.width  = window.innerWidth  ;
     			ctx.canvas.height = window.innerHeight  ;
			var alcada_pantalla_CSS = window.innerWidth ;
     			var amplada_pantalla_CSS = (window.innerHeight)+10 ;
			canvas.width=canvas.width;
			$('#canvas').css('background-color', 'rgba(0,0,0,0.2)');
			ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
			
			// linia 1/2 camp
			ctx.fillStyle="#FFFFFF";
			ctx.fillRect(0,(amplada_pantalla_CSS/2)-1,alcada_pantalla_CSS,3);
	
			dibuixar_bola(ctx,posicio_x_bola, posicio_y_bola, mida_x_bola);
			
			// definim els primers desplaçaments ( aleatoris ? ) -> numeroAleatorio(1,2)
			window.dx = numeroAleatorio(1,2) ;
			window.dy = -2 ;
			
			marcador(ctx);
			
			// canvas_fons  //
			var fons = document.getElementById('canvas_fons');
			var ctx_fons = fons.getContext('2d');

				var imageObj = new Image();
				imageObj.onload = function() {
					ctx_fons.drawImage(imageObj,-200, -200, 360, 640);
				};
				imageObj.src = 'img/pong_fons.png';
			
			
		}
	
		if (estat_joc == 1) 
		{
			ctx.canvas.width  = window.innerWidth  ;
     		        ctx.canvas.height = window.innerHeight  ;
			var alcada_pantalla_CSS = window.innerWidth ;
     		        var amplada_pantalla_CSS = (window.innerHeight)+10 ;
			canvas.width=canvas.width;
			$('#canvas').css('background-color', 'rgba(255,255,255,0.2)');
			ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
			
			// linia 1/2 camp
			ctx.fillStyle="#FFFFFF";
			ctx.fillRect(0,(amplada_pantalla_CSS/2)-1,alcada_pantalla_CSS,3);
			
			/*	TEST : LA PANTALLA MEDEIX 360 ALTURA (X) i 640 AMPLADA (Y) AMB EL (0,0) ABAIX A L'ESQUERRA
				ctx.fillRect(20, 20, 10, 10); 	// inferior esquerra
				ctx.fillRect(20, 600, 20, 20); 	// inferior dreta
				ctx.fillRect(340, 20, 30, 30); 	// superior esquerra
				ctx.fillRect(340, 600, 40, 40); // superior dreta
			*/
					
			dibuixar_bola(ctx,posicio_x_bola, posicio_y_bola, mida_x_bola);
			
			// on dibuixarem les pales ?
			dibuixar_pala_esquerra(ctx,window.posicio_x_pala_E,window.posicio_y_pala_E,window.mida_x_pala_E,window.mida_y_pala_E);
			dibuixar_pala_dreta(ctx,window.posicio_x_pala_D,window.posicio_y_pala_D,window.mida_x_pala_D,window.mida_y_pala_D);
			
			window.pos_x_bola = window.pos_x_bola + window.dx ;
			window.pos_y_bola = window.pos_y_bola + window.dy ;
			
			// LA SEGÜENT POSICIÓ DE LA BOLA TOCARÀ UNA VORA ???  ->  CAL GIRAR //
			// LA SEGÜENT POSICIÓ DE LA BOLA TOCARÀ UNA RAQUETA ???  ->  CAL GIRAR //
			// LA SEGÜENT POSICIÓ DE LA BOLA TOCARÀ EL FONS ???  ->  CAL ANOTAR UN PUNT !!!! //
			
			// x augmenta cap adalt i elseu valor màxim és 360px
			if ( window.pos_x_bola > 350 ) { 
			
					// alert("toca superior") ; alert("x:" + window.pos_x_bola+ " -- y:"+window.pos_y_bola) ;
					window.dx = -1 ;
					window.pos_x_bola = window.pos_x_bola + window.dx ;
					
					var audio = new Audio('audio/wall.mp3')
        				audio.play()

			}
			if ( window.pos_x_bola < 10 ) { 
			
					//alert("toca inferior") ; alert("x:" + window.pos_x_bola+ " -- y:"+window.pos_y_bola) ; 
					window.dx = 1 ;
					window.pos_x_bola = window.pos_x_bola + window.dx ;
				
					var audio = new Audio('audio/wall.mp3')
        				audio.play()
			
			}
			
			// y augmenta cap a la dreta i el seu valor màxim és 640px
			// if ( window.pos_y_bola > 630 ) { 
			if ( window.pos_y_bola > ( window.posicio_y_pala_D - window.radi_bola  )  ) { 
			
					
					// si posició x de la bola coincideix amb la barra ha de rebotar
					// cas contrari avança fins GOL
					// alert("toca esquerra") ; alert("x:" + window.pos_x_bola+ " -- y:"+window.pos_y_bola) ; }
					
					if ( 	 
							 (   window.pos_x_bola < window.radi_bola + window.posicio_x_pala_D +  window.mida_x_pala_D )
								 &&
							 (   window.pos_x_bola > window.posicio_x_pala_D - window.radi_bola  ) 
						)
					{	
						window.dy = -2 ;
						window.pos_y_bola = window.pos_y_bola + window.dy ;
						
						var audio = new Audio('audio/pala.mp3')
        					audio.play()
					}
					else if ( window.pos_y_bola > ( window.posicio_y_pala_D + window.mida_y_pala_D ) - window.radi_bola )  
					{ 
					
						// text punt
						window.marcador_E = window.marcador_E + 1 ;
						
						// actualitzar marcador
						marcador(ctx) ;
						
						// audio punt
						var audio = new Audio('audio/punt.mp3')
        					audio.play()
						
						// pausa 
						sleep(1000);
						
						// nova posició
						window.pos_x_bola = ( alcada_pantalla_CSS / 2 )  - ( mida_x_bola / 2 ) ;
						window.pos_y_bola = ( amplada_pantalla_CSS / 2 ) - ( mida_y_bola / 2 ) ; 
						window.dx = numeroAleatorio(1,2) ;
					
					}
					
			}
			//if ( window.pos_y_bola < 10 ) { 
			if ( window.pos_y_bola < ( window.radi_bola + window.posicio_y_pala_E + window.mida_y_pala_E )  ) { 
					
					// si posició x de la bola coincideix amb la barra ha de rebotar
					// cas contrari avança fins GOL
					// alert("toca esquerra") ; alert("x:" + window.pos_x_bola+ " -- y:"+window.pos_y_bola) ; }
					
					if ( 	 
							 (   window.pos_x_bola < window.radi_bola + window.posicio_x_pala_E +  window.mida_x_pala_E )
								 &&
  							 (   window.pos_x_bola > window.posicio_x_pala_E - window.radi_bola  ) 
						)
					{	
						window.dy = 2 ;
						window.pos_y_bola = window.pos_y_bola + window.dy ;
						
						var audio = new Audio('audio/pala.mp3')
        					audio.play()
					}
					else if ( window.pos_y_bola < window.radi_bola )  
					{ 
					
						// text punt
						window.marcador_D = window.marcador_D + 1 ;
						
						// actualitzar marcador
						marcador(ctx) ;
						
						// audio punt
						var audio = new Audio('audio/punt.mp3')
        					audio.play()
						
						// pausa 
						sleep(1000);
						
						// nova posició
						window.pos_x_bola = ( alcada_pantalla_CSS / 2 )  - ( mida_x_bola / 2 ) ;
						window.pos_y_bola = ( amplada_pantalla_CSS / 2 ) - ( mida_y_bola / 2 ) ; 
						window.dx = numeroAleatorio(1,2) ;
						
					}
		
			}
			
			marcador(ctx) ;
			
			
		}

		
}
