describe('Todo App E2E Tests', () => {
    beforeEach(() => {
        cy.visit('/todos');
    });

    describe('Todo List Component', () => {
        it('should display the to-do list header', () => {
            cy.get('h1').should('contain.text', 'To-Do List');
        });

        it('should display the filter dropdown', () => {
            cy.get('select').should('exist');
            cy.get('select').select('Completed').should('have.value', 'completed');
        });

        it('should display to-do items', () => {
            cy.get('table').within(() => {
                cy.get('thead tr th').should('contain.text', 'Title');
                cy.get('tbody tr').should('have.length.at.least', 1);
            });
        });

        it('should navigate to the next page', () => {
            cy.get('.pagination .btn-secondary').contains('Next').click();
            cy.get('tbody tr').should('exist'); 
        });
    });
});
    describe('Todo Popup Component', () => {
        beforeEach(() => {
            cy.visit('/todos');
            cy.reload(); 
            cy.get('.modal').should('not.exist', { timeout: 10000 }); 
            cy.get('[data-testid="create-new-todo"]').click(); 
        });
    
        it('should display to-do details in view mode', () => {
            
            cy.get('[data-testid="view-todo-button"]').first().click({ force: true });
    
          
            cy.get('.modal-title').should('contain.text', 'To-Do Details');
            cy.get('.modal-body').within(() => {
                cy.get('p').should('contain.text', 'Title:');
                cy.get('p').should('contain.text', 'Description:');
                cy.get('p').should('contain.text', 'Status:');
            });
    
            
            cy.get('.modal .btn-secondary').click();
            cy.get('.modal').should('not.exist', { timeout: 10000 }); 
        });
    });
    