/// <reference types='Cypress' />

describe("GET /characters", () => {

    const personagens = [
        {
            name: 'Teste',
            alias: 'AAAAAAAAA',
            team: ['Nenhum'],
            active: false
        },
        {
            name: 'Nanana',
            alias: 'SBBBBBBBBBB',
            team: ['gdddsfsdf'],
            active: true
        },
        {
            name: 'Blablabla',
            age: '2222',
            alias: 'CCCCCCCCCC',
            team: ['jkuktydjrtsh'],
            active: true
        }
    ]
    before(() => {
        cy.zeraConta()
        cy.setToken()
        personagens.forEach(function (p) {
            cy.criaPersonagem(p)
        })
    })

    it('Deve retornar uma lista de personagens', () =>
        cy.buscaPersonagens().then(function (response) {
            expect(response.status).to.eql(200)
            expect(response.body).to.be.a('array')
            expect(response.body.length).greaterThan(0)
        })
    )

    it('busca personagem por nome', () => {
        cy.buscaPersonagemPorNome('Teste')
            .then(function (response) {
                expect(response.status).to.eql(200)
                expect(response.body.length).to.eql(1)
                expect(response.body[0].alias).to.eql('AAAAAAAAA')
                expect(response.body[0].active).to.eql(false)
                expect(response.body[0].team).to.eql(['Nenhum'])
            })
    })
})

describe("GET /characters/id", () => {
    const personagem =
    {
        name: 'FSDFSLFKS KFGDS',
        alias: 'YDRTGSZDV',
        team: ['Nenhum'],
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

        it('deve buscar o personagem pelo ID', () => {
            const id = Cypress.env('ID')
            cy.buscaPersonagemPorId(id)
                .then(function (response) {
                    expect(response.status).to.eql(200)
                    expect(response.body.alias).to.eql('YDRTGSZDV')
                    expect(response.body.active).to.eql(true)
                    expect(response.body.team).to.eql(['Nenhum'])
                })
        })
    })

    it('deve retornar 404 com ID inválido', () => {
        const id = '123456789012345678901234'
        cy.buscaPersonagemPorId(id)
            .then(function (response) {
                expect(response.status).to.eql(404)
            })
    })
})