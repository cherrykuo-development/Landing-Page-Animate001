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

	// 桌機、手機判斷
	function pc_mb_change_page() {
		var ua = navigator.userAgent.toLowerCase();
		return (
			ua.indexOf("ipad")          !== -1 ||
			ua.indexOf("ipod")          !== -1 ||
			ua.indexOf("iphone")        !== -1 ||
			ua.indexOf("android")       !== -1 ||
			ua.indexOf("webos")         !== -1 ||
			ua.indexOf("blackberry")    !== -1 ||
			ua.indexOf("windows phone") !== -1) ? true : false;
	}

	// 抓取螢幕高
	function resizeHeight() {
		winH = $(window).height();
	}
	var winH;


	// PC / MB 頁面跳轉
	var _redirect;
	if ( pc_mb_change_page() ){
		window.location.href = './sp/' + window.location.search;
		_redirect = true;
	}
	if ( _redirect ) return;

	// 即時更新螢幕高
	resizeHeight();
	$(window).on('load resize', function() {
		resizeHeight();
	});

	// 起始動畫
	$(window).on('load', function() {
		queueAnimate($('#pageSection01'));
		queueAnimate($('.repeatStar'));

		queueAnimate($('.repeat_TIKI_VN_Animate'));
		setInterval(function() {
			$('.repeat_TIKI_VN_Animate').find('.active').removeClass('active');
			queueAnimate($('.repeat_TIKI_VN_Animate'));
		}, 4500);
	});

	// 捲軸事件, 捲到指定位置時，跑動畫
	$(window).scroll(function() {
		var scroll 		= $(window).scrollTop();
		$('.animateGroup').each(function() {
			var $this 	= $(this);
			var tmpTop 	= $this.offset().top-winH*0.65;
			if ( scroll>tmpTop ){
				$this.removeClass('animateGroup');
				queueAnimate($this);
			}
		});
	});

	// 聯絡我們 button
	// $(".fancyboxBtn").fancybox({
	// width 		: 900,
	// height  	: 490,
	// fitToView 	: false,
	// closeClick  : false,
	// openEffect  : 'none',
	// closeEffect : 'none',
	// type 		: 'iframe',
	// iframe 		: {
	// 	scrolling : 'auto'
	// }
	// });
});