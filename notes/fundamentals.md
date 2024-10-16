## Fundamentos do Node.js

### Módulos e CommonJS

Em Node.js, os módulos são a base para organizar e reutilizar código. A implementação original de módulos em Node.js é o sistema CommonJS (CJS), que permite dividir seu código em múltiplos arquivos e, assim, modularizar e organizar melhor suas aplicações.

* **Como os módulos funcionam no CommonJS:**

* Exportação de módulos: Para que outros arquivos possam usar funções, objetos ou variáveis, eles precisam ser exportados.
* Importação de módulos: Um módulo pode ser importado em outro arquivo usando require.

Exemplo de exportação e importação em CommonJS:

```javascript
// math.js
function add(a, b) {
  return a + b;
}

module.exports = {
  add
};
```

Importação:

```javascript
// app.js
const math = require('./math');

console.log(math.add(2, 3)); // 5
```

### Módulos nativos do Node.js

Node.js vem com uma série de módulos nativos (também chamados de "built-in" ou "core modules") que fornecem funcionalidades essenciais para desenvolvimento de aplicações server-side. Eles não precisam ser instalados via NPM, pois já fazem parte do Node.js.

Exemplos de módulos nativos:

* **fs (File System):** Fornece APIs para manipular o sistema de arquivos.
* **path:** Fornece utilitários para trabalhar com caminhos de arquivos e diretórios.
* **http:** Utilizado para criar servidores web e lidar com requisições HTTP.

Esses módulos são amplamente utilizados no desenvolvimento de aplicações Node.js e ajudam a interagir com o sistema de arquivos, criar servidores HTTP, manipular streams, entre outros.

### ESModules

Os ESModules (ESM) representam um padrão moderno de módulos em JavaScript, introduzido no ECMAScript 2015 (ES6). Eles permitem que você organize seu código em módulos reutilizáveis, facilitando a importação e exportação de funcionalidades entre arquivos. Aqui estão os principais conceitos e características de como os módulos funcionam com ESM: 

**Estrutura dos Módulos ES**

Exportação: Para tornar funções, objetos ou variáveis disponíveis para outros módulos, você deve exportá-los usando as palavras-chave export ou export default.

Importação: Para usar as funcionalidades exportadas de um módulo, você deve importá-las em outro arquivo usando a palavra-chave import.

**Características dos ESModules**

**Assíncronos:** A importação de módulos pode ser feita de maneira assíncrona. Os módulos podem ser carregados sob demanda usando import() em vez de import estático. Isso é especialmente útil para otimização de desempenho, carregando módulos apenas quando necessário.

**Escopo de Módulo:** Cada módulo tem seu próprio escopo. Variáveis e funções definidas em um módulo não são acessíveis em outros módulos a menos que sejam explicitamente exportadas. Isso ajuda a evitar conflitos de nomes.

**Estrutura de Diretórios:** O ESM requer que você especifique a extensão do arquivo (.js, .mjs, etc.) ao importar arquivos locais. Além disso, a importação de módulos externos não requer a extensão, pois o Node.js resolve isso automaticamente.

**Módulos em package.json:** Para usar ESModules em um projeto Node.js, você deve definir o tipo de módulo no seu package.json usando:

**Requisitos de Importação:** Ao usar ESModules, você deve importar módulos de forma consistente. Não é permitido misturar require (CommonJS) e import em um mesmo arquivo. Você deve escolher um dos dois sistemas para cada módulo.