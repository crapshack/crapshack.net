/*
	Transitive by TEMPLATED
	templated.co @templatedco
	Released for free under the Creative Commons Attribution 3.0 license (templated.co/license)
*/

(function($) {

	skel.breakpoints({
		xlarge:	'(max-width: 1680px)',
		large:	'(max-width: 1280px)',
		medium:	'(max-width: 980px)',
		small:	'(max-width: 736px)',
		xsmall:	'(max-width: 480px)'
	});

	$(function() {

		var	$window = $(window),
			$body = $('body'),
			$header = $('#header');

		// Disable animations/transitions until the page has loaded.
			$body.addClass('is-loading');

			$window.on('load', function() {
				window.setTimeout(function() {
					$body.removeClass('is-loading');
				}, 100);
			});

		// Prioritize "important" elements on medium.
			skel.on('+medium -medium', function() {
				$.prioritize(
					'.important\\28 medium\\29',
					skel.breakpoint('medium').active
				);
			});

		// Menu.
			$('#menu')
				.append('<a href="#menu" class="close"></a>')
				.appendTo($body)
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					side: 'right'
				});

			// Add randomization to menu hover effects
			$('#menu .links a').on('mouseenter', function() {
				const angle = (Math.random() * 3 - 1.5) + 'deg';  // Random angle between -1.5 and 1.5 degrees
				const position = (Math.random() * 0.1 + 0.15) + 'em';  // Random position between 0.15em and 0.25em
				const duration = (Math.random() * 0.2 + 0.2) + 's';  // Random duration between 0.2s and 0.4s
				
				// Randomize squiggle control points with more variation
				const x1 = (Math.random() * 15 + 10) + '%';  // Between 10% and 25%
				const y1 = (Math.random() * 40 + 20) + '%';  // Between 20% and 60%
				const x2 = (Math.random() * 15 + 75) + '%';  // Between 75% and 90%
				const y2 = (Math.random() * 40 + 20) + '%';  // Between 20% and 60%
				
				// Add animation delay for more organic feel
				const animDelay = (Math.random() * 0.2) + 's';
				
				this.style.setProperty('--underline-angle', angle);
				this.style.setProperty('--underline-position', position);
				this.style.setProperty('--animation-duration', duration);
				this.style.setProperty('--squiggle-x1', x1);
				this.style.setProperty('--squiggle-y1', y1);
				this.style.setProperty('--squiggle-x2', x2);
				this.style.setProperty('--squiggle-y2', y2);
				this.style.setProperty('animation-delay', animDelay);
			});

	});

})(jQuery);