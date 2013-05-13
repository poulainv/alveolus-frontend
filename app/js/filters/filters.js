'use strict';

/* Filters */

angular.module('alveolus.filters', []).filter('star', function() {
  return function(input) {
    if(((input.rate-input.index)>0.33) && ((input.rate-input.index)<0.66)) return 'icon-star-half-empty';
    else if(input.rate>input.index) return 'icon-star';
    else return 'icon-star-empty';
  };
})
.filter('vimeo', function() {
  return function(input) {
    if(input)
       return "<iframe src=\"http://player.vimeo.com/video/"+input+"\" width=\"500\" height=\"281\" frameborder=\"0\" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>";
      //return 'vidéo';
    else return;x
  };
})
.filter('range', function() {
  return function(input, total) {
    total = parseInt(total);
    for (var i=0; i<total; i++)
      input.push(i);
    return input;
  };
});