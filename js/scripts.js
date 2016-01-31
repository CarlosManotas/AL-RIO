$(function(){

	var $cajaVideo 		= $("#real");
	var $cajaPadre 		= $('#btnMenu');
	var $menu 			= $('#menuBurguer');
	var $menuhijo1 		= $('#palo1');
	var $menuhijo2 		= $('#palo2');
	var $menuhijo3 		= $('#palo3');
	var id;
	var total = AleatorioVideos(1,4);

	switch(total){
		case 1:
			id = 'tN5lnZIUmAU';
			$('img[alt="AlRio"]').removeAttr('src');
			$('img[alt="AlRio"]').attr('src', 'img/logo.svg');
			console.log(id);
			break;
		case 2:
			id = '2fe8ITYVR6U';
			$('img[alt="AlRio"]').removeAttr('src');
			$('img[alt="AlRio"]').attr('src', 'img/logo.svg');
			console.log(id);
			break;
		case 3:
			id = '4ZIWGHe7ap4';
			console.log(id);
			break;
		default:
			console.log(id);
	}
	function AleatorioVideos(min,max){
		return Math.floor(Math.random()*(max - min)) + min;
	}
	
	var videoTemplate = '<iframe width="1280" height="720" src="https://www.youtube.com/embed/:numeroVideo:?rel=0&amp;controls=0&amp;showinfo=0&amp;autoplay=1&amp;loop=1&amp;modestbranding=0&amp;playlist=:numeroVideo:" frameborder="0" allowfullscreen></iframe>';

  	var VideoResultado = videoTemplate
  						.replace(/:numeroVideo:/g,id);


	$cajaVideo.append($(VideoResultado));

	$menu.on('click', function(){
		var pantalla = $(window).width();
		if ($menuhijo3.attr('class') === 'palo3'){
			$menuhijo3.attr('class','palo33');
			$menuhijo2.attr('class','palo22');
			$menuhijo1.attr('class','palo11');
			
			if(pantalla < 797){
				$('.navegador ul').css('right','-100vw');
			}else{
				$('.navegador ul').css('margin-top','-100vh');
			}
			
		}else{
			$menuhijo3.attr("class", 'palo3');
			$menuhijo2.attr("class", 'palo2');
			$menuhijo1.attr("class", 'palo1');
			if(pantalla < 797){
				$('.navegador ul').css('right','0');
			}else{
				$('.navegador ul').css('right','0');
				$('.navegador ul').css('margin-top','0.8em');
			}
			
		}
		
	})

	
	
});

