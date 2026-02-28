"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─── Config ────────────────────────────────────────────────────────────────
const FRAME_COUNT = 37;
const TOTAL_SCROLL_MULTIPLIER = 4; // pin height = 4 × 100vh

const currentFrame = (i: number) =>
    `/images/hero-sequence/choco_${(i + 13).toString().padStart(3, "0")}.jpg`;

// ─── Text stage definitions ────────────────────────────────────────────────
const STAGES = [
    {
        tag: "h1" as const,
        eyebrow: "Established 2026",
        line1: "A Lingering Echo",
        line2: "of Velvety Perfection",
    },
    {
        tag: "h2" as const,
        eyebrow: "Small-Batch Artisan",
        line1: "Crafted in small batches,",
        line2: "for the most discerning palates.",
    },
    {
        tag: "h2" as const,
        eyebrow: "Rare Cacao Origins",
        line1: "A sensory journey through",
        line2: "the heart of rare cacao.",
    },
];

// Scroll thresholds for switching stages
const THRESHOLDS = [0, 0.35, 0.68];

function progressToStage(p: number) {
    if (p >= THRESHOLDS[2]) return 2;
    if (p >= THRESHOLDS[1]) return 1;
    return 0;
}

// ─── Framer Motion variants (ease as "easeOut" string - avoids tuple error) ─
const headingVariants = {
    initial: { opacity: 0, y: 50, rotateX: 65 },
    animate: {
        opacity: 1, y: 0, rotateX: 0,
        transition: { duration: 0.75, ease: "easeOut" as const },
    },
    exit: {
        opacity: 0, y: -40, rotateX: -55,
        transition: { duration: 0.5, ease: "easeIn" as const },
    },
};

const eyebrowVariants = {
    initial: { opacity: 0, y: 16 },
    animate: {
        opacity: 1, y: 0,
        transition: { duration: 0.6, ease: "easeOut" as const },
    },
    exit: {
        opacity: 0, y: -12,
        transition: { duration: 0.35, ease: "easeIn" as const },
    },
};

