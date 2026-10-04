import CartDrawer from "@/components/CartDrawer";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Menu from "@/components/Menu";
import { categories, menu } from "@/lib/menu";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Marquee />
        <Menu categories={categories} items={menu} />
      </main>
      <Footer />
      <CartDrawer />
    </>
  );
}
