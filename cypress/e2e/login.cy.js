describe('Login Form Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  });

  it('Başarılı giriş olduğunda form submitleniyor mu?', () => {
    cy.get('input[name="email"]').type('erdem.guntay@wit.com.tr');
    cy.get('input[name="password"]').type('9fxIH0GXesEwH_I');
    cy.get('input[name="terms"]').check();
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/Success');
  });
  it('Hepsini yanlış girince tüm hatalar ekranda gözüküyor mu?', () => {
    cy.get('input[name="email"]').type('invalid-email');
    cy.get('input[name="password"]').type('123');
    cy.get('input[name="terms"]').uncheck();
    cy.get('button[type="submit"]').should('be.disabled');
    cy.get('input[name="email"]').siblings('div').should('contain.text', 'Please enter a valid email address');
    cy.get('input[name="password"]').siblings('div').should('contain.text', 'Password must be at least 4 characters long');
  });

  it('Email yanlış girildiğinde ve diğerleri doğru olduğunda buton disabled kalıyor mu?', () => {
    cy.get('input[name="email"]').type('invalid-email');
    cy.get('input[name="password"]').type('9fxIH0GXesEwH_I');
    cy.get('input[name="terms"]').check();
    cy.get('button[type="submit"]').should('be.disabled');
    cy.get('input[name="email"]').siblings('div').should('contain.text', 'Please enter a valid email address');
  });

  it('Password yanlış girildiğinde ve diğerleri doğru olduğunda buton disabled kalıyor mu?', () => {
    cy.get('input[name="email"]').type('erdem.guntay@wit.com.tr');
    cy.get('input[name="password"]').type('123');
    cy.get('input[name="terms"]').check();
    cy.get('button[type="submit"]').should('be.disabled');
    cy.get('input[name="password"]').siblings('div').should('contain.text', 'Password must be at least 4 characters long');
  });

  it('Hem geçersiz email hem de geçersiz şifre girince iki hata mesajı da gözüküyor mu?', () => {
    cy.get('input[name="email"]').type('invalid-email');
    cy.get('input[name="password"]').type('123');
    cy.get('input[name="terms"]').check();
    cy.get('button[type="submit"]').should('be.disabled');
    cy.get('input[name="email"]').siblings('div').should('contain.text', 'Please enter a valid email address');
    cy.get('input[name="password"]').siblings('div').should('contain.text', 'Password must be at least 4 characters long');
  });

  it('Checkbox işaretlenmediğinde buton disabled oluyor mu?', () => {
    cy.get('input[name="email"]').type('erdem.guntay@wit.com.tr');
    cy.get('input[name="password"]').type('9fxIH0GXesEwH_I');
    cy.get('input[name="terms"]').uncheck();
    cy.get('button[type="submit"]').should('be.disabled');
  });
});
