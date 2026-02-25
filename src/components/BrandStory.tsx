"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function BrandStory() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (prefersReduced) return;

        const ctx = gsap.context(() => {
            gsap.from(".story-text > *", {
                scrollTrigger: { trigger: sectionRef.current, start: "top 78%" },
                y: 36,
                opacity: 0,
                duration: 1.1,
                stagger: 0.18,
                ease: "power2.out",
            });
            gsap.from(".story-img", {
                scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
                y: 56,
                opacity: 0,
                duration: 1.4,
                ease: "power2.out",
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="our-story"
            className="relative py-28 md:py-36 px-6 md:px-12 bg-secondary-lighter text-text-dark"
            aria-label="Brand Story"
        >
            {/* Gradient bridge from hero's dark bg to this cream section */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-bg-dark/20 to-transparent" />

            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
                {/* Text */}
                <div className="story-text flex flex-col gap-8">
                    <span className="text-secondary uppercase tracking-[0.3em] text-xs font-sans font-medium">
                        Our Story
                    </span>
                    <h2 className="font-serif text-primary text-4xl md:text-5xl lg:text-6xl leading-tight">
                        Rooted in heritage,<br />
                        <span className="italic text-secondary">crafted with soul.</span>
                    </h2>
                    <div className="h-px w-16 bg-secondary" />
                    <p className="font-sans font-light text-primary/75 text-base md:text-lg leading-relaxed">
                        Koa was born from a singular obsession to unearth the world's most expressive cacao
                        and transform it into an unforgettable sensory experience. By partnering directly with
                        generational farmers, we ensure every bean is ethically sourced and sun-dried to perfection.
                    </p>
                    <p className="font-sans font-light text-primary/75 text-base md:text-lg leading-relaxed">
                        The result is a velvety taste that lingers long after the final bite a true testament
                        to the artisan's touch, and to the land from which it came.
                    </p>
                </div>

                {/* Image placeholder */}
                <div
                    className="story-img relative aspect-[3/4] w-full bg-accent overflow-hidden flex items-end justify-center"
                    aria-label="Brand story image placeholder"
                >
                    <div className="absolute inset-0 bg-primary/10" />
                    <div className="relative z-10 mb-8 flex flex-col items-center gap-2 opacity-40">
                        <div className="w-12 h-px bg-secondary" />
                        <span className="text-primary uppercase tracking-[0.25em] text-xs font-sans">
                            Image
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
}
