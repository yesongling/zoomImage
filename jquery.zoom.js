/*
** Simple image zoom plugin
** Depend on : jQuery
** 		init with default : $(".yourImageBox").zoom({})
** 		init with options : $(".yourImageBox").zoom({boxWidth:200,boxHeight:200,shadowWidth:80,shadowHeight:80,magnification:2,shadowColor:'rgba(0,0,0,0.8)'});
*/
;(function($){
	$.fn.extend({
		zoom : (function(){
			function zoom(options){
				"use strict";
				var zoomImgBox,
					zoomImg,
					hoverBox,
					imgSrc;
				var boxW,   // zoomImgBox width  -- value type : number
					boxH,   //zoomImgBox height  -- value type : number
					shadowC,    //hoverBox background color  -- value type : string
					imgWidth,   //zoomImg width  -- value type : number
					imgHeight,  //zoomimg height  -- value type : number
					shadowW,    //hoverBox Width  -- value type : number
					shadowH,    //hoverBox height  -- value type : number
					magnification;    //zoomImg magnification  -- value type : number
				console.time("Initial zoom");
				this.options = options || {};
				boxW = this.options.boxWidth || 197;
				boxH = this.options.boxHeight || 197;
				shadowC = this.options.shadowColor || 'rgba(0,0,0,0.2)';
				shadowW = this.options.shadowWidth || 80;
				shadowH = this.options.shadowHeight || 80;
				magnification = this.options.magnification || 2;
				imgWidth = parseInt($(this).width())*magnification;
				imgHeight = parseInt($(this).height())*magnification;
				zoomImgBox = $('<div class="zoomImgBox" style="display:none;background-color:white;position: absolute;left:100%;top:0;z-index:100;border: 1px solid green;height: '+ boxH +'px;width: '+ boxW +'px;overflow:hidden;"></div>');   //create image box & img tag
				zoomImg = $('<img style="position:absolute;" src="" width="'+ imgWidth +'px" height="'+ imgHeight +'px"/>');
				hoverBox = $('<div class="zoomHover" style="display:none;height: '+ shadowH +'px;width: '+ shadowW +'px;background-color: '+ shadowC +';position: absolute;z-index: 2;"></div>');
				imgSrc = $(this).find('img').attr('src');
				$(this).find("img").wrap("<div class='imgWrap' style='width:100%;height:100%;overflow:hidden;'></div>");
				$(zoomImgBox).append(zoomImg);
				$(this).append(zoomImgBox);   //append image box
				$(this).css({'position':'relative'}).find(".imgWrap").append(hoverBox);
				$(this).find(".imgWrap").on('mouseenter',function(){
					$(".zoomHover").show();
					$(".zoomImgBox").show();
				}).on("mousemove",function(e){
					var e,
						x,  //position left of zoomHover
						y,  //position top of zoomHover
						posTop,  //offset top of imgWrap
						posLeft;  //offset left of imgWrap
					e = e || window.event;
					posTop = $(this).offset().left;
					posLeft = $(this).offset().top;
					x = e.pageX-parseFloat(posTop)-$(".zoomHover")[0].offsetWidth/2;
					y = e.pageY-parseFloat(posLeft)-$(".zoomHover")[0].offsetHeight/2;
					if(x<0){
						x = 0;
					}
					if(y<0){
						y = 0;
					}
					if(x>=this.offsetWidth-$(".zoomHover")[0].offsetWidth){
						x = this.offsetWidth-$(".zoomHover")[0].offsetWidth;
					}
					if(y>=this.offsetHeight-$(".zoomHover")[0].offsetHeight){
						y = this.offsetHeight-$(".zoomHover")[0].offsetHeight;
					}
					$(".zoomHover").css({"top":y+"px","left":x+"px"});
					x = Math.min(x,parseFloat(this.offsetWidth)/2);
					y = Math.min(y,parseFloat(this.offsetHeight)/2);
					$(zoomImg).css({"left": -x*magnification + "px","top":-y*magnification + "px"});
				}).on("mouseleave",function(){
					$(".zoomHover").hide();
					$(".zoomImgBox").hide();
				});
				$(zoomImg).attr('src',imgSrc).css({"height":imgHeight+"px","width":imgWidth+"px"});  //load image to zoom box
				console.timeEnd("Initial zoom");
			}
			return zoom;
		})()
	});
	return $;
})(jQuery);

