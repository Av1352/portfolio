// particles.js — soft neural motion background for Anju's portfolio

const canvas = document.getElementById("particleCanvas");
if (canvas) {
    const ctx = canvas.getContext("2d");
    let particles = [];

    function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    }

    window.addEventListener("resize", resize);
    resize();

  // Create soft-moving particles
    const NUM_PARTICLES = 40;
    const COLORS = ["#73BA9B", "#C08552", "#895737"];

    for (let i = 0; i < NUM_PARTICLES; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 1,
      dx: (Math.random() - 0.5) * 0.25,
      dy: (Math.random() - 0.5) * 0.25,
      color: COLORS[Math.floor(Math.random() * COLORS.length)]
    });
    } 

    function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.fill();

        p.x += p.dx;
        p.y += p.dy;

      // bounce off edges
      if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
    });

    requestAnimationFrame(draw);
    }
    draw();
}
