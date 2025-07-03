"use client";

import React from 'react';
import { useTranslation } from '../i18n/TranslationContext';
import { Brain, Heart, Sparkles } from 'lucide-react';
import Image from 'next/image';

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
        <div className="w-12 h-12 text-current" role="img" aria-hidden="true">
          <Brain className="w-full h-full" strokeWidth={2} />
        </div>
      )
    },
    {
      title: t('kindergarten.reason2'),
      description: t('kindergarten.description2'),
      icon: (
        <div className="w-12 h-12 text-current" role="img" aria-hidden="true">
          <Heart className="w-full h-full" strokeWidth={2} />
        </div>
      )
    },
    {
      title: t('kindergarten.reason3'),
      description: t('kindergarten.description3'),
      icon: (
        <div className="w-12 h-12 text-current" role="img" aria-hidden="true">
          <Sparkles className="w-full h-full" strokeWidth={2} />
        </div>
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
              <div className="absolute inset-0 rounded-lg overflow-hidden">
                <Image 
                  src="/images/kindergartens.png" 
                  alt={t('kindergarten.usage.title')} 
                  fill 
                  style={{ objectFit: 'cover' }} 
                  priority 
                />
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
