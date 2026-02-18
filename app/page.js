'use client';
import Hero from "@/components/Hero";
import Lenis from "lenis";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const lenis = new Lenis();
    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);
  return (
    <div>
      <Hero />
    </div>
  );
}
