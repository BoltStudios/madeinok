
(function() {

  //Get a handle to elements
  var $tweet = $(".tweet");
  var $img = $(".tweet-panel .icon");
  var $tweetPnl = $(".tweet-panel");

  //tweet is hidden during load/resize
  var hideTweet = function(){
	  $tweet.hide();
		$img.hide();
  };

  //resize icon and tweet to look nice
  var draw = function(){
	  $tweet.show();
		$img.show();

	  var heightOfPanel = $tweetPnl.height();
	  $img.width(heightOfPanel+20+'px');
	  $img.height(heightOfPanel+20+'px');
  
	  var size = 150;
	  while(size > 0){
		    size -= 1;
		    $tweet.css('font-size', size+'px');

		    if($tweet.height() < (heightOfPanel-10))
		        break;
	  }
  };
    
  //throttle the window.resize event
  var resizeTimeout = null;
  var onResize = function(){
	  hideTweet();

	  if(resizeTimeout) clearTimeout(resizeTimeout);
	  resizeTimeout = setTimeout(draw, 300);
  };
  
  
  //Embed font, get called back on load: http://www.google.com/fonts/#QuickUsePlace:quickUse/Family:
  window.WebFontConfig = {
    google: { families: [ 'Doppio+One::latin' ] },
		active: draw,
		inactive: draw
  };
  var wf = document.createElement('script');
  wf.src = ('https:' == document.location.protocol ? 'https' : 'http') + '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
  wf.type = 'text/javascript';
  wf.async = 'true';
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(wf, s);
  

  //on page load
  $(function(){
    
    //wire up the resize event
	  $(window).resize(onResize);

    //start with tweet hidden (until font loads)
	  hideTweet();

  });

})();