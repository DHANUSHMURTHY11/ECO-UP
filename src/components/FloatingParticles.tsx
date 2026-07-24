import React, { useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  type: 'heart' | 'sparkle' | 'petal' | 'star' | 'bubble' | 'paw';
  rotation: number;
  rotSpeed: number;
  color: string;
}

interface TrailItem {
  x: number;
  y: number;
  size: number;
  opacity: number;
  color: string;
  type: 'sparkle' | 'paw' | 'heart';
}

export const FloatingParticles: React.FC = () => {
  const { state } = useApp();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const trailRef = useRef<TrailItem[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle colors
    const dayColors = ['#FF85A1', '#FFD6E8', '#DCC6FF', '#CDEEFF', '#FFD9C2', '#FFD166'];
    const nightColors = ['#E2E8F0', '#93C5FD', '#FDE047', '#F472B6', '#C084FC'];

    const particleTypes: Particle['type'][] = ['heart', 'sparkle', 'petal', 'star', 'bubble'];

    // Generate Initial Particles
    const particleCount = 45;
    const particles: Particle[] = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: 10 + Math.random() * 16,
      speedY: -(0.4 + Math.random() * 0.8),
      speedX: (Math.random() - 0.5) * 0.5,
      opacity: 0.3 + Math.random() * 0.6,
      type: particleTypes[Math.floor(Math.random() * particleTypes.length)],
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.02,
      color: dayColors[Math.floor(Math.random() * dayColors.length)],
    }));

    // Mouse Move Sparkle Trail Listener
    const handleMouseMove = (e: MouseEvent) => {
      const isNight = state.isNightMode;
      const colors = isNight ? nightColors : dayColors;
      trailRef.current.push({
        x: e.clientX,
        y: e.clientY,
        size: 8 + Math.random() * 8,
        opacity: 0.9,
        color: colors[Math.floor(Math.random() * colors.length)],
        type: Math.random() > 0.5 ? 'sparkle' : 'heart',
      });
      if (trailRef.current.length > 25) trailRef.current.shift();
    };

    // Click / Tap Paw Print & Heart Burst
    const handleClick = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      for (let i = 0; i < 6; i++) {
        trailRef.current.push({
          x: clientX + (Math.random() - 0.5) * 40,
          y: clientY + (Math.random() - 0.5) * 40,
          size: 14 + Math.random() * 10,
          opacity: 1,
          color: dayColors[Math.floor(Math.random() * dayColors.length)],
          type: i === 0 ? 'paw' : 'heart',
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);

    // Draw Heart shape on canvas
    const drawHeart = (ctx: CanvasRenderingContext2D, size: number, color: string) => {
      ctx.fillStyle = color;
      ctx.beginPath();
      const topCurveHeight = size * 0.3;
      ctx.moveTo(0, topCurveHeight);
      ctx.bezierCurveTo(0, 0, -size / 2, 0, -size / 2, topCurveHeight);
      ctx.bezierCurveTo(-size / 2, (size + topCurveHeight) / 2, 0, size, 0, size);
      ctx.bezierCurveTo(0, size, size / 2, (size + topCurveHeight) / 2, size / 2, topCurveHeight);
      ctx.bezierCurveTo(size / 2, 0, 0, 0, 0, topCurveHeight);
      ctx.closePath();
      ctx.fill();
    };

    // Draw Paw Print
    const drawPaw = (ctx: CanvasRenderingContext2D, size: number, color: string) => {
      ctx.fillStyle = color;
      // Main pad
      ctx.beginPath();
      ctx.ellipse(0, 0, size * 0.5, size * 0.4, 0, 0, Math.PI * 2);
      ctx.fill();
      // Toes
      [-0.4, -0.15, 0.15, 0.4].forEach((angle) => {
        ctx.beginPath();
        const tx = Math.sin(angle) * size * 0.6;
        const ty = -Math.cos(angle) * size * 0.6;
        ctx.ellipse(tx, ty, size * 0.15, size * 0.18, angle, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    // Draw Sparkle
    const drawSparkle = (ctx: CanvasRenderingContext2D, size: number, color: string) => {
      ctx.fillStyle = color;
      ctx.beginPath();
      for (let i = 0; i < 4; i++) {
        ctx.lineTo(Math.cos((i * Math.PI) / 2) * size, Math.sin((i * Math.PI) / 2) * size);
        ctx.lineTo(Math.cos(((i + 0.5) * Math.PI) / 2) * (size * 0.3), Math.sin(((i + 0.5) * Math.PI) / 2) * (size * 0.3));
      }
      ctx.closePath();
      ctx.fill();
    };

    // Render Animation Loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const colors = state.isNightMode ? nightColors : dayColors;

      // Update & Render Background Floating Particles
      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.rotation += p.rotSpeed;

        if (p.y < -30) {
          p.y = height + 30;
          p.x = Math.random() * width;
          p.color = colors[Math.floor(Math.random() * colors.length)];
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = p.opacity;

        if (p.type === 'heart') {
          drawHeart(ctx, p.size, p.color);
        } else if (p.type === 'sparkle') {
          drawSparkle(ctx, p.size, p.color);
        } else if (p.type === 'paw') {
          drawPaw(ctx, p.size, p.color);
        } else if (p.type === 'star') {
          drawSparkle(ctx, p.size * 0.8, '#FFF');
        } else {
          // Bubble / Sakura Petal
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      });

      // Update & Render Cursor Sparkle & Paw Print Trail
      trailRef.current.forEach((t, index) => {
        t.opacity -= 0.02;
        t.size *= 0.96;

        if (t.opacity > 0 && t.size > 2) {
          ctx.save();
          ctx.translate(t.x, t.y);
          ctx.globalAlpha = t.opacity;

          if (t.type === 'heart') {
            drawHeart(ctx, t.size, t.color);
          } else if (t.type === 'paw') {
            drawPaw(ctx, t.size, t.color);
          } else {
            drawSparkle(ctx, t.size, t.color);
          }
          ctx.restore();
        } else {
          trailRef.current.splice(index, 1);
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
    };
  }, [state.isNightMode]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
};
