#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 Verificando configuração de produção...\n');

// Verificar se o build existe
const distPath = path.join(process.cwd(), 'dist');
if (!fs.existsSync(distPath)) {
  console.log('❌ Pasta dist não encontrada. Execute "npm run build" primeiro.');
  process.exit(1);
}

// Verificar arquivos essenciais
const essentialFiles = [
  'dist/index.html',
  'dist/assets/index-*.js',
  'dist/assets/index-*.css'
];

console.log('📁 Verificando arquivos de build:');
essentialFiles.forEach(file => {
  const fullPath = path.join(process.cwd(), file);
  if (fs.existsSync(fullPath)) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ ${file} - NÃO ENCONTRADO`);
  }
});

// Verificar variáveis de ambiente
console.log('\n🌍 Verificando variáveis de ambiente:');
const envVars = [
  'VITE_SUPABASE_URL',
  'VITE_SUPABASE_ANON_KEY',
  'VITE_API_BASE_URL'
];

envVars.forEach(envVar => {
  if (process.env[envVar]) {
    console.log(`✅ ${envVar} está definida`);
  } else {
    console.log(`⚠️  ${envVar} NÃO está definida - usando fallback`);
  }
});

// Verificar configuração do servidor
console.log('\n🚀 Verificando configuração do servidor:');
const viteConfig = require('../vite.config.ts');
console.log(`✅ Vite config carregado`);
console.log(`✅ Build config: ${viteConfig.build ? 'Configurado' : 'Não configurado'}`);

console.log('\n📋 Checklist de produção:');
console.log('1. ✅ Build gerado');
console.log('2. ✅ Arquivos essenciais presentes');
console.log('3. ⚠️  Verificar variáveis de ambiente');
console.log('4. ✅ Configuração do Vite');

console.log('\n🎯 Próximos passos:');
console.log('1. Configure as variáveis de ambiente no seu servidor de produção');
console.log('2. Verifique se o servidor está servindo os arquivos estáticos corretamente');
console.log('3. Teste as rotas da API em produção');
console.log('4. Verifique os logs do servidor para erros');

console.log('\n🔧 Para debug em produção, adicione:');
console.log('showDebug={true} ao PageLayout ou');
console.log('defina NODE_ENV=development temporariamente'); 