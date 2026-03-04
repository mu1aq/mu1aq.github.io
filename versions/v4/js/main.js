document.addEventListener('DOMContentLoaded', () => {
    // HUD Clock
    const clockElement = document.getElementById('hud-clock');
    
    function updateClock() {
        const now = new Date();
        const h = String(now.getHours()).padStart(2, '0');
        const m = String(now.getMinutes()).padStart(2, '0');
        const s = String(now.getSeconds()).padStart(2, '0');
        const ms = String(Math.floor(now.getMilliseconds() / 10)).padStart(2, '0');
        
        clockElement.textContent = `${h}:${m}:${s}:${ms}`;
    }
    
    setInterval(updateClock, 50);

    // Module Hover Sound Simulation (Visual only)
    const modules = document.querySelectorAll('.hud-module');
    modules.forEach(mod => {
        mod.addEventListener('mouseenter', () => {
            mod.style.borderColor = 'rgba(0, 243, 255, 0.6)';
            mod.style.boxShadow = '0 0 15px rgba(0, 243, 255, 0.1)';
        });
        
        mod.addEventListener('mouseleave', () => {
            mod.style.borderColor = 'rgba(0, 243, 255, 0.2)';
            mod.style.boxShadow = 'none';
        });
    });

    // Suble Mouse Parallax for the Hologram
    const container = document.querySelector('.hud-container');
    const hologram = document.querySelector('.hologram-glow');

    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;
        
        container.style.transform = `perspective(1000px) rotateX(${-y * 0.1}deg) rotateY(${x * 0.1}deg)`;
        hologram.style.background = `radial-gradient(circle at ${50 + x}% ${50 + y}%, rgba(0, 243, 255, 0.15) 0%, transparent 70%)`;
    });

    // Random Glitch Trigger
    setInterval(() => {
        const logo = document.querySelector('.hud-logo');
        logo.classList.add('glitching');
        setTimeout(() => {
            logo.classList.remove('glitching');
        }, 200);
    }, 3000);

    console.log(
        "%c[SYSTEM ALERT]%c SECURITY_SESSION_V4_ACTIVE",
        "color: #00f3ff; font-weight: bold;",
        "color: #e0faff;"
    );
});
