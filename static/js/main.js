// Theme Toggle Functionality
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

// Load saved theme from localStorage
const savedTheme = localStorage.getItem('theme') || 'light';
htmlElement.classList.remove('light', 'dark');
htmlElement.classList.add(savedTheme);

// Toggle theme on button click
themeToggle.addEventListener('click', () => {
    const currentTheme = htmlElement.classList.contains('dark') ? 'dark' : 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    htmlElement.classList.remove(currentTheme);
    htmlElement.classList.add(newTheme);
    
    // Save to localStorage
    localStorage.setItem('theme', newTheme);
});

// Project Click Redirects
const projectItems = document.querySelectorAll('.list-item.clickable');

projectItems.forEach(item => {
    item.addEventListener('click', () => {
        const link = item.getAttribute('data-link');
        if (link) {
            window.open(link, '_blank'); // 새 탭에서 열기
            // 또는 window.location.href = link; // 같은 탭에서 열기
        }
    });
});

// Contact Button Redirect
const contactBtn = document.getElementById('contact-btn');

contactBtn.addEventListener('click', () => {
    // 원하는 링크로 변경하세요
    const contactLink = 'https://linktr.ee/0x653o';
    // const contactLink = 'https://twitter.com/yourusername'; // Twitter
    // const contactLink = 'https://linkedin.com/in/yourprofile'; // LinkedIn
    // const contactLink = '/contact.html'; // 다른 페이지
    
    window.location.href = contactLink;
});

// Smooth scroll for anchor links (if any)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
