// Subtle interaction for the portfolio
document.addEventListener('DOMContentLoaded', () => {
    console.log("%c 0x653o | Security Research ", "color: #2dd4bf; font-weight: bold; font-size: 18px; background: #111; padding: 8px; border-radius: 4px;");
    console.log("%cTarget: System Deep Dive", "color: #a0a0a0;");

    // Background glow follow mouse (subtle)
    const glow = document.querySelector('.glow-container');
    
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth * 100;
        const y = e.clientY / window.innerHeight * 100;
        
        glow.style.background = `radial-gradient(circle at ${x}% ${y - 20}%, rgba(45, 212, 191, 0.08) 0%, transparent 40%)`;
    });

    // Reveal animations on scroll
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'all 0.6s cubic-bezier(0.22, 1, 0.36, 1)';
        observer.observe(section);
    });
});
