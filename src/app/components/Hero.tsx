"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from '../i18n/TranslationContext';

/**
 * Hero component for the Ownabee landing page
 * Features the main tagline, description, and call-to-action
 * @returns {JSX.Element} The Hero component
 */
const Hero: React.FC = () => {
  const { t } = useTranslation();
  return (
    <section className="bg-gradient-to-r from-accent-light to-background-alt py-16 md:py-24" aria-label={t('hero.sectionAriaLabel')}>
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
        {/* Text Content */}
        <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight font-fredoka text-primary">
            {t('hero.title')}
          </h1>
          <p className="text-lg md:text-xl mb-8 text-text-secondary font-quicksand">
            {t('hero.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              href="#journey" 
              className="bg-primary hover:bg-primary/90 px-8 py-3 rounded-full font-bold text-white text-center font-baloo transition-colors"
              aria-label={t('hero.ctaAriaLabel')}
            >
              {t('hero.cta')}
            </Link>
            <Link 
              href="#demo" 
              className="bg-accent hover:bg-accent/90 px-8 py-3 rounded-full font-bold text-white text-center font-baloo transition-colors"
              aria-label={t('hero.educatorCtaAriaLabel')}
            >
              {t('hero.educatorCta')}
            </Link>
          </div>
        </div>
        
        {/* Hero Image */}
        <div className="md:w-1/2 relative">
          <div className="relative h-[300px] md:h-[400px] w-full">
            {/* Hero illustration with Next.js Image component for optimization */}
            <div className="absolute inset-0 rounded-lg overflow-hidden">
              <Image 
                src="/ownabee.png" 
                alt={t('common.description')}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                priority={true}
                className="object-contain p-4"
                aria-labelledby="hero-tagline"
              />
            </div>
            <div className="absolute bottom-4 left-0 right-0 text-center">
              <p className="font-semibold bg-white/80 inline-block px-4 py-2 rounded-full shadow-sm" id="hero-tagline">
                {t('common.title')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
