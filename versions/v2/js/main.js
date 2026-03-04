// Subtle interaction for the portfolio
document.addEventListener('DOMContentLoaded', () => {
    // Background glow follow mouse (subtle)
    const glow = document.querySelector('.glow-container');
    
    document.addEventListener('mousemove', (e) => {
        if (!glow) return;
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

    function initAnimations() {
        document.querySelectorAll('.section').forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';
            section.style.transition = 'all 0.6s cubic-bezier(0.22, 1, 0.36, 1)';
            observer.observe(section);
        });
    }
    initAnimations();

    // 1. Fetch Data and Populate UI
    fetch('../../data.json')
        .then(response => response.json())
        .then(data => {
            populateUI(data);
            initAnimations();
        })
        .catch(err => console.error('Error loading data:', err));

    function populateUI(data) {
        if (document.getElementById('hero-title')) {
             document.getElementById('hero-title').innerHTML = `${data.user.name} <span class="accent">(${data.user.handle})</span>`;
        }
        if (document.getElementById('hero-subtitle')) {
            document.getElementById('hero-subtitle').innerHTML = `${data.user.bio}<br>Security Researcher focusing on <span class="highlight">V8 Engine</span>, <span class="highlight">Linux Kernel</span>, and <span class="highlight">Browser Exploitation</span>.`;
        }
        if (document.getElementById('system-status')) document.getElementById('system-status').textContent = data.user.status;

        // Header links
        if (document.getElementById('github-link')) document.getElementById('github-link').href = `https://github.com/${data.user.handle.split(' ')[0]}`;
        if (document.getElementById('email-link')) document.getElementById('email-link').href = `mailto:${data.user.email}`;

        // Focus
        const focusContainer = document.getElementById('focus-container');
        if (focusContainer) {
            focusContainer.innerHTML = '';
            data.focus.slice(0, 3).forEach(item => {
                const div = document.createElement('div');
                div.className = 'focus-item';
                div.innerHTML = `<h3>${item.category}</h3><p>${item.short_desc}</p>`;
                focusContainer.appendChild(div);
            });
        }

        // Projects
        const projContainer = document.getElementById('projects-container');
        if (projContainer) {
            projContainer.innerHTML = '';
            data.projects.forEach(proj => {
                const div = document.createElement('div');
                div.className = 'project-item';
                div.innerHTML = `
                    <div class="project-meta">${proj.year}</div>
                    <div class="project-content">
                        <h3>${proj.title} <span class="badge">${proj.tag}</span></h3>
                        <p>${proj.desc}</p>
                        <div class="project-tags">${proj.tag}</div>
                    </div>
                `;
                projContainer.appendChild(div);
            });
        }

        // Ambitions
        const ambitionsContainer = document.getElementById('ambitions-container');
        if (ambitionsContainer) {
            ambitionsContainer.innerHTML = '';
            data.ambitions.forEach(item => {
                const li = document.createElement('li');
                li.innerHTML = `<span class="accent-line">${item}</span>`;
                ambitionsContainer.appendChild(li);
            });
        }

        // Footer
        if (document.getElementById('copyright-text')) document.getElementById('copyright-text').textContent = `© ${new Date().getFullYear()} ${data.user.name}. Built for the deep dive.`;
        if (document.getElementById('footer-location')) document.getElementById('footer-location').textContent = data.user.location;
    }
});
