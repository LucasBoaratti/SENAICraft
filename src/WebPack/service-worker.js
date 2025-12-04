const CACHE_NAME = 'senaicraft-cache-v1'; // Nome do "armário" onde o navegador vai guardar os arquivos
const URLS_TO_CACHE = [ // Lista de arquivos que devem funfar mesmo sem internet
    '/',
    '/src/assets/Images/Logo_SENAICraft.png',
    '/src/Componentes/Cabecalho.jsx',
    '/src/Componentes/Camera.jsx',
    '/src/Componentes/Menu.jsx',
    '/src/Componentes/PerguntasCard.jsx',
    '/src/Componentes/PerguntasModal.jsx',
    '/src/Dados/dadosMissao.js',
    '/src/Paginas/Galeria.jsx',
    '/src/Paginas/Inicial.jsx',
    '/src/Paginas/Introducao.jsx',
    '/src/Paginas/Inventario.jsx',
    '/src/Paginas/Perguntas.jsx',
    '/src/Paginas/SENAICraft.jsx',
]

self.addEventListener('install', (event) => {
    console.log('[SW] Instalando Service Worker e cacheando arquivos...');
})