// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('setToken', () => {
    cy.api({
        method: 'POST',
        url: '/sessions',
        body: {
            "email": "luis@nda.com",
            "password": "qa-cademy"
        },
        failOnStatusCode: false
    }).then(function (response) {
        expect(response.status).to.eql(200)
        // cy.log(response.body.token)
        Cypress.env('token', response.body.token)
    })
})

Cypress.Commands.add('zeraConta', () => {
    cy.api({
        method: 'DELETE',
        url: '/back2thepast/6328a0fe8b7b470016879ab2',
        failOnStatusCode: false
    }).then(function (response) {
        expect(response.status).to.eql(200)
    })
})

Cypress.Commands.add('criaPersonagem', (payload) => {
    cy.api({
        method: 'POST',
        url: '/characters',
        body: payload,
        headers: {
            Authorization: Cypress.env('token')
        },
        failOnStatusCode: false
    }).then(function (response) {
        return response
    })
})

Cypress.Commands.add('buscaPersonagens', () => {
    cy.api({
        method: 'GET',
        url: '/characters',
        headers: {
            Authorization: Cypress.env('token')
        },
        failOnStatusCode: false
    }).then(function (response) {
        return response
    })
})

Cypress.Commands.add('populaPersonagens', (payload) => {
    payload.forEach(function (p) {
        cy.criaPersonagem(p)
    })
})

Cypress.Commands.add('buscaPersonagemPorNome', (nomePersonagem) => {
    cy.api({
        method: 'GET',
        url: '/characters',
        qs: { name: nomePersonagem },
        headers: {
            Authorization: Cypress.env('token')
        },
        failOnStatusCode: false
    }).then(function (response) {
        return response
    })
})

Cypress.Commands.add('buscaPersonagemPorId', (id) => {
    cy.api({
        method: 'GET',
        url: '/characters/' + id,
        headers: {
            Authorization: Cypress.env('token')
        },
        failOnStatusCode: false
    }).then(function (response) {
        return response
    })
})

Cypress.Commands.add('apagaPersonagemPorId', (id) => {
    cy.api({
        method: 'DELETE',
        url: '/characters/' + id,
        headers: {
            Authorization: Cypress.env('token')
        },
        failOnStatusCode: false
    }).then(function (response) {
        return response
    })
})