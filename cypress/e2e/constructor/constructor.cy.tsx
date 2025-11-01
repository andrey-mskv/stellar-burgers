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

  describe('base', () => {
    it('shoud download ingredients', () => {
      cy.wait('@getIngredients').its('response.statusCode').should('eq', 200);
      cy.get('[data-cy=constructor-page]').should('be.visible');
    });
    it('shoud ingredients is exist', () => {
      const isExist = (title: string) => cy.contains(title).should('exist');
      isExist('Краторная булка N-200i');
      isExist('Биокотлета из марсианской Магнолии');
      isExist('Соус Spicy-X');
    });

    it('add ingredient to constructor by button', () => {
      const add = (title: string) =>
        cy.contains('[data-cy=ingredient-item]', title).find('button').click();
      add('Краторная булка N-200i');
      add('Биокотлета из марсианской Магнолии');
      add('Соус Spicy-X');
    });
  });

  describe('modal', () => {
    const openModal = (title: string) =>
      cy.contains('[data-cy=ingredient-item]', title).click();
    it('open modal', () => {
      openModal('Краторная булка N-200i');
      cy.get('[data-cy=modal]').should('be.visible');
    });
    it('close modal by button', () => {
      openModal('Биокотлета из марсианской Магнолии');
      cy.get('[data-cy=modal]').find('button').click().should('not.exist');
    });
    it('close modal by overlay', () => {
      openModal('Соус Spicy-X');
      cy.get('[data-cy=modal-overlay]')
        .click({ force: true })
        .should('not.exist');
    });
  });

  describe('order', () => {
    it('makeorder', () => {
      // добавляем ингредиенты в конструктор
      const add = (title: string) =>
        cy.contains('[data-cy=ingredient-item]', title).find('button').click();
      add('Краторная булка N-200i');
      add('Биокотлета из марсианской Магнолии');
      add('Соус Spicy-X');

      // проверяем что в конструкторе есть булки
      cy.get('[data-cy=bun-top]')
        .contains('Краторная булка N-200i')
        .should('exist');
      cy.get('[data-cy=bun-bottom]')
        .contains('Краторная булка N-200i')
        .should('exist');

      // проверяем что в конструкторе есть ингредиенты
      cy.get('[data-cy=ingredients]').then((item) => {
        const text = item.text();
        expect(
          text.includes('Биокотлета из марсианской Магнолии') ||
            text.includes('Соус Spicy-X')
        ).to.be.true;
      });

      // перехват заказа
      cy.intercept('POST', '**/orders', { fixture: 'order.json' }).as('order');

      // оформляем заказ
      cy.get('[data-cy=burger-constructor]')
        .contains('button', 'Оформить заказ')
        .click();

      // ожидаем ответ
      cy.wait('@order');

      // проверяем что в модальном окне правильный номер заказа
      cy.fixture('order.json').then((data) => {
        const orederNumber = data.order.number;
        cy.get('[data-cy=modal]').should('be.visible');
        cy.get('[data-cy=order-number]').should('contain', orederNumber);
      });

      // Закрываем модалку, убеждаемся, что её нет
      cy.get('[data-cy=close-modal]').click();
      cy.get('[data-cy=modal]').should('not.exist');

      // проверяем что в конструкторе нет ингредиентов
      cy.get('[data-cy=bun-top]').should('not.exist');
      cy.get('[data-cy=but-bottom]').should('not.exist');
      cy.get('[data-cy=ingredients]').should('contain', 'Выберите начинку');
    });
  });
});
