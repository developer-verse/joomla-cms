describe('Test in backend that the article form', () => {
  beforeEach(() => cy.doAdministratorLogin());
  afterEach(() => cy.task('queryDB', "DELETE FROM #__content WHERE title = 'Test article'"));

  it('can create an article', () => {
    cy.visit('/administrator/index.php?option=com_content&task=article.add');
    cy.get('#jform_title').clear().type('Test article');
    cy.clickToolbarButton('Save & Close');

    cy.get('#system-message-container').contains('Article saved.').should('exist');
    cy.contains('Test article');
  });

  it('can change access level of a test article', () => {
    cy.db_createArticle({ title: 'Test article' }).then((id) => {
      cy.visit(`administrator/index.php?option=com_content&task=article.edit&id=${id}`);
      cy.get('#jform_access').select('Special');
      cy.clickToolbarButton('Save & Close');

      cy.get('td').contains('Special').should('exist');
    });
  });
});