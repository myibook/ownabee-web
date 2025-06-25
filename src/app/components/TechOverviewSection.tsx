"use client";

import React from 'react';
import { useTranslation } from '../i18n/TranslationContext';

/**
 * TechOverviewSection component for the Ownabee landing page
 * Provides an overview of the technology behind Ownabee
 * @returns {JSX.Element} The TechOverviewSection component
 */
const TechOverviewSection: React.FC = () => {
  const { t } = useTranslation();
  const techComponents = [
    {
      title: t('tech.component1.title'),
      description: t('tech.component1.description'),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-10 h-10">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
        </svg>
      )
    },
    {
      title: t('tech.component2.title'),
      description: t('tech.component2.description'),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-10 h-10">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: t('tech.component3.title'),
      description: t('tech.component3.description'),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-10 h-10">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
        </svg>
      )
    }
  ];

  return (
    <section id="tech" className="section bg-gradient-to-r from-primary/10 to-accent/10 py-10 sm:py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">{t('tech.title')}</h2>
          <p className="text-base sm:text-lg text-text-secondary max-w-3xl mx-auto px-2">
            {t('tech.subtitle')}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Tech diagram */}
          <div className="p-4 sm:p-6 md:p-8 border-b border-gray-100">
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 sm:gap-6 md:gap-8">
              {techComponents.map((component, index) => (
                <React.Fragment key={index}>
                  <div className="flex flex-col items-center text-center mb-4 md:mb-0">
                    <div className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-full bg-primary/10 flex items-center justify-center mb-3 sm:mb-4">
                      <div className="text-primary w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10">{component.icon}</div>
                    </div>
                    <h3 className="font-bold mb-1 sm:mb-2 text-base sm:text-lg">{component.title}</h3>
                    <p className="text-xs sm:text-sm text-text-secondary">{component.description}</p>
                  </div>
                  
                  {/* Connector between components */}
                  {index < techComponents.length - 1 && (
                    <div className="hidden md:block">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-primary">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Sorisori AI Technology */}
          <div className="p-4 sm:p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-center">
              <div className="w-full md:w-1/3 mb-6 md:mb-0">
                <div className="bg-secondary/10 rounded-lg p-4 sm:p-5 md:p-6 flex items-center justify-center h-full">
                  <div className="text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 mx-auto mb-2 sm:mb-3 md:mb-4 text-secondary">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    <h3 className="font-bold text-base sm:text-lg">Sorisori AI</h3>
                  </div>
                </div>
              </div>
              
              <div className="w-full md:w-2/3 md:pl-4 lg:pl-8">
                <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 md:mb-4">{t('tech.voice.title')}</h3>
                <p className="text-sm sm:text-base text-text-secondary mb-3 sm:mb-4">
                  {t('tech.voice.description')}
                </p>
                
                <div className="bg-accent/10 p-3 sm:p-4 rounded-lg">
                  <h4 className="font-semibold mb-1 sm:mb-2 text-sm sm:text-base">{t('tech.voice.featuresTitle')}</h4>
                  <ul className="list-disc pl-4 sm:pl-5 space-y-0.5 sm:space-y-1 text-xs sm:text-sm text-text-secondary">
                    <li>{t('tech.voice.features.0')}</li>
                    <li>{t('tech.voice.features.1')}</li>
                    <li>{t('tech.voice.features.2')}</li>
                    <li>{t('tech.voice.features.3')}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechOverviewSection;
