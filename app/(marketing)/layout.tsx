import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import TopBar from "@/components/TopBar";
import WhatsAppButton from "@/components/WhatsAppButton";

/**
 * Public site shell.
 *
 * Revalidated every five minutes so an edit to a headline figure or a newly
 * published post appears without a rebuild, while the pages themselves stay
 * static for everyone who is not the admin.
 */
export const revalidate = 300;

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SmoothScroll />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-navy-deep focus:px-4 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>
      <TopBar />
      <Header />
      <main id="main">{children}</main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
