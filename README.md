# W95 Kanban (em construção)

Este projeto é um quadro Kanban com visual inspirado no **Windows 95**, desenvolvido com **React** e **dnd-kit** para arrastar e soltar. Durante o desenvolvimento, o **json-server** está sendo utilizado para simular um backend. Embora ainda esteja em construção, já é possível interagir com as funcionalidades principais.

## Pré-requisitos

- Git e Node.js com npm instalados
- json-server instalado globalmente (ou use `npx`)

## Instalação

Clone o repositório e instale as dependências:

```bash
git clone https://github.com/funandmemes/w95kanban.git
cd w95kanban
npm install
```

## Utilizando o projeto

1. Inicie o json-server
O projeto utiliza um arquivo db.json como base de dados simulada. Você pode iniciar o servidor com o seguinte comando:


```bash
npx json-server --watch db.json --port 3001
```
Obs.: Certifique-se de que o db.json está na raiz do projeto e segue a estrutura esperada.


2. Inicie a aplicação React
Em outro terminal, rode:

```bash
npm start
```

A aplicação será iniciada em http://localhost:3000.

## Scripts disponíveis
**npm start** - inicia a aplicação em modo de desenvolvimento

**npm run build** - gera a versão de produção do projeto

## Status

🚧 **Projeto em construção:** novas funcionalidades, estilos e melhorias serão implementados. Mesmo assim, já é possível visualizar o funcionamento básico da interface e da lógica de tarefas.