import Link from "next/link";
import { Instagram, Twitter, Youtube } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-primary text-text-light py-12 px-6 md:px-12" aria-label="Site Footer">
            <div className="max-w-7xl mx-auto space-y-10">
                {/* Top row */}
                <div className="flex flex-col md:flex-row justify-between items-start gap-12">
                    {/* Logo & tagline */}
                    <div className="space-y-4 max-w-xs">
                        <span className="font-serif text-3xl tracking-wider text-secondary-lighter uppercase block">
                            Koa
                        </span>
                        <p className="font-sans font-light text-text-light/45 text-sm leading-relaxed">
                            An echo of velvety perfection. Elevating the art of chocolate to its purest form.
                        </p>
                    </div>

                    {/* Navigation columns */}
                    <div className="flex gap-16 font-sans font-light text-xs tracking-[0.2em] uppercase">
                        <nav aria-label="Company links">
                            <ul className="space-y-4">
                                <li>
                                    <Link href="#collection" className="text-text-light/50 hover:text-secondary transition-colors duration-300">
                                        Collection
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#our-story" className="text-text-light/50 hover:text-secondary transition-colors duration-300">
                                        Our Story
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#pillars" className="text-text-light/50 hover:text-secondary transition-colors duration-300">
                                        Craft
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                        <nav aria-label="Support links">
                            <ul className="space-y-4">
                                <li>
                                    <Link href="#" className="text-text-light/50 hover:text-secondary transition-colors duration-300">
                                        Journal
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className="text-text-light/50 hover:text-secondary transition-colors duration-300">
                                        Contact
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#experience" className="text-text-light/50 hover:text-secondary transition-colors duration-300">
                                        Newsletter
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </div>

                    {/* Social Icons */}
                    <div className="flex gap-4" aria-label="Social media links">
                        <Link href="#" aria-label="Instagram" className="text-text-light/40 hover:text-secondary transition-colors duration-300">
                            <Instagram size={18} strokeWidth={1.5} />
                        </Link>
                        <Link href="#" aria-label="Twitter / X" className="text-text-light/40 hover:text-secondary transition-colors duration-300">
                            <Twitter size={18} strokeWidth={1.5} />
                        </Link>
                        <Link href="#" aria-label="YouTube" className="text-text-light/40 hover:text-secondary transition-colors duration-300">
                            <Youtube size={18} strokeWidth={1.5} />
                        </Link>
                    </div>
                </div>

                {/* Divider */}
                <div className="h-px -space-y-2s bg-white/10" />

                {/* Bottom row */}
                <div className="flex flex-col md:-space-y-17 sm:flex-row justify-between items-center gap-4 text-[11px] font-sans font-light text-text-light/30 tracking-widest uppercase">
                    <p>&copy; 2026 Koa Artisan Chocolate. All rights reserved.</p>
                    <div className="flex gap-8">
                        <Link href="#" className="hover:text-secondary transition-colors duration-300">Privacy</Link>
                        <Link href="#" className="hover:text-secondary transition-colors duration-300">Terms</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
