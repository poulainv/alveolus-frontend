'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

/**
 * Fonctions de service
 */
function connexion() {
    element('.nav a:contains(Connexion)').click();
    input('user.email').enter('vincent.poulain2@gmail.com');
    input('user.password').enter('vincent');
    element('.modal button:contains(Se connecter)').click();
}

function disconnexion() {
    element('.nav a.dropdown-toggle').click();
    element('.nav a:contains(Deconnexion)').click();
}

function expectUniqueElement(selector) {
    expect(element(selector).count()).toBe(1);
}

function expectNonexistentElement(selector) {
    expect(element(selector).count()).toBe(0);
}

/**
 * Tests e2e
 */
describe('alveolus', function() {
	
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
            connexion();
            expect(element('.alert span').text()).toBe('Parfait, vous êtes correctement authentifié');
            expectNonexistentElement('.nav a:visible:contains(Connexion)');
            element('.nav a.dropdown-toggle').click();
            expectUniqueElement('.nav a:visible:contains(Deconnexion)');
            // disconnexion
            disconnexion();
            expect(element('.alert span').text()).toBe('A bientôt ! Vous vous êtes correctement déconnecté');
            expectUniqueElement('.nav a:visible:contains(Connexion)');
            expectNonexistentElement('.nav a:visible:contains(Deconnexion)');
        });
    });

    describe('Navbar', function() {
        beforeEach(function() {
            browser().navigateTo('../../app/index.html');
        });

        it('should redirect to alveoles page when "Découvrez nos Alvéoles" is clicked', function() {
            element('a:contains(Découvrez):contains(nos Alvéoles)').click();
            expect(browser().location().url()).toBe('/alveoles');
        });

        it('should redirect to addwebapp page when "Proposez une Alvéole" is clicked and the user logged in', function() {
            connexion();
            element('a:contains(Proposez):contains(une Alvéole)').click();
            expect(browser().location().url()).toBe('/alveoles/new');
        });

        it('should not redirect to addwebapp page when "Proposez une Alvéole" is clicked and the user logged out', function() {
            disconnexion();
            element('a:contains(Proposez):contains(une Alvéole)').click();
            expect(browser().location().url()).not().toBe('/alveoles/new');
        });

        it('should redirect to vote page when "Modérer les alvéoles" is clicked', function() {
          element('a:contains(Modérez):contains(les alvéoles)').click();
          expect(browser().location().url()).toBe('/vote');
        });
    });

  	describe('Home page view', function() {

  		beforeEach(function() {
      		browser().navigateTo('../../app/index.html');
    	});

  		describe('routing', function() {
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
	  			expectNonexistentElement('.modal:visible');
	  			element('a:contains(Connexion)').click();
	  			expectUniqueElement('.modal:visible');
	  			element('.modal button:contains(Annuler)').click();
	  			sleep(0.5);
	  			expectNonexistentElement('.modal:visible');
	  		});

	  		it('should display then hide feedback modal window when "Feedback" clicked then "Cancel" clicked', function() {
	  			expectNonexistentElement('.modal:visible');
	  			element('a[id="feedback_link"]').click();
	  			expectUniqueElement('.modal:visible');
	  			element('.modal button:contains(Cancel)').click();
	  			sleep(0.5);
	  			expectNonexistentElement('.modal:visible');
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
  				expectUniqueElement('#teamSelection h3:contains(Crowdfunding)');
  				expectNonexistentElement('#teamSelection h3:contains(Food)');
  				element('span:contains(Food).btnCat').click();
  				expectUniqueElement('#teamSelection h3:contains(Food)');
  				expectNonexistentElement('#teamSelection h3:contains(Crowdfunding)');
  			});
  		});
  	});

	describe('Add web app page', function() {
		beforeEach(function() {
            browser().navigateTo('../../app/index.html');
            connexion();
    	    browser().navigateTo('../../app/index.html#/alveoles/new');
        });

        afterEach(function() {
            disconnexion();
        });

        xit('should not allow to send a webapp until the form is correctly filled', function() {
  		    expectNonexistentElement('button:contains(Envoyer)[disabled!="disabled"]');
      		input('webapp.title').enter('Alveole e2e-testing');
      		expectNonexistentElement('button:contains(Envoyer)[disabled!="disabled"]');
      		input('webapp.url').enter('http://e2e-testing.alveole');
      		expectNonexistentElement('button:contains(Envoyer)[disabled!="disabled"]');
      		input('webapp.caption').enter('Description rapide e2e-testing');
      		expectNonexistentElement('button:contains(Envoyer)[disabled!="disabled"]');
      		input('webapp.description').enter('Description complète e2e-testing, Description complète e2e-testing, Description complète e2e-testing, Description complète e2e-testing.');
      		expectNonexistentElement('button:contains(Envoyer)[disabled!="disabled"]');
      		select('webapp.category_id').option('Food');
      		expectUniqueElement('button:contains(Envoyer)[disabled!="disabled"]');
        });

    	xit('should send a well formed request when form is correctly filled and "Envoyer" pushed', function() {
    		input('webapp.title').enter('Alveole e2e-testing');
    		input('webapp.url').enter('http://e2e-testing.alveole');
    		input('webapp.caption').enter('Description rapide e2e-testing');
    		input('webapp.description').enter('Description complète e2e-testing, Description complète e2e-testing, Description complète e2e-testing, Description complète e2e-testing.');
    		select('webapp.category_id').option('Food');  
    	    // TODO 		
    	});
	});

  	describe('Web app page', function() {
  		beforeEach(function() {
           browser().navigateTo('../../app/index.html#/alveoles/6'); // MyMajorCompany
        });

        it('should display MyMajorCompany web app page', function() {
            expect(element('button#btnMore').text()).toBe('Toutes les alvéoles Crowdfunding');
            expect(element('h1').text()).toBe('MyMajorCompany');
            expect(element('h4.ng-binding').text()).toBe('Pionnier du financement participatif mondial, MMC vous propose de financer et de donner vie à tout type de projets culturels et innovants !');
            expect(element('.tab-content .tab-pane.active p').text()).toBe('My Major Company est un des pionniers du financement participatif mondial, et aujourd’hui leader du secteur en Europe, par la taille de sa communauté, les montants levés – plus de 12 millions d\'euros sur près de 42.000 projets en France, en Allemagne et en Angleterre – et les succès commerciaux engendrés.');
        });

        it('should display tags', function() {
            expectUniqueElement('span.tagList:contains(financement)');
            expectUniqueElement('span.tagList:contains(musique)');
        });

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
