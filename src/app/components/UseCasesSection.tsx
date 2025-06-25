"use client";

import React from 'react';
import { useTranslation } from '../i18n/TranslationContext';

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
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-12 h-12">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      ),
      image: '/classroom.jpg' // Placeholder image path
    },
    {
      title: t('useCases.case2.title'),
      description: t('useCases.case2.description'),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-12 h-12">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      image: '/exhibition.jpg' // Placeholder image path
    },
    {
      title: t('useCases.case3.title'),
      description: t('useCases.case3.description'),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-12 h-12">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
      image: '/graduation.jpg' // Placeholder image path
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
              <div className="w-full md:w-1/2 h-48 sm:h-56 md:h-64 lg:h-auto relative">
                {/* Placeholder for image - replace with actual image */}
                <div className="absolute inset-0 bg-secondary/10 flex items-center justify-center">
                  <div className="text-center p-4 sm:p-6">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 mx-auto">
                      {useCase.icon}
                    </div>
                    <p className="font-semibold mt-2 text-sm sm:text-base">{useCase.title}</p>
                  </div>
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
                  <h4 className="font-bold mb-1 sm:mb-2 text-sm sm:text-base">교사 피드백</h4>
                  <p className="text-xs sm:text-sm italic text-text-secondary">
                    &ldquo;Ownabee를 통해 아이들이 자신의 이야기를 만들고 공유하는 과정에서 
                    자신감과 창의력이 크게 향상되었습니다. 학부모님들의 반응도 매우 긍정적입니다.&rdquo;
                  </p>
                  <div className="mt-2 flex items-center">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-primary/20 flex items-center justify-center mr-2">
                      <span className="text-primary font-bold text-xs sm:text-sm">K</span>
                    </div>
                    <span className="text-xs sm:text-sm font-semibold">김선생님, 행복유치원</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 sm:mt-10 md:mt-12 text-center">
          <button className="btn-secondary px-6 sm:px-8 py-2 sm:py-3 rounded-full font-bold text-white text-sm sm:text-base">
            더 많은 사례 보기
          </button>
        </div>
      </div>
    </section>
  );
};

export default UseCasesSection;
