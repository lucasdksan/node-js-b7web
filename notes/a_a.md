## Autenticação e Autorização

A autenticação e autorização são pilares fundamentais de segurança em qualquer sistema. Ambos garantem que os usuários e sistemas interajam de maneira controlada e segura, mas têm propósitos diferentes:

### Autenticação

Autenticação é o processo de verificar a identidade de um usuário ou sistema. Ela responde à pergunta: "Quem é você?"

* Objetivo: Certificar-se de que quem está tentando acessar o sistema é realmente quem afirma ser.
* Exemplo comum: Login com nome de usuário e senha.
* Técnicas comuns:
    * Senhas: Combinadas com nomes de usuários.
    * Autenticação multifator (MFA): Inclui algo que você sabe (senha), algo que você tem (token) ou algo que você é (biometria).
    * Tokens JWT: Enviados ao cliente após autenticação e usados para sessões sem estado.

### Autorização

Autorização é o processo de determinar se um usuário autenticado tem permissão para realizar uma ação ou acessar um recurso. Ela responde à pergunta: "O que você pode fazer?"

* Objetivo: Garantir que o usuário tenha acesso apenas ao que é permitido.
* Exemplo comum: Diferentes permissões para administradores e usuários comuns.
* Técnicas comuns:
    * Baseada em funções (Role-Based Access Control, RBAC): Permissões atribuídas com base em papéis (por exemplo, admin, usuário).
    * Baseada em atributos (Attribute-Based Access Control, ABAC): Considera atributos do usuário, do recurso e do contexto.

### OTP

OTP (One-Time Password), ou senha de uso único, é uma sequência de caracteres ou números que é válida por uma única sessão de login ou transação. É uma das formas mais seguras de autenticação, utilizada amplamente em sistemas que precisam de uma camada adicional de segurança, como acesso a bancos, serviços online e aplicativos.

**Características do OTP:**

* Uso único: Cada OTP pode ser utilizado apenas uma vez. Mesmo que seja interceptado, não pode ser reutilizado.
* Validade limitada: Geralmente, um OTP é válido apenas por um curto período (ex.: 30 segundos a 5 minutos), reduzindo o risco de uso indevido.
* Gerado dinamicamente: É criado por algoritmos que garantem unicidade e imprevisibilidade.

**Tipos de OTP:**

* Baseado em tempo (TOTP):
    * O OTP muda periodicamente, por exemplo, a cada 30 segundos.
    * Baseia-se em um algoritmo que utiliza um relógio sincronizado entre o cliente e o servidor.
    * Exemplo: Google Authenticator.

* Baseado em eventos (HOTP):
    * Um novo OTP é gerado após cada evento (como a solicitação explícita pelo usuário).
    * Não depende do tempo, mas do contador sincronizado entre cliente e servidor.

**Como o OTP é gerado:**

* Chave secreta (Seed): Uma chave única compartilhada entre o servidor e o dispositivo do cliente.
* Algoritmos: Geralmente utilizam funções hash seguras (como HMAC-SHA1) para gerar as senhas.

**Vantagens:**

* Protege contra ataques de replay.
* Dificulta acessos não autorizados mesmo que a senha principal seja comprometida.
* Fácil de implementar e usar em diversas plataformas.

**Desafios:**

* Entrega confiável: Mensagens SMS podem ser atrasadas ou interceptadas.
* Requer sincronização: No caso de TOTPs, o relógio do cliente e do servidor devem estar sincronizados.
* Phishing: Um usuário pode ser enganado a fornecer o OTP a um invasor.

### Boas práticas

* Use HTTPS para proteger tokens durante a transmissão.
* Implemente expiração de tokens e renovações.
* Evite armazenar tokens sensíveis em locais inseguros (como localStorage).
* Considere bibliotecas como Passport.js para fluxos de autenticação mais complexos.