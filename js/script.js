$.fn.infiniteCarousel = function () {

    function repeat(str, num) {
        return new Array( num + 1 ).join( str );
    }
  
    return this.each(function () {
        var $wrapper = $('> div', this).css('overflow', 'hidden'),
            $slider = $wrapper.find('> ul'),
            $items = $slider.find('> li'),
            $single = $items.filter(':first'),
            
            singleWidth = $single.outerWidth(), 
            visible = Math.ceil($wrapper.innerWidth() / singleWidth),
            currentPage = 1,
            pages = Math.ceil($items.length / visible);            


        // 1. Pad so that 'visible' number will always be seen, otherwise create empty items
        if (($items.length % visible) != 0) {
            $slider.append(repeat('<li class="empty" />', visible - ($items.length % visible)));
            $items = $slider.find('> li');
        }

        // 2. Top and tail the list with 'visible' number of items, top has the last section, and tail has the first
        $items.filter(':first').before($items.slice(- visible).clone().addClass('cloned'));
        $items.filter(':last').after($items.slice(0, visible).clone().addClass('cloned'));
        $items = $slider.find('> li'); // reselect
        
        // 3. Set the left position to the first 'real' item
        $wrapper.scrollLeft(singleWidth * visible);
        
        // 4. paging function
        function gotoPage(page) {
            var dir = page < currentPage ? -1 : 1,
                n = Math.abs(currentPage - page),
                left = singleWidth * dir * visible * n;
            
            $wrapper.filter(':not(:animated)').animate({
                scrollLeft : '+=' + left
            }, 500, function () {
                if (page == 0) {
                    $wrapper.scrollLeft(singleWidth * visible * pages);
                    page = pages;
                } else if (page > pages) {
                    $wrapper.scrollLeft(singleWidth * visible);
                    // reset back to start position
                    page = 1;
                } 

                currentPage = page;
            });                
            
            return false;
        }
        
        $wrapper.after('<a class="arrow back"></a><a class="arrow forward"></a>');
        
        // 5. Bind to the forward and back buttons
        $('a.back', this).click(function () {
            return gotoPage(currentPage - 1);                
        });
        
        $('a.forward', this).click(function () {
            return gotoPage(currentPage + 1);
        });
        
        // create a public interface to move to a specific page
        $(this).bind('goto', function (event, page) {
            gotoPage(page);
        });
    });  
};

$(document).ready(function () {
  $('.infiniteCarousel,.infiniteCarousel_1,.infiniteCarousel_2,.infiniteCarousel_3').infiniteCarousel();
  
  /*For Category Dropdown*/
  $(".shopByCatBox").hide();
	$("#showCategory").click(function(){
		$(".shopByCatBox").slideToggle("fast");
		$(this).toggleClass("active"); return false;
		
		$(".shopByCatBox").click(function()
		{
			$(".shopByCatBox").slideUp(200);
			});
	});
	$(".shopByCatBox").hide();


	
	 /*For User Login*/

  $(".userLoginBox").hide();
	$("#showLogin").click(function(){
		$(".userLoginBox").slideToggle("fast");
		
		$(this).toggleClass("active"); 
		
		return false;
		
		$(".userLoginBox").click(function()
		{

			$(".userLoginBox").slideUp(200);

		});
		
	});
	
	$(document).click(function(e) { 
		  $(".userLoginBox").slideUp(200);
	});
	 
	 $(".userLoginBox").click(function(e) { 
	 e.stopPropagation();

	});
	

	
	//Product Detail Tabs
    $(".PD-tabs-content").hide(); //Hide all content
    $("ul.PD-tabs li:first").addClass("active").show(); //Activate first tab
    $(".PD-tabs-content:first").show(); //Show first tab content
     
    //On Click Event
    $("ul.PD-tabs li").click(function() {
        $("ul.PD-tabs li").removeClass("active"); //Remove any "active" class
        $(this).addClass("active"); //Add "active" class to selected tab
        $(".PD-tabs-content").hide(); //Hide all tab content
        var activeTab = $(this).find("a").attr("href"); //Find the rel attribute value to identify the active tab + content
        $(activeTab).fadeIn(); //Fade in the active content
        return false;
    });
	
	    //Default Action
    $(".shp-tabs-content").hide(); //Hide all content
    $("ul.shp-tabs li:first").addClass("active").show(); //Activate first tab
    $(".shp-tabs-content:first").show(); //Show first tab content
     
    //On Click Event
    $("ul.shp-tabs li").click(function() {
        $("ul.shp-tabs li").removeClass("active"); //Remove any "active" class
        $(this).addClass("active"); //Add "active" class to selected tab
        $(".shp-tabs-content").hide(); //Hide all tab content
        var activeTab = $(this).find("a").attr("href"); //Find the rel attribute value to identify the active tab + content
        $(activeTab).fadeIn(); //Fade in the active content
        return false;
    });
});

$(document).ready(function () {
	if($('.jqzoom')[0])
	{
		$('.jqzoom').jqzoom({
		zoomType: 'standard',
		lens:true,
		preloadImages: false,
		alwaysOn:false
	});
		
	}
});

/*--For Zoom PopUp Function---*/
jQuery('.pu-big-right-box li .thumbnail').click(function() {
	jQuery('.pu-big-right-box li .thumbnail').removeClass('current');
	jQuery(this).addClass('current');
	var path = jQuery(this).find('img').attr('src');
	jQuery('#big-photo img').attr('src', path);
});

	  






