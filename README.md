⚡️ Pokémon Interativa com React e TypeScript

📚 Descrição do Projeto

Esta aplicação é um visualizador interativo de Pokémon, desenvolvido em React com tipagem em TypeScript, que consome uma API pública para buscar e exibir informações detalhadas sobre diferentes Pokémon.

O objetivo principal foi demonstrar o consumo de APIs REST, o gerenciamento de estado assíncrono (loading e error) e a aplicação de interfaces em TypeScript (interface) para estruturar os dados da API.

O design utiliza um esquema de cores inspirado no universo Pokémon (azul e amarelo) e é totalmente responsivo (mobile-first) graças ao Tailwind CSS.

🚀 Tecnologias Utilizadas

Frontend: React (Hooks: useState, useEffect)

Linguagem: JavaScript / TypeScript (simulação com interfaces em .jsx)

Estilização: Tailwind CSS (classes utilitárias)

Ícones: Lucide React

API: PokéAPI (API pública de dados de Pokémon)

⚙️ Instalação e Configuração (Setup)

Siga os passos abaixo para clonar o repositório e rodar o projeto na sua máquina local.

Pré-requisitos

Você precisa ter o Node.js e o npm (ou Yarn/pnpm) instalados em sua máquina.

1. Clonar o Repositório

git clone [https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git].
cd SEU_REPOSITORIO


2. Instalar as Dependências

Este projeto utiliza dependências listadas no package.json.

npm install
# OU
yarn install


3. Estrutura de Arquivos

Certifique-se de que os arquivos estão organizados conforme a estrutura padrão do React:

/pokedex-app
├── public/
│   └── index.html      # Ponto de entrada do DOM
├── src/
│   └── App.jsx         # Componente principal com toda a lógica
└── package.json        # Dependências e scripts


4. Rodar a Aplicação

Inicie o servidor de desenvolvimento. O aplicativo será aberto em http://localhost:3000 (ou porta similar).

npm start
# OU
yarn start


🎮 Como Usar

A aplicação carregará no navegador.

Use a barra de pesquisa no topo da tela.

Digite o nome do Pokémon (ex: pikachu, charizard) ou o ID (ex: 1, 150).

Pressione Enter ou clique no ícone de Pesquisa.

A Pokédex exibirá a arte oficial, os tipos (cores dinâmicas), informações básicas (altura, peso) e as estatísticas base do Pokémon (barras de progresso).

📄 Créditos da API

Todos os dados de Pokémon são fornecidos pela API pública e gratuita:

PokéAPI: https://pokeapi.co/

👨‍💻 Autor

Maria Luiza Cavalcanti Valeriano
