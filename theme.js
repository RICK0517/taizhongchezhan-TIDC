// ===== theme.js (全域配色控制 - 子頁面專用版) =====

// 1. 定義與 app.html 完全一致的 10 種配色 (確保父子視窗顏色同步)
const themes = {
    // --- 淺色系 (Light Modes) ---
    light: { p: '#2196f3', bg: '#f4f6f8', sbg: '#fff', stxt: '#333', cbg: '#fff', txt: '#333', border: '#e0e0e0', navh: '#e3f2fd', nava: '#1565c0', inbg:'#fff', inbd:'#ccc' },
    soft_blue: { p: '#03a9f4', bg: '#e1f5fe', sbg: '#fff', stxt: '#01579b', cbg: '#fff', txt: '#333', border: '#b3e5fc', navh: '#e1f5fe', nava: '#0288d1', inbg:'#fff', inbd:'#b3e5fc' },
    rose: { p: '#e91e63', bg: '#fdf2f5', sbg: '#fff', stxt: '#880e4f', cbg: '#fff', txt: '#333', border: '#f8bbd0', navh: '#fce4ec', nava: '#c2185b', inbg:'#fff', inbd:'#f8bbd0' },
    mint: { p: '#00bfa5', bg: '#e0f2f1', sbg: '#fff', stxt: '#004d40', cbg: '#fff', txt: '#333', border: '#b2dfdb', navh: '#e0f2f1', nava: '#00897b', inbg:'#fff', inbd:'#b2dfdb' },
    amber: { p: '#ff8f00', bg: '#fff8e1', sbg: '#fff', stxt: '#795548', cbg: '#fff', txt: '#333', border: '#ffecb3', navh: '#fff8e1', nava: '#ef6c00', inbg:'#fff', inbd:'#ffecb3' },

    // --- 深色系 (Dark Modes) ---
    dark:  { p: '#90caf9', bg: '#121212', sbg: '#1e1e1e', stxt: '#e0e0e0', cbg: '#2c2c2c', txt: '#e0e0e0', border: '#444', navh: '#333', nava: '#90caf9', inbg:'#424242', inbd:'#555' },
    midnight: { p: '#bb86fc', bg: '#0a0e14', sbg: '#161b22', stxt: '#c9d1d9', cbg: '#161b22', txt: '#c9d1d9', border: '#30363d', navh: '#21262d', nava: '#bb86fc', inbg:'#0d1117', inbd:'#30363d' },
    forest_dark: { p: '#81c784', bg: '#1b2e1c', sbg: '#253b26', stxt: '#e8f5e9', cbg: '#253b26', txt: '#e8f5e9', border: '#385239', navh: '#2e4a2f', nava: '#a5d6a7', inbg:'#1b2e1c', inbd:'#385239' },
    lava: { p: '#ff7043', bg: '#210b05', sbg: '#2d140e', stxt: '#fbe9e7', cbg: '#2d140e', txt: '#fbe9e7', border: '#4e261c', navh: '#3e1d15', nava: '#ff8a65', inbg:'#210b05', inbd:'#4e261c' },
    ocean_dark: { p: '#4fc3f7', bg: '#001a2c', sbg: '#00253d', stxt: '#e1f5fe', cbg: '#00253d', txt: '#e1f5fe', border: '#00375a', navh: '#002b46', nava: '#81d4fa', inbg:'#001a2c', inbd:'#00375a' }
};

function applyTheme(tName) {
    // 預防錯誤：如果傳入的 tName 不存在，預設回退到 'light'
    const t = themes[tName] || themes.light;
    const r = document.documentElement.style;
    
    // 設定 CSS 變數 (對應各個 HTML 頁面 style 裡的 var(--xxx))
    // 這裡將 themes 物件的短寫代碼 (p, bg, cbg...) 對應到 CSS 完整變數名稱
    r.setProperty('--primary-color', t.p);    // 主色
    r.setProperty('--bg-color', t.bg);        // 網頁背景
    r.setProperty('--card-bg', t.cbg);        // 卡片背景
    r.setProperty('--text-color', t.txt);     // 文字顏色
    r.setProperty('--border-color', t.border);// 邊框顏色
    r.setProperty('--input-bg', t.inbg);      // 輸入框背景
    r.setProperty('--input-border', t.inbd);  // 輸入框邊框

    // 針對這幾個特定頁面 body 的特殊處理 (因為有些舊 CSS 寫死在 body)
    document.body.style.backgroundColor = t.bg;
    document.body.style.color = t.txt;
}

// 1. 初始化時讀取設定 (避免頁面重新整理後跑回預設色)
try {
    const prefs = JSON.parse(localStorage.getItem("app_preferences")) || {};
    if (prefs.theme) {
        applyTheme(prefs.theme);
    }
} catch (e) {
    console.error("讀取主題設定失敗", e);
}

// 2. 監聽來自 app.html (父視窗) 的即時變更訊息
window.addEventListener('message', (event) => {
    // 確保接收到的資料包含 theme 屬性
    if ((event.data.type === 'PREVIEW_THEME' || event.data.type === 'UPDATE_THEME') && event.data.theme) {
        applyTheme(event.data.theme);
    }
});