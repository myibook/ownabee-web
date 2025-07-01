"use client";

import React from 'react';
import { useTranslation } from '../i18n/TranslationContext';
import { Box, BookOpen, Star, Zap } from 'lucide-react';

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
        <div className="w-12 h-12" role="img" aria-hidden="true">
          <Box className="w-full h-full" strokeWidth={2} />
        </div>
      ),
      bgColor: 'bg-accent/20'
    },
    {
      title: t('meaning.title2'),
      description: t('meaning.description2'),
      icon: (
        <div className="w-12 h-12" role="img" aria-hidden="true">
          <BookOpen className="w-full h-full" strokeWidth={2} />
        </div>
      ),
      bgColor: 'bg-primary/20'
    },
    {
      title: t('meaning.title3'),
      description: t('meaning.description3'),
      icon: (
        <div className="w-12 h-12" role="img" aria-hidden="true">
          <Star className="w-full h-full" strokeWidth={2} />
        </div>
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
                <Zap className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-primary" aria-hidden="true" />
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
