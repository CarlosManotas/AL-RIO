$(function(){

	/*
		variables
	*/
	var $abrirModal      = $("#masterplanBtn .circle-masterplan");
	var $btnModal 		 = $("#cm-modal button");
	var $headerCm   	 = $('#cm-header');
	var $topHeader  	 = $headerCm.offset().top;
	var $masterplan  	 = $("#masterplan").offset().top;
	var $circleMaster    = $(".circle.circle-masterplan");
	var $btnScroll  	 = $('#circle');
	var $videoPlay       = $(".tapa");
	var $pantalla    	 = $(window).width();
	var $alto            = $(window).height();
	var $titulo     	 = $("#titulo");
	var $ctrlVideo  	 = $("#ctrl-video span");
	var $videoContenedor = $(".m-video").css("height");
	var $urlVideo3 		 = "https://www.youtube.com/embed/-shCDK2nPxU?rel=0&controls=0&showinfo=0&modestbranding=0";
	var $urlVideo2 		 = "https://www.youtube.com/embed/jqglZXXeDCo?rel=0&controls=0&showinfo=0&modestbranding=0";
	var $urlVideo1 		 = "https://www.youtube.com/embed/DFgHj1txNSo?rel=0&controls=0&showinfo=0&modestbranding=0";
	var $imgBtn 		 = $('#acceso');
	var voyPorAqui;
	var cmBtn;

	/*
		variables
	*/

	
	function dameAttr (objeto) {
		return $(objeto).attr("data-play-video");
	}
	$abrirModal.on("click",function(){
		voyPorAqui = $(window).scrollTop();
		$(this).next().css("display","block");
		if($pantalla < 1024){
			$(document).find('body').css({
				overflow : 'hidden',
				height :'100vh'
			});
		}
			

	});

	$btnModal.on("click",function(){
		if($pantalla < 1024){
			$('body , html').animate({scrollTop:(voyPorAqui)},1);
			$(document).find('body').css({
				overflow : 'auto',
				height :'100%'
			});
		}
		$(this).parent().parent().parent().css("display","none");
			
	});
	$(window).on('scroll',function(){
		var $topi = $(window).scrollTop();
		if($topi > $topHeader){
			$headerCm.css({'position':'fixed'});
		}else{
			$headerCm.css({'position':'relative'});
		}
		if($topi >= ($masterplan - 300)){
			$circleMaster.css("visibility","visible");
		}
	});
	$btnScroll.on('click',function(){
		 $('body , html').animate({scrollTop:$topHeader},1000,'easeInOutExpo');
	});
	$videoPlay.on("click",function(){
		var youtube = $(this).siblings("iframe");
		var url = $(youtube).attr("src");
		var url2 = url + "&autoplay=1"
		$(youtube).attr("src" , url2);
		setTimeout(function(){
		  $videoPlay.css("display","none");
		}, 2000);
	});
	$ctrlVideo.on("click",function() {
		$(this).parent().parent().find("span").removeClass("active");
		$(this).addClass("active");
		var active = dameAttr(this);
		var $video = $("#video-iframe");
		switch(active){
			case "1":
				$videoPlay.css({
					"background-image": "url(../images/bgvideo3-elproyecto.jpg)",
					display: "block"
				});
				$video.removeAttr("src");
				$video.attr("src",$urlVideo1);
				console.log(active);
				break;
			case "2":
				$videoPlay.css({
					"background-image": "url(../images/bgvideo2-elproyecto.jpg)",
					display: "block"
				});
				$video.removeAttr("src");
				$video.attr("src",$urlVideo2);
				console.log(active);
				break;
			case "3":
				$videoPlay.css({
					"background-image": "url(../images/bg1-videoelproyecto.jpg)",
					display: "block"
				});
				
				$video.removeAttr("src");
				$video.attr("src",$urlVideo3);
				console.log(active);
				break;
			default:
				console.log($video);
		}

	})

	if($pantalla < 480){
		$titulo.css("font-size","3.5em");
	}
	if ($pantalla > 480 && $pantalla < 769){
		$titulo.css("font-size","4.8em");
	}


	$imgBtn.on('click', 'img', function() {
		$(document).find('.showText').css('display','none');
		cmBtn = $(document).find('.cmBtn');
		var t = $(this);
		var imgAttr = t.attr('alt');
		var showMeText = $(document).find('.showText[alt='+ imgAttr + ']');
		showMeText.css('display','block');
		console.log(imgAttr);
		console.log(showMeText);
		cmBtn.on('click', function() {
			$(this).parent().css('display','none');
		});
	});
	
});