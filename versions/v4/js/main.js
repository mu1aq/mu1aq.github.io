document.addEventListener('DOMContentLoaded', () => {
    // HUD Clock
    const clockElement = document.getElementById('hud-clock');
    
    function updateClock() {
        if (!clockElement) return;
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
        if (!container || !hologram) return;
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;
        
        container.style.transform = `perspective(1000px) rotateX(${-y * 0.1}deg) rotateY(${x * 0.1}deg)`;
        hologram.style.background = `radial-gradient(circle at ${50 + x}% ${50 + y}%, rgba(0, 243, 255, 0.15) 0%, transparent 70%)`;
    });

    // Random Glitch Trigger
    setInterval(() => {
        const logo = document.querySelector('.hud-logo');
        if (!logo) return;
        logo.classList.add('glitching');
        setTimeout(() => {
            logo.classList.remove('glitching');
        }, 200);
    }, 3000);

    // 1. Fetch Data and Populate UI
    fetch('../../data.json')
        .then(response => response.json())
        .then(data => {
            populateUI(data);
        })
        .catch(err => console.error('Error loading data:', err));

    function populateUI(data) {
        if (document.getElementById('user-name')) document.getElementById('user-name').textContent = data.user.name;
        if (document.getElementById('user-bio')) document.getElementById('user-bio').textContent = data.user.bio;
        if (document.getElementById('system-status')) document.getElementById('system-status').textContent = data.user.status;

        // Contact link
        if (document.getElementById('contact-link')) document.getElementById('contact-link').href = `mailto:${data.user.email}`;

        // Affiliations
        const affContainer = document.getElementById('affiliations-container');
        if (affContainer) {
            affContainer.innerHTML = '';
            data.affiliations.forEach(aff => {
                const li = document.createElement('li');
                li.textContent = aff.replace('· ', '');
                affContainer.appendChild(li);
            });
        }

        // Studying
        const studyContainer = document.getElementById('studying-container');
        if (studyContainer) {
            studyContainer.innerHTML = '';
            data.studying.forEach(item => {
                const li = document.createElement('li');
                li.textContent = item;
                studyContainer.appendChild(li);
            });
        }

        // Focus (Research Objectives)
        const focusContainer = document.getElementById('focus-container');
        if (focusContainer) {
            focusContainer.innerHTML = '';
            data.focus.slice(0, 4).forEach((item, index) => {
                const div = document.createElement('div');
                div.className = 'research-item';
                div.innerHTML = `
                    <span class="res-num">${String(index + 1).padStart(2, '0')}</span>
                    <span class="res-title">${item.category}</span>
                    <p>${item.short_desc}</p>
                `;
                focusContainer.appendChild(div);
            });
        }

        // Projects (Intel Logs)
        const projContainer = document.getElementById('projects-container');
        if (projContainer) {
            projContainer.innerHTML = '';
            data.projects.slice(0, 2).forEach(proj => {
                const div = document.createElement('div');
                div.className = 'hud-project-item';
                div.innerHTML = `
                    <div class="hp-meta">${proj.year}_${proj.title.replace(/\s+/g, '_').toUpperCase()}</div>
                    <h3 class="hp-title">${proj.title}</h3>
                    <p class="hp-desc">${proj.desc}</p>
                    <span class="hp-result">TAG: ${proj.tag}</span>
                `;
                projContainer.appendChild(div);
            });
        }

        // Skills
        const skillsContainer = document.getElementById('skills-container');
        if (skillsContainer) {
            skillsContainer.innerHTML = '';
            data.skills.forEach(skill => {
                const span = document.createElement('span');
                span.textContent = skill;
                skillsContainer.appendChild(span);
            });
        }
    }

    console.log(
        "%c[SYSTEM ALERT]%c SECURITY_SESSION_V4_ACTIVE",
        "color: #00f3ff; font-weight: bold;",
        "color: #e0faff;"
    );
});
