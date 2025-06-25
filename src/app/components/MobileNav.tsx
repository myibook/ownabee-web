"use client";

import React, { useState, useEffect } from 'react';
import { useTranslation } from '../i18n/TranslationContext';
import LanguageSwitcher from './LanguageSwitcher';

/**
 * MobileNav component for the Ownabee landing page
 * Provides a mobile-friendly navigation menu
 * @returns {JSX.Element} The MobileNav component
 */
const MobileNav: React.FC = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  
  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isOpen && !target.closest('#mobile-menu') && !target.closest('#menu-toggle')) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);
  
  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <div className="md:hidden">
      {/* Hamburger button */}
      <button 
        id="menu-toggle"
        className="p-2 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor" 
          className="w-6 h-6"
        >
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>
      
      {/* Mobile menu */}
      {isOpen && (
        <div 
          id="mobile-menu"
          className="fixed inset-0 z-50 bg-white dark:bg-gray-900 pt-16"
        >
          <div className="container mx-auto px-4">
            <nav className="flex flex-col space-y-4">
              <a 
                href="#journey" 
                className="py-3 text-lg font-medium border-b border-gray-200 dark:border-gray-700"
                onClick={() => setIsOpen(false)}
              >
                {t('header.home')}
              </a>
              <a 
                href="#audiobook" 
                className="py-3 text-lg font-medium border-b border-gray-200 dark:border-gray-700"
                onClick={() => setIsOpen(false)}
              >
                {t('header.features')}
              </a>
              <a 
                href="#meaning" 
                className="py-3 text-lg font-medium border-b border-gray-200 dark:border-gray-700"
                onClick={() => setIsOpen(false)}
              >
                {t('header.about')}
              </a>
              <a 
                href="#kindergarten" 
                className="py-3 text-lg font-medium border-b border-gray-200 dark:border-gray-700"
                onClick={() => setIsOpen(false)}
              >
                {t('header.pricing')}
              </a>
              <a 
                href="#collaboration" 
                className="py-3 text-lg font-medium border-b border-gray-200 dark:border-gray-700"
                onClick={() => setIsOpen(false)}
              >
                {t('header.contact')}
              </a>
              
              <div className="py-3 border-b border-gray-200 dark:border-gray-700">
                <LanguageSwitcher />
              </div>
              
              <div className="mt-6">
                <button className="bg-primary hover:bg-primary-dark w-full py-3 rounded-lg font-bold text-white">
                  {t('header.getStarted')}
                </button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileNav;
