'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

/**
 * Fonctions de service
 */
 // si besoin d'accèder à ces comptes mails, les mots de passes sont les mêmes
var MAILS = ["e2e.test1.alveolus@gmail.com", "e2e.test2.alveolus@gmail.com", "e2e.test3.alveolus@gmail.com", "e2e.test4.alveolus@gmail.com", "e2e.test5.alveolus@gmail.com"];
var PWDS = ["e2etest1", "e2etest2", "e2etest3", "e2etest4", "e2etest5"];

function connexion(mail, pwd) {
    element('.navbar-link:contains(CONNEXION)').click();
    input('user.email').enter(mail);
    input('user.password').enter(pwd);
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
        beforeEach(function() {
            browser().navigateTo('../../app/index.html');
            disconnexion();
        });

        it('should check connexion and disconnexion', function() {
            // connexion
            connexion(MAILS[0], PWDS[0]);
            expectUniqueElement('.navbar-link-text:contains(MON COMPTE)');
            expectNonexistentElement('.navbar-link:visible:contains(CONNEXION)');
            element('.navbar-link:contains(COMPTE)').click();
            expectUniqueElement('.nav a:visible:contains(Deconnexion)');
            // disconnexion
            disconnexion();
            expectUniqueElement('.navbar-link:visible:contains(CONNEXION)');
            expectNonexistentElement('.navbar-link-text:visible:contains(MON COMPTE)');
            expectNonexistentElement('.nav a:visible:contains(Deconnexion)');
        });
    });

    describe('Navbar', function() {
        beforeEach(function() {
            browser().navigateTo('../../app/index.html');
        });

        it('should redirect to alveoles page when "DÉCOUVREZ" is clicked', function() {
            element('.navbar-link:contains(DÉCOUVREZ)').click();
            expect(browser().location().url()).toBe('/alveoles');
        });

        it('should redirect to addwebapp page when "PROPOSEZ" is clicked and the user logged in', function() {
            connexion(MAILS[0], PWDS[0]);
            element('.navbar-link:contains(PROPOSEZ)').click();
            expect(browser().location().url()).toBe('/alveoles/new');
        });

        it('should not redirect to addwebapp page when "PROPOSEZ" is clicked and the user logged out', function() {
            disconnexion();
            element('.navbar-link:contains(PROPOSEZ)').click();
            expect(browser().location().url()).not().toBe('/alveoles/new');
        });

        it('should redirect to vote page when "MODÉREZ" is clicked', function() {
          element('.navbar-link:contains(MODÉREZ)').click();
          expect(browser().location().url()).toBe('/vote');
        });
    });

    describe('Home page view', function() {

      beforeEach(function() {
          browser().navigateTo('../../app/index.html');
      });

      describe('routing', function() {
        // xit car pas de caroussel actuellement
        xit('should redirect to webapp page when a webapp is clicked in carousel', function() {
          element('.carousel .alveole:first .imgCarousel').click();
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
          element('.navbar-link:visible:contains(CONNEXION)').click();
          expectUniqueElement('.modal:visible');
          element('.modal button:contains(Annuler)').click();
          expectNonexistentElement('.modal:visible');
        });

        it('should display then hide feedback modal window when "Feedback" clicked then "Cancel" clicked', function() {
          expectNonexistentElement('#modalFeedback:visible');
          element('a[id="feedback_link"]').click();
          sleep(0.5); // temp du fade in
          expectUniqueElement('#modalFeedback:visible');
          element('#modalFeedback button:contains(Cancel)').click();
          expectNonexistentElement('#modalFeedback:visible');
        });
      });
      
      // xit car pas de caroussel actuellement
      describe('carousel', function() {
        xit('should display 4 webapp in carousel', function() {
          expect(repeater('.carousel-inner .item .alveoleWrap:visible').count()).toBe(4);
        });

            //it('should find ?? webapp', function() {
            //  expect(repeater('.carousel-inner .item:first .alveoleWrap').count()).toBe(??);
            //});

        xit('should display other webapp when right control clicked in carousel', function() {
          var firstVisibleAlveole = element('.carousel-inner .item .alveoleWrap:visible.alveoleWrap:first').text();
          element('.carousel-control.right').click();
          sleep(1);
          expect(element('.carousel-inner .item .alveoleWrap:visible.alveoleWrap:first').text()).not().toEqualFuture(firstVisibleAlveole);
        });
      });

      // xit car pas de selection de l'équipe pour l'instant
      describe('categories', function() {
        xit('should change "selection de l\'équipe" webapp when other category clicked', function() {
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
      connexion(MAILS[0], PWDS[0]);
      element('.navbar-link:contains(PROPOSEZ)').click();
    });

    afterEach(function() {
      disconnexion();
    });

    it('should not allow to send a webapp until the form is correctly filled', function() {
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
      expectNonexistentElement('button:contains(Envoyer)[disabled!="disabled"]');
      // TODO : check avec l'ajout d'image, impossible actuelement
    });

    it('should send a webapp when form is correctly filled and "Envoyer" pushed', function() {
      // TODO : impossible actuellement à cause de l'upload d'image
    });
  });

  describe('Vote page', function() {
    it('should check if webapp has been sent', function() {
      browser().navigateTo('../../app/index.html#/vote');
      // TODO : impossible actuellement, nécessite le post d'une alvéole
    });
  });

  describe('Web app page', function() {
    beforeEach(function() {
       browser().navigateTo('../../app/index.html#/alveoles/6'); // Homengo
    });

    it('should display Homengo web app page', function() {
      expect(element('h1').text()).toBe('Homengo');
      expectUniqueElement('.caption:visible:contains(Home\'n\'go centralise toutes les annonces immobilières qui vous plaisent en un seul endroit que vous pouvez partager avec vos proches.)');
      expectUniqueElement('p:visible:contains(Marre de chercher un logement ? Home\'n\'go vous simplifie la vie en vous aidant à vous organiser. Centralisez toutes les annonces qui vous plaisent sur votre espace et découvrez ce qui se trouve à proximité de chacune d\'entre elle. Home\'n\'go utilise les données ouvertes (Open Data) pour centraliser toutes les informations qui peuvent vous être utiles pendant la recherche de votre logement. (prix moyen au mètre carré, ratio homme/femme, orientation politique du quartier etc...))');
    });

    it('should display tags', function() {
      // TODO : pas encore de tags sur homengo
    });

    describe('add a comment', function() {

      beforeEach(function() {
        disconnexion();
        connexion(MAILS[0], PWDS[0]);
      });

      afterEach(function() {
        disconnexion();
      });

      it('should propose to add a comment when user logged in (remove manually Test comment if already there)', function() {
        disconnexion();
        expectNonexistentElement('#textarea:visible');
        connexion(MAILS[0], PWDS[0]);
        expectUniqueElement('#textarea:visible');
      });

      it('should not allow to post a comment until a note is selected', function() {
        expectNonexistentElement('button:contains(Envoyer)[disabled!="disabled"]');
        element('#star3').click();
        expectUniqueElement('button:contains(Envoyer)[disabled!="disabled"]');
      });

      it('should add a comment on Homengo and hide comment form', function() {
        element('#star3').click();
        input('comment.body').enter('Une idée sympa! test');
        element('button:contains(Envoyer)').click();
        sleep(0.5);
        expectUniqueElement('p:contains(Une idée sympa! test):visible');
        expectNonexistentElement('#textarea:visible');
      });

      it('should delete a comment on Homengo', function() {
        element('i.icon-trash:visible').click();
        expectNonexistentElement('p:contains(Une idée sympa! test):visible');
        disconnexion();
      });
    });
  });
});
