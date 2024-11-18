## Middleware

Os middlewares são componentes fundamentais no desenvolvimento de aplicações Node.js, especialmente quando você utiliza frameworks como Express. Eles funcionam como intermediários no ciclo de requisição e resposta, permitindo a modificação de objetos req e res, além de controlar se a execução continua para o próximo middleware ou encerra o ciclo com uma resposta.

### O que é um Middleware?

Um middleware é uma função que:

* Recebe os objetos req (requisição), res (resposta) e next (função que invoca o próximo middleware na cadeia).
* Pode modificar a requisição e/ou resposta.
* Pode terminar o ciclo de requisição enviando uma resposta ao cliente.
* Pode chamar next() para passar o controle para o próximo middleware.

### Melhores Práticas

* Mantenha as funções de middleware pequenas: Cada middleware deve fazer uma única tarefa, como validação, autenticação ou log.

* Evite bloquear a cadeia: Sempre chame next() ou envie uma resposta com res.

* Use middlewares de terceiros confiáveis: Utilize bibliotecas populares para tarefas comuns como parsing e autenticação.

* Middleware de erros sempre por último: Garanta que o manipulador de erros seja o último middleware registrado.

* Ordem importa: Lembre-se de que middlewares são executados na ordem em que foram definidos.