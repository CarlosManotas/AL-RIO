var s,stc = {

	config : {

		winW: $(window).width(),
		winH: $(window).height(),
		page: $('body').attr('id'),
		browser: null,
		tablet: isMobile.any,
		mobile: $(window).width() <= 700 ? true : false

	},

	init : function(){

		s    = stc.config;
		s.hc = stc.home.config;
		s.ic = stc.internal.config;
		s.bc = stc.building.config;
		stc.helpers.browserDetect();
		stc.helpers.replaceSvg();

		if(!s.mobile){
			if(s.page == 'home')
				stc.home.init();
			else
				stc.internal.init();
		} else
			stc.mobile.init();

		$(window).on('ready.main resize.main', function(){
			s.winW = $(window).width();
			s.winH = $(window).height();
			var siteType = (s.winW <= 700) ? true : false;
			if(siteType != s.mobile) location.reload();
		});

		$('#hamburger').click(function(){
			$(this).parents('.site-navigation').toggleClass('open');
		});

	},

	hidePreloader : function(){
		var preloadWait = setTimeout(function(){
			$('.preloader').fadeOut(400, function(){
				$(this).remove();
			});
		},900);
	},

	helpers : {

		browserDetect : function(){
			var ua = navigator.userAgent;
			if (/MSIE (\d+\.\d+);/.test(ua))
				s.browser = 'internet-explorer';
			else if (/Firefox[\/\s](\d+\.\d+)/.test(ua))
			    s.browser = 'firefox';
			else if (/Chrome[\/\s](\d+\.\d+)/.test(ua))
			    s.browser = 'chrome';
			else if (/Opera[\/\s](\d+\.\d+)/.test(ua))
			    s.browser = 'opera';
			else if (ua.toLowerCase().indexOf('safari') > 0)
			    s.browser = 'safari';
		},

		ieVersionDetect : function(v){
		    var r = RegExp('msie' + (!isNaN(v) ? ('\\s' + v) : ''), 'i');
			return r.test(navigator.userAgent);
		},

		map : function(a1,b1,a2,b2,value){
			return (value-a1)/(b1-a1) * (b2 - a2) + a2;
		},

		replaceSvg : function(){

			if(stc.helpers.ieVersionDetect(8) || stc.helpers.ieVersionDetect(7)) {
			    $('img[src*="svg"]').attr('src', function() {
			        return $(this).attr('src').replace('.svg', '.png');
			    });
			}

		}

	},

	home : {

		config : {
			vidAR: 1280/720,
			lastHover: 1
		},

		init : function(){

			stc.home.onResize();
			if(!s.tablet && !stc.helpers.ieVersionDetect(8) && !stc.helpers.ieVersionDetect(9) && !stc.helpers.ieVersionDetect(10)){
				stc.home.addVideos();
			} else {
				if(stc.helpers.ieVersionDetect(8) || stc.helpers.ieVersionDetect(7)){
					stc.mobile.home.loadBG();
					$('.mobile-bg').append('<img src="content/building/hero.jpg">').addClass('ie8');
				} else {
					stc.mobile.home.loadBG();
				}
			}
			stc.home.diagonals();
			
		},

		addVideos : function(){

			$('.wrapper').each(function(){
				$($('#home-videos').html()).appendTo(this);
			}).promise().done(function(){
				$('#home-videos').remove();
				stc.home.adjSize();
				stc.home.colHover();
				stc.home.preloader();
			});

		},

		preloader : function(){

			$('video.visible').bind('progress', function() {
				var percentage = $('video.visible').get(0).buffered.end(0) / $('video.visible').get(0).duration;
				if(percentage > 0.5){
					$('video.visible').get(0).play();
					stc.hidePreloader();
				}
			});
			var preloadCatch = setTimeout(function(){
				stc.hidePreloader();
			},4000);
			

		},

		bgImage : function(){

		},

		onResize : function(){

			$(window).on('resize.home', function(){
				stc.home.diagonals();
				stc.home.adjSize();
			});

		},

		diagonals : function(){

			var colW  = s.winW/4
			  , angle = Math.atan2(colW, s.winH);
	  		$('.tri').css({
	  			'-webkit-transform': 'skew(-' + angle + 'rad)',
	  			'-moz-transform': 'skew(-' + angle + 'rad)',
	  			'-o-transform': 'skew(-' + angle + 'rad)',
	  			'transform': 'skew(-' + angle + 'rad)'
	  		}).show();

		},

		colHover : function(){

			$('.col').hover(function(){
				var index = $(this).index()+1
				  , video = $('.videos').find('video').filter(':nth-child('+index+')');
				$('.videos').find('video').each(function(){
					$(this).get(0).pause();
				});
				$('.videos').find('video').removeClass('visible');
				video.addClass('visible').get(0).play();
				if(s.hc.lastHover!=index) video.get(0).currentTime = 0;
				s.hc.lastHover = index;
			}, function(){

			});

		},

		adjSize : function(){
			var winAR = s.winW/s.winH
			  , adjRatio = s.hc.vidAR / winAR;

			if(winAR < s.hc.vidAR)
				$('.videos video').css({'width' : s.winW*adjRatio+'px'}); 
			else
				$('.videos video').css({'width' : s.winW+'px'});

		}

	},

	internal : {

		config : {

			scrollTop: 0

		},

		init : function(){
			stc.internal.preload();
			if(!s.tablet && s.page != 'leasing'){
				$('html').removeClass('no-overflow');
				console.log('ok');
				stc.internal.onScroll();
				stc.internal.onMousewheel();
				stc.internal.jumpScroll();
				$(window).one('load', function() {
	    			$(window).trigger('scroll.internal');
				});
			}
			if(s.page == 'building') stc.building.init();
			if(s.page == 'leasing') $('.content').addClass('fadefade');
			if(stc.helpers.ieVersionDetect(8) || stc.helpers.ieVersionDetect(7)){
				$('.stamp').addClass('ie8').find('img').wrap('<div class="stamp-img-wrap" />');
			}
		},

		preload: function(){

			var img = new Image();
				img.src = $('.stamp').find('img').attr('src');
			$(img).one('load',function() {
				$('.stamp').addClass('thereheis');
			});
			if(img.complete)
				$(img).load();

		},

		jumpScroll : function(){
			$('.jump-down').on('click', function(){
				$('html:not(:animated),body:not(:animated)').animate({ scrollTop: s.winH-80}, 1200);
			});
			$('.jump-up').on('click', function(){
				$('html:not(:animated),body:not(:animated)').animate({ scrollTop: 0}, 1200);
			});
		},

		onScroll : function(){
			$(window).off('scroll.internal').on('scroll.internal', function(e){
				s.ic.scrollTop = $(this).scrollTop();

				var opacity = stc.helpers.map(0,160,1,0,s.ic.scrollTop)
				  , width   = stc.helpers.map(0,s.winH,0,320,s.ic.scrollTop)
				  , margin  = stc.helpers.map(0,s.winH,0,60,s.ic.scrollTop)
				  , navPos  = $('.site-navigation').offset().top-s.ic.scrollTop;
				
				/* Add black class to STC text */
				if(s.ic.scrollTop > (s.winH)-120) 
					$('h2.above').addClass('black');
				else 
					$('h2.above').removeClass('black');

				/* when nav hits top, fix it */
				if(navPos <= 0) $('.site-navigation').addClass('fixed');

				/* map that stuff */
				if(s.ic.scrollTop < (s.winH)-80){
					$('.site-navigation').removeClass('fixed');
					$('.cell').css('opacity',opacity);
					$('.spacer').css('width',width+'px');
					$('.site-navigation a:first-child').css('margin-left','-'+margin+'px');
				}
				if(s.ic.scrollTop >= (s.winH)-80){
					$('.cell').css('opacity',0);
					var currSpacer = $('.spacer').css('width').replace(/[^-\d\.]/g, '')
					  , currMargin = $('.site-navigation a:first-child').css('margin-left').replace(/[^-\d\.]/g, '');
					currSpacer = (currSpacer > 10) ? currSpacer : 292
					currMargin = (currMargin > 10) ? currMargin : -55;
					$('.spacer').css('width',currSpacer+'px');
					$('.site-navigation a:first-child').css('margin-left',currMargin+'px');
				}
			});
		},

		onMousewheel : function(){
			
			$(window).off('mousewheel.internal DOMMouseScroll.internal').on('mousewheel.internal DOMMouseScroll.internal', function(e){
				var event = (s.browser != 'firefox') ? e.originalEvent.wheelDelta : -1*e.originalEvent.detail;
				
				if(event <= 0){
					if(s.ic.scrollTop < (s.winH)-80) e.preventDefault();
					if(s.ic.scrollTop < 10){ 
						e.preventDefault();
						$('html:not(:animated),body:not(:animated)').animate({ scrollTop: s.winH-80}, 1200);
					}
				} else {
					if(s.ic.scrollTop < (s.winH)-81) e.preventDefault();
					if(s.ic.scrollTop < (s.winH)-81)
						$('html:not(:animated),body:not(:animated)').animate({ scrollTop: 0}, 1200);
				}
				
			});

		}

	},

	building : {

		config : {

			slider: null

		},

		init : function(){

			//stc.building.hasHash();
			stc.building.onReadyResize();
			stc.building.maps();
			stc.building.clickToZoom();
			stc.building.mapOpen();
			stc.building.slideshow();

		},

		// hasHash : function(){
		// 	if(window.location.hash=='#video') {
		// 		// $($('#building-video').html()).insertAfter('.building');
		// 		$('.video-modal').show();
		// 		$('html').addClass('no-overflow-force');
		// 		$('.modal-close').click(function(){
		// 			$('.video-modal').fadeOut(500, function(){
		// 				$(this).remove();
		// 				$('html').removeClass('no-overflow-force');
		// 				window.location.hash='';
		// 				history.pushState('', document.title, window.location.pathname);
		// 			});
		// 		});
		// 	} else {
		// 		$('.video-modal').remove();
		// 	}
		// },

		onReadyResize : function(){
			$(window).on('ready.building resize.building', function(){
				$('.slideshow, .slideshow ul').css('height','100%');
			});
		},

		slideshow : function(){
			s.bc.slider = $('.slideshow').unslider({
				delay: false,
				fluid: true
			});
			stc.building.slideshowCaptions();
			stc.building.slideshowOpen();
			stc.building.slideshowNav();
			stc.building.modalClose();
		},

		slideshowCaptions : function(){
			$.each($('.super'), function(i){
				var caption = $(this).siblings('.caption').clone();
				$('.slideshow ul').find('li').filter(':nth-child('+(i+1)+')').find('.t-c').append(caption);
			});
		},

		slideshowOpen : function(){
			$('.super').click(function(){
				$('.slideshow').fadeIn();
				var index = $(this).data('index')-1;
				s.bc.slider.data('unslider').move(index, function() {});
				$('html').addClass('no-overflow');
			});
		},

		modalClose : function(){
			$('.close').click(function(){
				$('.slideshow').fadeOut();
				$('.map').fadeOut();
				$('html').removeClass('no-overflow');
			});
			$(document).keyup(function(e) {
				if(e.keyCode == 27) { 
					$('.slideshow').fadeOut();
					$('.map').fadeOut();
					$('html').removeClass('no-overflow');
				}
			});
		},

		slideshowNav : function(){
			$('.slideshow img').click(function(){
				s.bc.slider.data('unslider').next();
			});
			$('.arrow').click(function() {
        		var fn = this.className.split(' ')[1];
        		s.bc.slider.data('unslider')[fn]();
    		});
		},

		maps : function(){
        	$('.viewport').panzoom({
        		contain: 'invert',
        		startTransform: 'scale(1)',
        		increment: 1,
  				minScale: 1,
  				maxScale: 2,
        		$zoomIn: $('.zoom-in'),
  				$zoomOut: $('.zoom-out')
        	});
		},

		clickToZoom : function(){

			$('.viewport img').dblclick(function(){
				var $thisViewport = $(this).parent('.viewport');
        		var zoomLevel = $thisViewport.panzoom("getMatrix")[0][0];
        		$thisViewport.panzoom("zoom", (zoomLevel==1?false:true));
        	});

		},

		mapOpen : function(){
			$('.panner').click(function(){
				if($(this).is('.panner-a')){
					$('.map-a').fadeIn();
					$('.map-a .viewport').panzoom("resetDimensions");
				} else if($(this).is('.panner-b')){
					 $('.map-b').fadeIn();
					 $('.map-b .viewport').panzoom("resetDimensions");
				}
				$('.viewport').panzoom("zoom", 1, { silent: true });
				$('html').addClass('no-overflow');
			});
		}

	},

	mobile : {

		init : function(){

			if(s.page == 'home')
				stc.mobile.home.init();
			else
				stc.mobile.internal.init();

			$('body').addClass('mobile');

		},

		home : {

			init : function(){
				$('.cols, .videos').remove();
				stc.mobile.home.loadBG();
			},

			loadBG : function(){
				var img = new Image();
					img.src = 'content/building/hero.jpg';
				$(img).one('load',function() {
					stc.hidePreloader();
				});
				if(img.complete)
					$(img).load();
				$('.col').addClass('transparent');
			}

		},

		internal : {

			init : function(){

				$('html').removeClass('no-overflow');
				stc.internal.preload();

				$('.panner').click(function(){
					var pdf = $(this).siblings('.caption').find('a').attr('href');
					window.open(pdf);
				});

				// $('#the-map').attr('src','content/neighborhood/map-mobile.jpg');

				if(s.page == 'leasing') $('.content').addClass('fadefade');

			}

		}

	}

};

$(function(){
	stc.init();
});