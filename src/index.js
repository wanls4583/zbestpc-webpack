import './css/public.css';
import './css/index.css';

import 'flexslider';

import './js/public.js';
import './js/nav.js';

$(function() {
	$('#home_slider').flexslider({
		animation: 'slide',
		controlNav: true,
		directionNav: true,
		animationLoop: true,
		slideshow: true,
		slideshowSpeed: 2000,
		useCSS: false
	});
});