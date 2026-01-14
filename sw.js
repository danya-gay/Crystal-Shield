importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-database.js');

// ВАША КОНФИГУРАЦИЯ (Оставляем без изменений)
const config = { databaseURL: "https://crystalshield-b8242-default-rtdb.europe-west1.firebasedatabase.app/" };
firebase.initializeApp(config);

const db = firebase.database().ref('current_threat');

// ВАШИ ОРИГИНАЛЬНЫЕ СЦЕНАРИИ
const scenarios = {
    'ballistic': { h: 'БАЛЛИСТИКА', d: 'УГРОЗА БАЛЛИСТИЧЕСКИХ РАКЕТ!' },
    'cruise': { h: 'КРЫЛАТЫЕ РАКЕТЫ', d: 'УГРОЗА КРЫЛАТЫХ РАКЕТ!' },
    'uav': { h: 'БпЛА', d: 'УГРОЗА УДАРНЫХ ДРОНОВ' },
    'kab': { h: 'КАБ / ФАБ', d: 'УГРОЗА АВИАЦИОННЫХ БОМБ' },
    'artillery': { h: 'ОБСТРЕЛ', d: 'УГРОЗА АРТИЛЛЕРИЙСКОГО ОБСТРЕЛА' },
    'drg': { h: 'ДИВЕРСАНТЫ', d: 'ПОВЫШЕННАЯ АКТИВНОСТЬ ДРГ' },
    'street_combat': { h: 'УЛИЧНЫЕ БОИ', d: 'ВНИМАНИЕ! БОЕВЫЕ ДЕЙСТВИЯ В ГОРОДЕ' }
};

let lastStatus = 'safe';

// СЛУШАЕМ БАЗУ В ФОНЕ
db.on('value', (snapshot) => {
    const mode = snapshot.val() || 'safe';
    
    if (mode !== lastStatus) {
        if (mode !== 'safe' && scenarios[mode]) {
            const cfg = scenarios[mode];
            
            // ВЫВОД УВЕДОМЛЕНИЯ ПОВЕРХ ВСЕГО
            self.registration.showNotification(`СИСТЕМА ЩИТ: ${cfg.h}`, {
                body: cfg.d,
                icon: 'https://cdn-icons-png.flaticon.com/512/564/564619.png',
                vibrate: [800, 300, 800],
                tag: 'rcd-alert',
                renotify: true,
                requireInteraction: true // Уведомление не пропадет, пока вы его не увидите
            });
        }
        lastStatus = mode;
    }
});

// Установка и активация
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', () => self.clients.claim());
