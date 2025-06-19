# Nomade IA - Plataforma de Planejamento de Viagens com IA

Uma plataforma moderna de planejamento de viagens que utiliza inteligência artificial para criar roteiros personalizados.

## 🚀 Funcionalidades

- **Planejamento Inteligente**: IA personalizada para criar roteiros únicos
- **Autenticação Segura**: Sistema de login/registro com Supabase
- **Interface Moderna**: Design responsivo com Tailwind CSS e Shadcn/ui
- **Pacotes de Viagem**: Ofertas personalizadas baseadas no roteiro
- **Gerenciamento de Estado**: Context API e React Query para estado global
- **TypeScript**: Tipagem completa para melhor desenvolvimento
- **Performance Otimizada**: Lazy loading e code splitting

## 🛠️ Tecnologias

- **Frontend**: React 18, TypeScript, Vite
- **UI**: Tailwind CSS, Shadcn/ui, Lucide React
- **Estado**: React Query, Context API
- **Autenticação**: Supabase Auth
- **Roteamento**: React Router DOM
- **Formulários**: React Hook Form, Zod
- **Build**: Vite, ESLint, PostCSS

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── ui/             # Componentes base (Shadcn/ui)
│   ├── layout/         # Componentes de layout
│   ├── forms/          # Componentes de formulário
│   └── ...
├── pages/              # Páginas da aplicação
├── hooks/              # Hooks personalizados
├── services/           # Serviços de API
├── contexts/           # Contextos React
├── types/              # Definições TypeScript
├── config/             # Configurações e constantes
├── lib/                # Utilitários
└── integrations/       # Integrações externas
```

## 🚀 Como Executar

### Pré-requisitos

- Node.js 18+ ou Bun
- npm, yarn ou bun

### Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/nomade-ia.git
cd nomade-ia

# Instale as dependências
npm install
# ou
bun install

# Configure as variáveis de ambiente
cp .env.example .env.local
```

### Desenvolvimento

```bash
# Inicie o servidor de desenvolvimento
npm run dev
# ou
bun run dev

# Acesse http://localhost:8080
```

### Build

```bash
# Build para produção
npm run build

# Preview do build
npm run preview
```

## 🔧 Configuração

### Variáveis de Ambiente

Crie um arquivo `.env.local` com as seguintes variáveis:

```env
VITE_SUPABASE_URL=sua_url_do_supabase
VITE_SUPABASE_ANON_KEY=sua_chave_anonima_do_supabase
```

### Supabase

1. Crie uma conta no [Supabase](https://supabase.com)
2. Crie um novo projeto
3. Configure a autenticação
4. Adicione as credenciais no arquivo `.env.local`

## 📚 Melhorias Implementadas

### 1. **TypeScript Robusto**
- Tipos centralizados em `/src/types`
- Interfaces bem definidas para todos os dados
- Type safety em toda a aplicação

### 2. **Arquitetura Melhorada**
- Separação clara de responsabilidades
- Componentes reutilizáveis
- Hooks personalizados para lógica de negócio

### 3. **Serviço de API Centralizado**
- Classe `ApiService` com interceptors
- Tratamento de erros padronizado
- Timeout e retry automático

### 4. **Gerenciamento de Estado**
- Context API para autenticação
- React Query para cache de dados
- Hooks personalizados para formulários

### 5. **Performance**
- Lazy loading de páginas
- Code splitting automático
- Memoização com useCallback e useMemo

### 6. **Error Handling**
- Error Boundary para captura de erros
- Toast notifications padronizadas
- Fallbacks elegantes

### 7. **Configuração Centralizada**
- Constantes em `/src/config`
- Mensagens de erro padronizadas
- Configurações de validação

### 8. **Layout Reutilizável**
- Componente `PageLayout` para consistência
- Navbar e Footer centralizados
- Responsividade melhorada

## 🎨 Componentes Principais

### Layout
- `PageLayout`: Layout base para todas as páginas
- `Navbar`: Navegação principal
- `Footer`: Rodapé da aplicação

### Formulários
- `TripForm`: Formulário de planejamento de viagem
- `TripFormFields`: Campos do formulário
- `useTripForm`: Hook para gerenciar estado do formulário

### UI
- `LoadingSpinner`: Indicador de carregamento
- `ErrorBoundary`: Captura de erros
- `SignupDialog`: Modal de autenticação

## 🔒 Autenticação

O sistema de autenticação utiliza Supabase Auth com:

- Login/Registro por email
- Recuperação de senha
- Proteção de rotas
- Context API para estado global

## 📱 Responsividade

A aplicação é totalmente responsiva com:

- Mobile-first design
- Breakpoints otimizados
- Componentes adaptativos
- Touch-friendly interfaces

## 🧪 Testes

```bash
# Executar testes
npm run test

# Executar testes em modo watch
npm run test:watch

# Coverage
npm run test:coverage
```

## 📦 Deploy

### Vercel (Recomendado)

```bash
# Instale o Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Netlify

```bash
# Build
npm run build

# Deploy manual ou via GitHub
```

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📞 Suporte

- Email: contato@nomadeia.com.br
- Documentação: [docs.nomadeia.com.br](https://docs.nomadeia.com.br)
- Issues: [GitHub Issues](https://github.com/seu-usuario/nomade-ia/issues)

## 🚀 Roadmap

- [ ] Integração com APIs de reserva
- [ ] Sistema de avaliações
- [ ] Chatbot de suporte
- [ ] App mobile (React Native)
- [ ] Analytics avançado
- [ ] Sistema de notificações push

---

Desenvolvido com ❤️ pela equipe Nomade IA
