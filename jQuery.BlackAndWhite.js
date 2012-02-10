/**
 *
 * Version: 	0.1.6
 * Author:		Gianluca Guarini
 * Contact: 	gianluca.guarini@gmail.com
 * Website:		http://www.gianlucaguarini.com/
 * Twitter:		@gianlucaguarini
 *
 * Copyright (c) 2011 Gianluca Guarini
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 **/
$j = jQuery.noConflict(); (function($j) {

	$j.fn.extend({
		BlackAndWhite : function(options) {
			var container = this;
			var defaults = {
				hoverEffect : true
			};
			var options = $j.extend(defaults, options);
			//@public vars
			var hoverEffect = options.hoverEffect;

			//@private var
			var supportsCanvas = !!document.createElement('canvas').getContext;
			//convert any image into B&W using HTML5 canvas

			function greyImages(img, canvas, width, height) {
				var ctx = canvas.getContext('2d'), currImg = img, imageData, px, length, i = 0, grey;

		
				$j(img).load(function() {

					ctx.drawImage(img, 0, 0, width, height);
					imageData = ctx.getImageData(0, 0, width, height);
					
					px = imageData.data;
					length = px.length;

					for(; i < length; i += 4) {
						grey = px[i] * .3 + px[i + 1] * .59 + px[i + 2] * .11;
						px[i] = px[i + 1] = px[i + 2] = grey;
					}

					ctx.putImageData(imageData, 0, 0);
				});
			}


			this.init = function(options) {

				if(supportsCanvas && (!(jQuery.browser.msie && jQuery.browser.version == '9.0'))) {

					$j(container).each(function(index, currImageWrapper) {

						var currImageWrapperParent = $j(currImageWrapper).parent();
						var pic = $j(currImageWrapper);
						var src = $j(pic).prop('src');
						//getting the Pics proprieties

						var currWidth = $j(pic).attr("width");
						var currHeight = $j(pic).attr("height");
												
						if(jQuery.browser.opera) {
							var rand = Math.random();
							// fix opera bug decaching images
							$j(pic).prop('src', src + '?' + rand)
						}

						if(!currWidth || !currHeight) {
							alert('Set the width and height on your images');
						}

						var pos = $j(currImageWrapper).position();

						//adding the canvas

						$j('<canvas width="' + currWidth + '" height="' + currHeight + '"></canvas>').prependTo(currImageWrapperParent);

						//getting the canvas
						var currCanvas = $j(currImageWrapperParent).find('canvas');

						//setting the canvas position on the Pics
						$j(currCanvas).css({
							'position' : 'absolute',
							'left' : pos.left
						});
						
						greyImages(pic[0], currCanvas[0], currWidth, currHeight);

					})
					if(hoverEffect) {
						$j(container).parent().mouseenter(function() {

							$j(this).find('canvas').fadeOut();
						});
						$j(container).parent().mouseleave(function() {
							$j(this).find('canvas').fadeIn();
						});
					}
				} else {
					$j(container).each(function(index, currImageWrapper) {
						var pic = $j(currImageWrapper).find('img');
						var picSrc = $j(currImageWrapper).find('img').prop('src');

						var currWidth = $j(pic).prop('width');
						var currHeight = $j(pic).prop('height');
						if(!currWidth || !currHeight) {
							alert('Set the width and height on your images');
						}

						//adding the canvas
						$j('<img src=' + picSrc + ' width="' + currWidth + '" height="' + currHeight + '" class="ieFix" /> ').prependTo(currImageWrapper);
						$j('.ieFix').css({
							'position' : 'absolute',
							'filter' : 'progid:DXImageTransform.Microsoft.BasicImage(grayscale=1)'
						});

					})
					if(hoverEffect) {
						$j(container).mouseenter(function() {
							$j(this).children('.ieFix').fadeOut();
						});
						$j(container).mouseleave(function() {
							$j(this).children('.ieFix').fadeIn();
						});
					}

				}
			}
			return this.init(options);
		}
	});

})(jQuery);
