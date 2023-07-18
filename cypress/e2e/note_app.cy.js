describe('Note app', function () {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'Super User',
      username: 'root',
      password: 'real',
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users/`, user)
    cy.visit('')
  })
  it('Front page can be opened', function () {
    cy.contains('Notes')
    cy.contains(
      'Note app, Department of Computer Science, University of Helsinki 2023'
    )
  })

  it('Login form can be opened', function () {
    cy.contains('Login').click()
  })

  it('User can login', function () {
    cy.contains('Login').click()
    cy.get('#username').type('root')
    cy.get('#password').type('real')
    cy.get('#login-button').click()

    cy.contains('Super User logged in!')
  })

  it('Login fails w/ wrong password', function () {
    cy.contains('Login').click()
    cy.get('#username').type('root')
    cy.get('#password').type('Wrong password')
    cy.get('#login-button').click()

    cy.get('.error').should('contain', 'Wrong credentials')
    //cy.get('.error').should('have.css', 'color', 'rgb(255,0,0)')
    cy.get('.error').should('have.css', 'border-style', 'solid')

    cy.get('html').should('not.contain', 'Super User logged in')
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'root', password: 'real' })
    })

    it('A new note can be created', function () {
      cy.contains('New note').click()
      cy.get('input').type('A note tested by Cypress')
      cy.contains('Save').click()
      cy.contains('A note tested by Cypress')
    })

    describe('When a note exists', function () {
      beforeEach(function () {
        cy.createNote({
          content: 'Another Cypress note',
          important: true,
        })
      })

      it('It can be made not important', function () {
        cy.contains('Another Cypress note')
          .parent()
          .find('button')
          .as('theButton')

        cy.get('@theButton').click()
        cy.get('@theButton').should('contain', 'Make important')
      })
    })

    describe('When several notes exist', function () {
      beforeEach(function () {
        cy.createNote({ content: 'first note', important: false })
        cy.createNote({ content: 'second note', important: false })
        cy.createNote({ content: 'third note', important: false })
      })

      it('One of those can be made important', function () {
        cy.contains('second note').parent().find('button').as('theButton')
        cy.get('@theButton').click()
        cy.get('@theButton').should('contain', 'Make not important')
      })
    })
  })
})
