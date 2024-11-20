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

### Boas práticas

* Use HTTPS para proteger tokens durante a transmissão.
* Implemente expiração de tokens e renovações.
* Evite armazenar tokens sensíveis em locais inseguros (como localStorage).
* Considere bibliotecas como Passport.js para fluxos de autenticação mais complexos.