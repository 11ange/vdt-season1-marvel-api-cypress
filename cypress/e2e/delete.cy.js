
describe("DELETE /characters/id", () => {
    const personagem =
    {
        name: 'Trwiepfkçsld fsdfsdfs fsdfs',
        alias: 'Oterfssgsda',
        team: ['YEGRSD'],
        active: true
    }

    before(() => {
        cy.zeraConta()
        cy.setToken()
    })


    context('Quando tenho um personagem cadastrado', () => {
        before(() => {
            cy.criaPersonagem(personagem)
                .then(function (response) {
                    Cypress.env('ID', response.body.character_id)
                })
        })

        it('deve ser possível apagar o personagem pelo ID', () => {
            const id = Cypress.env('ID')
            cy.apagaPersonagemPorId(id)
                .then(function (response) {
                    expect(response.status).to.eql(204)
                })
        })

        after(() => {
            const id = Cypress.env('ID')
            cy.buscaPersonagemPorId(id)
                .then(function (response) {
                    expect(response.status).to.eql(404)
                })
        })
    })

    it('deve retornar 404 com ID inválido', () => {
        const id = '123456789012345678901234'
        cy.apagaPersonagemPorId(id)
            .then(function (response) {
                expect(response.status).to.eql(404)
            })
    })
})