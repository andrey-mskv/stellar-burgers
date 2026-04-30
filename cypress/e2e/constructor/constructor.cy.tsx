import { DATA_CY } from '@datacy';

describe('burgerConstructor', function () {
  beforeEach(() => {
    cy.setCookie('accessToken', 'Bearer FAKE_ACCESS_TOKEN');

    cy.intercept('GET', 'ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
    cy.intercept('GET', '**/auth/user', { fixture: 'user.json' }).as(
      'authUser'
    );

    cy.visit('/'); // 'http://localhost:4000'

    cy.wait(['@getIngredients', '@authUser']);
  });

  afterEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  describe('base', () => {
    it('shoud download ingredients', () => {
      cy.wait('@getIngredients').its('response.statusCode').should('eq', 200);
      cy.get(`[data-cy=${DATA_CY.CONSTRUCTOR_PAGE}]`).should('be.visible');
    });
    it('shoud ingredients is exist', () => {
      const isExist = (title: string) => cy.contains(title).should('exist');
      isExist('Краторная булка N-200i');
      isExist('Биокотлета из марсианской Магнолии');
      isExist('Соус Spicy-X');
    });

    it('add ingredient to constructor by button', () => {
      const add = (title: string) =>
        cy
          .contains(`[data-cy=${DATA_CY.INGREDIENT_ITEM}]`, title)
          .find('button')
          .click();
      add('Краторная булка N-200i');
      add('Биокотлета из марсианской Магнолии');
      add('Соус Spicy-X');
    });
  });

  describe('modal', () => {
    const openModal = (title: string) =>
      cy.contains(`[data-cy=${DATA_CY.INGREDIENT_ITEM}]`, title).click();
    it('open modal', () => {
      const title = 'Краторная булка N-200i';
      openModal(title);

      // проверяем что модальное окно открылась
      cy.get(`[data-cy=${DATA_CY.MODAL}]`).should('be.visible');
      // ... в модальном окне правильный контент
      cy.get(`[data-cy=${DATA_CY.MODAL}]`).contains(title).should('be.visible');
      // ... в модальном окне есть картинка ингредиента
      cy.get(`[data-cy=${DATA_CY.MODAL}] img`).should('have.attr', 'src');
      // ... в модальном окне есть состав ингредиента
      cy.get(`[data-cy=${DATA_CY.MODAL}]`).within(() => {
        cy.contains('Калории').should('exist');
        cy.contains('Белки').should('exist');
        cy.contains('Жиры').should('exist');
        cy.contains('Углеводы').should('exist');
      });
    });
    describe('close modal', () => {
      afterEach(() => {
        cy.get(`[data-cy=${DATA_CY.MODAL}]`).should('not.exist');
      });
      it('..by button', () => {
        openModal('Биокотлета из марсианской Магнолии');
        cy.get(`[data-cy=${DATA_CY.MODAL}]`)
          .find('button')
          .click()
          .should('not.exist');
      });
      it('..by overlay', () => {
        openModal('Соус Spicy-X');
        cy.get(`[data-cy=${DATA_CY.MODAL_OVERLAY}]`).click({ force: true });
      });
      it('..by ESC', () => {
        openModal('Краторная булка N-200i');
        cy.get('body').type('{esc}', { force: true });
      });
    });
  });

  describe('order', () => {
    it('makeorder', () => {
      // добавляем ингредиенты в конструктор
      const add = (title: string) =>
        cy
          .contains(`[data-cy=${DATA_CY.INGREDIENT_ITEM}]`, title)
          .find('button')
          .click();
      add('Краторная булка N-200i');
      add('Биокотлета из марсианской Магнолии');
      add('Соус Spicy-X');

      // проверяем что в конструкторе есть булки
      cy.get(`[data-cy=${DATA_CY.BUN_TOP}]`)
        .contains('Краторная булка N-200i')
        .should('exist');
      cy.get(`[data-cy=${DATA_CY.BUN_BOTTOM}]`)
        .contains('Краторная булка N-200i')
        .should('exist');

      // проверяем что в конструкторе есть ингредиенты
      cy.get(`[data-cy=${DATA_CY.INGREDIENTS}]`).then((item) => {
        const text = item.text();
        expect(
          text.includes('Биокотлета из марсианской Магнолии') ||
            text.includes('Соус Spicy-X')
        ).to.be.true;
      });

      // перехват заказа
      cy.intercept('POST', '**/orders', { fixture: 'order.json' }).as('order');

      // оформляем заказ
      cy.get(`[data-cy=${DATA_CY.BURGER_CONSTRUCTOR}]`)
        .contains('button', 'Оформить заказ')
        .click();

      // ожидаем ответ
      cy.wait('@order');

      // проверяем что в модальном окне правильный номер заказа
      cy.fixture('order.json').then((data) => {
        const orederNumber = data.order.number;
        cy.get(`[data-cy=${DATA_CY.MODAL}]`).should('be.visible');
        cy.get(`[data-cy=${DATA_CY.ORDER_NUMBER}]`).should(
          'contain',
          orederNumber
        );
      });

      // Закрываем модалку, убеждаемся, что её нет
      cy.get(`[data-cy=${DATA_CY.CLOSE_MODAL}]`).click();
      cy.get(`[data-cy=${DATA_CY.MODAL}]`).should('not.exist');

      // проверяем что в конструкторе нет ингредиентов
      cy.get(`[data-cy=${DATA_CY.BUN_TOP}]`).should('not.exist');
      cy.get(`[data-cy=${DATA_CY.BUN_BOTTOM}]`).should('not.exist');
      cy.get(`[data-cy=${DATA_CY.INGREDIENTS}]`).should(
        'contain',
        'Выберите начинку'
      );
    });
  });
});
