export const projectAnimations = {
  // 1. Budget Tracker -> "The Real Tracker" (Neo-Brutalism Grid)
  "The Real Tracker": (canvas, ctx) => {
    let time = 0;
    const spacing = 40;
    let mouse = { x: -1000, y: -1000 };
    let floatingNumbers = [];

    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    window.addEventListener("mousemove", onMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = "#000000";
      ctx.lineWidth = 0.5;

      const cols = Math.ceil(canvas.width / spacing);
      const rows = Math.ceil(canvas.height / spacing);
      const scrollY = (time * 20) % spacing;

      ctx.beginPath();
      // Vertical Lines
      for (let i = 0; i <= cols; i++) {
        const x = i * spacing;
        const distX = x - mouse.x;
        const dist = Math.abs(distX);
        const shift = dist < 100 ? (100 - dist) * (distX > 0 ? 0.3 : -0.3) : 0;
        ctx.moveTo(x + shift, 0);
        ctx.lineTo(x + shift, canvas.height);
      }
      // Horizontal Lines
      for (let i = -1; i <= rows; i++) {
        const y = i * spacing + scrollY;
        const distY = y - mouse.y;
        const dist = Math.abs(distY);
        const shift = dist < 100 ? (100 - dist) * (distY > 0 ? 0.3 : -0.3) : 0;
        ctx.moveTo(0, y + shift);
        ctx.lineTo(canvas.width, y + shift);
      }
      ctx.stroke();

      // Floating Numbers ($)
      if (Math.random() > 0.96) {
        floatingNumbers.push({
          x: Math.random() * canvas.width,
          y: canvas.height + 20,
          val:
            (Math.random() > 0.5 ? "+" : "-") +
            "$" +
            Math.floor(Math.random() * 500),
          speed: Math.random() * 1 + 0.5,
          opacity: 1,
        });
      }

      floatingNumbers.forEach((n, i) => {
        n.y -= n.speed;
        n.opacity -= 0.005;
        ctx.fillStyle = `rgba(0, 0, 0, ${n.opacity})`;
        ctx.font = "12px monospace";
        ctx.fillText(n.val, n.x, n.y);
        if (n.opacity <= 0) floatingNumbers.splice(i, 1);
      });

      // Blinking Cell
      if (Math.random() > 0.95) {
        const blCol = Math.floor(Math.random() * cols);
        const blRow = Math.floor(Math.random() * rows);
        ctx.fillStyle = "#000";
        ctx.fillRect(
          blCol * spacing,
          (blRow * spacing + scrollY) % canvas.height,
          spacing,
          spacing
        );
      }

      time += 0.01;
      return requestAnimationFrame(animate);
    };

    const frameId = animate();
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(frameId);
    };
  },

  // 2. Music Player 2 -> "musicPlayer3.0" (Minimalist Audio)
  "musicPlayer3.0": (canvas, ctx) => {
    let time = 0;
    let mouse = { x: canvas.width / 2, y: canvas.height / 2 };

    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    window.addEventListener("mousemove", onMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();

      const centerY = canvas.height / 2;
      // Mouse Y controls amplitude (0 to 100)
      const amplitude = Math.max(
        10,
        Math.min(150, Math.abs(mouse.y - centerY))
      );
      // Mouse X controls frequency
      const frequency = 0.01 + (mouse.x / canvas.width) * 0.05;

      for (let x = 0; x < canvas.width; x++) {
        const y = centerY + Math.sin(x * frequency + time) * amplitude;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }

      ctx.strokeStyle = "#000";
      ctx.lineWidth = 2;
      ctx.stroke();

      time += 0.1;
      return requestAnimationFrame(animate);
    };

    const frameId = animate();
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(frameId);
    };
  },

  // 3. Weather Forecast -> "WeatherForcast" (Weather scene)
  WeatherForcast: (canvas, ctx) => {
    let time = 0;
    let raindrops = [];

    // Init rain
    for (let i = 0; i < 50; i++) {
      raindrops.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        l: Math.random() * 10 + 5,
        v: Math.random() * 5 + 2,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Sun
      ctx.beginPath();
      ctx.arc(canvas.width - 80, 80, 40, 0, Math.PI * 2);
      ctx.fillStyle = "#FFCC00";
      ctx.fill();
      // Sun rays
      ctx.strokeStyle = "#FFCC00";
      ctx.lineWidth = 2;
      for (let i = 0; i < 8; i++) {
        const angle = time * 0.5 + (i * Math.PI * 2) / 8;
        ctx.beginPath();
        ctx.moveTo(
          canvas.width - 80 + Math.cos(angle) * 50,
          80 + Math.sin(angle) * 50
        );
        ctx.lineTo(
          canvas.width - 80 + Math.cos(angle) * 70,
          80 + Math.sin(angle) * 70
        );
        ctx.stroke();
      }

      // Clouds
      const drawCloud = (x, y, scale) => {
        ctx.fillStyle = "rgba(200, 200, 200, 0.5)";
        ctx.beginPath();
        ctx.arc(x, y, 30 * scale, 0, Math.PI * 2);
        ctx.arc(x + 25 * scale, y - 10 * scale, 35 * scale, 0, Math.PI * 2);
        ctx.arc(x + 50 * scale, y, 30 * scale, 0, Math.PI * 2);
        ctx.fill();
      };

      drawCloud(100 + Math.sin(time * 0.5) * 20, 100, 1);
      drawCloud(300 + Math.cos(time * 0.3) * 30, 200, 1.2);
      drawCloud(500 + Math.sin(time * 0.4) * -20, 80, 0.8);

      // Rain
      ctx.strokeStyle = "rgba(0, 0, 0, 0.2)";
      ctx.lineWidth = 1;
      raindrops.forEach((r) => {
        r.y += r.v;
        if (r.y > canvas.height) {
          r.y = -20;
          r.x = Math.random() * canvas.width;
        }
        ctx.beginPath();
        ctx.moveTo(r.x, r.y);
        ctx.lineTo(r.x, r.y + r.l);
        ctx.stroke();
      });

      time += 0.02;
      return requestAnimationFrame(animate);
    };

    const frameId = animate();
    return () => {
      cancelAnimationFrame(frameId);
    };
  },

  // 4. Book Suggestion -> "VibeRead AI" (Scattered Typeset)
  "VibeRead AI": (canvas, ctx) => {
    const chars =
      "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm{}[]?!@&";
    let particles = [];
    const count = 40;

    // Init particles
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        char: chars[Math.floor(Math.random() * chars.length)],
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        angle: Math.random() * Math.PI * 2,
      });
    }

    let mouse = { x: -1000, y: -1000 };
    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    window.addEventListener("mousemove", onMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#000";
      ctx.font = "24px serif"; // Deconstructed serif
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      particles.forEach((p) => {
        // Move
        p.x += p.vx;
        p.y += p.vy;
        p.angle += 0.01;

        // Bounce
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Mouse attraction
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          p.x += dx * 0.02;
          p.y += dy * 0.02;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.fillText(p.char, 0, 0);
        ctx.restore();
      });

      return requestAnimationFrame(animate);
    };

    const frameId = animate();
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(frameId);
    };
  },

  // 5. AI Quiz -> "AI-QUIZ (Wized Quiz)" (Soft Focus Bubbles)
  "AI-QUIZ (Wized Quiz)": (canvas, ctx) => {
    let bubbles = [];
    for (let i = 0; i < 15; i++) {
      bubbles.push({
        x: Math.random() * canvas.width,
        y: canvas.height + Math.random() * 500,
        r: Math.random() * 50 + 20,
        speed: Math.random() * 1 + 0.5,
      });
    }

    let explosions = [];

    const onClick = (e) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;

      // Check bubble click
      bubbles.forEach((b, idx) => {
        const dx = mx - b.x;
        const dy = my - b.y;
        if (Math.sqrt(dx * dx + dy * dy) < b.r) {
          // Pop
          b.y = canvas.height + 100 + Math.random() * 100;
          b.x = Math.random() * canvas.width;
          // Add explosion particles
          for (let k = 0; k < 8; k++) {
            explosions.push({
              x: mx,
              y: my,
              vx: (Math.random() - 0.5) * 5,
              vy: (Math.random() - 0.5) * 5,
              life: 1.0,
            });
          }
        }
      });
    };
    canvas.addEventListener("click", onClick);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Bubbles
      bubbles.forEach((b) => {
        b.y -= b.speed;
        if (b.y < -100) {
          b.y = canvas.height + 100;
          b.x = Math.random() * canvas.width;
        }

        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0,0,0,0.05)";
        ctx.fill();
      });

      // Explosions
      for (let i = explosions.length - 1; i >= 0; i--) {
        const e = explosions[i];
        e.x += e.vx;
        e.y += e.vy;
        e.life -= 0.05;

        if (e.life <= 0) {
          explosions.splice(i, 1);
        } else {
          ctx.beginPath();
          ctx.arc(e.x, e.y, 3 * e.life, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0,0,0,${e.life})`;
          ctx.fill();
        }
      }

      return requestAnimationFrame(animate);
    };

    const frameId = animate();
    return () => {
      canvas.removeEventListener("click", onClick);
      cancelAnimationFrame(frameId);
    };
  },

  // 6. Interactive Map -> "Mio-Spatial" (The Network)
  "Mio-Spatial": (canvas, ctx) => {
    let nodes = [];
    const count = 30;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = 200;
      nodes.push({
        x: r * Math.sin(phi) * Math.cos(theta),
        y: r * Math.sin(phi) * Math.sin(theta),
        z: r * Math.cos(phi),
        baseX: 0,
        baseY: 0,
      });
    }

    let angleY = 0;
    let mouse = { x: -1000, y: -1000 };

    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    window.addEventListener("mousemove", onMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      let projected = nodes.map((n) => {
        const x = n.x * Math.cos(angleY) - n.z * Math.sin(angleY);
        const z = n.z * Math.cos(angleY) + n.x * Math.sin(angleY);
        const scale = 300 / (300 + z);
        return {
          px: cx + x * scale,
          py: cy + n.y * scale,
          scale,
          x: x,
          y: n.y,
          z: z,
        };
      });

      projected.forEach((p, i) => {
        projected.slice(i + 1).forEach((p2) => {
          const d = Math.sqrt((p.px - p2.px) ** 2 + (p.py - p2.py) ** 2);
          if (d < 100) {
            ctx.beginPath();
            ctx.moveTo(p.px, p.py);
            ctx.lineTo(p2.px, p2.py);

            const dMouse = Math.sqrt(
              (p.px - mouse.x) ** 2 + (p.py - mouse.y) ** 2
            );
            if (dMouse < 30) {
              ctx.strokeStyle = "#000";
              ctx.globalAlpha = 0.8;
            } else {
              ctx.strokeStyle = "#000";
              ctx.globalAlpha = 0.1;
            }
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });

        ctx.beginPath();
        ctx.arc(p.px, p.py, 2 * p.scale, 0, Math.PI * 2);
        ctx.fillStyle = "#000";
        ctx.globalAlpha = 1;
        ctx.fill();
      });

      angleY += 0.005;
      return requestAnimationFrame(animate);
    };

    const frameId = animate();
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(frameId);
    };
  },

  // 7. InfoGraph -> "Orbital Debris Tracker" (Centrifugal Orbit)
  "Orbital Debris Tracker": (canvas, ctx) => {
    let particles = [];
    for (let i = 0; i < 300; i++) {
      particles.push({
        angle: Math.random() * Math.PI * 2,
        radius: 100 + Math.random() * 200,
        size: Math.random() * 1.5,
        speed: (Math.random() + 0.2) * 0.02,
      });
    }

    let speedMulti = 1;
    let mouseX = 0;

    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = (e.clientX - rect.left) / canvas.width;
      speedMulti = mouseX * 5;
    };
    window.addEventListener("mousemove", onMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      particles.forEach((p) => {
        p.angle += p.speed * speedMulti;
        const x = cx + Math.cos(p.angle) * p.radius;
        const y = cy + Math.sin(p.angle) * p.radius * 0.4;

        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = "#000";
        ctx.globalAlpha = Math.sin(p.angle) > 0 ? 0.8 : 0.2;
        ctx.fill();
      });

      return requestAnimationFrame(animate);
    };

    const frameId = animate();
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(frameId);
    };
  },

  // 8. UI Design Giver -> "UI Design Giver" (Blueprint)
  "UI Design Giver": (canvas, ctx) => {
    let rects = [];
    let drawings = [];
    let ghostCursor = { x: 0, y: 0, targetX: 100, targetY: 100 };
    let lastDrawTime = 0;
    let shapes = [
      { type: "square", x: 100, y: 100, vx: 1, vy: 0.5, size: 40, rotation: 0 },
      { type: "circle", x: 300, y: 200, vx: -0.5, vy: 1, size: 25 },
      {
        type: "triangle",
        x: 500,
        y: 150,
        vx: 0.8,
        vy: -0.8,
        size: 30,
        rotation: 0,
      },
    ];

    const addRandomRect = () => {
      rects.push({
        x: ghostCursor.x,
        y: ghostCursor.y,
        w: ghostCursor.targetX - ghostCursor.x,
        h: ghostCursor.targetY - ghostCursor.y,
        life: 1.0,
      });
      ghostCursor.x = Math.random() * canvas.width;
      ghostCursor.y = Math.random() * canvas.height;
      ghostCursor.targetX = ghostCursor.x + (Math.random() - 0.5) * 300;
      ghostCursor.targetY = ghostCursor.y + (Math.random() - 0.5) * 300;
    };

    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      drawings.push({ x, y, life: 1.0 });
    };
    window.addEventListener("mousemove", onMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      shapes.forEach((s) => {
        s.x += s.vx;
        s.y += s.vy;
        if (s.x < 0 || s.x > canvas.width) s.vx *= -1;
        if (s.y < 0 || s.y > canvas.height) s.vy *= -1;

        ctx.strokeStyle = "#000";
        ctx.lineWidth = 1.5;
        ctx.beginPath();

        if (s.type === "square") {
          s.rotation += 0.01;
          ctx.save();
          ctx.translate(s.x, s.y);
          ctx.rotate(s.rotation);
          ctx.strokeRect(-s.size / 2, -s.size / 2, s.size, s.size);
          ctx.restore();
        } else if (s.type === "circle") {
          ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
          ctx.stroke();
        } else if (s.type === "triangle") {
          s.rotation -= 0.01;
          ctx.save();
          ctx.translate(s.x, s.y);
          ctx.rotate(s.rotation);
          ctx.moveTo(0, -s.size);
          ctx.lineTo(s.size, s.size);
          ctx.lineTo(-s.size, s.size);
          ctx.closePath();
          ctx.stroke();
          ctx.restore();
        }
      });

      if (Date.now() - lastDrawTime > 1000) {
        addRandomRect();
        lastDrawTime = Date.now();
      }

      for (let i = rects.length - 1; i >= 0; i--) {
        const r = rects[i];
        ctx.strokeStyle = `rgba(0,0,0,${r.life})`;
        ctx.lineWidth = 1;
        ctx.setLineDash([5, 5]);
        ctx.strokeRect(r.x, r.y, r.w, r.h);
        ctx.setLineDash([]);
        ctx.fillStyle = `rgba(0,0,0,${r.life})`;
        ctx.fillRect(r.x - 2, r.y - 2, 4, 4);
        ctx.fillRect(r.x + r.w - 2, r.y + r.h - 2, 4, 4);
        r.life -= 0.01;
        if (r.life <= 0) rects.splice(i, 1);
      }

      ctx.beginPath();
      for (let i = drawings.length - 1; i >= 0; i--) {
        const d = drawings[i];
        ctx.fillStyle = `rgba(0,0,0,${d.life})`;
        ctx.fillRect(d.x, d.y, 2, 2);
        d.life -= 0.02;
        if (d.life <= 0) drawings.splice(i, 1);
      }

      return requestAnimationFrame(animate);
    };

    const frameId = animate();
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(frameId);
    };
  },
};
