if (Drupal.jsEnabled) {
  $(document).ready(function() {
    $('#cp-settings-theme .form-radios ').hide();

    var theSubnav = $("<div>");
    theSubnav.addClass("theme_subnav");
    theSubnav.html("<h3>Select a Theme</h3><div id=\"prev\" class=\"theme-pointer\"></div>");

    var subnavList = $('<ul>');
    
    var theList = '<ul class = "theme-picker">'; 
    var n_container = 0;
    //var total_containers = $('#cp-settings-form .form-radios .form-item').length;

    function getLi(liId, liChecked, liContent){
    	return '<li class = "item-theme-picker  ' + liChecked + '" id="' + liId  + '">' + liContent + '</li>';
    	
    }
    $('#cp-settings-form .form-radios .form-item').each(function(){
    	var liIdArr = $(this).attr('id').split('-');
    	var liId = liIdArr[3] + '-' + liIdArr[4] + '-' + liIdArr[5];
    	var liChecked = $(this).find('input').attr('checked') ? 'checked' : '';

    	// get the whole img div
    	var liContent = $(this).find('.item-theme-picker').html();

    	theList = theList + getLi(liId, liChecked, liContent);
    	
    	var jumpLink = $("<li>");
    	jumpLink.html("&nbsp;"+(n_container+1)+"&nbsp;");
    	
    	subnavList.append(jumpLink);
    	n_container++;
    });
    
    theSubnav.append(subnavList);
    theSubnav.append('<div id="next" class="theme-pointer"></div>');
    theList += '</ul>';
    
    $('#cp-settings-theme').prepend(theList);
    $('#cp-settings-theme').prepend(theSubnav);
    $(".item-theme-picker:first").addClass('active');
    
    $('div#prev,div#next,.theme_subnav li').cpSlidingContainer({containerW: 600, 
    																mainListSelector:'ul.theme-picker',
							    								    listItemClass: 'item-theme-picker', 
							    								    navClass:'theme_subnav'});
    
    $('li.item-theme-picker').click(function(){
    	// remove the active class from every li first
    	$(".item-theme-picker").removeClass('checked');
    	// add the class to this one
    	$(this).addClass('checked');
    	
    	var id = $(this).attr('id');
    	$(".form-radio").removeAttr("checked");
    	$("#edit-settings-theme-" + id).attr("checked", "checked"); 
    });
    
  });
}
