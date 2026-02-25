"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Hero() {
    const containerRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (prefersReduced) return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
            tl.from(".hero-eyebrow", { y: 20, opacity: 0, duration: 1 })
                .from(".hero-headline", { y: 40, opacity: 0, duration: 1.2, stagger: 0.08 }, "-=0.6")
                .from(".hero-sub", { y: 20, opacity: 0, duration: 1 }, "-=0.8")
                .from(".hero-divider", { scaleX: 0, opacity: 0, duration: 1, transformOrigin: "left" }, "-=0.6");

            gsap.to(".scroll-dot", {
                y: 10,
                opacity: 0.3,
                repeat: -1,
                yoyo: true,
                duration: 1.4,
                ease: "power1.inOut",
                delay: 1.5,
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={containerRef}
            id="hero"
            className="relative min-h-screen bg-bg-dark flex flex-col items-center justify-center overflow-hidden px-6"
            aria-label="Hero"
        >
            {/* Ambient grain overlay */}
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.04]"
                style={{
                    backgroundImage:
                        "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
                    backgroundSize: "200px 200px",
                }}
            />

            {/* Top vignette */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/30 to-transparent" />
            {/* Bottom vignette */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/40 to-transparent" />

            {/* Main content */}
            <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto gap-8">
                <span className="hero-eyebrow inline-block text-secondary tracking-[0.3em] uppercase text-xs font-sans font-medium">
                    Maison Koa · Est. 2026
                </span>

                <h1 className="hero-headline font-serif text-text-light leading-[1.1] text-5xl sm:text-7xl lg:text-8xl">
                    A Lingering Echo<br />
                    <span className="text-secondary-light italic">of Velvety Perfection</span>
                </h1>

                <div className="hero-divider h-px w-24 bg-secondary opacity-60" />

                <p className="hero-sub font-sans font-light text-text-light/70 text-base sm:text-lg max-w-md leading-relaxed tracking-wide">
                    Single-origin cacao. Masterfully handcrafted into moments of pure, lasting indulgence.
                </p>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10">
                <span className="text-secondary/60 uppercase tracking-[0.3em] text-[10px] font-sans">Scroll</span>
                <div className="w-px h-12 bg-secondary/30 relative overflow-hidden">
                    <div className="scroll-dot absolute top-0 left-0 w-full h-4 bg-secondary/80 rounded-full" />
                </div>
            </div>
        </section>
    );
}
