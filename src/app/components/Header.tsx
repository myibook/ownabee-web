"use client";

import React, { useState, useEffect } from 'react';
import MobileNav from './MobileNav';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from '../i18n/TranslationContext';
import LanguageSwitcher from './LanguageSwitcher';

/**
 * Header component for the Ownabee landing page
 * @returns {JSX.Element} The Header component
 */
const Header: React.FC = () => {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Add shadow to header when scrolled
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <header className={`sticky top-0 z-50 bg-white ${isScrolled ? 'shadow-md' : ''} transition-shadow duration-300`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-primary flex items-center">
            {/* Logo with Next.js Image component for optimization */}
            <div className="relative w-10 h-10 mr-2">
              <Image 
                src="/assets/brand/ownabee-logo.svg" 
                alt="Ownabee 로고"
                width={40}
                height={40}
                priority={true}
              />
            </div>
            Ownabee
          </Link>
          
          <nav className="hidden md:flex space-x-6">
            <a href="#journey" className="text-gray-600 hover:text-primary">{t('header.home')}</a>
            <a href="#audiobook" className="text-gray-600 hover:text-primary">{t('header.features')}</a>
            <a href="#meaning" className="text-gray-600 hover:text-primary">{t('header.about')}</a>
            <a href="#kindergarten" className="text-gray-600 hover:text-primary">{t('header.pricing')}</a>
            <a href="#collaboration" className="text-gray-600 hover:text-primary">{t('header.contact')}</a>
          </nav>
          
          <div className="hidden md:flex items-center space-x-4">
            <LanguageSwitcher />
            <button className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-6 rounded-full transition duration-300">
              {t('header.getStarted')}
            </button>
          </div>
          
          {/* Mobile Navigation */}
          <MobileNav />
        </div>
      </div>
    </header>
  );
};

export default Header;
