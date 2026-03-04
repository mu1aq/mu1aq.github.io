document.addEventListener('DOMContentLoaded', () => {
    // 1. Fetch Data and Populate UI
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            populateUI(data);
            initAnimations();
        })
        .catch(err => console.error('Error loading data:', err));

    function populateUI(data) {
        // User Info
        document.getElementById('user-handle').textContent = data.user.handle;
        document.getElementById('footer-handle').textContent = data.user.handle;
        document.getElementById('user-location').textContent = data.user.location;
        document.getElementById('user-role').textContent = data.user.role;
        document.getElementById('user-bio').textContent = data.user.bio;
        document.getElementById('about-bio').textContent = data.user.bio;
        document.getElementById('system-status').textContent = data.user.status;

        // Hero Name (Italicize handle)
        document.getElementById('hero-name-container').innerHTML = `${data.user.name} <span class="italic">${data.user.handle}</span>`;

        // Affiliations
        const affContainer = document.getElementById('affiliations-container');
        data.affiliations.forEach(aff => {
            const div = document.createElement('div');
            div.className = 'aff-item';
            div.textContent = aff;
            affContainer.appendChild(div);
        });

        // Studying
        const studyContainer = document.getElementById('studying-container');
        data.studying.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            studyContainer.appendChild(li);
        });

        // Focus
        const focusContainer = document.getElementById('focus-container');
        data.focus.forEach(item => {
            const div = document.createElement('div');
            div.className = 'focus-entry';
            div.innerHTML = `<h3>${item.category}</h3><p>${item.desc}</p>`;
            focusContainer.appendChild(div);
        });

        // Projects
        const projContainer = document.getElementById('projects-container');
        data.projects.forEach(proj => {
            const el = document.createElement(proj.link ? 'a' : 'div');
            if (proj.link) {
                el.href = proj.link;
                el.target = "_blank";
            }
            el.className = 'project-row';
            el.innerHTML = `
                <span class="pr-year">${proj.year}</span>
                <span class="pr-title">${proj.title}</span>
                <span class="pr-tag">${proj.tag}</span>
            `;
            projContainer.appendChild(el);
        });

        // Skills
        const skillsContainer = document.getElementById('skills-container');
        data.skills.forEach(skill => {
            const span = document.createElement('span');
            span.textContent = skill;
            skillsContainer.appendChild(span);
        });
    }

    function initAnimations() {
        const observerOptions = {
            threshold: 0.15,
            rootMargin: "0px 0px -50px 0px"
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
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