// ─── Main Component ─────────────────────────────────────────────────────────
export default function Hero() {
    const sectionRef = useRef<HTMLElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imagesRef = useRef<HTMLImageElement[]>([]);
    const progressRef = useRef(0);

    const [isLoaded, setIsLoaded] = useState(false);
    const [stageIndex, setStageIndex] = useState(0);
    const [scrollIndicatorVisible, setScrollIndicatorVisible] = useState(true);

    // ── Preload all frames ───────────────────────────────────────────────
    useEffect(() => {
        let done = 0;
        const imgs: HTMLImageElement[] = [];
        for (let i = 0; i < FRAME_COUNT; i++) {
            const img = new Image();
            img.src = currentFrame(i);
            img.onload = img.onerror = () => {
                done++;
                if (done === FRAME_COUNT) setIsLoaded(true);
            };
            imgs.push(img);
        }
        imagesRef.current = imgs;
    }, []);

    // ── Resize canvas ────────────────────────────────────────────────────
    useEffect(() => {
        if (!isLoaded) return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
        resize();
        window.addEventListener("resize", resize);
        return () => window.removeEventListener("resize", resize);
    }, [isLoaded]);

    // ── Draw a specific frame ────────────────────────────────────────────
    const drawFrame = (idx: number) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        const img = imagesRef.current[Math.max(0, Math.min(FRAME_COUNT - 1, idx))];
        if (!img || !img.complete || !img.naturalWidth) return;

        const cAsp = canvas.width / canvas.height;
        const iAsp = img.naturalWidth / img.naturalHeight;
        let w, h, x, y;
        if (cAsp > iAsp) { w = canvas.width; h = w / iAsp; x = 0; y = (canvas.height - h) / 2; }
        else { h = canvas.height; w = h * iAsp; x = (canvas.width - w) / 2; y = 0; }

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, x, y, w, h);
    };

    // ── GSAP pivot: pin the section, drive frame + stage via ScrollTrigger ─
    useEffect(() => {
        if (!isLoaded || !sectionRef.current) return;

        // Draw first frame immediately
        drawFrame(0);

        const frameProxy = { f: 0 };

        const st = ScrollTrigger.create({
            trigger: sectionRef.current,
            start: "top top",
            end: `+=${window.innerHeight * (TOTAL_SCROLL_MULTIPLIER - 1)}`,
            pin: true,
            scrub: false, // we manually drive on "change"
            onUpdate: (self) => {
                const p = self.progress;
                progressRef.current = p;

                // Drive canvas frame
                const frameIdx = Math.round(p * (FRAME_COUNT - 1));
                if (Math.round(frameProxy.f) !== frameIdx) {
                    frameProxy.f = frameIdx;
                    drawFrame(frameIdx);
                }

                // Drive text stage
                setStageIndex((prev) => {
                    const next = progressToStage(p);
                    return prev !== next ? next : prev;
                });

                // Hide scroll indicator after 10% progress
                setScrollIndicatorVisible(p < 0.1);
            },
        });

        return () => st.kill();
    }, [isLoaded]);

    return (
        <section
            ref={sectionRef}
            className="relative w-full bg-bg-dark"
            style={{ height: "100vh" }}
            aria-label="Hero"
        >
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/40 z-[1] pointer-events-none" />

            {/* Canvas for frame sequence */}
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0" />

            {/* Loading screen */}
            {!isLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-bg-dark z-50">
                    <div className="flex flex-col items-center gap-4">
                        <span className="text-secondary uppercase tracking-[0.3em] text-xs font-sans font-medium animate-pulse">
                            Maison Koa
                        </span>
                        <div className="w-48 h-[1px] bg-secondary/20 relative overflow-hidden">
                            <div className="absolute inset-y-0 left-0 bg-secondary w-full animate-[progress_2s_linear_infinite]" />
                        </div>
                    </div>
                </div>
            )}

            {/* Text stages — Framer Motion AnimatePresence for flip transitions */}
            {isLoaded && (
                <div
                    className="absolute inset-0 z-10 overflow-hidden"
                    style={{ perspective: "1200px" }}
                >
                    <AnimatePresence mode="wait">
                        {STAGES.map((stage, i) =>
                            i !== stageIndex ? null : (
                                <motion.div
                                    key={i}
                                    className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none"
                                    style={{ transformStyle: "preserve-3d" }}
                                >
                                    {/* Eyebrow */}
                                    <motion.span
                                        variants={eyebrowVariants}
                                        initial="initial"
                                        animate="animate"
                                        exit="exit"
                                        className="inline-block text-secondary uppercase tracking-[0.3em] text-xs font-sans font-bold mb-6 brightness-125 drop-shadow-lg"
                                    >
                                        {stage.eyebrow}
                                    </motion.span>

                                    {/* Heading block */}
                                    <motion.div
                                        variants={headingVariants}
                                        initial="initial"
                                        animate="animate"
                                        exit="exit"
                                        style={{ transformStyle: "preserve-3d" }}
                                    >
                                        {stage.tag === "h1" ? (
                                            <h1 className="font-serif text-white leading-[1.1] text-5xl sm:text-7xl lg:text-8xl max-w-5xl [text-shadow:0_4px_32px_rgba(0,0,0,0.85)]">
                                                {stage.line1}
                                                <br />
                                                <span className="italic text-secondary-light">{stage.line2}</span>
                                            </h1>
                                        ) : (
                                            <h2 className="font-serif text-white leading-[1.1] text-4xl sm:text-5xl lg:text-6xl max-w-4xl [text-shadow:0_4px_32px_rgba(0,0,0,0.85)]">
                                                {stage.line1}
                                                <br />
                                                <span className="italic text-secondary">{stage.line2}</span>
                                            </h2>
                                        )}
                                    </motion.div>

                                    {/* Decorative line for stage 0 */}
                                    {i === 0 && (
                                        <motion.div
                                            className="mt-12 w-px h-24 bg-gradient-to-b from-secondary to-transparent"
                                            initial={{ opacity: 0, scaleY: 0 }}
                                            animate={{ opacity: 1, scaleY: 1, transition: { delay: 0.3, duration: 0.7, ease: "easeOut" } }}
                                            exit={{ opacity: 0 }}
                                        />
                                    )}
                                </motion.div>
                            )
                        )}
                    </AnimatePresence>
                </div>
            )}

            {/* Scroll indicator */}
            <div
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10 transition-opacity duration-500"
                style={{ opacity: scrollIndicatorVisible ? 1 : 0 }}
            >
                <span className="text-white/70 uppercase tracking-[0.3em] text-[10px] font-sans whitespace-nowrap">
                    Scroll to immerse
                </span>
                <div className="w-px h-10 bg-white/30 relative overflow-hidden">
                    <div className="absolute inset-0 bg-secondary animate-[scrollLine_2.5s_ease-in-out_infinite]" />
                </div>
            </div>

            <style>{`
                @keyframes progress {
                    from { transform: translateX(-100%); }
                    to   { transform: translateX(100%); }
                }
                @keyframes scrollLine {
                    0%   { transform: scaleY(0); transform-origin: top; }
                    45%  { transform: scaleY(1); transform-origin: top; }
                    55%  { transform: scaleY(1); transform-origin: bottom; }
                    100% { transform: scaleY(0); transform-origin: bottom; }
                }
            `}</style>
        </section>
    );
}
