$(document).on('deviceready', function() {

     // determinem amplada alçada DISPOSITIU ------------------
     var amplada_pantalla = screen.width ;		// 720px  --> SG_Note2
     var alcada_pantalla = screen.height ; 		// 1280px
     var amplada_pantalla_CSS = window.innerWidth ; 	// 360px
     var alcada_pantalla_CSS = window.innerHeight ;	// 616px 
     /////////////////////////////////////////////////////////
     
     
	document.addEventListener("offline", function() { 
		alert("ara NO HI HA internet");
	}, false);
 
	$(window).resize(function() {
		alert("has girat el dispositiu");
	}, false); 
	
	document.addEventListener('touchstart', function(e) {
		// alert("Clicat") ;
	});	
	
	document.addEventListener('touchmove', function(e) {
		// alert("has arrastrat el dit");
	 });
	  
	  
	$('#connectButton').click(function() {
		app.connect()
	})

	$('#disconnectButton').click(function() {
		app.disconnect()
	})

	$('#led').click(function(){
		app.ledOn()
	})	  
      
});

var app = {}

app.PORT = 1337
app.socketId

app.connect = function() {

	var IPAddress = $('#IPAddress').val()

	console.log('Estem intentant la connexió a ' + IPAddress + ' en el port ' + app.PORT )

	$('#startView').hide()
	$('#connectingStatus').text('Connectant a ' + IPAddress)
	$('#connectingView').show()

	chrome.sockets.tcp.create(function(createInfo) {

		app.socketId = createInfo.socketId

		chrome.sockets.tcp.connect(
			app.socketId,
			IPAddress,
			app.PORT,
			connectedCallback)
	})

	function connectedCallback(result) {
	
		if (result === 0) {

			 console.log('Connectat a ' + IPAddress)
			 var info = "Connectat a " + IPAddress + " al sockedID : " + app.socketId 
			 //navigator.notification.alert(info, function() {})
			 			
			 $('#connectingView').hide()
			 $('#controlView').show()
			
		}
		else {

			var errorMessage = 'Ha fallat la connexió a ' + app.IPAdress + ' en el port ' + app.PORT
			console.log(errorMessage)
			//navigator.notification.alert(errorMessage, function() {})
			$('#connectingView').hide()
			$('#startView').show()
		}
	}
}

app.sendString = function(sendString) {

	console.log('Intentant enviar :' + sendString)	

	chrome.sockets.tcp.send (
		app.socketId,
		app.stringToBuffer(sendString),
		function(sendInfo) {

			if (sendInfo.resultCode < 0) {

				var errorMessage = 'Ha fallat l´enviament de dades'

				console.log(errorMessage)
				//navigator.notification.alert(errorMessage, function() {})
			}
			else
			{
				var info = 'Enviat el valor : ' + sendInfo + ' i obtingut el resultat : ' + sendInfo.resultCode 
				//navigator.notification.alert(info, function() {})
			}
		}
			
	)
}

app.ledOn = function() {

	app.sendString('H')

	$('#led').removeClass('ledOff').addClass('ledOn')

	$('#led').unbind('click').click(function(){
		app.ledOff()
	})	
	
	app.disconnect()
	$('#connectingView').hide()
	$('#startView').show()
	
}

app.ledOff = function() {

	app.sendString('L')

	$('#led').removeClass('ledOn').addClass('ledOff')

	$('#led').unbind('click').click(function(){
		app.ledOn()
	})
	
	app.disconnect()
	$('#connectingView').hide()
	$('#startView').show()
}

app.disconnect = function() {

	chrome.sockets.tcp.close(app.socketId, function() {
		console.log('Finalitzat el tancament del Socket TCP.')
		//navigator.notification.alert('Finalitzat el tancament del Socket TCP.', function() {})
	})

	$('#controlView').hide()
	$('#startView').show()
}

// Helper functions. 

app.stringToBuffer = function(string) {

	var buffer = new ArrayBuffer(string.length)
	var bufferView = new Uint8Array(buffer)
	
	for (var i = 0; i < string.length; ++i) {

		bufferView[i] = string.charCodeAt(i)
	}

	return buffer
}

app.bufferToString = function(buffer) {

	return String.fromCharCode.apply(null, new Uint8Array(buffer))
}


