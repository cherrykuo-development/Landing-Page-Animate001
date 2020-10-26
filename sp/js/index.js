$(function() {
	'use strict';

	// 動畫引擎
	var cCount = 1;
	function queueAnimate(tmp_this) {
		tmp_this.find('.animateItem').each(function() {
			var $this 	= $(this);
			var delay 	= $this.data('delay');
			setTimeout(function() {
				$this.addClass('active');

				if ( $this[0].id=='mainViewSubTitle' ){
					setTimeout(function() {
						$this.attr('src', './img/01/carousel0'+cCount++%3+'.png');
						setInterval(function() {
							$this.attr('src', './img/01/carousel0'+cCount++%3+'.png');
						}, 1600);
					}, 1600);
				}
			}, delay);
		});
	}


	// 抓取螢幕寬與高
	function mbAdjust() {
		winW = $(window).width();
		winH = $(window).height();
		$('#pageSection01').css({'height':(winH>winW)?winH:winW+'px'});
	}
	var winW;
	var winH;


	// 起始動畫
	if ( document.readyState=='complete' ){
		queueAnimate($('#pageSection01'));
		queueAnimate($('.repeatStar'));
	}
	else { 	// 防止 mobile 沒有讀到 load
		window.addEventListener('load', function() {
			queueAnimate($('#pageSection01'));
			queueAnimate($('.repeatStar'));
			// loadCount = false;
		}, false);
	}

	// 捲軸事件, 捲到指定位置時，跑動畫
	$(window).scroll(function() {
		var scroll = $(window).scrollTop();
		$('.animateGroup').each(function() {
			var $this  = $(this);
			var tmpTop = $this.offset().top-winH*0.65;
			if ( scroll>tmpTop ){
				$this.removeClass('animateGroup');
				queueAnimate($this);
			}
		});
	});

	// 即時更新螢幕高
	mbAdjust();
	$(window).on('load', function() {
		mbAdjust();
		pc_mb_change_page();

		queueAnimate($('.repeat_TIKI_VN_Animate'));
		setInterval(function() {
			$('.repeat_TIKI_VN_Animate').find('.active').removeClass('active');
			queueAnimate($('.repeat_TIKI_VN_Animate'));
		}, 4500);
	});

	$(window).on('orientationchange resize', function() {
		mbAdjust();
		pc_mb_change_page();
	});
});