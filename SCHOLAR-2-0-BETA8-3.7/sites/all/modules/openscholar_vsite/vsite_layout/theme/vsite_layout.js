Drupal.behaviors.scholarlayout = function() {
    var layoutRegions = ["#scholarlayout-header-left","#scholarlayout-header-main", "#scholarlayout-header-right", "#scholarlayout-navbar", "#scholarlayout-left", "#scholarlayout-right", "#scholarlayout-footer"];

    scholarlayout_add_sortable(layoutRegions);


    if(!scholarlayout_change_bound){
    	scholarlayout_change_bound = true;

    	$('#cp-settings-form').submit(function() {
    		scholarlayout_afterdrag(null,null);
    		return true;
    	});


	    $("#edit-settings-layout-page-type").bind('change', function(e){
	    	if(scholarlayout_catchchanges()){
	    		$('#edit-settings-layout-secret-hidden-ahah').val($("#edit-settings-layout-page-type").val());
		    	$('#edit-settings-layout-secret-hidden-ahah').trigger('go_ahah');
		    	$("#edit-settings-layout-page-type").trigger('go_ahah');
		    	$("#scholarforms_save_warning").remove();
		    	scholarlayout_add_sortable(layoutRegions);
	    	}else{
	    		//revert
	    		$('#edit-settings-layout-page-type').val($("#edit-settings-layout-secret-hidden-ahah").val());
	    	}
	    });

	    $(window).resize(function() { vsite_layout_setScrollArrows(); });

    }
    scholarlayout_add_removal_hooks();
    vsite_layout_setScrollArrows();
    vsite_layout_setExceptionScroller();
    vsite_layout_setWidgetAutoWidth();
};

function scholarlayout_add_removal_hooks(){
	$(".close-this:not(.close-this-processed)").addClass('close-this-processed').click(function(e){
    	var parent = $(this).parent("dd");
    	$("body").append("<div class='poof'></div>");

    	// set the x and y offset of the poof animation <div> from cursor position (in pixels)
        var xOffset = 24;
        var yOffset = 24;

        $('.poof').css({
          left: e.pageX - xOffset + 'px',
          top: e.pageY - yOffset + 'px'
        }).show(); // display the poof <div>
        animatePoof(); // run the sprite animation

        parent.appendTo("#scholarlayout-top-widgets");
    	scholarlayout_afterdrag(e,null);

        parent.fadeIn('fast');
    });
}

var scholarlayout_change_bound = false;
function scholarlayout_afterdrag(event, ui) {
	  var regions = $("#scholarlayout-container > .scholarlayout-widgets-list");
	  $.each(regions, function(i, region){
	    var items = $("#"+region.id+" > .scholarlayout-item");
	    var ids = "";
	    $.each(items, function(i, value){
	      if(ids.length) ids += "|";
	      ids += value.id;
	    } );
	   	$('#edit-settings-layout-'+region.id).val(ids);
	  });

	  //Reset top box after widgets have been moved
	  vsite_layout_setScrollArrows();
	  
	  //Reset widget widths
	  vsite_layout_setWidgetAutoWidth();

	  if(!$("#scholarforms_save_warning").length && event) $("#cp-settings-layout").before($('<div id="scholarforms_save_warning" class="warning"><span class="warning tabledrag-changed">*</span> Your changes have not yet been saved. Click "Save Settings" for your changes to take effect</div>'));
};

function scholarlayout_catchchanges() {
	if(!$("#scholarforms_save_warning").length || confirm("Your changes have not been saved. Continue and lose your changes?")) return true;
	return false;
};

function scholarlayout_add_sortable(layoutRegions){
	var allRegions = layoutRegions.slice();
	allRegions[allRegions.length] = "#scholarlayout-top-widgets";
	$.each(allRegions, function(i, value){
	  $(value).sortable({
        connectWith: allRegions,
	    stop: scholarlayout_afterdrag,
	    tolerance: 'pointer',
	    over: function(event, ui) { $(event.target).addClass('active'); },
	    out: function(event, ui) { $(event.target).removeClass('active'); }
	  });
	});

}

