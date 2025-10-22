const canvas = document.getElementById("globalParticles");
const ctx = canvas.getContext("2d");

let particles = [];
const numParticles = 100;
let mouse = { x: null, y: null, radius: 120 };

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

class Particle {
    constructor(x, y, dx, dy, size) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.size = size;
        this.baseColor = "rgba(115,186,155,0.25)";
        this.glowColor = "rgba(218,180,157,0.9)";
        this.glow = 0;
    }

    draw() {
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(
            this.x,
            this.y,
            this.size * 0.4,
            this.x,
            this.y,
            this.size * (2.2 + this.glow)
        );
        gradient.addColorStop(0, this.glow > 0 ? this.glowColor : this.baseColor);
        gradient.addColorStop(1, "transparent");
        ctx.fillStyle = gradient;
        ctx.arc(this.x, this.y, this.size + this.glow, 0, Math.PI * 2, false);
        ctx.fill();
    }

    update() {
        this.x += this.dx;
        this.y += this.dy;

        if (this.x < 0 || this.x > canvas.width) this.dx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.dy *= -1;

        if (mouse.x && mouse.y) {
            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < mouse.radius) {
                this.glow = Math.min(3, (mouse.radius - distance) / 40);
            } else {
                this.glow = Math.max(0, this.glow - 0.05);
            }
        }

        this.draw();
    }
}

function init() {
    particles = [];
    for (let i = 0; i < numParticles; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const dx = (Math.random() - 0.5) * 0.2;
        const dy = (Math.random() - 0.5) * 0.2;
        const size = Math.random() * 2 + 1;
        particles.push(new Particle(x, y, dx, dy, size));
    }
}
init();

window.addEventListener("mousemove", (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
});
window.addEventListener("mouseout", () => {
    mouse.x = null;
    mouse.y = null;
});

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p) => p.update());
    requestAnimationFrame(animate);
}
animate();
