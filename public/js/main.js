$(document).ready(function(){
  //Scrolls to top of page
	//Check to see if the window is top if not then display button
	$(window).scroll(function(){
		if ($(this).scrollTop()) {
			$('.scrollToTop').fadeIn();
		} else {
			$('.scrollToTop').fadeOut();
		}
	});

	//Click event to scroll to top
	$('.scrollToTop').click(function(){
		$('html, body').animate({scrollTop : 0},1500);
	});

  //mobile navbar collapse animation
  $(document).on('click','.navbar-collapse.in',function(e) {
      if( $(e.target).is('a') && $(e.target).attr('class') != 'dropdown-toggle' ) {
          $(this).collapse('hide');
      }
  });

	//navbar onclick scroll to div
	$('a[href^="#"]').on('click', function(e) {
		// 'a[href^="#"]' tells jquery to look for a.href tag that has '#' in the tag.
			e.preventDefault();
			var refHash = this.hash; // takes the # in anchor tag
			var target = $(refHash); // jquery-ify the hash

			$('html,body').animate({
					'scrollTop': target.offset().top // will scroll to the top of the target
				}, 1500, 'swing');
		});
});

var slideIndex = 0;
showDivs(slideIndex);

function plusDivs(n) {
    showDivs(slideIndex += n);
}

function showDivs(n) {
    var i;
    var x = document.getElementsByClassName("item");
    if (n > x.length) {slideIndex = 1}
    if (n < 1) {slideIndex = x.length} ;
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    x[slideIndex-1].style.display = "block";
}

carousel();

function carousel() {
    var i;
    var x = document.getElementsByClassName("item");
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > x.length) {slideIndex = 1}
    x[slideIndex-1].style.display = "block";
    setTimeout(carousel, 5000); // Change image every 2 seconds
}
