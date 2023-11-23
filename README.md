Para rodar o projeto, os passos são:

1. Instalar as deps `npm install`;
2. O backend em NestJS inicia o servidor em 127.0.0.1 (localhost), mas também inicia no IPV4, é importante que esteja utilizando IPV4 no lado do aplicativo mobile para que as requisições funcionem corretamente no celular ao utiliziar o expo durante os teste;
3. Para setar o servidor backend tem um arquivo em `src/core/environment/host.js`, no caso está 192.168.15.57, que era o meu nos meus testes, mas o seu pode ser outro, então é importante consultar o IPV4 no `cmd` rodando `ipconfig`;
4. Com isso configurado, basta rodar o `npm run start` e tudo estará pronto para conectar o celular utilizando o expo.