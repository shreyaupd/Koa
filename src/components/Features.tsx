"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Leaf, HandMetal, Gem, HandHeart } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const pillars = [
    {
        Icon: Leaf,
        title: "Single-Origin Cacao",
        body: "Ethically sourced from small, generational farms. Every origin tells a story in flavour.",
    },
    {
        Icon: HandHeart,
        title: "Handcrafted Process",
        body: "Small-batch artisan production that honours the bean and preserves its natural tasting notes.",
    },
    {
        Icon: Gem,
        title: "Pure Indulgence",
        body: "No artificial ingredients or preservatives. Just uncompromised, velvety chocolate.",
    },
];

export default function Features() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (prefersReduced) return;

        const ctx = gsap.context(() => {
            gsap.from(".pillar-card", {
                scrollTrigger: { trigger: sectionRef.current, start: "top 78%" },
                y: 36,
                opacity: 0,
                duration: 1,
                stagger: 0.15,
                ease: "power2.out",
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="pillars"
            className="py-28 md:py-36 px-6 bg-bg-dark text-text-light border-t border-white/5"
            aria-label="Brand Pillars"
        >
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-20 space-y-4">
                    <span className="text-secondary uppercase tracking-[0.3em] text-xs font-sans font-medium">
                        The Koa Promise
                    </span>
                    <h2 className="font-serif text-text-light text-4xl md:text-5xl">Three Pillars of Craft</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 lg:gap-16">
                    {pillars.map(({ Icon, title, body }, i) => (
                        <div
                            key={i}
                            className="pillar-card flex flex-col items-center text-center gap-6 px-4"
                        >
                            <div className="w-16 h-16 rounded-full border border-secondary/40 flex items-center justify-center">
                                <Icon className="w-7 h-7 text-secondary" strokeWidth={1.5} />
                            </div>
                            <div className="h-px w-8 bg-secondary/50" />
                            <h3 className="font-serif text-text-light text-xl md:text-2xl">{title}</h3>
                            <p className="font-sans font-light text-text-light/60 text-base leading-relaxed max-w-xs">{body}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
