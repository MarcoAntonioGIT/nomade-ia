# 🔧 Troubleshooting de Produção

Este guia ajuda a identificar e resolver problemas comuns em produção.

## 🚨 Problemas Comuns

### 1. **Variáveis de Ambiente Não Configuradas**

**Sintomas:**
- Erros de autenticação
- APIs não funcionando
- Supabase não conectando

**Solução:**
```bash
# Configure as variáveis no seu servidor de produção
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua_chave_anonima
VITE_API_BASE_URL=https://sua-api.com
```

### 2. **CORS Errors**

**Sintomas:**
- Erros no console do navegador
- Requisições bloqueadas
- "Access to fetch at... blocked by CORS policy"

**Solução:**
- Configure CORS no seu servidor de API
- Adicione headers apropriados
- Verifique se o domínio está na whitelist

### 3. **Build Otimizado Demais**

**Sintomas:**
- Funcionalidades quebradas
- Erros de runtime
- Comportamento diferente do desenvolvimento

**Solução:**
```bash
# Build com sourcemaps para debug
npm run build:dev

# Ou adicione ao vite.config.ts
build: {
  sourcemap: true,
  minify: false
}
```

### 4. **Problemas de Storage**

**Sintomas:**
- Dados não persistindo
- Sessões perdidas
- localStorage não funcionando

**Solução:**
- Verifique se o domínio tem HTTPS
- Confirme se cookies estão habilitados
- Teste localStorage/sessionStorage

## 🔍 Debug em Produção

### 1. **Habilitar Debug Panel**

```tsx
// Em qualquer página
<PageLayout showDebug={true}>
  {/* conteúdo */}
</PageLayout>
```

### 2. **Logs no Console**

```javascript
// Adicione logs temporários
console.log('Debug:', { 
  environment: import.meta.env.MODE,
  apiUrl: API_CONFIG.BASE_URL,
  timestamp: new Date()
});
```

### 3. **Verificar Build**

```bash
npm run check-prod
```

## 🛠️ Checklist de Produção

### Antes do Deploy
- [ ] Variáveis de ambiente configuradas
- [ ] Build testado localmente
- [ ] APIs funcionando
- [ ] Autenticação testada

### Durante o Deploy
- [ ] Arquivos estáticos servidos corretamente
- [ ] Headers de cache configurados
- [ ] HTTPS habilitado
- [ ] CORS configurado

### Após o Deploy
- [ ] Teste todas as funcionalidades
- [ ] Verifique logs do servidor
- [ ] Monitore performance
- [ ] Teste em diferentes navegadores

## 🐛 Debug Específico

### Problemas de Autenticação
```javascript
// Verificar sessão do Supabase
const { data: { session } } = await supabase.auth.getSession();
console.log('Session:', session);
```

### Problemas de API
```javascript
// Testar endpoint diretamente
fetch('https://sua-api.com/webhook-test/gerar-roteiro', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ test: true })
}).then(r => r.json()).then(console.log);
```

### Problemas de Build
```bash
# Limpar cache e rebuild
rm -rf node_modules dist
npm install
npm run build
```

## 📞 Suporte

Se os problemas persistirem:

1. **Colete informações:**
   - Screenshots dos erros
   - Logs do console
   - Informações do Debug Panel
   - User Agent do navegador

2. **Teste em diferentes ambientes:**
   - Navegadores diferentes
   - Dispositivos diferentes
   - Redes diferentes

3. **Verifique configurações:**
   - Servidor web (nginx, apache, etc.)
   - CDN (se aplicável)
   - Firewall/proxy

## 🔄 Rollback

Se necessário, faça rollback:

```bash
# Para versão anterior
git checkout <commit-anterior>
npm run build
# Deploy da versão anterior
```

---

**Lembre-se:** Sempre teste em um ambiente de staging antes de ir para produção! 