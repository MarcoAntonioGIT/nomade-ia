# Configuração do Reset de Senha

## Funcionalidade Implementada

A funcionalidade de "Esqueceu a senha" foi implementada com sucesso no projeto Nomade IA. Aqui está o que foi adicionado:

### 1. Nova Aba na Página de Autenticação
- Adicionada uma terceira aba "Esqueci a senha" na página de login
- Formulário simples para inserir o email do usuário
- Integração com o Supabase Auth para envio do email de reset

### 2. Nova Página de Reset de Senha
- Página dedicada em `/reset-password` para definir nova senha
- Validação de tokens de acesso do email de reset
- Formulário com confirmação de senha
- Redirecionamento automático após sucesso

### 3. Integração com Supabase
- Função `resetPassword` no contexto de autenticação
- Configuração de redirecionamento para a página de reset
- Tratamento de erros e feedback ao usuário

## Configuração no Supabase

Para que o reset de senha funcione corretamente, você precisa configurar o Supabase:

### 1. Configuração de Email
1. Acesse o dashboard do Supabase
2. Vá para **Authentication** > **Email Templates**
3. Configure o template "Reset Password":
   - **Subject**: "Redefinir sua senha - Nomade IA"
   - **Body**: Personalize o email conforme necessário
   - Certifique-se de que o link de redirecionamento está correto

### 2. Configuração de URL de Redirecionamento
1. Vá para **Authentication** > **URL Configuration**
2. Adicione a URL de redirecionamento: `https://seu-dominio.com/reset-password`
3. Para desenvolvimento local: `http://localhost:5173/reset-password`

### 3. Configuração de SMTP (Opcional)
Se quiser usar um provedor de email personalizado:
1. Vá para **Authentication** > **SMTP Settings**
2. Configure seu provedor de email (Gmail, SendGrid, etc.)
3. Teste o envio de emails

## Como Funciona

### Fluxo do Usuário:
1. Usuário clica em "Esqueci a senha" na página de login
2. Insere seu email e clica em "Enviar email de reset"
3. Recebe um email com link para redefinir a senha
4. Clica no link e é redirecionado para `/reset-password`
5. Define uma nova senha e confirma
6. É redirecionado de volta para a página de login

### Fluxo Técnico:
1. `AuthPage` chama `resetPassword(email)` do contexto
2. Supabase envia email com tokens de acesso
3. Usuário clica no link → `ResetPasswordPage`
4. Página valida tokens e permite definir nova senha
5. `supabase.auth.updateUser()` atualiza a senha
6. Usuário é redirecionado para login

## Arquivos Modificados/Criados

- `src/pages/AuthPage.tsx` - Adicionada aba de reset de senha
- `src/pages/ResetPasswordPage.tsx` - Nova página para definir senha
- `src/contexts/AuthContext.tsx` - Função resetPassword já existia
- `src/App.tsx` - Adicionada rota para reset de senha

## Testando a Funcionalidade

1. Acesse a página de login (`/auth`)
2. Clique na aba "Esqueci a senha"
3. Digite um email válido
4. Verifique se o email foi recebido
5. Clique no link do email
6. Defina uma nova senha
7. Faça login com a nova senha

## Notas Importantes

- O link de reset de senha expira após 1 hora (configuração padrão do Supabase)
- Emails podem ir para a pasta de spam
- Para produção, configure um provedor de email confiável
- Teste sempre em ambiente de desenvolvimento primeiro 