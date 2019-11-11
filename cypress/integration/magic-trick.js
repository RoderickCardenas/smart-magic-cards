const suits = ['hearts', 'spades', 'diamonds', 'clubs']
const sortedCardsClasses = []
suits.forEach(suit =>
  [...Array(13)].forEach((_, i) => sortedCardsClasses.push(`${suit}-${i + 1}`))
)

describe('Play game', () => {
  it('Visits the game and play', () => {
    cy.visit('./index.html')
    cy.get('.navbar-brand img').should('have.exist')
    cy.get('.navbar-brand')
      .should('have.attr', 'href')
      .and('eq', 'https://www.autoenrolment.co.uk')
    cy.get('h1').should('have.text', 'Become a software engineer at Smart')
    cy.get('h3').should(
      'have.text',
      'Join Smart by simply performing a magic trick'
    )
    cy.get('p').should('have.exist')
    cy.get('#start-game')
      .should('have.text', "Let's get started")
      .click()
    cy.get('[class*="hearts-"]').should('have.length', 13)

    cy.get('#start-game').should('have.not.exist')
    suits.forEach(suit => {
      cy.get(`[class*="${suit}-"]`).should('have.length', 13)
    })
    cy.get('.card').then(cards => {
      const allCardClasses = [...cards].map(card => card.classList[1])
      expect(allCardClasses).to.deep.equal(sortedCardsClasses)
    })

    cy.contains('Shuffle').click()
    cy.get('.card').then(cards => {
      const allCardClasses = [...cards].map(card => card.classList[1])
      expect(allCardClasses).to.not.deep.equal(sortedCardsClasses)
    })

    cy.contains('Show/Hide').click()
    cy.get('.cards-wrapper').should('have.class', 'hidden')

    cy.contains('Show/Hide').click()
    cy.get('.cards-wrapper').should('not.have.class', 'hidden')

    cy.contains('Magic').click()
    cy.get('.card').then(cards => {
      const allCardClasses = [...cards].map(card => card.classList[1])
      expect(allCardClasses).to.deep.equal(sortedCardsClasses)
    })
  })
})
