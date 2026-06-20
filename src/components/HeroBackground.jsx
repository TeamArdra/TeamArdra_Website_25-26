"use client";
import { useEffect, useRef } from "react";

/**
 * "FLIGHT RADAR" hero background — pure Canvas 2D, no libraries.
 * Layers: radar sweep · aeronautical particles · HUD overlay · constellation mesh.
 * Sits at z-0 behind hero content (pointer-events: none).
 */
export default function HeroBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let W = 0;
    let H = 0;
    let DPR = 1;
    let mobile = false;
    let raf = 0;

    let particles = [];
    let afterglows = []; // sweep trail dots {x,y,t}
    let nodeRings = []; // expanding rings on data nodes {x,y,t}
    let waypoints = []; // flight-path diamonds {x,y,t}

    let sweep = 0; // current sweep angle
    let prevSweep = 0;

    const TAU = Math.PI * 2;
    const rand = (a, b) => a + Math.random() * (b - a);

    // radar geometry (recomputed on resize)
    let cx = 0;
    let cy = 0;
    let radarR = 0;

    function setup() {
      DPR = Math.min(window.devicePixelRatio || 1, 1.5);
      W = canvas.clientWidth;
      H = canvas.clientHeight;
      mobile = window.innerWidth < 768;
      canvas.width = Math.max(1, Math.floor(W * DPR));
      canvas.height = Math.max(1, Math.floor(H * DPR));
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);

      if (mobile) {
        // centre the dish around the lower-centre drone on phones
        cx = W * 0.5;
        cy = H * 0.7;
        radarR = W * 0.72;
      } else {
        cx = W * 0.75;
        cy = H * 0.4;
        radarR = Math.min(W, window.innerHeight) * 0.42; // ~radar dish
      }
    }

    function initParticles() {
      const count = mobile ? 30 : 55;
      particles = [];
      for (let i = 0; i < count; i++) {
        const t = Math.random();
        const type = t < 0.3 ? "A" : t < 0.8 ? "B" : "C";
        const heading = rand(0, TAU);
        const speed =
          type === "A" ? rand(0.15, 0.35) : type === "B" ? rand(0.3, 0.6) : 0;
        particles.push({
          type,
          x: Math.random() * W,
          y: Math.random() * H,
          heading,
          speed,
          turnLeft: 0, // frames remaining in a course change
          turnStep: 0, // heading delta per frame during turn
          phase: Math.random() * TAU, // for type C pulsing
          ping: -1, // timestamp of last sweep ping
          nextWp: performance.now() + rand(1200, 4000),
        });
      }
    }

    function angleInArc(a, from, to) {
      // is angle `a` between from→to (mod TAU)?
      a = ((a % TAU) + TAU) % TAU;
      from = ((from % TAU) + TAU) % TAU;
      to = ((to % TAU) + TAU) % TAU;
      if (from <= to) return a >= from && a <= to;
      return a >= from || a <= to;
    }

    /* ----- LAYER 1: radar base + sweep ----- */
    function drawRadar(now) {
      ctx.save();
      // concentric rings
      ctx.strokeStyle = "rgba(30,111,255,0.06)";
      ctx.lineWidth = 1;
      [0.33, 0.66, 1].forEach((f) => {
        ctx.beginPath();
        ctx.arc(cx, cy, radarR * f, 0, TAU);
        ctx.stroke();
      });
      // crosshairs (H, V, 2 diagonals)
      ctx.strokeStyle = "rgba(30,111,255,0.04)";
      ctx.beginPath();
      for (let k = 0; k < 4; k++) {
        const ang = (k * Math.PI) / 4;
        const dx = Math.cos(ang) * radarR;
        const dy = Math.sin(ang) * radarR;
        ctx.moveTo(cx - dx, cy - dy);
        ctx.lineTo(cx + dx, cy + dy);
      }
      ctx.stroke();

      // sweep arc (conic gradient if available)
      if (ctx.createConicGradient) {
        const g = ctx.createConicGradient(sweep, cx, cy);
        g.addColorStop(0, "rgba(30,111,255,0.5)");
        g.addColorStop(25 / 360, "rgba(30,111,255,0)");
        g.addColorStop(1, "rgba(30,111,255,0)");
        ctx.beginPath();
        ctx.arc(cx, cy, radarR, 0, TAU);
        ctx.clip();
        ctx.fillStyle = g;
        ctx.fillRect(cx - radarR, cy - radarR, radarR * 2, radarR * 2);
      } else {
        ctx.strokeStyle = "rgba(30,111,255,0.4)";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(sweep) * radarR, cy + Math.sin(sweep) * radarR);
        ctx.stroke();
      }
      ctx.restore();
    }

    /* ----- LAYER 4: constellation mesh between drones ----- */
    function drawConstellation() {
      if (mobile) return;
      const drones = particles.filter((p) => p.type === "A");
      ctx.save();
      ctx.lineWidth = 0.5;
      for (let i = 0; i < drones.length; i++) {
        for (let j = i + 1; j < drones.length; j++) {
          const dx = drones[i].x - drones[j].x;
          const dy = drones[i].y - drones[j].y;
          const d = Math.hypot(dx, dy);
          if (d < 160) {
            ctx.strokeStyle = `rgba(30,111,255,${(1 - d / 160) * 0.15})`;
            ctx.beginPath();
            ctx.moveTo(drones[i].x, drones[i].y);
            ctx.lineTo(drones[j].x, drones[j].y);
            ctx.stroke();
          }
        }
      }
      ctx.restore();
    }

    function drawDrone(p, now) {
      const pinged = p.ping > 0 && now - p.ping < 600;
      const base = pinged ? 1 : 0.7;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.heading);

      // dotted trail (step backward along heading)
      for (let k = 1; k <= 5; k++) {
        ctx.fillStyle = `rgba(255,255,255,${0.25 * (1 - k / 6)})`;
        ctx.beginPath();
        ctx.arc(-6 * k, 0, 1.2, 0, TAU);
        ctx.fill();
      }

      ctx.strokeStyle = `rgba(255,255,255,${base})`;
      ctx.fillStyle = `rgba(255,255,255,${base})`;
      ctx.lineWidth = 1;

      if (mobile) {
        // simplified: center + 4 rotor dots
        ctx.beginPath();
        ctx.arc(0, 0, 2.5, 0, TAU);
        ctx.fill();
        for (let a = 0; a < 4; a++) {
          const ang = Math.PI / 4 + (a * Math.PI) / 2;
          ctx.beginPath();
          ctx.arc(Math.cos(ang) * 8, Math.sin(ang) * 8, 1.6, 0, TAU);
          ctx.fill();
        }
      } else {
        // center body
        ctx.beginPath();
        ctx.arc(0, 0, 3, 0, TAU);
        ctx.stroke();
        // four arms + rotor tips
        for (let a = 0; a < 4; a++) {
          const ang = Math.PI / 4 + (a * Math.PI) / 2;
          const ex = Math.cos(ang) * 8;
          const ey = Math.sin(ang) * 8;
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(ex, ey);
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(ex, ey, 2, 0, TAU);
          ctx.stroke();
        }
      }
      ctx.restore();
    }

    function drawFlightPath(p, now) {
      const pinged = p.ping > 0 && now - p.ping < 600;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.heading);
      ctx.strokeStyle = `rgba(30,111,255,${pinged ? 0.9 : 0.5})`;
      ctx.lineWidth = 1.5;
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.moveTo(-6, 0);
      ctx.lineTo(6, 0);
      ctx.stroke();
      ctx.restore();
    }

    function drawDataNode(p, now) {
      const pulse = 0.8 + 0.5 * (0.5 + 0.5 * Math.sin(now / 1000 + p.phase));
      const op = 0.4 + 0.5 * (0.5 + 0.5 * Math.sin(now / 1000 + p.phase));
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(Math.PI / 4);
      ctx.scale(pulse, pulse);
      ctx.fillStyle = `rgba(77,166,255,${op})`;
      ctx.fillRect(-2, -2, 4, 4);
      ctx.restore();
    }

    /* ----- LAYER 3: HUD overlay ----- */
    function drawHUD(now) {
      ctx.save();
      ctx.strokeStyle = "rgba(30,111,255,0.25)";
      ctx.lineWidth = 1;
      // top-left bracket
      ctx.beginPath();
      ctx.moveTo(40, 50);
      ctx.lineTo(40, 40);
      ctx.lineTo(50, 40);
      ctx.stroke();
      // bottom-right bracket
      ctx.beginPath();
      ctx.moveTo(W - 40, H - 50);
      ctx.lineTo(W - 40, H - 40);
      ctx.lineTo(W - 50, H - 40);
      ctx.stroke();
      // top-right bracket (replaces the old SYS/ALT/HDG text readout)
      ctx.beginPath();
      ctx.moveTo(W - 50, 40);
      ctx.lineTo(W - 40, 40);
      ctx.lineTo(W - 40, 50);
      ctx.stroke();
      ctx.restore();

      // CRT scanline drifting top→bottom over 8s
      const y = ((now % 8000) / 8000) * H;
      ctx.fillStyle = "rgba(30,111,255,0.03)";
      ctx.fillRect(0, y, W, 2);
    }

    function update(now) {
      // sweep advance: one revolution / 4s
      prevSweep = sweep;
      sweep = ((now / 4000) % 1) * TAU;

      for (const p of particles) {
        // movement
        if (p.speed > 0) {
          // course changes for drones
          if (p.type === "A") {
            if (p.turnLeft > 0) {
              p.heading += p.turnStep;
              p.turnLeft--;
            } else if (Math.random() < 0.003) {
              const delta = rand(Math.PI / 4, Math.PI / 2) * (Math.random() < 0.5 ? -1 : 1);
              p.turnLeft = 40;
              p.turnStep = delta / 40;
            }
          }
          p.x += Math.cos(p.heading) * p.speed;
          p.y += Math.sin(p.heading) * p.speed;
          // wrap
          if (p.x < -20) p.x = W + 20;
          if (p.x > W + 20) p.x = -20;
          if (p.y < -20) p.y = H + 20;
          if (p.y > H + 20) p.y = -20;

          // flight-path waypoints
          if (p.type === "B" && now > p.nextWp) {
            p.nextWp = now + rand(1500, 4500);
            waypoints.push({
              x: p.x + Math.cos(p.heading) * 30,
              y: p.y + Math.sin(p.heading) * 30,
              t: now,
            });
          }
        }

        // radar ping: did the sweep just cross this particle?
        const dx = p.x - cx;
        const dy = p.y - cy;
        if (dx * dx + dy * dy < radarR * radarR) {
          let a = Math.atan2(dy, dx);
          if (angleInArc(a, prevSweep, sweep)) {
            p.ping = now;
            afterglows.push({ x: p.x, y: p.y, t: now });
            if (p.type === "C") nodeRings.push({ x: p.x, y: p.y, t: now });
          }
        }
      }

      // expire transient effects
      afterglows = afterglows.filter((a) => now - a.t < 1500);
      nodeRings = nodeRings.filter((r) => now - r.t < 600);
      waypoints = waypoints.filter((w) => now - w.t < 1500);
    }

    function render(now) {
      // background
      const grad = ctx.createLinearGradient(0, 0, W, H);
      grad.addColorStop(0, "#000000");
      grad.addColorStop(0.5, "#03060f");
      grad.addColorStop(1, "#000510");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);

      drawRadar(now);

      // afterglow dots
      ctx.save();
      for (const a of afterglows) {
        const k = 1 - (now - a.t) / 1500;
        ctx.fillStyle = `rgba(77,166,255,${0.4 * k})`;
        ctx.beginPath();
        ctx.arc(a.x, a.y, 2, 0, TAU);
        ctx.fill();
      }
      ctx.restore();

      drawConstellation();

      // particles
      for (const p of particles) {
        if (p.type === "A") drawDrone(p, now);
        else if (p.type === "B") drawFlightPath(p, now);
        else drawDataNode(p, now);
      }

      // expanding rings on data nodes
      ctx.save();
      for (const r of nodeRings) {
        const k = (now - r.t) / 600;
        const rad = 6 + k * 12;
        ctx.strokeStyle = `rgba(77,166,255,${0.6 * (1 - k)})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(r.x, r.y, rad, 0, TAU);
        ctx.stroke();
      }
      // waypoint diamonds (fade in then out)
      for (const w of waypoints) {
        const life = (now - w.t) / 1500;
        const op = (life < 0.5 ? life * 2 : (1 - life) * 2) * 0.6;
        ctx.save();
        ctx.translate(w.x, w.y);
        ctx.rotate(Math.PI / 4);
        ctx.strokeStyle = `rgba(30,111,255,${op})`;
        ctx.lineWidth = 1;
        ctx.strokeRect(-3, -3, 6, 6);
        ctx.restore();
      }
      ctx.restore();

      drawHUD(now);
    }

    let running = false;
    let onScreen = true;

    function frame(now) {
      update(now);
      render(now);
      raf = requestAnimationFrame(frame);
    }

    // static single-paint for reduced motion
    function paintStatic() {
      const now = performance.now();
      update(now);
      render(now);
    }

    function start() {
      // only run while the hero is visible and the tab is focused
      if (running || !onScreen || document.hidden) return;
      running = true;
      raf = requestAnimationFrame(frame);
    }
    function stop() {
      running = false;
      cancelAnimationFrame(raf);
    }

    setup();
    initParticles();
    paintStatic(); // ensure the radar is visible immediately, even before the loop runs
    start();

    const ro = new ResizeObserver(() => {
      setup();
      initParticles();
      paintStatic();
    });
    ro.observe(canvas);

    // pause the loop when the hero scrolls out of view (saves CPU elsewhere)
    const io = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        if (onScreen) start();
        else stop();
      },
      { threshold: 0 }
    );
    io.observe(canvas);

    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{
        zIndex: 0,
        pointerEvents: "none",
        // keep the radar below the fixed navbar (~80px) instead of bleeding into it
        maskImage:
          "linear-gradient(to bottom, transparent 0, transparent 84px, #000 150px)",
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent 0, transparent 84px, #000 150px)",
      }}
      aria-hidden
    />
  );
}
