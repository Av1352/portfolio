document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("globalParticles");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    // Resize canvas to full viewport
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const particleCount = 60; // more particles for visual effect
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 2 + 1, // radius 1–3 px
            dx: (Math.random() - 0.5) * 0.6, // horizontal speed
            dy: (Math.random() - 0.5) * 0.6, // vertical speed
            alpha: Math.random() * 0.5 + 0.3, // opacity
        });
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(115,186,155,${p.alpha})`;
            ctx.shadowColor = "rgba(115,186,155,0.6)";
            ctx.shadowBlur = 12;
            ctx.fill();

            // move
            p.x += p.dx;
            p.y += p.dy;

            // wrap around edges
            if (p.x < -p.r) p.x = canvas.width + p.r;
            if (p.x > canvas.width + p.r) p.x = -p.r;
            if (p.y < -p.r) p.y = canvas.height + p.r;
            if (p.y > canvas.height + p.r) p.y = -p.r;
        });

        requestAnimationFrame(draw);
    }

    // additive blending for glow effect
    ctx.globalCompositeOperation = "lighter";

    draw();
});
