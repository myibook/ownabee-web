"use client";

import React from 'react';
import { useTranslation } from '../i18n/TranslationContext';
import { ClipboardList, Users, Sparkles } from 'lucide-react';
import Image from 'next/image';

/**
 * UseCasesSection component for the Ownabee landing page
 * Shows real-world use cases of Ownabee in kindergartens
 * @returns {JSX.Element} The UseCasesSection component
 */
const UseCasesSection: React.FC = () => {
  const { t } = useTranslation();
  const useCases = [
    {
      title: t('useCases.case1.title'),
      description: t('useCases.case1.description'),
      icon: (
        <ClipboardList className="w-12 h-12" aria-hidden="true" />
      ),
      image: '/images/learning-moments.png'
    },
    {
      title: t('useCases.case2.title'),
      description: t('useCases.case2.description'),
      icon: (
        <Users className="w-12 h-12" aria-hidden="true" />
      ),
      image: '/images/family-adventures.png'
    },
    {
      title: t('useCases.case3.title'),
      description: t('useCases.case3.description'),
      icon: (
        <Sparkles className="w-12 h-12" aria-hidden="true" />
      ),
      image: '/images/bedtime-stories.png'
    }
  ];

  return (
    <section id="examples" className="section bg-gradient-to-r from-tertiary/15 to-accent-light/50 py-10 sm:py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">{t('useCases.title')}</h2>
          <p className="text-base sm:text-lg text-text-secondary max-w-3xl mx-auto px-2">
            {t('useCases.subtitle')}
          </p>
        </div>

        <div className="space-y-6 sm:space-y-8 md:space-y-12">
          {useCases.map((useCase, index) => (
            <div 
              key={index} 
              className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center bg-background-alt rounded-lg overflow-hidden shadow-sm`}
            >
              {/* Image side */}
              {/* Image side: full width on mobile, half width on desktop, 
                  with a fixed height on small screens and automatic height on larger screens */}
              <div className="w-full md:w-1/2 h-48 sm:h-56 md:h-64 lg:h-80 xl:h-96 relative">
                <div className="absolute inset-0 overflow-hidden">
                  <Image 
                    src={useCase.image}
                    alt={useCase.title}
                    fill
                    style={{ objectFit: 'contain' }}
                    priority
                  />
                </div>
              </div>
              
              {/* Content side */}
              <div className="w-full md:w-1/2 p-4 sm:p-6 md:p-8">
                <div className="mb-3 sm:mb-4 text-primary hidden md:block">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12">
                    {useCase.icon}
                  </div>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 md:mb-4">{useCase.title}</h3>
                <p className="text-sm sm:text-base text-text-secondary mb-4 sm:mb-5 md:mb-6">{useCase.description}</p>
                
                <div className="bg-white p-3 sm:p-4 rounded-lg border border-gray-100">
                  <h4 className="font-bold mb-1 sm:mb-2 text-sm sm:text-base">{t('useCases.teacherFeedback')}</h4>
                  <p className="text-xs sm:text-sm italic text-text-secondary">
                    &ldquo;{t(`useCases.case${index + 1}.feedback`)}&rdquo;
                  </p>
                  <div className="mt-2 flex items-center">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-primary/20 flex items-center justify-center mr-2">
                      <span className="text-primary font-bold text-xs sm:text-sm">{t(`useCases.case${index + 1}.teacherName`).charAt(0)}</span>
                    </div>
                    <span className="text-xs sm:text-sm font-semibold">{t(`useCases.case${index + 1}.teacherName`)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 sm:mt-10 md:mt-12 text-center">
          <button className="btn-secondary px-6 sm:px-8 py-2 sm:py-3 rounded-full font-bold text-white text-sm sm:text-base">
            {t('useCases.viewMore')}
          </button>
        </div>
      </div>
    </section>
  );
};

export default UseCasesSection;
