const themeKey = 'boxen-theme';

try {
    if (localStorage.getItem(themeKey) === 'light') {
        document.documentElement.dataset.theme = 'light';
    }
} catch (error) {
    // The switch still works when browser storage is unavailable.
}

document.addEventListener('DOMContentLoaded', () => {
    const button = document.querySelector('.theme-toggle');
    if (!button) return;

    const updateButton = () => {
        const isLight = document.documentElement.dataset.theme === 'light';
        button.setAttribute('aria-pressed', String(isLight));
        button.setAttribute('aria-label', isLight ? '切換為深色模式' : '切換為淺色模式');
        button.title = isLight ? '切換為深色模式' : '切換為淺色模式';
    };

    updateButton();
    button.addEventListener('click', () => {
        const isLight = document.documentElement.dataset.theme === 'light';
        if (isLight) {
            delete document.documentElement.dataset.theme;
        } else {
            document.documentElement.dataset.theme = 'light';
        }
        try {
            localStorage.setItem(themeKey, isLight ? 'dark' : 'light');
        } catch (error) {
            // Keep the current page theme even if storage is blocked.
        }
        updateButton();
    });
});
