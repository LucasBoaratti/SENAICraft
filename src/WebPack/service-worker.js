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
    '/src/Rotas/Rotas.jsx',
    '/src/Style/_Cabecalho.scss',
    '/src/Style/_Camera.scss',
    '/src/Style/_Galeria.scss',
    '/src/Style/_Introducao.scss',
    '/src/Style/_inventario.scss',
    '/src/Style/_menu.scss',
    '/src/Style/_modal.scss',
    '/src/Style/_Perguntas.scss',
    '/src/Style/_SENAICraft.scss',
    '/src/Style/_variaveis.scss',
    '/src/Style/main.scss',
]

// Instalando e adicionando os arquivos ao cache
self.addEventListener('install', (event) => { // Quando o navegador instalar o service worker, ele executa esse bloco
    console.log('[SW] Instalando Service Worker e cacheando arquivos...');
    event.waitUntil( // Garante que a instalação só termine depois que o cache for criado
        caches.open(CACHE_NAME) // Abre o "armário do cache"
            .then((cache) => cache.addAll(URLS_TO_CACHE)) // Coloca os arquivos lá dentro
            .then(() => self.skipWaiting()) // Fala pro navegador: Não espere, me ative AGORA!!!
    );
});

// Ative e remove os caches antigos
self.addEventListener('activate', (event) => { // Quando o service worker fica pronto para rodar ele ativa, e também, limpa os caches antigos
    console.log('[SW] Ativando Service Worker e removendo caches antigos...');
    event.waitUntil(
        caches.keys().then((keys) => Promise.all(
            keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)) // filter: serve para manter os caches que não são o atual ; map: Apaga cada cache antigo
        )),
    );
    self.clients.claim(); // Faz o navegador usar o novo service worker imediatamente
});

// Interceptando as requisições
self.addEventListener('fetch', (event) => { // Toda vez que o usuário pedir algum arquivo, o SW intercepta
    if (event.request.mode === 'navigate') {
        event.respondWith(
            fetch(event.request)
                .then((response) => response)
                .catch(() => caches.match('/failback-offline.html')) 
        );
    }
    else {
        event.respondWith(
            caches.match(event.request).then((cachedResponse) => { // Verifica se o arquivo está no cache. Se tiver, devolve rapidamente do cache. Se não, vai para a internet
                return cachedResponse || fetch(event.response);
            })
        );
    }
});