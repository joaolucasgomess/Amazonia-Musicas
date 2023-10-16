# Amazônia Músicas - API
A Amazônia Músicas é uma plataforma para manter suas músicas e artistas favoritos em um só lugar.
## Funcionalidadades:
- Adicionar usuários, artistas, músicas e playlists (nesse caso, possível excluir)
- Adicionar e remover músicas nas playlists criadas
- Alterar o nome de uma playlist
## Pontos específicos:
- Todas as requisições nessa API necessitam de um "userid" informado no Header, exceto a requisição para criação de usuário.
- Existem dois usuários já cadastrados para testes; userid: 1 e userid: 2.
- Todos os parâmetros das requisições que contém Body devem ser preenchidos, sem exceção.
- Todas as verificações de existência de entidades são feitas através de Id, logo, outros parâmetros como nome de músicas e playlists podem se repetir em métodos POST e PUT
