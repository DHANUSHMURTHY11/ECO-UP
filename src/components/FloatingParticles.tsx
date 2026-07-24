import React, { useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  type: 'heart' | 'sparkle' | 'petal' | 'star' | 'bubble' | 'paw' | 'cloud' | 'balloon' | 'butterfly' | 'flower';
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
  type: 'sparkle' | 'paw' | 'heart' | 'flower';
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

    const dayColors = ['#FF85A1', '#FFD6E8', '#DCC6FF', '#CDEEFF', '#FFD9C2', '#FFD166'];
    const goldenColors = ['#F59E0B', '#FBBF24', '#F472B6', '#FCE7F3', '#FDE047'];
    const nightColors = ['#E2E8F0', '#93C5FD', '#FDE047', '#F472B6', '#C084FC'];

    const particleTypes: Particle['type'][] = ['heart', 'sparkle', 'petal', 'star', 'bubble', 'cloud', 'butterfly'];

    const particleCount = 55;
    const particles: Particle[] = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: 10 + Math.random() * 20,
      speedY: -(0.3 + Math.random() * 0.7),
      speedX: (Math.random() - 0.5) * 0.6,
      opacity: 0.35 + Math.random() * 0.55,
      type: particleTypes[Math.floor(Math.random() * particleTypes.length)],
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.02,
      color: dayColors[Math.floor(Math.random() * dayColors.length)],
    }));

    // Mouse Sparkle Trail
    const handleMouseMove = (e: MouseEvent) => {
      const colors = state.isNightMode ? nightColors : state.isGoldenHour ? goldenColors : dayColors;
      trailRef.current.push({
        x: e.clientX,
        y: e.clientY,
        size: 8 + Math.random() * 8,
        opacity: 0.9,
        color: colors[Math.floor(Math.random() * colors.length)],
        type: Math.random() > 0.5 ? 'sparkle' : 'heart',
      });
      if (trailRef.current.length > 30) trailRef.current.shift();
    };

    // Tap/Click Flower Bloom & Paw Print Burst
    const handleClick = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      for (let i = 0; i < 7; i++) {
        trailRef.current.push({
          x: clientX + (Math.random() - 0.5) * 45,
          y: clientY + (Math.random() - 0.5) * 45,
          size: 16 + Math.random() * 12,
          opacity: 1,
          color: dayColors[Math.floor(Math.random() * dayColors.length)],
          type: i === 0 ? 'flower' : i === 1 ? 'paw' : 'heart',
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);

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

    const drawFlower = (ctx: CanvasRenderingContext2D, size: number, color: string) => {
      ctx.fillStyle = color;
      for (let i = 0; i < 5; i++) {
        const angle = (i * Math.PI * 2) / 5;
        ctx.beginPath();
        ctx.arc(Math.cos(angle) * (size * 0.35), Math.sin(angle) * (size * 0.35), size * 0.3, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.fillStyle = '#FFD166';
      ctx.beginPath();
      ctx.arc(0, 0, size * 0.25, 0, Math.PI * 2);
      ctx.fill();
    };

    const drawPaw = (ctx: CanvasRenderingContext2D, size: number, color: string) => {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.ellipse(0, 0, size * 0.5, size * 0.4, 0, 0, Math.PI * 2);
      ctx.fill();
      [-0.4, -0.15, 0.15, 0.4].forEach((angle) => {
        ctx.beginPath();
        const tx = Math.sin(angle) * size * 0.6;
        const ty = -Math.cos(angle) * size * 0.6;
        ctx.ellipse(tx, ty, size * 0.15, size * 0.18, angle, 0, Math.PI * 2);
        ctx.fill();
      });
    };

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

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      const colors = state.isNightMode ? nightColors : state.isGoldenHour ? goldenColors : dayColors;

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
        } else if (p.type === 'flower') {
          drawFlower(ctx, p.size, p.color);
        } else if (p.type === 'sparkle') {
          drawSparkle(ctx, p.size, p.color);
        } else if (p.type === 'paw') {
          drawPaw(ctx, p.size, p.color);
        } else {
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      });

      trailRef.current.forEach((t, index) => {
        t.opacity -= 0.02;
        t.size *= 0.96;

        if (t.opacity > 0 && t.size > 2) {
          ctx.save();
          ctx.translate(t.x, t.y);
          ctx.globalAlpha = t.opacity;

          if (t.type === 'flower') {
            drawFlower(ctx, t.size, t.color);
          } else if (t.type === 'heart') {
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
  }, [state.isNightMode, state.isGoldenHour]);

  return (
    <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />
  );
};
