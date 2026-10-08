const socialWindow = document.querySelector('.social-window');
const dragHandle = socialWindow?.querySelector('.window-titlebar');

if (socialWindow && dragHandle) {
    const compactLayout = window.matchMedia('(max-width: 900px)');
    let offsetX = 0;
    let offsetY = 0;
    let startX = 0;
    let startY = 0;
    let startOffsetX = 0;
    let startOffsetY = 0;
    let startRect;

    const render = () => {
        socialWindow.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    };

    const clamp = (value, min, max) => Math.min(Math.max(value, min), Math.max(min, max));

    dragHandle.addEventListener('pointerdown', (event) => {
        if (compactLayout.matches || event.button !== 0 || event.target.closest('.window-controls')) return;

        startX = event.clientX;
        startY = event.clientY;
        startOffsetX = offsetX;
        startOffsetY = offsetY;
        startRect = socialWindow.getBoundingClientRect();
        dragHandle.setPointerCapture(event.pointerId);
        socialWindow.classList.add('is-dragging');
        event.preventDefault();
    });

    dragHandle.addEventListener('pointermove', (event) => {
        if (!dragHandle.hasPointerCapture(event.pointerId)) return;

        const dx = event.clientX - startX;
        const dy = event.clientY - startY;
        offsetX = startOffsetX + clamp(dx, -startRect.left, window.innerWidth - startRect.right);
        // Keep the title bar on screen even when the window is taller than the viewport.
        offsetY = startOffsetY + clamp(dy, -startRect.top, window.innerHeight - dragHandle.offsetHeight - startRect.top);
        render();
    });

    const endDrag = () => socialWindow.classList.remove('is-dragging');
    dragHandle.addEventListener('pointerup', endDrag);
    dragHandle.addEventListener('pointercancel', endDrag);
    dragHandle.addEventListener('lostpointercapture', endDrag);

    window.addEventListener('resize', () => {
        if (compactLayout.matches) {
            offsetX = 0;
            offsetY = 0;
            socialWindow.style.transform = '';
            return;
        }
        const rect = socialWindow.getBoundingClientRect();
        offsetX += clamp(0, -rect.left, window.innerWidth - rect.right);
        offsetY += clamp(0, -rect.top, window.innerHeight - dragHandle.offsetHeight - rect.top);
        render();
    });
}
