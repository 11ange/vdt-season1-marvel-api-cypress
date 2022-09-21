/// <reference types='Cypress' />
// const cypress = require("cypress")

describe('POST /characters', () => {

  before(() => {
    cy.zeraConta()
    cy.setToken()
  })

  it('deve cadastrar um personagem', () => {

    const personagem = {
      name: 'Teste2',
      age: '2222',
      alias: 'Sr teste2',
      team: ['Nenhum'],
      active: true
    }

    cy.criaPersonagem(personagem)
      .then(function (response) {
        expect(response.status).to.eql(201)
        expect(response.body.character_id.length).to.eql(24)
      })
  })

  context('Teste de personagem duplicado', () => {

    const personagem = {
      name: 'Teste3',
      alias: 'Sra teste3',
      team: ['Oi'],
      active: true
    }

    before(() => {
      cy.criaPersonagem(personagem)
        .then(function (response) {
          expect(response.status).to.eql(201)
        })
    })

    it('Não deve cadastrar um personagem duplicado', () => {
      cy.criaPersonagem(personagem)
        .then(function (response) {
          expect(response.status).to.eql(400)
          expect(response.body.error).to.eql('Duplicate character')
        })
    })
  })

  context('quando falta um campo obrigatório', function () {
    const massaCamposObrigatorios = [
      [
        {
          alias: "Doutor Estranho",
          team: ["vingadores"],
          active: false
        },
        {
          campo: "name"
        }
      ],
      [
        {
          name: "Stephen Vincent Strange",
          team: ["vingadores"],
          active: false
        },
        {
          campo: "alias"
        }
      ],
      [
        {
          name: "Stephen Vincent Strange",
          alias: "Doutor Estranho",
          active: false
        },
        {
          campo: "team"
        }
      ],
      [
        {
          name: "Stephen Vincent Strange",
          alias: "Doutor Estranho",
          team: ["vingadores"]
        },
        {
          campo: "active"
        }
      ]
    ]

    massaCamposObrigatorios.forEach((item) => {
      it(`não deve cadastrar sem o campo ${item[1].campo}`, () => {
        cy.criaPersonagem(item[0]).then((response) => {
          expect(response.status).to.eql(400)
          expect(response.body.validation.body.message).to.eql(`"${item[1].campo}" is required`)
        })
      })
    })
  })
})