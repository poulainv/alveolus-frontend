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
    return;
  };
})
.filter('facebook', function() {
  return function(input) {
    if(input)
       return "<a href="+input.link+" target=\"_blank\"><i class=\"icon-facebook icon-large\"></i>Facebook : "+input.likes+" likes</a>";
    return;
  };
})
.filter('twitter', function() {
  return function(input) {
    if(input)
       return "<a href=\"https://twitter.com/"+input.twitter_id+"\" target=\"_blank\"><i class=\"icon-twitter icon-large\"></i>Twitter : "+input.followers_count+" followers</a>";
    return;
  };
})
.filter('gplus', function() {
  return function(input) {
    if(input)
       return "<a href=\"https://plus.google.com/"+input+"\" target=\"_blank\"><i class=\"icon-google-plus icon-large\"></i>Google Plus</a>";
    return;
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

