document.addEventListener('DOMContentLoaded', () => {
    let currentLang = 'en';
    let globalData = null;

    // 1. Fetch Data
    fetch('data.json?t=' + new Date().getTime())
        .then(response => response.json())
        .then(data => {
            globalData = data;
            render(currentLang);
            initLanguageToggle();
        })
        .catch(err => console.error('Error loading data:', err));

    function render(lang) {
        const data = globalData[lang];
        if (!data) return;

        // User Info
        setText('user-location', data.user.location);
        setText('user-role', data.user.role);
        setText('system-status', data.user.status);
        if (document.getElementById('hero-name-container')) {
            document.getElementById('hero-name-container').innerHTML = `${data.user.name} <span class="italic">${data.user.handle}</span>`;
        }
        setText('hero-subtitle', data.user.bio);
        
        // Labels
        setText('label-about', data.labels.timeline ? data.en ? "ABOUT" : data.labels.about || "ABOUT" : "ABOUT"); 
        // Re-mapping labels for clarity
        setText('label-about', data.about.title);
        setText('label-timeline', data.labels.timeline);
        setText('label-speaking', data.labels.speaking);
        setText('label-community', data.labels.community);
        setText('label-works', data.labels.works);
        setText('label-stack', data.labels.stack);
        setText('label-links', data.labels.links);

        // Content
        setText('about-text', data.about.content);
        const contactLink = document.getElementById('contact-link');
        if (contactLink) {
            contactLink.href = `mailto:${data.user.email}`;
            contactLink.textContent = data.labels.contact;
        }

        // Affiliations
        renderList('affiliations-container', data.affiliations, (item) => `<div class="aff-item">${item}</div>`);

        // Timeline (History) - Split Layout
        renderList('timeline-container', data.timeline, (item, index) => {
            const isEven = index % 2 === 0;
            return `
                <div class="tl-item">
                    <div class="tl-left">
                        ${isEven ? `
                            <div class="tl-year-large">${item.year}</div>
                            <div class="tl-event-text">${item.event}</div>
                        ` : `
                            <div class="tl-detail-text">${item.detail}</div>
                        `}
                    </div>
                    <div class="tl-node"></div>
                    <div class="tl-right">
                        ${!isEven ? `
                            <div class="tl-year-large">${item.year}</div>
                            <div class="tl-event-text">${item.event}</div>
                        ` : `
                            <div class="tl-detail-text">${item.detail}</div>
                        `}
                    </div>
                </div>
            `;
        });

        // Speaking
        renderList('speaking-container', data.speaking, (item) => `
            <div class="project-row">
                <span class="pr-year">${item.date}</span>
                <span class="pr-title">${item.title}</span>
                <span class="pr-tag">${item.link ? 'LINK' : ''}</span>
            </div>
        `);

        // Community
        renderList('community-container', data.community, (item) => `
            <div class="community-entry">
                <h3>${item.org}</h3>
                <p>${item.role}</p>
            </div>
        `);

        // Projects
        renderList('projects-container', data.projects, (item) => `
            <a href="${item.link || '#'}" class="project-row" ${item.link ? 'target="_blank"' : ''}>
                <span class="pr-year">${item.year}</span>
                <span class="pr-title">${item.title}</span>
                <span class="pr-tag">${item.tag}</span>
            </a>
        `);

        // Skills
        renderList('skills-container', data.skills, (item) => `<span>${item}</span>`);

        // Links (Connect)
        renderList('links-container', data.links, (item) => `
            <a href="${item.url}" target="_blank" class="nav-item circle-btn" style="text-decoration: none;">
                ${item.platform}: ${item.label}
            </a>
        `);

        // Footer
        if (document.getElementById('copyright-text')) {
            document.getElementById('copyright-text').innerHTML = `&copy; ${new Date().getFullYear()} ARCHIVE_0x653o. ALL RIGHTS RESERVED.`;
        }

        initAnimations();
    }

    function setText(id, text) {
        const el = document.getElementById(id);
        if (el) el.textContent = text;
    }

    function renderList(containerId, list, templateFn) {
        const container = document.getElementById(containerId);
        if (container) {
            container.innerHTML = list.map(templateFn).join('');
        }
    }

    function initLanguageToggle() {
        const enBtn = document.getElementById('lang-en');
        const koBtn = document.getElementById('lang-ko');

        enBtn.addEventListener('click', () => {
            if (currentLang === 'en') return;
            currentLang = 'en';
            updateLangUI();
            render('en');
        });

        koBtn.addEventListener('click', () => {
            if (currentLang === 'ko') return;
            currentLang = 'ko';
            updateLangUI();
            render('ko');
        });
    }

    function updateLangUI() {
        document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
        document.getElementById(`lang-${currentLang}`).classList.add('active');
    }

    function initAnimations() {
        const observerOptions = { threshold: 0.1 };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    }

    // Ambient Glow Parallax
    document.addEventListener('mousemove', (e) => {
        const glow = document.querySelector('.ambient-glow');
        if (!glow) return;
        const x = (e.clientX / window.innerWidth - 0.5) * 50;
        const y = (e.clientY / window.innerHeight - 0.5) * 50;
        glow.style.transform = `translate(${x}px, ${y}px)`;
    });
});
