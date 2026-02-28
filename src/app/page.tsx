import Hero from "@/components/Hero";
import BrandStory from "@/components/BrandStory";
import Features from "@/components/Features";
import ProductShowcase from "@/components/ProductShowcase";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";

export default function Home() {
    return (
        <main>
            <Hero />
            <BrandStory />
            <Features />
            <ProductShowcase />
            <CallToAction />
            <Footer />
        </main>
    );
}
