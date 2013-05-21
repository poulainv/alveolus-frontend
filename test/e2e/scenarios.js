'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('alveolus', function() {


	/*angular.scenario.matcher("toBeOkAlways", function () {
    	return true;
	});*/
  angular.scenario.matcher('toEqualFuture', function(future) {
    return this.actual == future.value;
  });
	

	describe('Routing', function() {
  		it('should redirect bad url to home page', function() {
    		browser().navigateTo('../../app/index.html#/hyecaramba');
    		expect(browser().location().url()).toBe('/');
  		});
  });

  describe('Connexion', function() {
    it('should check connexion and disconnexion', function() {
      browser().navigateTo('../../app/index.html');
      // connexion
      element('.nav a:contains(Connexion)').click();
      input('user.email').enter('vincent.poulain2@gmail.com');
      input('user.password').enter('vincent');
      element('.modal button:contains(Se connecter)').click();
      expect(element('.alert span').text()).toBe('Parfait, vous êtes correctement authentifié');
      expect(element('.nav a:visible:contains(Connexion)').count()).toBe(0);
      expect(element('.nav a:visible:contains(Déconnexion)').count()).toBe(1);
      // disconnexion
      element('.nav a:contains(Déconnexion)').click();
      expect(element('.alert span').text()).toBe('A bientôt ! Vous vous êtes correctement déconnecté');
      expect(element('.nav a:visible:contains(Connexion)').count()).toBe(1);
      expect(element('.nav a:visible:contains(Déconnexion)').count()).toBe(0);
    });
    

  });

  	describe('Home page view', function() {

  		beforeEach(function() {
      		browser().navigateTo('../../app/index.html');
    	});

  		describe('routing', function() {
  			it('should redirect to addwebapp page when "Poster une Alvéole" clicked', function() {
	  			element('a:contains(Poster une Alvéole)').click();
	  			expect(browser().location().url()).toBe('/alveoles/new');
	  		});

	  		//it('should redirect to ?? page when "À propos d\'AlveolUs" clicked', function() {
	  		//	element('a:contains(À propos d\'AlveolUs)').click();
	  		//	expect(browser().location().url()).toBe('??');
	  		//});

	  		it('should redirect to webapp page when a webapp is clicked in carousel', function() {
	  			element('.carousel-inner .alveole:first a').click();
	  			expect(browser().location().url()).toMatch('/alveoles/\\d+');
	  		});

	  		it('should redirect to webapplist when button "Voir toutes les alvéoles >" is clicked', function() {
	  			element('button:contains(Voir toutes les alvéoles >)').click();
	  			expect(browser().location().url()).toBe('/alveoles');
	  		});
  		})

  		describe('modals', function() {
  			it('should display then hide connexion modal window when "Connexion" clicked then "Annuler" clicked', function() {
	  			expect(element('.modal:visible').count()).toBe(0);
	  			element('a:contains(Connexion)').click();
	  			expect(element('.modal:visible').count()).toBe(1);
	  			element('.modal button:contains(Annuler)').click();
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
  		});
  		
  		describe('carousel', function() {
  			it('should display 4 webapp in carousel', function() {
	    		expect(repeater('.carousel-inner .item .alveoleWrap:visible').count()).toBe(4);
	  		});

        //it('should find ?? webapp', function() {
        //  expect(repeater('.carousel-inner .item:first .alveoleWrap').count()).toBe(??);
        //});

	  		it('should display other webapp when right control clicked in carousel', function() {
	  			var firstVisibleAlveole = element('.carousel-inner .item .alveoleWrap:visible.alveoleWrap:first').text();
	  			element('.carousel-control.right').click();
          sleep(1);
	  			expect(element('.carousel-inner .item .alveoleWrap:visible.alveoleWrap:first').text()).not().toEqualFuture(firstVisibleAlveole);
	  		});
  		});

  		describe('categories', function() {
  			it('should change "selection de l\'équipe" webapp when other category clicked', function() {
  				element('span:contains(Crowdfunding).btnCat').click();
  				expect(element('#teamSelection h3:contains(Crowdfunding)').count()).toBe(1);
  				expect(element('#teamSelection h3:contains(Food)').count()).toBe(0);
  				element('span:contains(Food).btnCat').click();
  				expect(element('#teamSelection h3:contains(Food)').count()).toBe(1);
  				expect(element('#teamSelection h3:contains(Crowdfunding)').count()).toBe(0);
  			});
  		});
  	});

	describe('Add web app page', function() {
		beforeEach(function() {
      		browser().navigateTo('../../app/index.html#/alveoles/new');
    	});

    	it('should not allow to send a webapp until the form is correctly filled', function() {
    		expect(element('button:contains(Envoyer)[disabled!="disabled"]').count()).toBe(0);
    		input('webapp.title').enter('Alveole e2e-testing');
    		expect(element('button:contains(Envoyer)[disabled!="disabled"]').count()).toBe(0);
    		input('webapp.url').enter('http://e2e-testing.alveole');
    		expect(element('button:contains(Envoyer)[disabled!="disabled"]').count()).toBe(0);
    		input('webapp.caption').enter('Description rapide e2e-testing');
    		expect(element('button:contains(Envoyer)[disabled!="disabled"]').count()).toBe(0);
    		input('webapp.description').enter('Description complète e2e-testing, Description complète e2e-testing, Description complète e2e-testing, Description complète e2e-testing.');
    		expect(element('button:contains(Envoyer)[disabled!="disabled"]').count()).toBe(0);
    		select('webapp.category_id').option('Food');
    		expect(element('button:contains(Envoyer)[disabled!="disabled"]').count()).toBe(1);
    	})

  		it('should send a well formed request when form is correctly filled and "Envoyer" pushed', function() {
  			input('webapp.title').enter('Alveole e2e-testing');
  			input('webapp.url').enter('http://e2e-testing.alveole');
  			input('webapp.caption').enter('Description rapide e2e-testing');
  			input('webapp.description').enter('Description complète e2e-testing, Description complète e2e-testing, Description complète e2e-testing, Description complète e2e-testing.');
  			select('webapp.category_id').option('Food');  
			 // TODO 		
  		});

  	});

  	describe('Web app page', function() {
  		describe('add a comment', function() {
  			
  		});
  	});
  	
  	describe('Web app list page', function() {
  		describe('', function() {

  		});
  	});
  	
  	describe('User page', function() {
  	
  	});
  	
  	describe('Vote page', function() {
  	
  	});

});
