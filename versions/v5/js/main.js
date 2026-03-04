document.addEventListener('DOMContentLoaded', () => {
    // Reveal animations on scroll
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add a small delay based on index if multiple elements are visible
                setTimeout(() => {
                    entry.target.classList.add('active');
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => {
        observer.observe(el);
    });

    // Subtle parallax effect for the ambient glow
    document.addEventListener('mousemove', (e) => {
        const glow = document.querySelector('.ambient-glow');
        const x = (e.clientX / window.innerWidth - 0.5) * 50;
        const y = (e.clientY / window.innerHeight - 0.5) * 50;
        
        glow.style.transform = `translate(${x}px, ${y}px)`;
    });

    // Log a sophisticated message
    console.log(
        "%c 0x653o // ARCHIVE COLLECTIVE ",
        "color: #ffffff; background: #000000; padding: 10px; font-family: serif; font-size: 16px; border: 1px solid #333;"
    );
});
