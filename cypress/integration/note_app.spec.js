describe('Note App', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')

    cy.request('POST', 'http://localhost:3001/api/testing/reset')

    const user = {
      name: 'Miguel',
      username: 'midudev',
      password: 'lamidupassword'
    }

    cy.request('POST', 'http://localhost:3001/api/users/', user)
  })
  it('Frontpage can be opened', () => {
    cy.contains('Notes')
  })

  it('Login Form can be opened', () => {
    cy.contains('Show Login').click()
  })

  it('User can login', () => {
    cy.contains('Show Login').click()
    cy.get('[data-test-id="login-form"] input[name="Username"]').type(
      'midudev'
    )
    cy.get('[data-test-id="login-form"] input[name="Password"]').type(
      'lamidupassword'
    )
    cy.get('[data-test-id="login-form"] button').click()
    cy.contains('New note')
  })

  it('login fails with wrong password', () => {
    cy.contains('Show Login').click()
    cy.get('[name="Username"]').type('midudev')
    cy.get('[name="Password"]').type('password-incorrecta')
    cy.get('[data-test-id="login-form"] button').click()

    cy.get('.error')
      .should('contain', 'Wrong credentials')
      .should('have.css', 'color', 'rgb(255, 0, 0)')
      .should('have.css', 'border-style', 'solid')
  })

  describe('when logged in', () => {
    beforeEach(() => {
      cy.login({ username: 'midudev', password: 'lamidupassword' })
    })

    it('a new note can be created', () => {
      const noteContent = 'a note created by cypress'
      cy.contains('New note').click()
      cy.get('[data-test-id="note-form"] input').type(noteContent)
      cy.contains('Create note').click()
      cy.contains(noteContent)
    })

    describe('and a note exists', () => {
      beforeEach(() => {
        cy.createNote({
          content: 'This is the first note',
          important: false
        })
        cy.createNote({
          content: 'This is the second note',
          important: false
        })
        cy.createNote({
          content: 'This is the third note',
          important: false
        })
      })

      it('can be made important', () => {
        cy.contains('This is the second note').as('theNote')

        cy
          .get('@theNote')
          .contains('make important')
          .click()

        cy
          .get('@theNote')
          .contains('make not important')
      })
    })
  })
})
