# IMPRESSOES LUIS FELIPE - MKTP

Para rodar localmente, use Node.js 22.13 ou posterior. No Windows, clique duas vezes em **Abrir-Painel.cmd** ou execute `node local.mjs` dentro desta pasta. Abra `http://localhost:3017` e use o código mostrado no terminal para criar a primeira conta ADM. Mantenha o terminal aberto durante o uso. O banco SQLite fica nesta pasta e deve ser incluído nas cópias de segurança operacionais, separado do código-fonte.

Em **Novo usuário**, o ADM cria contas de consulta. Em **Material**, pode cadastrar o preço por m² e aplicá-lo aos lançamentos sem preço. Os registros já precificados guardam seu preço histórico. O cálculo considera a área impressa, em m², multiplicada pelo preço por m².

O painel começa em novembro de 2026 com os 13 lançamentos transcritos. A última linha de 16/11 foi lida como 3 unidades e precisa de conferência com a anotação original.

Os filtros usam dias 1–7, 8–14, 15–21 e 22 ao fim do mês. Para importar, use o modelo CSV UTF-8 disponível no botão **Importar planilha**. A aba **Imagens** lista os nomes informados nos lançamentos.

## Publicação no GitHub e Netlify

1. Crie um repositório privado no GitHub e envie o conteúdo da pasta. Os arquivos `netlify.toml` e `package.json` ficam na raiz. O código inclui os 13 lançamentos originais para inicialização. Mantenha o arquivo SQLite local e os arquivos `.env` fora do repositório.
2. Crie um banco no Turso e obtenha seu URL e um token com acesso de escrita ao banco. Em um arquivo local `.env.netlify.local`, informe `TURSO_DATABASE_URL` e `TURSO_AUTH_TOKEN` no formato `NOME=valor`. Execute `node --env-file=.env.netlify.local init-turso.mjs` na pasta do projeto. Isso prepara as tabelas e inclui os 13 lançamentos originais. Os dados e as contas criados após a instalação local permanecem no SQLite local.
3. No Netlify, abra **Add new project → Import an existing project**, selecione **GitHub** e escolha o repositório. Use a configuração do arquivo `netlify.toml`.
4. Nas variáveis do projeto no Netlify, registre `TURSO_DATABASE_URL`, `TURSO_AUTH_TOKEN` e `MKTP_SETUP_CODE` com escopo **Functions** em produção. Defina um código de configuração aleatório e longo. Marque o token e o código como segredos. Faça um novo deploy após editar variáveis.
5. Acesse o endereço HTTPS gerado pelo Netlify e configure a primeira conta ADM com o código definido no passo anterior. Crie pelo menos uma conta USER e confira o acesso de consulta antes de compartilhar o endereço.

O Netlify serve a interface e executa a API. O Turso guarda as contas, sessões, lançamentos e preços compartilhados. O GitHub mantém o código e cada push para a branch de produção aciona um novo deploy.
