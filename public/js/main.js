$(document).ready(function(){
  //Scrolls to top of page
	//Check to see if the window is top if not then display button
	$(window).scroll(function(){
		if ($(this).scrollTop() > 800) {
			$('.scrollToTop').fadeIn();
		} else {
			$('.scrollToTop').fadeOut();
		}
	});

	//Click event to scroll to top
	$('.scrollToTop').click(function(){
		$('html, body').animate({scrollTop : 0},1500);
		return false;
	});

  //navbar collapse animation
  $(document).on('click','.navbar-collapse.in',function(e) {
      if( $(e.target).is('a') && $(e.target).attr('class') != 'dropdown-toggle' ) {
          $(this).collapse('hide');
      }
  });

	//navbar onclick scroll to div
	$('a[href^="#"]').on('click', function(e) {
		// 'a[href^="#"]' tells jquery to look for a href tag that has '#' in the tag.
			e.preventDefault();
			var refHash = this.hash;
			var target = $(refHash);

			$('html,body').animate({
					'scrollTop': target.offset().top
				}, 1000, 'swing');
		});
});
