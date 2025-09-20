"use client";
import { cn } from "@/lib/utils";
import  { useState, useEffect, useRef, useCallback, memo } from "react";

const StarsBackgroundComponent = ({
    starDensity = 0.00015,
    allStarsTwinkle = true,
    twinkleProbability = 0.7,
    minTwinkleSpeed = 0.5,
    maxTwinkleSpeed = 1,
    className,
}) => {
    // const [stars, setStars] = useState([]);
    const canvasRef = useRef(null);
  const [stars] = useState(() => {
      // generate stars once
      const width = window.innerWidth;
      const height = window.innerHeight;
      const area = width * height;
      const numStars = Math.floor(area * starDensity);

      return Array.from({ length: numStars }, () => {
          const shouldTwinkle =
              allStarsTwinkle || Math.random() < twinkleProbability;
          return {
              x: Math.random() * width,
              y: Math.random() * height,
              radius: Math.random() * 0.05 + 0.5,
              opacity: Math.random() * 0.5 + 0.5,
              twinkleSpeed: shouldTwinkle
                  ? minTwinkleSpeed +
                    Math.random() * (maxTwinkleSpeed - minTwinkleSpeed)
                  : null,
          };
      });
  });

  useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const resizeCanvas = () => {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
      };

      resizeCanvas();
      window.addEventListener("resize", resizeCanvas);

      return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId;

        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            stars.forEach((star) => {
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
                ctx.fill();

                if (star.twinkleSpeed !== null) {
                    star.opacity =
                        0.5 +
                        Math.abs(
                            Math.sin((Date.now() * 0.001) / star.twinkleSpeed) *
                                0.5
                        );
                }
            });

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, [stars]);

    return (
        <canvas
            ref={canvasRef}
            className={cn("h-full w-full fixed inset-0", className)}
        />
    );
};

export const StarsBackground = memo(StarsBackgroundComponent)
