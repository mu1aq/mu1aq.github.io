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
        if (!cursor) return;
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
    function initCardTilt() {
        document.querySelectorAll('.bento-card').forEach(card => {
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
    }
    initCardTilt();

    // 1. Fetch Data and Populate UI
    fetch('../../data.json')
        .then(response => response.json())
        .then(data => {
            populateUI(data);
            initCardTilt(); // Re-initialize for new cards
        })
        .catch(err => console.error('Error loading data:', err));

    function populateUI(data) {
        if (document.getElementById('user-role')) document.getElementById('user-role').textContent = data.user.role;
        if (document.getElementById('hero-desc')) document.getElementById('hero-desc').textContent = data.user.bio;
        if (document.getElementById('whoami-text')) document.getElementById('whoami-text').textContent = `${data.user.name}, Sejong Univ. Sophomore`;
        if (document.getElementById('status-text')) document.getElementById('status-text').textContent = data.user.status;

        // Contact links
        if (document.getElementById('contact-link-1')) document.getElementById('contact-link-1').href = `mailto:${data.user.email}`;
        if (document.getElementById('contact-link-2')) document.getElementById('contact-link-2').href = `mailto:${data.user.email}`;

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

        // Projects
        const projContainer = document.getElementById('projects-container');
        if (projContainer) {
            projContainer.innerHTML = '';
            data.projects.forEach(proj => {
                const div = document.createElement('div');
                div.className = 'project-mini-card clickable';
                if (proj.link) {
                    div.onclick = () => window.open(proj.link, '_blank');
                }
                div.innerHTML = `
                    <div class="pm-meta">${proj.year} / ${proj.tag}</div>
                    <h4 class="pm-title">${proj.title}</h4>
                    <p class="pm-desc">${proj.desc}</p>
                    <div class="tags">${proj.tag}</div>
                `;
                projContainer.appendChild(div);
            });
        }

        // Focus
        const focusContainer = document.getElementById('focus-container');
        if (focusContainer) {
            focusContainer.innerHTML = '';
            data.focus.forEach(item => {
                const div = document.createElement('div');
                div.className = 'focus-item-internal';
                div.innerHTML = `
                    <span class="f-tag">${item.tag || item.category.toUpperCase()}</span>
                    <p>${item.short_desc}</p>
                `;
                focusContainer.appendChild(div);
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

    // Console Log for the curious
    console.log(
        "%c0x653o // System Infiltration Successful",
        "background: #6366f1; color: white; padding: 5px 10px; border-radius: 5px; font-family: monospace; font-size: 14px;"
    );
});
