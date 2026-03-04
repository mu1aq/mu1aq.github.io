document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle Functionality
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    const savedTheme = localStorage.getItem('theme') || 'light';
    htmlElement.classList.remove('light', 'dark');
    htmlElement.classList.add(savedTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = htmlElement.classList.contains('dark') ? 'dark' : 'light';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            htmlElement.classList.remove(currentTheme);
            htmlElement.classList.add(newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }

    // 1. Fetch Data and Populate UI
    fetch('../../data.json')
        .then(response => response.json())
        .then(data => {
            populateUI(data);
        })
        .catch(err => console.error('Error loading data:', err));

    function populateUI(data) {
        if (document.getElementById('user-name')) document.getElementById('user-name').textContent = `${data.user.name} (${data.user.handle.split(' · ')[0]})`;
        if (document.getElementById('user-role')) document.getElementById('user-role').textContent = data.user.role;
        if (document.getElementById('user-location')) document.getElementById('user-location').textContent = data.user.location;
        if (document.getElementById('system-status')) document.getElementById('system-status').textContent = data.user.status;
        if (document.getElementById('about-text')) document.getElementById('about-text').textContent = data.user.v1_bio;

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

        // Interests
        const interestsContainer = document.getElementById('interests-container');
        if (interestsContainer) {
            interestsContainer.innerHTML = '';
            data.interests.forEach(item => {
                const li = document.createElement('li');
                li.textContent = item;
                interestsContainer.appendChild(li);
            });
        }

        // Future Goals
        const goalsContainer = document.getElementById('goals-container');
        if (goalsContainer) {
            goalsContainer.innerHTML = '';
            data.goals.forEach(item => {
                const li = document.createElement('li');
                li.textContent = item;
                goalsContainer.appendChild(li);
            });
        }

        // Ultimate Focus
        const focusContainer = document.getElementById('focus-container');
        if (focusContainer) {
            focusContainer.innerHTML = '';
            data.focus.forEach(item => {
                const li = document.createElement('li');
                li.innerHTML = `<strong>${item.category}:</strong> ${item.long_desc}`;
                focusContainer.appendChild(li);
            });
        }

        // Ultimate Ambitions
        const ambitionsContainer = document.getElementById('ambitions-container');
        if (ambitionsContainer) {
            ambitionsContainer.innerHTML = '';
            data.ambitions.forEach(item => {
                const li = document.createElement('li');
                li.textContent = item;
                ambitionsContainer.appendChild(li);
            });
        }

        // Skills
        const skillsContainer = document.getElementById('skills-container');
        if (skillsContainer) {
            skillsContainer.innerHTML = '';
            data.skills.forEach(skill => {
                const div = document.createElement('div');
                div.className = 'skill-item';
                div.innerHTML = `<span class="material-symbols-outlined">code</span><span>${skill}</span>`;
                skillsContainer.appendChild(div);
            });
        }

        // Projects
        const projContainer = document.getElementById('projects-container');
        if (projContainer) {
            projContainer.innerHTML = '';
            data.projects.forEach(proj => {
                const div = document.createElement('div');
                div.className = 'list-item clickable';
                div.setAttribute('data-link', proj.link);
                div.innerHTML = `
                    <div class="list-item-icon">
                        <span class="material-symbols-outlined">task</span>
                    </div>
                    <div class="list-item-content">
                        <div class="list-item-header">
                            <h3>${proj.title}</h3>
                            <span class="material-symbols-outlined arrow">chevron_right</span>
                        </div>
                        <p class="list-item-meta">${proj.year} · ${proj.tag}</p>
                        <p class="list-item-description">${proj.long_desc}</p>
                        <div class="tag-list">
                            <span class="tag">${proj.tag}</span>
                        </div>
                    </div>
                `;
                div.addEventListener('click', () => {
                    if (proj.link) window.open(proj.link, '_blank');
                });
                projContainer.appendChild(div);
            });
        }

        // Experience
        const expContainer = document.getElementById('experience-container');
        if (expContainer) {
            expContainer.innerHTML = '';
            data.experience.forEach(exp => {
                const div = document.createElement('div');
                div.className = 'list-item';
                div.innerHTML = `
                    <div class="list-item-icon">
                        <span class="material-symbols-outlined">groups</span>
                    </div>
                    <div class="list-item-content">
                        <h3>${exp.title}</h3>
                        <p class="list-item-meta">${exp.meta}</p>
                    </div>
                `;
                expContainer.appendChild(div);
            });
        }
    }

    // Contact Button Redirect
    const contactBtn = document.getElementById('contact-btn');
    if (contactBtn) {
        contactBtn.addEventListener('click', () => {
            window.location.href = `mailto:${data.user.email}`;
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
});
