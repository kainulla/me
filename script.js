// Portfolio data
const portfolio = {
    name: "bakhtiyar kainolla, product engineer",
    bio: "shipping products people actually love",

    links: [
        "https://github.com/kainulla",
        "https://www.linkedin.com/in/bakhtiyar-kainolla/",
        "https://x.com/kainulla1",
        "https://t.me/kainulla",
        "bakhtiyar.kainolla@gmail.com"
    ],

    projects: [
        {
            text: "fastest scaling genai company in history",
            link: "https://higgsfield.ai"
        },
        {
            text: "content orchestration platform for seamless distribution",
            link: "https://contentflow.fyi"
        },
        {
            text: "ai agents platform for automated customer communication",
            link: "https://qoldau.silkroadtech.kz"
        },
        {
            text: "career guidance platform for professional growth",
            link: "https://orkenlink.kz"
        },
        {
            text: "electronic trading platform for government procurement in kazakhstan",
            link: "https://en.wikipedia.org/wiki/Non-disclosure_agreement"
        },
        {
            text: "state revenue committee at the ministry of finance of kazakhstan",
            link: "https://portal.kgd.gov.kz/en/"
        },
        {
            text: "fastest autopilot bot for kazakhstan's top e-commerce platform",
            link: "https://kaskyr.com"
        },
        {
            text: "smart home mobile app for controlling iot devices",
            link: "https://apps.apple.com/ru/app/connected-home-%D1%83%D0%BC%D0%BD%D1%8B%D0%B9-%D0%B4%D0%BE%D0%BC/id6499302704"
        },
    ]
};

// DOM elements
const output = document.getElementById('output');

function addOutput(text) {
    const line = document.createElement('div');
    line.className = 'output-line';
    line.innerHTML = text;
    output.appendChild(line);
}

function displayPortfolio() {
    // Welcome
    addOutput(`<span class="prompt">$</span> cat portfolio.txt`);
    addOutput('');

    // About
    addOutput(`<span class="section-title">${portfolio.name}</span>`);
    addOutput('');
    addOutput(portfolio.bio);
    addOutput('');
    addOutput('<span class="prompt">─────────────────────────────────</span>');
    addOutput('');

    // Projects
    addOutput(`<span class="prompt">$</span> ls projects/`);
    addOutput('');

    portfolio.projects.forEach((project) => {
        addOutput(`<a href="${project.link}" target="_blank" class="link"><span class="success">${project.text}</span></a>`);
    });

    addOutput('');
    addOutput('and more...');
    addOutput('<span class="prompt">─────────────────────────────────</span>');
    addOutput('');

    // Links
    addOutput(`<span class="prompt">$</span> cat links.txt`);
    addOutput('');

    portfolio.links.forEach((link) => {
        const isEmail = !link.startsWith('http');
        const href = isEmail ? `mailto:${link}` : link;
        addOutput(`<a href="${href}" target="_blank" class="link">${link}</a>`);
    });

}

// Animated particle background
function initBackground() {
    const canvas = document.getElementById('bg-canvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    const PARTICLE_COUNT = 60;
    const CONNECT_DIST = 120;
    const SPEED = 0.3;

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function createParticles() {
        particles = [];
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * SPEED,
                vy: (Math.random() - 0.5) * SPEED,
                r: Math.random() * 1.5 + 0.5,
            });
        }
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // draw connections
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < CONNECT_DIST) {
                    const alpha = (1 - dist / CONNECT_DIST) * 0.15;
                    ctx.strokeStyle = `rgba(88, 166, 255, ${alpha})`;
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }

        // draw particles
        for (const p of particles) {
            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

            ctx.fillStyle = 'rgba(88, 166, 255, 0.4)';
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fill();
        }

        requestAnimationFrame(draw);
    }

    resize();
    createParticles();
    draw();

    window.addEventListener('resize', () => {
        resize();
        createParticles();
    });
}

// Initialize on load
displayPortfolio();
initBackground();