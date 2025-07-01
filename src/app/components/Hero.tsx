"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from '../i18n/TranslationContext';

/**
 * Hero component for the Ownabee landing page
 * Features the main tagline, description, and call-to-action
 * Styled based on the Figma design
 * @returns {JSX.Element} The Hero component
 */
const Hero: React.FC = () => {
  const { t } = useTranslation();
  return (
    <section className="py-16 md:py-24" aria-label={t('hero.sectionAriaLabel')}>
      <div className="w-full">
        {/* Main Frame */}
        <div className="bg-white flex flex-col items-center justify-center">
          
          {/* Hero Image Container - Full Width */}
          <div className="relative w-full h-[280px] md:h-[500px] mb-10 overflow-hidden">
            <Image 
              src="/figma-assets/ownabee-hero.png" 
              alt="OWNABEE Hero Image"
              fill
              priority={true}
              className="object-cover w-full h-full"
              sizes="100vw"
            />
          </div>
          
          {/* Welcome Text */}
          <h1 className="text-1xl md:text-1xl font-bold mb-12 text-[#454C4F] font-lexend tracking-tight">
            {t('hero.welcomeTitle') || 'Welcome to OWNABEE!'}
          </h1>
          
          {/* Buttons Container */}
          <div className="flex flex-col w-full max-w-md gap-4">
            {/* Sign up button */}
            <Link 
              href="#journey" 
              className="bg-[#FFD54F] hover:bg-[#FFD54F]/90 px-8 py-4 rounded-full font-semibold text-[#454C4F] text-center font-lexend text-sm transition-colors flex items-center justify-center"
              aria-label={t('hero.ctaAriaLabel')}
            >
              {t('hero.cta')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
