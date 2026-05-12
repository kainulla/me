// Portfolio data
const portfolio = {
    name: "bakhtiyar kainulla, product engineer",
    bio: "shipping products people actually love",

    links: [
        "https://github.com/kainulla",
        "https://www.linkedin.com/in/bakhtiyar-kainulla/",
        "https://x.com/kainulla1",
        "https://t.me/kainulla",
        "bakhtiyar.kainulla@gmail.com"
    ],

    projects: [
        {
            text: "fastest scaling GenAI company in history",
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
        }
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
    addOutput('<span class="prompt">$</span> ls about/');
    addOutput('');

    // Projects
    addOutput(`<span class="prompt">$</span> ls projects/`);
    addOutput('');


    portfolio.projects.forEach((project) => {
        addOutput(`<a href="${project.link}" target="_blank" class="link"><span class="success">${project.text}</span></a>`);
    });

    addOutput('');
    addOutput('and more...');
    addOutput('<span class="prompt">$</span> ls links.txt');
    addOutput('');

    // Links
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
    const CONNECTION_DIST = 120;
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
                size: Math.random() * 2 + 1
            });
        }
    }

    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#58a6ff';

        particles.forEach((p, i) => {
            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();

            for (let j = i + 1; j < particles.length; j++) {
                const p2 = particles[j];
                const dx = p.x - p2.x;
                const dy = p.y - p2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < CONNECTION_DIST) {
                    ctx.strokeStyle = `rgba(88, 166, 255, ${1 - dist / CONNECTION_DIST})`;
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            }
        });

        requestAnimationFrame(drawParticles);
    }

    window.addEventListener('resize', () => {
        resize();
        createParticles();
    });

    resize();
    createParticles();
    drawParticles();
}

// Initialize
initBackground();
displayPortfolio();