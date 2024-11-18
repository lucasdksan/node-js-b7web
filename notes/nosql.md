## No SQL

NoSQL é um termo que abrange uma ampla gama de bancos de dados não relacionais projetados para lidar com tipos variados de dados e padrões de acesso que não são bem suportados por bancos de dados relacionais tradicionais (RDBMS). Diferente do modelo relacional, que organiza os dados em tabelas com esquemas predefinidos, os bancos NoSQL são mais flexíveis e permitem trabalhar com estruturas de dados como documentos, pares chave-valor, grafos ou colunas largas.4

### Principais Características do NoSQL

* **Flexibilidade no Modelo de Dados:**
    - Os bancos NoSQL geralmente não exigem esquemas rígidos. Isso facilita a adaptação a mudanças nos requisitos do sistema e no modelo de dados.

* **Escalabilidade Horizontal:**
    - Diferentemente dos bancos relacionais, que frequentemente escalam verticalmente (adicionando mais recursos a um único servidor), bancos NoSQL são projetados para escalar horizontalmente. Isso significa que podem ser adicionados mais servidores à rede para lidar com o aumento de dados ou carga.
* **Desempenho Elevado:**
    - Graças à especialização no armazenamento e recuperação de tipos específicos de dados, muitos bancos NoSQL oferecem desempenho superior em consultas específicas em comparação com RDBMS.

* **Sistemas Distribuídos:**
    - Muitos bancos NoSQL são construídos para operar de forma distribuída, tornando-os ideais para sistemas que requerem alta disponibilidade e tolerância a falhas.

* **Variedade de Estruturas de Dados:**
    - NoSQL suporta diferentes paradigmas de armazenamento, como:
        * Documentos (ex.: MongoDB)
        * Chave-Valor (ex.: Redis, DynamoDB)
        * Grafos (ex.: Neo4j)
        * Colunas Largas (ex.: Cassandra, HBase)

### Para que é usado um banco de dados NoSQL?

Os bancos de dados NoSQL são amplamente usados em aplicativos da web em tempo real e big data, porque suas principais vantagens são alta escalabilidade e alta disponibilidade.

Os bancos de dados NoSQL também são a escolha preferida dos desenvolvedores, pois eles naturalmente aceitam um paradigma de desenvolvimento ágil, adaptando-se rapidamente aos requisitos em constante mudança. Os bancos de dados NoSQL permitem que os dados sejam armazenados de maneiras mais intuitivas e fáceis de entender, ou mais próximas da maneira como os dados são usados pelos aplicativos - com menos transformações necessárias ao armazenar ou recuperar usando APIs no estilo NoSQL. Além disso, os bancos de dados NoSQL podem aproveitar ao máximo a nuvem para oferecer tempo de inatividade zero.

### Quando escolher um banco de dados NoSQL?

Com empresas e organizações precisando inovar rapidamente, ser capaz de se manter ágil e continuar operando em qualquer escala faz parte do jogo. Os bancos de dados NoSQL oferecem esquemas flexíveis e também suportam uma variedade de modelos de dados que são ideais para a construção de aplicativos que requerem grandes volumes de dados e baixa latência ou tempos de resposta—por exemplo, jogos online e aplicativos da web de ecommerce.

### Quando não escolher um banco de dados NoSQL?

Os bancos de dados NoSQL normalmente dependem de dados desnormalizados, suportando os tipos de aplicativos que usam menos tabelas (ou contêineres) e cujos relacionamentos de dados não são modelados usando referências, mas sim como registros (ou documentos) incorporados. Muitos aplicativos de negócios de back-office clássicos em finanças, contabilidade e planejamento de recursos corporativos contam com dados altamente normalizados para evitar anomalias de dados, bem como a duplicação de dados. Esses são os tipos comuns de aplicações que não são adequadas para um Banco de Dados NoSQL.

Outra distinção dos bancos de dados NoSQL é a complexidade da consulta. Os bancos de dados NoSQL funcionam incrivelmente bem com consultas em uma única tabela. No entanto, conforme a complexidade das consultas aumenta, os bancos de dados relacionais são uma escolha melhor. O banco de dados NoSQL normalmente não oferece junções complexas, subconsultas e aninhamento de consultas em uma cláusula WHERE.

Às vezes, porém, não é necessário escolher entre bancos de dados relacionais e não relacionais. Em muitas ocasiões, as empresas optaram por bancos de dados que oferecem um modelo convergente, no qual podem empregar uma combinação de modelos de dados relacionais e não relacionais. Essa abordagem híbrida oferece maior flexibilidade no tratamento de diferentes tipos de dados, ao mesmo tempo que garante a consistência de leitura e gravação sem degradar o desempenho.
