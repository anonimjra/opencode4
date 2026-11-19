import { getRentalCatalogData } from "@/lib/data/rental";
import ThemeProvider from "@/components/shared/ThemeProvider";
import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import AboutStudioSection from "@/components/landing/AboutStudioSection";
import GearCatalogSection from "@/components/landing/GearCatalogSection";
import BundlingPackagesSection from "@/components/landing/BundlingPackagesSection";
import RentalTermsSection from "@/components/landing/RentalTermsSection";
import RentalWorkflowSection from "@/components/landing/RentalWorkflowSection";
import StudioLocationSection from "@/components/landing/StudioLocationSection";
import TestimonialSection from "@/components/landing/TestimonialSection";
import Footer from "@/components/landing/Footer";
import WhatsAppFloatingButton from "@/components/landing/WhatsAppFloatingButton";

export const revalidate = 3600;

export default async function LandingPage() {
  const data = await getRentalCatalogData();
  const { settings, categories, gears, packages, testimonials } = data;

  return (
    <ThemeProvider primaryColor={settings.primary_color}>
      <Navbar
        brandName={settings.brand_name}
        logoUrl={settings.logo_url}
        whatsappNumber={settings.whatsapp_number}
      />
      <main>
        <HeroSection
          title={settings.hero_title}
          subtitle={settings.hero_subtitle}
          imageUrl={settings.hero_image_url}
          brandName={settings.brand_name}
          whatsappNumber={settings.whatsapp_number}
        />
        <AboutStudioSection
          title={settings.studio_title}
          description={settings.studio_description}
          imageUrl={settings.studio_image_url}
          brandName={settings.brand_name}
        />
        <GearCatalogSection
          categories={categories}
          gears={gears}
          brandName={settings.brand_name}
          whatsappNumber={settings.whatsapp_number}
        />
        <BundlingPackagesSection
          packages={packages}
          brandName={settings.brand_name}
          whatsappNumber={settings.whatsapp_number}
        />
        <RentalTermsSection
          rentalTerms={settings.rental_terms}
          whatsappNumber={settings.whatsapp_number}
        />
        <RentalWorkflowSection />
        <StudioLocationSection
          studioAddress={settings.studio_address}
          visitingHours={settings.visiting_hours}
          googleMapsEmbedUrl={settings.google_maps_embed_url}
          whatsappNumber={settings.whatsapp_number}
        />
        <TestimonialSection testimonials={testimonials} />
      </main>
      <Footer
        brandName={settings.brand_name}
        tagline={settings.tagline}
        studioAddress={settings.studio_address}
        whatsappNumber={settings.whatsapp_number}
        instagramUrl={settings.instagram_url}
        tiktokUrl={settings.tiktok_url}
        facebookUrl={settings.facebook_url}
      />
      <WhatsAppFloatingButton
        brandName={settings.brand_name}
        whatsappNumber={settings.whatsapp_number}
      />
    </ThemeProvider>
  );
}
