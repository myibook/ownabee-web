"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Import translation files
import enTranslations from './translations/en.json';
import koTranslations from './translations/ko.json';

// Define recursive type for nested translations
type TranslationValue = string | number | boolean | TranslationValue[] | { [key: string]: TranslationValue };

interface TranslationObject {
  [key: string]: TranslationValue;
}

type Translations = TranslationObject;

type TranslationContextType = {
  t: (key: string) => string;
  locale: string;
  setLocale: (locale: string) => void;
  translations: Translations;
};

const translations: { [key: string]: Translations } = {
  en: enTranslations,
  ko: koTranslations,
};

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

/**
 * Translation provider component for managing language switching
 * @param {object} props - Component props
 * @param {ReactNode} props.children - Child components
 */
export function TranslationProvider({ children }: { children: ReactNode }) {
  // We may use router later for path-based language switching
  // const router = useRouter();
  const [locale, setLocale] = useState<string>('en');

  useEffect(() => {
    // First check for the cookie set by middleware
    const getCookie = (name: string): string | undefined => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(';').shift();
      return undefined;
    };

    const cookieLocale = getCookie('NEXT_LOCALE');
    if (cookieLocale && ['en', 'ko'].includes(cookieLocale)) {
      setLocale(cookieLocale);
      return;
    }
    
    // Then check local storage
    const savedLocale = localStorage.getItem('ownabee-locale');
    if (savedLocale && ['en', 'ko'].includes(savedLocale)) {
      setLocale(savedLocale);
      return;
    }
    
    // Finally try to detect browser language
    const browserLang = navigator.language.split('-')[0];
    if (browserLang === 'ko') {
      setLocale('ko');
    }
  }, []);

  // Save locale preference when it changes
  useEffect(() => {
    localStorage.setItem('ownabee-locale', locale);
    document.documentElement.lang = locale;
  }, [locale]);

  /**
   * Get translation for a specific key
   * @param {string} key - Dot notation path to translation (e.g., "header.home")
   * @returns {string} - Translated text
   */
  const t = (key: string): string => {
    const keys = key.split('.');
    let value: TranslationValue = translations[locale];
    
    for (const k of keys) {
      if (value && typeof value === 'object') {
        // Handle both object and array cases
        if (Array.isArray(value) && !isNaN(Number(k))) {
          // If value is an array and k is a valid numeric index
          value = value[Number(k)];
        } else if (!Array.isArray(value) && k in value) {
          // If value is an object and k is a valid key
          value = (value as Record<string, TranslationValue>)[k];
        } else {
          console.warn(`Translation key not found: ${key}`);
          return key;
        }
      } else {
        console.warn(`Translation key not found: ${key}`);
        return key;
      }
    }
    
    if (typeof value === 'string') {
      return value;
    }
    console.warn(`Translation value is not a string: ${key}`);
    return String(value);
  };

  const value = {
    t,
    locale,
    setLocale,
    translations: translations[locale],
  };

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
}

/**
 * Custom hook for accessing translations
 * @returns {TranslationContextType} - Translation context
 */
export function useTranslation(): TranslationContextType {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
}
