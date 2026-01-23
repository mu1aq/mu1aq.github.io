// ========== Smooth Scrolling for Navigation Links ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// ========== Intersection Observer for Fade-in Animations ==========
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
});

document.querySelectorAll('.skill-card, .project-card, .achievement').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s, transform 0.5s';
    observer.observe(el);
});

// ========== Active Navigation Indicator ==========
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.style.color = 'var(--primary)';
        } else {
            link.style.color = 'var(--text-secondary)';
        }
    });
});

// ========== 추가 기능: 모바일 메뉴 토글 (옵션) ==========
// 필요시 추가
const toggleMobileMenu = () => {
    const navUl = document.querySelector('nav ul');
    navUl.style.display = navUl.style.display === 'flex' ? 'none' : 'flex';
};

// ========== 페이지 로드 완료 시 실행 ==========
document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio website loaded successfully');
});
