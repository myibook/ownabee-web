"use client";

import React from 'react';
import { useTranslation } from '../i18n/TranslationContext';

/**
 * JourneySection component for the Ownabee landing page
 * Describes the journey of a child becoming an author
 * @returns {JSX.Element} The JourneySection component
 */
const JourneySection: React.FC = () => {
  const { t } = useTranslation();
  const steps = [
    {
      title: t('journey.step1'),
      description: t('journey.step1Description'),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-12 h-12">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      )
    },
    {
      title: t('journey.step2'),
      description: t('journey.step2Description'),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-12 h-12">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
        </svg>
      )
    },
    {
      title: t('journey.step3'),
      description: t('journey.step3Description'),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-12 h-12">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: t('journey.step4'),
      description: t('journey.step4Description'),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-12 h-12">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    }
  ];

  return (
    <section id="journey" className="section bg-gradient-to-r from-secondary/20 to-tertiary/20 py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4">{t('journey.title')}</h2>
          <p className="text-base sm:text-lg text-text-secondary max-w-3xl mx-auto px-2">
            {t('journey.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="bg-background-alt rounded-lg p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex justify-center mb-3 sm:mb-4 text-primary">
                <div className="w-10 h-10 sm:w-12 sm:h-12">{step.icon}</div>
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 text-center">{step.title}</h3>
              <p className="text-sm sm:text-base text-text-secondary text-center">{step.description}</p>
              <div className="flex justify-center mt-3 sm:mt-4">
                <span className="bg-primary text-white w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-bold text-sm sm:text-base">
                  {index + 1}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 sm:mt-12 md:mt-16 text-center">
          <p className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">{t('common.description')}</p>
          <button className="btn-primary px-6 sm:px-8 py-2 sm:py-3 rounded-full font-bold text-white text-sm sm:text-base">
            {t('hero.cta')}
          </button>
        </div>
      </div>
    </section>
  );
};

export default JourneySection;
