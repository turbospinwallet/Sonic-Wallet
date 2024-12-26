import { useEffect, useRef } from 'react';

export default function SonicStormBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Combined animation parameters
    let time = 0;
    const streaks = 15; // Increased for more dynamic effect
    const rotationSpeed = 0.03;
    const runningSpeed = 2; // Horizontal movement speed
    const trailLength = 0.9;
    let xOffset = 0; // Track horizontal position

    const animate = () => {
      // Update the background color opacity to be more visible
      ctx.fillStyle = 'rgba(15, 23, 42, 0.2)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Calculate center points with running motion
      xOffset = (xOffset + runningSpeed) % (canvas.width * 0.5);
      const centerX = canvas.width * 0.3 + xOffset;
      const centerY = canvas.height / 2;
      const radius = Math.min(canvas.width, canvas.height) * 0.3;

      // Draw spinning light streaks with running motion
      for (let i = 0; i < streaks; i++) {
        const angle = (i / streaks) * Math.PI * 2 + time;
        const spiralOffset = (time * 0.2 + i / streaks) * Math.PI * 2;

        ctx.beginPath();

        // Create dynamic spiral effect
        for (let t = 0; t < trailLength; t += 0.01) {
          const trailAge = t / trailLength;
          const currentAngle = angle - t * 6;
          const spiralRadius = radius * (1 - t * 0.3);

          // Add running motion to spiral
          const x = centerX + Math.cos(currentAngle + spiralOffset) * spiralRadius;
          const y = centerY + Math.sin(currentAngle + spiralOffset) * spiralRadius * 0.5; // Flatten vertically

          // Add horizontal stretch for speed effect
          const stretchX = x - trailAge * runningSpeed * 20;
          const stretchY = y + Math.sin(time * 5 + i) * 5; // Add subtle wave

          if (t === 0) {
            ctx.moveTo(stretchX, stretchY);
          } else {
            ctx.lineTo(stretchX, stretchY);
          }
        }

        // Create gradient with Sonic-inspired colors
        const gradient = ctx.createLinearGradient(
          centerX - radius,
          centerY - radius,
          centerX + radius,
          centerY + radius
        );

        // Color stops matching the image and Sonic theme
        gradient.addColorStop(0, 'rgba(56, 189, 248, 0)'); // Light blue fade
        gradient.addColorStop(0.2, 'rgba(56, 189, 248, 0.9)'); // Light blue
        gradient.addColorStop(0.4, 'rgba(255, 255, 255, 0.9)'); // White
        gradient.addColorStop(0.6, 'rgba(29, 78, 216, 0.8)'); // Darker blue
        gradient.addColorStop(0.8, 'rgba(2, 132, 199, 0.7)'); // Sky blue
        gradient.addColorStop(1, 'rgba(15, 23, 42, 0)'); // Fade to dark

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2.5;
        ctx.stroke();

        // Add speed particles
        if (Math.random() > 0.7) {
          const particleX = centerX + (Math.random() - 0.5) * radius * 2;
          const particleY = centerY + (Math.random() - 0.5) * radius;

          ctx.beginPath();
          ctx.arc(particleX, particleY, 1, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
          ctx.fill();

          // Add horizontal speed lines
          ctx.beginPath();
          ctx.moveTo(particleX, particleY);
          ctx.lineTo(particleX - 20, particleY);
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      // Add horizontal speed streaks
      for (let i = 0; i < 10; i++) {
        const y = Math.random() * canvas.height;
        const length = Math.random() * 100 + 50;

        ctx.beginPath();
        ctx.moveTo(centerX + radius, y);
        ctx.lineTo(centerX + radius - length, y);

        const speedGradient = ctx.createLinearGradient(
          centerX + radius,
          0,
          centerX + radius - length,
          0
        );
        speedGradient.addColorStop(0, 'rgba(56, 189, 248, 0.3)');
        speedGradient.addColorStop(1, 'rgba(56, 189, 248, 0)');

        ctx.strokeStyle = speedGradient;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      time += rotationSpeed;
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 -z-10"
      aria-hidden="true"
    />
  );
}
