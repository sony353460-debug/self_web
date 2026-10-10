document.addEventListener("DOMContentLoaded",function(){
    const cat = document.querySelector(".container-cat");
    const eyes = document.querySelector(".cat_base_eyes");
    const body = document.querySelector(".cat_base_body");
    const down = document.querySelector(".cat_look_down");
    const petted = document.querySelector(".cat_petted");
    if (!cat || !eyes || !body || !down || !petted) return;


    window.addEventListener("mousemove",function(event){

        // 1. 取得眼珠目前在螢幕上的位置
        const rect = eyes.getBoundingClientRect();
        const eyeX = rect.left + rect.width / 2;
        const eyeY = rect.top + rect.height / 2;

        // 2. 計算滑鼠與眼珠中心的距離
        const deltaX = event.clientX - eyeX;
        const deltaY = event.clientY - eyeY;

        // 3. 使用 Math.atan2 算出角度
        const angle = Math.atan2(deltaY, deltaX);

        // 4. 設定眼珠移動的最大半徑 (數值越大，眼睛動的範圍越大)
        const maxDistance = 1; 

        // 5. 計算限制後的位移量
        const x = Math.cos(angle) * maxDistance;
        const y = Math.sin(angle) * maxDistance;



        eyes.style.transform=`translate(${x}px,${y}px)`;
    });
    cat.addEventListener("mouseenter",function(){
        body.style.opacity="0";
        eyes.style.opacity="0";
        down.style.opacity="1";
    })

    cat.addEventListener("mouseleave",function(){
        body.style.opacity="1";
        eyes.style.opacity="1";
        down.style.opacity="0";
    })

    cat.addEventListener("mousedown",function(){
        body.style.opacity="0";
        eyes.style.opacity="0";
        down.style.opacity="0";
        petted.style.opacity="1";
    })

    cat.addEventListener("mouseup",function(){
        body.style.opacity="0";
        eyes.style.opacity="0";
        down.style.opacity="1";
        petted.style.opacity="0";
    })
});
