document.addEventListener('DOMContentLoaded', function () {
    const accordionItems = document.querySelectorAll('.accordion-item');

    function closeAllItems() {
        accordionItems.forEach(item => {
            item.classList.remove('active');
        });
    }

    accordionItems.forEach((item, index) => {
        const header = item.querySelector('.accordion-header');

        header.addEventListener('click', function () {
            const wasActive = item.classList.contains('active');
            closeAllItems();
            if (!wasActive) {
                item.classList.add('active');
            }
        });

        if (index === 0) {
            item.classList.add('active');
        }
    });
});