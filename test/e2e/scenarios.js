'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('alveolus', function() {

	describe('Routing', function() {
  	
  	it('should redirect bad url to home page', function() {
    	browser().navigateTo('../../app/index.html#/hyecaramba');
    	expect(browser().location().url()).toBe('/');
  	});


  });

});
