document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.querySelector('.cursor-glow');
    const cards = document.querySelectorAll('.bento-card');

    // Smooth Cursor Follow
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        let dx = mouseX - cursorX;
        let dy = mouseY - cursorY;
        
        cursorX += dx * 0.1;
        cursorY += dy * 0.1;
        
        cursor.style.left = `${cursorX}px`;
        cursor.style.top = `${cursorY}px`;
        
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Subtle 3D Tilt for cards
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        });
    });

    // Console Log for the curious
    console.log(
        "%c0x653o // System Infiltration Successful",
        "background: #6366f1; color: white; padding: 5px 10px; border-radius: 5px; font-family: monospace; font-size: 14px;"
    );
});
