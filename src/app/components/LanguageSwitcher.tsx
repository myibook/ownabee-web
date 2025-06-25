"use client";

import React from 'react';
import { useTranslation } from '../i18n/TranslationContext';

/**
 * Language switcher component for toggling between English and Korean
 */
const LanguageSwitcher: React.FC = () => {
  const { locale, setLocale } = useTranslation();

  const toggleLanguage = () => {
    const newLocale = locale === 'en' ? 'ko' : 'en';
    
    // Set the locale in our context
    setLocale(newLocale);
    
    // Also set the cookie for middleware consistency
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=${60 * 60 * 24 * 365}`;
  };

  return (
    <div className="flex items-center">
      <button
        onClick={toggleLanguage}
        className="flex items-center space-x-1 text-sm font-medium hover:text-primary transition-colors"
        aria-label={locale === 'en' ? '한국어로 전환' : 'Switch to English'}
      >
        <span className={locale === 'en' ? 'font-bold' : 'opacity-60'}>EN</span>
        <span className="mx-1">/</span>
        <span className={locale === 'ko' ? 'font-bold' : 'opacity-60'}>KO</span>
      </button>
    </div>
  );
};

export default LanguageSwitcher;
