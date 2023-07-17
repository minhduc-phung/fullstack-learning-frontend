describe('Note app', function () {
  it('Front page can be opened', function () {
    cy.visit('http://localhost:3000')
    cy.contains('Notes')
    cy.contains(
      'Note app, Department of Computer Science, University of Helsinki 2023'
    )
  })
})
