"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CallToAction() {
    const ctaRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (prefersReduced) return;

        const ctx = gsap.context(() => {
            gsap.from(".cta-content > *", {
                scrollTrigger: { trigger: ctaRef.current, start: "top 80%" },
                y: 30,
                opacity: 0,
                duration: 1,
                stagger: 0.15,
                ease: "power2.out",
            });
        }, ctaRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={ctaRef}
            id="experience"
            className="relative py-32 md:py-40 px-6 bg-bg-dark text-text-light overflow-hidden"
            aria-label="Call to Action"
        >
            {/* Subtle radial glow */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div
                    className="w-[600px] h-[600px] rounded-full opacity-10"
                    style={{ background: "radial-gradient(circle, var(--secondary) 0%, transparent 70%)" }}
                />
            </div>

            <div className="cta-content relative z-10 max-w-2xl mx-auto text-center flex flex-col gap-8">
                <span className="text-secondary uppercase tracking-[0.3em] text-xs font-sans font-medium">
                    Private Atelier Circle
                </span>
                <h2 className="font-serif text-secondary-lighter text-4xl md:text-6xl leading-tight">
                    Experience Koa
                </h2>
                <p className="font-sans font-light text-text-light/65 text-base md:text-lg max-w-md mx-auto leading-relaxed">
                    Join our exclusive circle for early releases, limited editions, and an intimate look behind the craft.
                </p>

                <form
                    className="mt-4 flex flex-col sm:flex-row gap-0 w-full max-w-lg mx-auto"
                    onSubmit={(e) => e.preventDefault()}
                >
                    <label htmlFor="email" className="sr-only">Email address</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Your email address"
                        required
                        className="flex-1 bg-transparent border border-secondary/30 border-r-0 py-4 px-6 text-text-light placeholder:text-text-light/35 focus:outline-none focus:border-secondary transition-colors duration-300 font-sans font-light text-sm rounded-none"
                    />
                    <button
                        type="submit"
                        className="bg-secondary text-primary px-8 py-4 uppercase tracking-[0.2em] text-xs font-sans font-semibold hover:bg-secondary-light transition-colors duration-300 whitespace-nowrap border border-secondary"
                    >
                        Subscribe
                    </button>
                </form>

                <p className="text-text-light/30 text-xs font-sans tracking-wide">
                    No spam. Only what matters. Unsubscribe anytime.
                </p>
            </div>
        </section>
    );
}
