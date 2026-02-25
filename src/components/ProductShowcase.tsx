"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const products = [
    {
        name: "Deep Velvet Melt",
        subtitle: "72% Single-Origin Dark",
        note: "Notes of wild cherry & toasted oak",
        price: "$24",
        bgClass: "bg-[#3D2112]",
    },
    {
        name: "Golden Truffle Collection",
        subtitle: "Handcrafted Assortment",
        note: "Edible gold, salted caramel & hazelnut",
        price: "$48",
        bgClass: "bg-[#5C3D1E]",
    },
    {
        name: "Cacao Noir",
        subtitle: "85% Extra Dark",
        note: "Intensely pure, deeply complex",
        price: "$28",
        bgClass: "bg-[#2C180C]",
    },
];

export default function ProductShowcase() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (prefersReduced) return;

        const ctx = gsap.context(() => {
            gsap.from(".showcase-header > *", {
                scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
                y: 20,
                opacity: 0,
                duration: 0.9,
                stagger: 0.12,
                ease: "power2.out",
            });
            gsap.from(".product-card", {
                scrollTrigger: { trigger: ".products-grid", start: "top 78%" },
                y: 48,
                opacity: 0,
                duration: 1,
                stagger: 0.14,
                ease: "power2.out",
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="collection"
            className="py-28 md:py-36 px-6 md:px-12 bg-accent text-text-dark"
            aria-label="Product Collection"
        >
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="showcase-header text-center mb-20 space-y-4">
                    <span className="text-secondary uppercase tracking-[0.3em] text-xs font-sans font-medium">
                        The Collection
                    </span>
                    <h2 className="font-serif text-primary text-4xl md:text-5xl lg:text-6xl">
                        Masterpieces in Cacao
                    </h2>
                    <p className="font-sans font-light text-primary/60 text-base max-w-md mx-auto">
                        Each bar is a small-batch creation, made by hand, never rushed.
                    </p>
                </div>

                {/* Product Grid */}
                <div className="products-grid grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-10">
                    {products.map((p, i) => (
                        <article
                            key={i}
                            className="product-card group cursor-pointer flex flex-col"
                        >
                            {/* Image placeholder */}
                            <div
                                className={`relative ${p.bgClass} aspect-[3/4] w-full overflow-hidden flex items-center justify-center transition-transform duration-700 ease-in-out group-hover:scale-[0.97]`}
                                aria-label={`${p.name} product image placeholder`}
                            >
                                {/* Shimmer line */}
                                <div className="absolute inset-x-0 top-0 h-px bg-secondary/30 group-hover:bg-secondary/60 transition-colors duration-500" />
                                <div className="absolute inset-x-0 bottom-0 h-px bg-secondary/20" />

                                <div className="border border-secondary/25 group-hover:border-secondary/60 transition-colors duration-500 p-8 flex flex-col items-center gap-2 text-center">
                                    <span className="text-secondary/60 uppercase tracking-[0.3em] text-[10px] font-sans">Koa</span>
                                    <div className="w-8 h-px bg-secondary/40" />
                                </div>
                            </div>

                            {/* Info */}
                            <div className="pt-6 flex flex-col gap-2 text-center">
                                <h3 className="font-serif text-primary text-xl md:text-2xl">{p.name}</h3>
                                <p className="font-sans font-light text-primary/50 text-xs tracking-widest uppercase">{p.subtitle}</p>
                                <p className="font-sans font-light text-primary/60 text-sm">{p.note}</p>
                                <span className="mt-3 font-sans text-secondary tracking-widest text-sm group-hover:text-primary transition-colors duration-300">
                                    {p.price}
                                </span>
                            </div>
                        </article>
                    ))}
                </div>

                <div className="mt-20 flex justify-center">
                    <button className="px-10 py-4 border border-primary/30 text-primary uppercase tracking-[0.2em] text-xs font-sans font-medium hover:bg-primary hover:text-text-light transition-all duration-400">
                        View All Creations
                    </button>
                </div>
            </div>
        </section>
    );
}
