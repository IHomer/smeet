describe('smeet', () => {
  it('should display welcome message', () => {
    cy.visit('/')
    cy.contains('h1', 'Hello Vue 3 + TypeScript + Vite')
  });
});
