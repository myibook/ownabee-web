"use client";

import React from 'react';
import { useTranslation } from '../i18n/TranslationContext';

/**
 * KindergartenSection component for the Ownabee landing page
 * Explains why kindergartens need Ownabee
 * @returns {JSX.Element} The KindergartenSection component
 */
const KindergartenSection: React.FC = () => {
  const { t } = useTranslation();
  const reasons = [
    {
      title: t('kindergarten.reason1'),
      description: t('kindergarten.description1'),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-12 h-12">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
        </svg>
      )
    },
    {
      title: t('kindergarten.reason2'),
      description: t('kindergarten.description2'),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-12 h-12">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      )
    },
    {
      title: t('kindergarten.reason3'),
      description: t('kindergarten.description3'),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-12 h-12">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      )
    }
  ];

  return (
    <section id="kindergarten" className="section section-alt py-10 sm:py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">{t('kindergarten.title')}</h2>
          <p className="text-base sm:text-lg text-text-secondary max-w-3xl mx-auto px-2">
            {t('kindergarten.subtitle')}
          </p>
        </div>

        <div className="flex flex-col md:flex-row">
          {/* Left side - Image */}
          <div className="w-full md:w-1/2 mb-6 sm:mb-8 md:mb-0 md:pr-4 lg:pr-8 flex justify-center">
            <div className="relative h-[200px] sm:h-[250px] md:h-[300px] lg:h-[400px] w-full max-w-md">
              {/* Placeholder for kindergarten image - replace with actual image */}
              <div className="absolute inset-0 bg-primary/10 rounded-lg flex items-center justify-center">
                <div className="text-center p-4 sm:p-6">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 mx-auto mb-2 sm:mb-4 text-primary">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                  </svg>
                  <p className="font-semibold text-base sm:text-lg">{t('kindergarten.usage.title')}</p>
                  <p className="text-xs sm:text-sm text-text-secondary mt-1 sm:mt-2">{t('kindergarten.usage.subtitle')}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right side - Text content */}
          <div className="w-full md:w-1/2">
            <div className="space-y-4 sm:space-y-6 md:space-y-8">
              {reasons.map((reason, index) => (
                <div key={index} className="flex items-start bg-white p-4 sm:p-5 md:p-6 rounded-lg shadow-sm">
                  <div className="mr-3 sm:mr-4 text-primary flex-shrink-0">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12">
                      {reason.icon}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2">{reason.title}</h3>
                    <p className="text-sm sm:text-base text-text-secondary">{reason.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 sm:mt-6 md:mt-8 bg-accent/20 p-4 sm:p-5 md:p-6 rounded-lg">
              <h4 className="font-bold text-base sm:text-lg mb-2">{t('kindergarten.educationalEffects.title')}</h4>
              <ul className="list-disc pl-5 space-y-1 sm:space-y-2 text-sm sm:text-base text-text-secondary">
                <li>{t('kindergarten.educationalEffects.effects.0')}</li>
                <li>{t('kindergarten.educationalEffects.effects.1')}</li>
                <li>{t('kindergarten.educationalEffects.effects.2')}</li>
                <li>{t('kindergarten.educationalEffects.effects.3')}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KindergartenSection;
