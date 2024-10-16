## O que é Node.js?

Node.js é um runtime de JavaScript construído sobre o motor V8 do Google Chrome, que permite executar código JavaScript fora de um navegador, como em servidores ou aplicativos de linha de comando. Isso significa que você pode usar JavaScript não apenas para front-end, mas também para construir aplicações de back-end, manipular arquivos, interagir com bancos de dados e muito mais.

Node.js usa um modelo de execução single-threaded com operações de entrada e saída (I/O) não bloqueantes, o que o torna eficiente e capaz de lidar com um grande número de conexões simultâneas, especialmente em aplicações que dependem muito de operações de I/O, como acesso a banco de dados e redes.

### História do Node.js

Node.js foi criado por Ryan Dahl em 2009. A ideia surgiu da necessidade de um sistema que pudesse lidar de maneira eficiente com muitas conexões simultâneas, algo que as linguagens de programação tradicionais como Java e PHP tinham dificuldades, especialmente em servidores web. Dahl identificou uma grande vantagem no modelo de execução assíncrona e na V8 JavaScript Engine, que já havia provado ser eficiente no navegador Chrome.

### Modelo Single-threaded com I/O não bloqueante

Node.js usa um único thread para executar código JavaScript, o que significa que o tempo de CPU é gerido por um único processo. No entanto, ele é capaz de realizar operações assíncronas usando callbacks, promises, ou async/await, permitindo que continue processando outras requisições enquanto aguarda a conclusão de operações de I/O, como leitura de arquivos ou acessos a banco de dados.

Essa característica de não bloqueio é ideal para aplicações de alta concorrência, como servidores de APIs, chats em tempo real, jogos multiplayer, ou qualquer aplicação que precise lidar com múltiplas conexões ao mesmo tempo.

