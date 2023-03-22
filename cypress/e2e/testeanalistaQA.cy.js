describe('Teste Analista QA - PagBrasil', () => {

  /* Visitando a página e selecionando o formulário a ser preenchido */
  beforeEach('acessar url formulario', () => {
    cy.visit('https://www.pagbrasil.com/support/')
    cy.get('#im-already-using-pagbrasiland-have-questions').click()
  })

  /* Formulários com dados válidos para testar o envio desses dados */
  it('Preencher formulário com dados válidos e enviar', () => {
    cy.get('#Name').click()
    cy.get('#Name').type('Wesley Barato')
    cy.get('#Email').click()
    cy.get('#Email').type('teste@teste.com')
    cy.get('#Company').click()
    cy.get('#Company').type('PagBrasil')
    cy.get('#Website').click()
    cy.get('#Website').type('https://www.pagbrasil.com/')
    cy.get('#Phone').click()
    cy.get('#Phone').type('(51)99999-9999')
    cy.get('#Inquiry').click()
    cy.get('#Inquiry').type('aqui vai um texto para testar o campo inquiry')
    cy.contains('button', 'Submit').click()

  })
  /* Criado um .json para conter os dados que vão ser usados para forçar os erros na aplicação e ver se está funcionando.
  Criado em outro arquivo para deixar o código mais organizado */
  const dados = require('../fixtures/dadosparateste.json')

  /*Dentro do forEach, cada elemento da coleção dados está sendo referenciada como dado.
    Dessa forma, substituir por dado.email irá retornar para cada item da massa de dados a propriedade corretamente. */
  dados.forEach(dado => {

  /* Formulário preenchido com dados inválidos ou maiores do que permitido para testar as restrições de cada campo */
    it('Preencher formulário com dados inválidos', () => {
      /* dados.name vem do .json que temos com o nome ultrapassando o limite de 225 caracteres*/
      cy.get('#Name').click()
      cy.get('#Name').type(dado.name)
      /* dados.email possui um email sem arroba(@) */
      cy.get('#Email').click()
      cy.get('#Email').type(dado.email)
      /* dados.company possui mais caracteres que o limite permitido de 200 */
      cy.get('#Company').click()
      cy.get('#Company').type(dado.company)
      /* dados.website nao segue o padrão de URL que o formulário aceita */
      cy.get('#Website').click()
      cy.get('#Website').type(dado.website)
      /* dados.phone não segue a máscara permitida com o padrão brasileiro */
      cy.get('#Phone').click()
      cy.get('#Phone').type(dado.phone)
      /* dados.inquiry possui um texto com mais de 500 caracteres para testar o limite do campo */
      cy.get('#Inquiry').click()
      cy.get('#Inquiry').type(dado.inquiry)
      /* clicando por ultimo no botão submit para ver se ele aceita com os erros em cada campo */
      cy.contains('button', 'Submit').click()
    
    })

  })

/* Formulário preenchido com dados inválidos ou maiores do que permitido para testar as restrições de cada campo */

})


