# Lista de compras interativa em HTML

## Objetivos:

- Criar uma funcionalidade HTML utilizando os fundamentos básicos de HTML, Js e CSS.
- Aprender sobre a manipulação de elemnetos HTML utilizando Js.
- Aplicação do framework web Bootstrap para estilização e tratamento de responsividade
- Integrar a lista de compras com uma API

## Descrição do Projeto:

Criação de uma lista de compras em HTML que permita ao usuário adicionar, remover e editar itens da
lista. O caminho escolhido para gerar esta lista foi criando uma tabela dinâmica em HTML.
O objetivo é entregar ao final do projeto uma lista de compras com estética agradável e usabilidade boa.

## Notas:

 - Na primeira etapa do projeto foram trabalhados os elementos básicos, como a criação da tabela dinâmica com os campos item, quantidade e botão "delete".
   Nesta etapa não foi trabalhada a resposnividade e a validação de entradas nulas ou repetidas.
 - Na segunda etapa do projeto foi tratada a responsividade da aplicação utilizando Bootstrap e a validação de entradas vazias ou duplicadas.
 - Na terceira etapa do projeto foram adicionadas as funcionalidades de marcar um item como adquirido, e também permitir ao usuário editar um item na lista. Para     cumprir esses requisitos foi necessário salvar os dados do usuário como um objeto e modificar a lógica de renderização para que fosse ditada pelos estados do       dado, ex: A lógica de renderização quando marcamos um objeto como adqirido (estilo do texto, cor da linha, etc) é ditada pela propriedade `ìsAcquired` do objeto     que representa um item na lista.
 - Na quarta etapa do projeto foi tratada a integração da lista com uma API. A API foi desenvolvida pelo mentor [Cassios Marques](https://github.com/cassios),
   o projeto desta API está disponível no GitHub da [PodCodar](https://github.com/podcodar/shop-list-backend).
    e hosedada no Heroku.
## Próximos desenvolvimentos: 
Deseja-se realizar algumas melhorias neste projeto, dentre elas pode-se destacar:
 - Integração da API com um banco de dados para salvar os items cadastrados.
 - Alterações de estilo e design com o objeto de obter um design elegante e moderno
 - Categorização dos items e geração de listas por categorias.
 - Refatoração do código utilizando React.js + Chakra UI

## Link para acessar gitpage do projeto:

https://borgesgfj.github.io/lista-de-compras-interativa/
