# 🎯 Sistema IRIS - Gestão de Usuários

Aplicação Angular completa para gerenciamento de usuários com CRUD, desenvolvida como parte do desafio técnico para vaga de **Desenvolvedor Front-End Angular**.

![Angular](https://img.shields.io/badge/Angular-20.3-red)
![Material](https://img.shields.io/badge/Material-20.2-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)
![Deploy](https://img.shields.io/badge/Deploy-Vercel-black)

## 🔗 Links

- **Aplicação em Produção**: [Sistema IRIS no Vercel](https://users-crud-gules.vercel.app/users)
- **Repositório**: [GitHub](https://github.com/Lucas-Christen/)

---

## ✅ Requisitos Implementados

### 1. **Tela de Listagem de Usuários** ✔️
- ✅ Tabela responsiva com colunas **Nome**, **E-mail**, **Idade** e **Ações**
- ✅ Edição inline diretamente na tabela (formulário aparece na própria linha)
- ✅ Exclusão com modal de confirmação
- ✅ Campo de busca funcional que filtra por **nome**, **e-mail** ou **idade**
- ✅ Paginação configurável (5, 10 ou 20 itens por página)
- ✅ Ordenação por colunas (clique nos cabeçalhos)

### 2. **Formulário de Adição/Edição** ✔️
- ✅ Formulário reativo com validações em tempo real
- ✅ **Nome**: obrigatório, mínimo 3 caracteres
- ✅ **E-mail**: obrigatório, formato válido
- ✅ **Idade**: opcional, mínimo 18 anos
- ✅ Mensagens de erro contextuais para cada campo
- ✅ Botão "Salvar" desabilitado enquanto formulário inválido
- ✅ Mesmo formulário usado para adicionar e editar (reutilização)

### 3. **API REST** ✔️
- ✅ **GET** `/api/users` - Listar todos os usuários
- ✅ **POST** `/api/users` - Adicionar novo usuário
- ✅ **PUT** `/api/users/:id` - Atualizar usuário existente
- ✅ **DELETE** `/api/users/:id` - Excluir usuário
- ✅ Comunicação HTTP centralizada no serviço `UsersService`
- ✅ Integração com MockAPI (API real em produção)

### 4. **Validações** ✔️
- ✅ Validação de todos os campos conforme especificado
- ✅ Mensagens de erro específicas para cada tipo de validação
- ✅ Formulário marca campos como "touched" ao tentar enviar inválido
- ✅ Feedback visual imediato durante digitação

### 5. **Organização e Boas Práticas** ✔️
- ✅ Serviço dedicado para comunicação com API (`UsersService`)
- ✅ Arquitetura modular (Core, Features, Shared)
- ✅ Componentes standalone e reutilizáveis
- ✅ Estilos organizados com SCSS e variáveis CSS customizadas
- ✅ Angular Material para UI consistente

---

## 🎁 Diferenciais e Funcionalidades Extra

### **Deploy e Documentação** 🌐
- ✅ **Aplicação hospedada na Vercel** com domínio público
- ✅ **README completo** com instruções detalhadas de instalação e execução
- ✅ Documentação de arquitetura e decisões técnicas

### **Experiência do Usuário** ✨
- ✅ **Loading Global**: Barra de progresso no topo durante requisições HTTP
- ✅ **Tratamento de Erros**: Interceptor global com mensagens amigáveis via Snackbar
- ✅ **Modal de Confirmação**: Dialog personalizado para exclusão de usuários
- ✅ **Estados Vazios**: Mensagens contextuais quando não há usuários ou resultados de busca
- ✅ **Feedback Visual**: Hover effects, transições suaves, ícones animados
- ✅ **Responsividade Total**: Interface adaptada para desktop, tablet e mobile

### **Design Personalizado** 🎨
- ✅ **Tema Customizado**: Paleta de cores do Sistema IRIS (laranja #F36C21)
- ✅ **Hero Section**: Seção de destaque com gradiente e cartão flutuante
- ✅ **Tipografia Moderna**: Fontes Inter e Poppins do Google Fonts
- ✅ **Tabela com Grade**: Bordas verticais para separar colunas visualmente
- ✅ **Densidade Otimizada**: Layout compacto e eficiente
- ✅ **Menu Mobile**: Navegação hambúrguer para telas pequenas

### **Arquitetura Avançada** 🏗️
- ✅ **Standalone Components**: Sem NgModules, seguindo as melhores práticas do Angular 20
- ✅ **Zoneless Change Detection**: Performance otimizada sem Zone.js
- ✅ **Signals API**: Gerenciamento de estado reativo e moderno
- ✅ **Server-Side Rendering (SSR)**: Primeira renderização rápida e SEO
- ✅ **Interceptors HTTP**: Loading e error handling centralizados
- ✅ **Route Guards**: Preparado para autenticação (authGuard)
- ✅ **Lazy Loading**: Componentes carregados sob demanda

### **Qualidade de Código** 🧪
- ✅ **Testes Unitários**: Cobertura de componentes e serviços (Jasmine + Karma)
- ✅ **TypeScript Strict Mode**: Tipagem rigorosa e segurança de tipos
- ✅ **EditorConfig + Prettier**: Formatação consistente do código
- ✅ **Separation of Concerns**: Estrutura clara (Core, Features, Shared)
- ✅ **Clean Code**: Código limpo, comentado e auto-documentado

### **Funcionalidades Técnicas** ⚙️
- ✅ **Proxy Configuration**: Evita problemas de CORS em desenvolvimento
- ✅ **Concurrently**: Executa API e aplicação simultaneamente com `npm run dev`
- ✅ **Material Icons**: Ícones Material Design e Material Symbols
- ✅ **RxJS Operators**: Programação reativa com operadores como `takeUntil`, `finalize`
- ✅ **Form Validators Customizados**: Validador `minAgeOrNull` para idade opcional
- ✅ **MatTableDataSource**: Filtro, ordenação e paginação integrados

---

## 📂 Estrutura do Projeto

```
src/
├── app/
│   ├── core/                          # Funcionalidades essenciais
│   │   ├── guards/                    # Route guards (authGuard)
│   │   ├── interceptors/              # HTTP interceptors (loading, error)
│   │   ├── models/                    # Interfaces TypeScript (User)
│   │   └── services/                  # Serviços (UsersService, LoadingService)
│   ├── features/                      # Módulos de funcionalidades
│   │   └── users/                     # Feature de gerenciamento de usuários
│   │       ├── user-form/             # Formulário reativo (add/edit)
│   │       └── users-list/            # Listagem, busca, tabela e paginação
│   ├── shared/                        # Componentes compartilhados
│   │   ├── components/                # Dialog de confirmação
│   │   └── layout/                    # Header responsivo
│   ├── app.component.ts               # Componente raiz
│   ├── app.config.ts                  # Configuração da aplicação
│   ├── app.routes.ts                  # Definição de rotas
│   └── material.imports.ts            # Importações do Angular Material
├── assets/                            # Imagens e recursos estáticos
│   └── img/                           # Logo do Sistema IRIS
├── public/                            # Arquivos públicos (favicon)
├── styles.scss                        # Estilos globais
└── theme.scss                         # Tema personalizado Angular Material
```

---

## 🚀 Instalação e Execução

### **Pré-requisitos**
- Node.js v18 ou superior
- npm ou yarn

### **Passo a Passo**

1. **Clone o repositório**
```bash
git clone <seu-repositorio>
cd users-crud
```

2. **Instale as dependências**
```bash
npm install
```

3. **Opção 1: Executar API e aplicação separadamente**
```bash
# Terminal 1 - API simulada (json-server)
npm run server

# Terminal 2 - Aplicação Angular
npm start
```

4. **Opção 2: Executar tudo de uma vez**
```bash
npm run dev
```

5. **Acesse a aplicação**
- **Frontend**: http://localhost:4200
- **API Mock (em desenvolvimento)**: http://localhost:3000
- **API em produção**: MockAPI (configurada no UsersService)

### **Scripts Disponíveis**
```json
{
  "start": "ng serve",              // Inicia a aplicação
  "server": "json-server ...",      // Inicia a API mock
  "dev": "concurrently ...",        // Inicia ambos simultaneamente
  "build": "ng build",              // Build de produção
  "test": "ng test",                // Executa testes unitários
  "serve:ssr": "node dist/.../server.mjs" // Serve com SSR
}
```

---

## 🎨 Tecnologias Utilizadas

### **Core**
- **Angular 20.3** - Framework principal (versão mais recente)
- **TypeScript 5.9** - Tipagem estática e segurança de tipos
- **RxJS 7.8** - Programação reativa

### **UI/UX**
- **Angular Material 20.2** - Componentes de interface
- **Material Icons** - Ícones do Google
- **SCSS** - Pré-processador CSS
- **Google Fonts** - Inter e Poppins

### **Backend/API**
- **json-server 1.0** - API REST simulada (desenvolvimento)
- **MockAPI** - API REST real (produção)

### **DevOps/Deploy**
- **Vercel** - Hospedagem e deploy contínuo
- **Concurrently** - Execução paralela de scripts

### **Testes**
- **Jasmine** - Framework de testes
- **Karma** - Test runner

### **Tooling**
- **Angular CLI 20.3** - Ferramentas de desenvolvimento
- **EditorConfig** - Configuração de editor
- **Prettier** - Formatação de código

---

## 🎯 Destaques Técnicos

### **Padrões de Projeto Implementados**
- **Service Layer**: Comunicação HTTP centralizada
- **Interceptor Pattern**: Loading e error handling globais
- **Guard Pattern**: Proteção de rotas
- **Reactive Forms**: Validações robustas
- **Component Composition**: Reutilização de componentes
- **Separation of Concerns**: Core, Features, Shared

### **Performance e Otimização**
- **Zoneless Change Detection**: Melhor performance
- **OnPush Strategy**: Detecção de mudanças otimizada
- **Lazy Loading**: Carregamento sob demanda
- **Server-Side Rendering**: SEO e primeira renderização rápida
- **Tree Shaking**: Redução do bundle size

### **Responsividade**
- **Desktop**: ≥ 1200px (layout completo)
- **Tablet**: 768px - 1199px (adaptado)
- **Mobile**: < 768px (menu hambúrguer, colunas empilhadas)

### **Acessibilidade**
- **ARIA labels**: Rotulagem semântica
- **Tooltips**: Dicas visuais nos botões
- **Keyboard Navigation**: Navegação por teclado
- **Semantic HTML**: Estrutura HTML semântica

---

## 🧪 Testes Unitários

### **Cobertura**
- ✅ `AppComponent` - Componente raiz
- ✅ `UsersService` - Serviço de API (GET, POST, PUT, DELETE)
- ✅ `UserFormComponent` - Validações do formulário
- ✅ `UsersListComponent` - Listagem e operações CRUD

### **Executar Testes**
```bash
npm test
```

### **Exemplo de Teste (UsersService)**
```typescript
it('list() deve fazer GET /api/users', () => {
  const mock: User[] = [{ id: 1, name: 'Ada', email: 'ada@lovelace.dev', age: 28 }];
  svc.list().subscribe(res => expect(res).toEqual(mock));
  
  const req = http.expectOne('/api/users');
  expect(req.request.method).toBe('GET');
  req.flush(mock);
});
```

---

## 📱 API Endpoints

### **Base URL (Produção)**
```
https://68ded03a898434f4135618f1.mockapi.io/users
```

### **Endpoints**
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/users` | Lista todos os usuários |
| POST | `/users` | Cria novo usuário |
| PUT | `/users/:id` | Atualiza usuário existente |
| DELETE | `/users/:id` | Exclui usuário |

### **Modelo de Dados (User)**
```typescript
interface User {
  id?: number;      // Opcional (gerado pela API)
  name: string;     // Obrigatório, min 3 caracteres
  email: string;    // Obrigatório, formato válido
  age?: number;     // Opcional, >= 18
}
```

---

## 🐛 Troubleshooting

### **Porta já em uso**
```bash
# Alterar porta do Angular
ng serve --port 4300

# Alterar porta do json-server (dev)
json-server --watch db.json --port 3001
```

### **Erro de CORS**
O proxy está configurado em `proxy.conf.json` para desenvolvimento local. Em produção, a aplicação usa a MockAPI diretamente.

### **Dependências desatualizadas**
```bash
npm update
```

---

## 📝 Checklist de Entrega

- ✅ **Aplicação funcional** com todas as funcionalidades solicitadas
- ✅ **Deploy na Vercel** com domínio público acessível
- ✅ **README completo** com instruções claras
- ✅ **Código organizado** em componentes e serviços
- ✅ **Testes unitários** implementados
- ✅ **Responsividade** para mobile e desktop
- ✅ **Validações** em tempo real no formulário
- ✅ **Tratamento de erros** com mensagens amigáveis
- ✅ **Loading states** durante requisições
- ✅ **Boas práticas** Angular (standalone, signals, SSR)

---

## 👨‍💻 Autor

**Lucas Fernandes Christen**
- 📧 Email: lucaschristen@alunos.utfpr.edu.br
- 📅 Data de Entrega: 08/10/2025
- 🎯 Desenvolvido para: Desafio Técnico - Sistema IRIS

---

## 🏆 Diferenciais Demonstrados

Este projeto demonstra conhecimento avançado em:

1. **Angular Moderno (v20+)**: Standalone components, signals, zoneless
2. **Arquitetura Escalável**: Core/Features/Shared, service layer, interceptors
3. **UI/UX Profissional**: Design personalizado, responsivo e acessível
4. **Testes Automatizados**: Cobertura de componentes críticos
5. **DevOps**: Deploy contínuo na Vercel, CI/CD
6. **Documentação**: README completo e código bem comentado
7. **Performance**: SSR, lazy loading, otimizações
8. **Gestão de Estado**: Signals API do Angular 20
9. **Programação Reativa**: RxJS com operadores avançados
10. **Clean Code**: Código limpo, organizado e manutenível

---

---

⭐ **Obrigado pela oportunidade de participar deste desafio!**
