document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.homes-for-you-section__carousel-track');
    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.carousel-arrow--next');
    const prevButton = document.querySelector('.carousel-arrow--prev');
    const pagination = document.querySelector('.carousel-pagination');

    let itemsPerSlide = 3; // 預設每頁顯示數量 (大螢幕)
    let currentSlide = 0;

    // --- 設定每頁顯示數量 (根據螢幕寬度) ---
    const setSlidesToShow = () => {
        const screenWidth = window.innerWidth;
        if (screenWidth < 576) {
            itemsPerSlide = 1;
        } else if (screenWidth < 992) {
            itemsPerSlide = 2;
        } else {
            itemsPerSlide = 3;
        }
    };

    // --- 計算總頁數 ---
    const getTotalPages = () => Math.ceil(slides.length / itemsPerSlide);

    // --- 建立分頁指示點 ---
    const createPaginationDots = () => {
        pagination.innerHTML = ''; // 清空舊的
        const totalPages = getTotalPages();
        for (let i = 0; i < totalPages; i++) {
            const dot = document.createElement('button');
            dot.classList.add('carousel-pagination__dot');
            if (i === currentSlide) {
                dot.classList.add('carousel-pagination__dot--active');
            }
            dot.addEventListener('click', () => {
                moveToSlide(i);
            });
            pagination.appendChild(dot);
        }
    };

    const dots = () => Array.from(pagination.children); // 取得最新的 dots 陣列

    // --- 更新分頁指示點狀態 ---
    const updateDots = (targetIndex) => {
        dots().forEach((dot, index) => {
            dot.classList.remove('carousel-pagination__dot--active');
            if (index === targetIndex) {
                dot.classList.add('carousel-pagination__dot--active');
            }
        });
    };

    // --- 移動到指定頁面 ---
    const moveToSlide = (targetSlide) => {
        const totalPages = getTotalPages();
        // 確保 targetSlide 在有效範圍內
        if (targetSlide < 0) targetSlide = 0;
        if (targetSlide >= totalPages) targetSlide = totalPages - 1;

        const firstCard = slides[0];
        const cardWidth = firstCard.getBoundingClientRect().width;
        const gap = parseInt(window.getComputedStyle(track).gap) || 30; // 取得 gap 值

        // 計算移動距離：(卡片寬度 + gap) * 每頁數量 *目標頁數
        // 在手機模式下 gap 可能是 0，但卡片有 margin，計算會較複雜，
        // 簡化處理：直接用卡片寬度計算，但需考慮 RWD 下卡片寬度的變化。
        // 更好的方法是計算 track 寬度 或 直接用 slide index * slide 寬度。
        // 此處我們用頁數 * (每頁卡片數 * 卡片寬度 + (每頁卡片數-1) * gap)
        // 但由於 flex: 0 0 calc(...) 的設定，直接用卡片寬度和 gap 比較準確。

        let slideWidth = (cardWidth + gap);
        // 手機版 (itemsPerSlide=1) 時，gap 是 0，但卡片有 margin，且寬度是 100%
        if (itemsPerSlide === 1) {
            slideWidth = track.getBoundingClientRect().width; // 手機版直接用 track 寬度
        }


        track.style.transform = `translateX(-${targetSlide * slideWidth * itemsPerSlide}px)`;
        currentSlide = targetSlide;
        updateDots(currentSlide);
        updateArrows();
    };

    // --- 更新箭頭狀態 ---
    const updateArrows = () => {
        const totalPages = getTotalPages();
        prevButton.disabled = currentSlide === 0;
        nextButton.disabled = currentSlide >= totalPages - 1;
        prevButton.style.opacity = prevButton.disabled ? '0.5' : '1';
        nextButton.style.opacity = nextButton.disabled ? '0.5' : '1';
        prevButton.style.cursor = prevButton.disabled ? 'not-allowed' : 'pointer';
        nextButton.style.cursor = nextButton.disabled ? 'not-allowed' : 'pointer';
    };


    // --- 初始化輪播 ---
    const initCarousel = () => {
        setSlidesToShow();
        createPaginationDots();
        moveToSlide(0); // 確保從第一頁開始並更新箭頭
    };

    // --- 事件監聽 ---
    nextButton.addEventListener('click', () => {
        moveToSlide(currentSlide + 1);
    });

    prevButton.addEventListener('click', () => {
        moveToSlide(currentSlide - 1);
    });

    // --- 視窗大小改變時重新初始化 ---
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(initCarousel, 250); // 防抖動
    });

    // --- 初始執行 ---
    initCarousel();
});