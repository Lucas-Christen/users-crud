# 🎯 Sistema IRIS - Gestão de Usuários

Aplicação Angular para gerenciamento de usuários com CRUD completo, desenvolvida como parte do desafio técnico.

![Angular](https://img.shields.io/badge/Angular-20.3-red)
![Material](https://img.shields.io/badge/Material-20.2-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)

## 📋 Funcionalidades

### ✅ Requisitos Implementados

- **Listagem de Usuários**
  - Tabela responsiva com Nome, E-mail e Ações
  - Edição inline diretamente na tabela
  - Exclusão com confirmação
  - Campo de busca por nome ou e-mail
  - Paginação (5, 10 ou 20 itens por página)
  - Ordenação por colunas

- **Formulário de Adição/Edição**
  - Formulário reativo com validações em tempo real
  - **Nome**: obrigatório, mínimo 3 caracteres
  - **E-mail**: obrigatório, formato válido
  - **Idade**: opcional, mínimo 18 anos
  - Mensagens de erro contextuais
  - Botão desabilitado enquanto formulário inválido

- **API REST**
  - GET - Listar todos os usuários
  - POST - Adicionar novo usuário
  - PUT - Atualizar usuário existente
  - DELETE - Excluir usuário

### 🎁 Funcionalidades Extra

- **Loading Global**: Barra de progresso durante requisições HTTP
- **Tratamento de Erros**: Interceptor com mensagens amigáveis via Snackbar
- **Design Personalizado**: Tema customizado com paleta de cores IRIS
- **Responsividade**: Interface adaptada para desktop, tablet e mobile
- **Testes Unitários**: Cobertura de componentes e serviços
- **Arquitetura Moderna**: 
  - Standalone Components
  - Zoneless Change Detection
  - Signals API
  - Server-Side Rendering (SSR)

## 🚀 Instalação e Execução

### Pré-requisitos

- Node.js (v18 ou superior)
- npm ou yarn

### Passo a Passo

1. **Clone o repositório**
```bash
git clone <seu-repositorio>
cd users-crud
```

2. **Instale as dependências**
```bash
npm install
```

3. **Inicie o servidor JSON (API simulada)**
```bash
npm run server
```
O servidor estará disponível em `http://localhost:3000`

4. **Em outro terminal, inicie a aplicação Angular**
```bash
npm start
```
A aplicação estará disponível em `http://localhost:4200`

5. **Ou execute ambos simultaneamente**
```bash
npm run dev
```

## 🧪 Executando Testes

```bash
# Testes unitários
npm test

# Build de produção
npm run build

# Servir build SSR
npm run serve:ssr:users-crud
```

## 📂 Estrutura do Projeto

```
src/
├── app/
│   ├── core/                    # Funcionalidades essenciais
│   │   ├── guards/              # Route guards
│   │   ├── interceptors/        # HTTP interceptors
│   │   ├── models/              # Interfaces e tipos
│   │   └── services/            # Serviços (API, loading)
│   ├── features/                # Módulos de funcionalidades
│   │   └── users/               # Feature de usuários
│   │       ├── user-form/       # Formulário reativo
│   │       └── users-list/      # Listagem e tabela
│   ├── shared/                  # Componentes compartilhados
│   │   └── layout/              # Header, footer, etc.
│   └── material.imports.ts      # Importações do Material
├── assets/                      # Imagens e recursos estáticos
├── styles.scss                  # Estilos globais
└── theme.scss                   # Tema Angular Material
```

## 🎨 Tecnologias Utilizadas

- **Angular 20.3** - Framework principal
- **Angular Material 20.2** - Componentes UI
- **RxJS 7.8** - Programação reativa
- **TypeScript 5.9** - Tipagem estática
- **json-server 1.0** - API REST simulada
- **Jasmine + Karma** - Testes unitários
- **SCSS** - Estilos

## 🎯 Destaques Técnicos

### Arquitetura
- **Standalone Components**: Sem NgModules, componentes independentes
- **Zoneless**: Melhor performance sem Zone.js
- **Signals**: API reativa moderna do Angular
- **Lazy Loading**: Componentes carregados sob demanda

### Padrões Implementados
- **Separation of Concerns**: Core, Features, Shared
- **Service Layer**: Comunicação HTTP centralizada
- **Reactive Forms**: Validações robustas e reativas
- **Interceptors**: Loading e error handling globais
- **Guards**: Proteção de rotas (preparado para autenticação)

### Performance
- **OnPush Strategy**: Detecção de mudanças otimizada
- **Lazy Loading**: Carregamento sob demanda
- **Server-Side Rendering**: SEO e primeira renderização rápida

## 📱 Responsividade

A aplicação é totalmente responsiva, com breakpoints em:
- **Desktop**: ≥ 1200px
- **Tablet**: 768px - 1199px
- **Mobile**: < 768px

## 🔒 Segurança

- Validações no frontend e preparado para validações no backend
- Proteção XSS através do DomSanitizer do Angular
- Guard preparado para autenticação (pode ser expandido)

## 📄 API Endpoints

A API simulada (json-server) disponibiliza:

```
GET    /api/users       - Lista todos os usuários
POST   /api/users       - Cria novo usuário
PUT    /api/users/:id   - Atualiza usuário
DELETE /api/users/:id   - Remove usuário
```

## 🐛 Troubleshooting

### Porta já em uso
Se a porta 4200 ou 3000 já estiver em uso:
```bash
# Alterar porta do Angular
ng serve --port 4300

# Alterar porta do json-server
json-server --watch db.json --port 3001
```

### Erro de CORS
O proxy já está configurado em `proxy.conf.json`. Certifique-se de que ambos os servidores estejam rodando.

## 👨‍💻 Autor

**Lucas Fernandes Christen**
- Email: lucaschristen@alunos.utfpr.edu.br
- Desenvolvido para: Desafio Técnico Sistema IRIS

## 📝 Licença

Este projeto foi desenvolvido para fins de avaliação técnica.

---

⭐ **Observação**: Este projeto demonstra conhecimento em:
- Angular moderno (v20+)
- Arquitetura de aplicações
- Testes unitários
- Boas práticas de desenvolvimento
- UI/UX responsivo
- Gestão de estado
- Comunicação HTTP
- Validações e tratamento de erros