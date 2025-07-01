"use client";

import React from 'react';
import { useTranslation } from '../i18n/TranslationContext';
import { Pencil, Mic, Image, FileText } from './ui/icons';

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
      icon: <Pencil className="w-12 h-12" />
    },
    {
      title: t('journey.step2'),
      description: t('journey.step2Description'),
      icon: <Mic className="w-12 h-12" />
    },
    {
      title: t('journey.step3'),
      description: t('journey.step3Description'),
      icon: <Image className="w-12 h-12" />
    },
    {
      title: t('journey.step4'),
      description: t('journey.step4Description'),
      icon: <FileText className="w-12 h-12" />
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
