'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('alveolus', function() {


	/*angular.scenario.matcher("toBeDisplayed", function () {
    	return element(this.actual).css('display') === 'block';
	});*/
	

	describe('Routing', function() {
  		it('should redirect bad url to home page', function() {
    		browser().navigateTo('../../app/index.html#/hyecaramba');
    		expect(browser().location().url()).toBe('/');
  		});
  	});

  	describe('Home page view', function() {

  		beforeEach(function() {
      		
      		browser().navigateTo('../../app/index.html');

    	});

  		it('should redirect to addwebapp page when "Poster une Alvéole" clicked', function() {
  			element('a:contains(Poster une Alvéole)').click();
  			expect(browser().location().url()).toBe('/alveoles/new');
  		});

  		/*it('should redirect to ?? page when "À propos d\'AlveolUs" clicked', function() {
  			element('a:contains(À propos d\'AlveolUs)').click();
  			expect(browser().location().url()).toBe('??');
  		});*/

  		it('should display then hide connexion modal window when "Connexion" clicked then "Cancel" clicked', function() {
  			expect(element('.modal:visible').count()).toBe(0);
  			element('a:contains(Connexion)').click();
  			expect(element('.modal:visible').count()).toBe(1);
  			element('.modal button:contains(Cancel)').click();
  			sleep(0.5);
  			expect(element('.modal:visible').count()).toBe(0);
  		});

  		it('should display then hide feedback modal window when "Feedback" clicked then "Cancel" clicked', function() {
  			expect(element('.modal:visible').count()).toBe(0);
  			element('a[id="feedback_link"]').click();
  			expect(element('.modal:visible').count()).toBe(1);
  			element('.modal button:contains(Cancel)').click();
  			sleep(0.5);
  			expect(element('.modal:visible').count()).toBe(0);
  		});

  		it('should display 4 webapp in carousel', function() {
    		expect(repeater('.carousel-inner .item:first .alveoleWrap').count()).toEqual(4);
  		});

  		it('should redirect to webapp page when a webapp is clicked in carousel', function() {
  			element('.carousel-inner .alveole:first a').click();
  			expect(browser().location().url()).toMatch('/alveoles/\\d+');
  		});

  		it('should display other webapp when right control clicked in carousel', function() {
  			//var firstWebappHtml = element('.carousel-inner .item .alveoleWrap:first:visible').count();
  			expect(element('.carousel-inner .item .alveoleWrap:first.alveoleWrap:visible').count()).toBe(1);
  			element('.carousel-control.right').click();
  			expect(element('.carousel-inner .item .alveoleWrap:first.alveoleWrap:visible').count()).toBe(0);
  			//expect(firstWebappHtml).toMatch(element('.carousel-inner .item:first .alveoleWrap:first:visible').text().value);
  		})
  	});

});
