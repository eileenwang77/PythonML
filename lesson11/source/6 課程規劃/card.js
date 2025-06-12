document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.card-item');

    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            // Example: Slightly elevate the card on hover
            // This is already handled by CSS :hover pseudo-class in style.css
            // card.style.transform = 'translateY(-5px)';
            // card.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
        });

        card.addEventListener('mouseleave', () => {
            // card.style.transform = 'translateY(0)';
            // card.style.boxShadow = 'none';
        });
    });

    // Placeholder for AJAX dynamic loading or other JS features
    // console.log("Card grid component script loaded.");
});