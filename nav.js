let lastScrollTop = 0; // 記錄上一次捲動的位置
const navbar = document.querySelector('.custom-navbar');

window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop && scrollTop > 100) {
        // 往下滑動且超過 100px：隱藏導覽列
        navbar.classList.add('nav-up');
    } else {
        // 往上滑動：顯示導覽列
        navbar.classList.remove('nav-up');
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // 更新位置，避免負數
}, false);