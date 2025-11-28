🌤️ App de Previsão do Tempo

Este é um aplicativo móvel simples desenvolvido em React Native (usando o framework Expo) que permite aos usuários buscar a previsão do tempo atual para qualquer cidade, utilizando uma API pública e gratuita.

✨ Funcionalidades

Busca por Cidade: Campo de texto simples para inserir o nome da cidade.

Busca de Coordenadas: Utiliza uma API de geocodificação para converter o nome da cidade em latitude e longitude.

Exibição de Dados: Mostra o nome da cidade, a temperatura atual (em Celsius) e uma descrição textual do clima.

Ícones de Clima: Utiliza emojis para representar visualmente o estado do tempo (sol, chuva, nublado, etc.).

Feedback ao Usuário: Exibe indicadores de carregamento (ActivityIndicator) e mensagens de erro em caso de falha na busca ou cidade não encontrada.

Zero API Key: O projeto utiliza uma API de clima que não requer chaves de autenticação, facilitando o setup.

💻 Tecnologias Utilizadas

React Native

Expo (Template Blank)

JavaScript (ES6+)

Fetch API (para requisições HTTP)

🌐 API de Dados de Clima

O aplicativo utiliza o serviço Open-Meteo, que é gratuito e de código aberto, para obter os dados de previsão do tempo.

API de Geocodificação: https://geocoding-api.open-meteo.com/v1/search (Para encontrar coordenadas geográficas)

API de Previsão: https://api.open-meteo.com/v1/forecast (Para obter dados de clima com base nas coordenadas)

🚀 Como Executar o Projeto

Pré-requisitos

Você precisará ter o Node.js e o npm (ou yarn/pnpm) instalados, além do Expo CLI.

# Instale o Expo CLI globalmente (se ainda não tiver)
npm install -g expo-cli


Instalação e Inicialização

Siga os passos abaixo para clonar o repositório e iniciar o aplicativo:

Clone o Repositório:

git clone [SEU_LINK_DO_REPOSITORIO]
cd PrevisaoDoTempoSimples


Instale as Dependências:

npm install
# ou (se precisar)
yarn install


Inicie o Servidor de Desenvolvimento:

npx expo start


Visualize o App:

O terminal exibirá um QR Code.

Use o aplicativo Expo Go no seu celular (iOS ou Android) para escanear o código e carregar o app.

Tela:
![Imagem do WhatsApp de 2025-11-28 à(s) 00 23 34_37bcbc01](https://github.com/user-attachments/assets/a88121a5-9610-4536-bf9b-fa1b9a5eb1fc)