//The jQuery Poof Effect was developed by Kreg Wallace at The Kombine Group, Inc. http://www.kombine.net/

function animatePoof() {
    var bgTop = 0; // initial background-position for the poof sprit is '0 0'
    var frames = 5; // number of frames in the sprite animation
    var frameSize = 32; // size of poof <div> in pixels (32 x 32 px in this example)
    var frameRate = 80; // set length of time each frame in the animation will display (in milliseconds)

    // loop through amination frames
    // and display each frame by resetting the background-position of the poof <div>
    for(i=1;i<frames;i++) {
      $('.poof').animate({
        backgroundPosition: '0 ' + (bgTop - frameSize) + 'px'
      }, frameRate);
      bgTop -= frameSize; // update bgPosition to reflect the new background-position of our poof <div>
    }
    // wait until the animation completes and then hide the poof <div>
    setTimeout("$('.poof').remove()", frames * frameRate);
}

function vsite_layout_setScrollArrows(){
	var nContainerWidth = $('#scholarlayout-top-widgets').width();
	var nWidgetWidth = $('#scholarlayout-top-widgets dd:first').width();
	var nAllWidgetsWidth = $('#scholarlayout-top-widgets dd:not(.disabled)').length * nWidgetWidth;
	var scholarlayout_widgets_scroling = false;

	if(nContainerWidth > nAllWidgetsWidth){
      $('div.widget-prev, div.widget-next').addClass('disabled').unbind('click');

	}else{
      $('div.widget-prev, div.widget-next').removeClass('disabled');
	  
      var keep_scroling_prev = false;
      $('div.widget-prev').mousedown(function() {
    	if(scholarlayout_widgets_scroling) return false;
    	
    	scholarlayout_widgets_scroling = keep_scroling_prev = true;
		$('#scholarlayout-top-widgets').prepend($('#scholarlayout-top-widgets dd:last')).css('marginLeft',"-"+nWidgetWidth+"px").width('125%');
  	    $('#scholarlayout-top-widgets').animate({ marginLeft: "0px", width: "110%" }, 750, function() { 
  	    	scholarlayout_widgets_scroling = false; 
  	    	if(keep_scroling_prev && $('div.widget-prev:hover').length) $('div.widget-prev').mousedown();
  	    });
      });
      $('div.widget-prev').mouseup(function() { keep_scroling_prev = false; });

      var keep_scroling_next = false;
	  $('div.widget-next').mousedown(function() {
		if(scholarlayout_widgets_scroling) return false;
		
		scholarlayout_widgets_scroling = keep_scroling_next = true;
        $('#scholarlayout-top-widgets').animate({ marginLeft: "-"+nWidgetWidth+"px", width: "125%" }, 750, function() {
	      $('#scholarlayout-top-widgets').append($('#scholarlayout-top-widgets dd:first')).css('marginLeft','0px').width('110%');
	      scholarlayout_widgets_scroling = false;
	      if(keep_scroling_next && $('div.widget-next:hover').length) $('div.widget-next').mousedown();
	    });
	  });
	  $('div.widget-next').mouseup(function() { keep_scroling_next = false; });
	}
}

//Horizontal Sliding Exceptions
function vsite_layout_setExceptionScroller(){
	  
	  $('span.toggle-exceptions').click(function(){
		  $(this).siblings('div.layout-exceptions').stop().animate({right:'-20px'},{queue:false,duration:300});
	  });
	  
	  $('div.layout-exceptions').click(function(){
		  $(this).stop().animate({right:'-101%'},{queue:false,duration:300});
	  });
	  
}

function vsite_layout_setWidgetAutoWidth(){
    var nHeight = $('div#scholarlayout-container dd:first').height();
	
    var regions = $("#scholarlayout-container > .scholarlayout-widgets-list");
	$.each(regions, function(i, region){
	  var rgn = $("#"+region.id);
	  if(rgn.height() < nHeight *2){
	    var items = $("#"+region.id+" > .scholarlayout-item");
	    var nWidth = (rgn.width()) / items.length;
	    items.width(nWidth - 51);
	  }//If this is a skinny container
	});
	
}