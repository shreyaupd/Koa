"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
    const containerRef = useRef<HTMLElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // We found 51 frames in the source directory
    const frameCount = 51;
    const currentFrame = (index: number) =>
        `/images/hero-sequence/choco_${index.toString().padStart(3, "0")}.jpg`;

    // Preload images
    useEffect(() => {
        const loadedImages: HTMLImageElement[] = [];
        let loadedCount = 0;

        for (let i = 0; i < frameCount; i++) {
            const img = new Image();
            img.src = currentFrame(i);
            img.onload = () => {
                loadedCount++;
                if (loadedCount === frameCount) {
                    setIsLoaded(true);
                }
            };
            img.onerror = () => {
                console.error(`Failed to load image at ${img.src}`);
                loadedCount++;
                if (loadedCount === frameCount) setIsLoaded(true);
            };
            loadedImages.push(img);
        }
        setImages(loadedImages);
    }, []);

    useEffect(() => {
        if (!isLoaded || !canvasRef.current || !containerRef.current || images.length === 0) return;

        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        if (!context) return;

        const render = (index: number) => {
            const img = images[index];
            if (!img) return;

            const canvasAspect = canvas.width / canvas.height;
            const imgAspect = img.width / img.height;

            let drawWidth, drawHeight, offsetX, offsetY;

            if (canvasAspect > imgAspect) {
                drawWidth = canvas.width;
                drawHeight = canvas.width / imgAspect;
                offsetX = 0;
                offsetY = (canvas.height - drawHeight) / 2;
            } else {
                drawWidth = canvas.height * imgAspect;
                drawHeight = canvas.height;
                offsetX = (canvas.width - drawWidth) / 2;
                offsetY = 0;
            }

            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
        };

        const setCanvasSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            render(Math.round(sequenceState.frame));
        };

        const sequenceState = { frame: 0 };
        setCanvasSize();
        window.addEventListener("resize", setCanvasSize);

        const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        const ctx = gsap.context(() => {
            // Pin the section and scrub through frames
            gsap.to(sequenceState, {
                frame: frameCount - 1,
                snap: "frame",
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "+=300%",
                    scrub: prefersReduced ? false : 0.5,
                    pin: true,
                    onUpdate: () => render(Math.round(sequenceState.frame)),
                },
            });

            // Animate text overlays with better contrast handling
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "+=300%",
                    scrub: prefersReduced ? false : 1,
                }
            });

            tl.fromTo(".hero-content",
                { opacity: 1, y: 0 },
                {
                    opacity: 0,
                    y: -150,
                    duration: 1
                }
            )
                .fromTo(".hero-tagline",
                    { opacity: 0, scale: 0.9, y: 50 },
                    { opacity: 1, scale: 1, y: 0, duration: 1 },
                    "-=0.5"
                );
        }, containerRef);

        return () => {
            ctx.revert();
            window.removeEventListener("resize", setCanvasSize);
        };
    }, [isLoaded, images]);

    return (
        <section
            ref={containerRef}
            className="relative w-full overflow-hidden bg-bg-dark"
            style={{ height: "100vh" }}
        >
            {/* Subtle overlay to ensure text contrast across complex images */}
            <div className="absolute inset-0 bg-black/40 z-1 pointer-events-none" />

            {/* Canvas for image sequence */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full object-cover z-0"
            />

            {/* Loading State Overlay */}
            {!isLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-bg-dark z-50">
                    <div className="flex flex-col items-center gap-4">
                        <span className="text-secondary uppercase tracking-[0.3em] text-xs font-sans font-medium animate-pulse">
                            Maison Koa
                        </span>
                        <div className="w-48 h-[1px] bg-secondary/20 relative overflow-hidden">
                            <div className="absolute inset-y-0 left-0 bg-secondary w-full -translate-x-full animate-progress" />
                        </div>
                    </div>
                </div>
            )}

            {/* Hero Content Overlay */}
            <div className="hero-content relative z-10 h-screen flex flex-col items-center justify-center text-center px-6 pointer-events-none">
                <span className="hero-eyebrow inline-block text-secondary tracking-[0.3em] uppercase text-xs font-sans font-bold mb-6 brightness-125 drop-shadow-lg">
                    Established 2026
                </span>
                <h1 className="font-serif text-white leading-[1.1] text-5xl sm:text-7xl lg:text-8xl max-w-5xl [text-shadow:0_4px_32px_rgba(0,0,0,0.8)]">
                    A Lingering Echo<br />
                    <span className="text-secondary-light italic brightness-110">of Velvety Perfection</span>
                </h1>
                <div className="mt-12 w-px h-24 bg-gradient-to-b from-secondary to-transparent" />
            </div>

            {/* Secondary tagline that appears on scroll */}
            <div className="hero-tagline absolute inset-0 z-10 flex items-center justify-center text-center px-6 pointer-events-none opacity-0">
                <h2 className="font-serif text-white text-3xl md:text-5xl lg:text-6xl max-w-3xl leading-tight [text-shadow:0_4px_32px_rgba(0,0,0,0.8)]">
                    Crafted in small batches,<br />
                    <span className="text-secondary italic brightness-110">for the most discerning palates.</span>
                </h2>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-20 h-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10 group bg-black/20 backdrop-blur-md p-4 rounded-full border border-white/10">
                <span className="text-white uppercase tracking-[0.3em] text-[10px] font-sans group-hover:text-secondary whitespace-nowrap drop-shadow-md font-medium">
                    Scroll to immerse
                </span>
                <div className="w-px h-12 bg-white/40 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-secondary origin-top animate-scroll-line" />
                </div>
            </div>

            <style jsx>{`
        @keyframes progress {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-progress {
          animation: progress 2s infinite linear;
        }
        @keyframes scroll-line {
          0% { transform: scaleY(0); transform-origin: top; }
          45% { transform: scaleY(1); transform-origin: top; }
          55% { transform: scaleY(1); transform-origin: bottom; }
          100% { transform: scaleY(0); transform-origin: bottom; }
        }
        .animate-scroll-line {
          animation: scroll-line 2.5s infinite ease-in-out;
        }
      `}</style>
        </section>
    );
}
