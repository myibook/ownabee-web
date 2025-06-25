"use client";

import React from 'react';
import { useTranslation } from '../i18n/TranslationContext';

/**
 * MeaningSection component for the Ownabee landing page
 * Explains the meaning behind the Ownabee name
 * @returns {JSX.Element} The MeaningSection component
 */
const MeaningSection: React.FC = () => {
  const { t } = useTranslation();
  const meanings = [
    {
      title: t('meaning.title1'),
      description: t('meaning.description1'),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-12 h-12">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
      bgColor: 'bg-accent/20'
    },
    {
      title: t('meaning.title2'),
      description: t('meaning.description2'),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-12 h-12">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      bgColor: 'bg-primary/20'
    },
    {
      title: t('meaning.title3'),
      description: t('meaning.description3'),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-12 h-12">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      ),
      bgColor: 'bg-secondary/20'
    }
  ];

  return (
    <section id="meaning" className="section bg-white py-10 sm:py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">{t('meaning.mainTitle')}</h2>
          <p className="text-base sm:text-lg text-text-secondary max-w-3xl mx-auto px-2">
            {t('meaning.mainDescription')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {meanings.map((item, index) => (
            <div 
              key={index} 
              className={`rounded-lg p-4 sm:p-6 md:p-8 ${item.bgColor} transition-transform duration-300 hover:scale-105`}
            >
              <div className="flex justify-center mb-4 sm:mb-6 text-primary">
                <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12">
                  {item.icon}
                </div>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4 text-center">{item.title}</h3>
              <p className="text-sm sm:text-base text-text-secondary text-center">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 sm:mt-12 md:mt-16 flex justify-center">
          <div className="bg-background-alt rounded-lg p-5 sm:p-6 md:p-8 max-w-2xl text-center shadow-sm">
            <div className="flex justify-center mb-3 sm:mb-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-primary/20 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-primary">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
            <h3 className="text-lg sm:text-xl font-bold mb-2">{t('meaning.growth.title')}</h3>
            <p className="text-sm sm:text-base text-text-secondary">
              {t('meaning.growth.description')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MeaningSection;
