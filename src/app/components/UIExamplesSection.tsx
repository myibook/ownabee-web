"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { useTranslation } from '../i18n/TranslationContext';
import { Palette, Edit, Mic, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * UIExamplesSection component for the Ownabee landing page
 * Shows UI examples and structure with a carousel
 * @returns {JSX.Element} The UIExamplesSection component
 */
const UIExamplesSection: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const { t } = useTranslation();
  
  const uiExamples = [
    {
      title: t('uiExamples.example1.title'),
      description: t('uiExamples.example1.description'),
      image: '/이야기창작화면.png',
      icon: (
        <Palette 
          className="w-10 h-10" 
          aria-hidden="true" 
          aria-label={t('uiExamples.example1.iconTitle')} 
        />
      )
    },
    {
      title: t('uiExamples.example2.title'),
      description: t('uiExamples.example2.description'),
      image: '/앱첫화면.png',
      icon: (
        <Edit 
          className="w-10 h-10" 
          aria-hidden="true" 
          aria-label={t('uiExamples.example2.iconTitle')} 
        />
      )
    },
    {
      title: t('uiExamples.example3.title'),
      description: t('uiExamples.example3.description'),
      image: '/앱로그인화면.png',
      icon: (
        <Mic 
          className="w-10 h-10" 
          aria-hidden="true" 
          aria-label={t('uiExamples.example3.iconTitle')} 
        />
      )
    },
    {
      title: t('uiExamples.example4.title'),
      description: t('uiExamples.example4.description'),
      image: '/이야기창작화면.png', // Reusing the first image as a fallback for the 4th slide
      icon: (
        <CheckCircle 
          className="w-10 h-10" 
          aria-hidden="true" 
          aria-label={t('uiExamples.example4.iconTitle')} 
        />
      )
    }
  ];

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % uiExamples.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + uiExamples.length) % uiExamples.length);
  };

  const goToSlide = (index: number) => {
    setActiveSlide(index);
  };

  return (
    <section id="ui-examples" className="section bg-white py-16" aria-labelledby="ui-examples-title">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 id="ui-examples-title" className="text-3xl md:text-4xl font-bold mb-4">{t('uiExamples.title')}</h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            {t('uiExamples.subtitle')}
          </p>
        </div>

        <div className="bg-background-alt rounded-lg shadow-md overflow-hidden">
          {/* Carousel */}
          <div className="relative" role="region" aria-roledescription="carousel" aria-label={t('uiExamples.carousel.ariaLabel')}>
            {/* Slides */}
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${activeSlide * 100}%)` }}
                role="presentation"
              >
                {uiExamples.map((example, index) => (
                  <div 
                    key={index} 
                    id={`slide-${index}`}
                    className="w-full flex-shrink-0" 
                    role="tabpanel"
                    aria-roledescription="slide"
                    aria-label={`${example.title} ${t('uiExamples.carousel.screenExample')}`}
                    aria-hidden={activeSlide !== index}
                  >
                    <div className="p-4 sm:p-6 md:p-8 flex flex-col md:flex-row items-center">
                      {/* UI Screenshot with Next.js Image component for optimization */}
                      <div className="w-full md:w-2/3 mb-6 md:mb-0 md:pr-8">
                        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-3 sm:p-4 aspect-video relative">
                          <div className="relative w-full h-full">
                            <Image 
                              src={example.image} 
                              alt={t(`uiExamples.example${index + 1}.altText`)}
                              fill
                              sizes="(max-width: 768px) 100vw, 66vw"
                              className="object-contain p-2"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 flex items-center justify-center z-10">
                              <div className="text-center">
                                <div className="w-8 h-8 sm:w-10 sm:h-10 mx-auto">{example.icon}</div>
                                <p className="font-semibold mt-2 text-sm sm:text-base bg-white/80 px-2 py-1 rounded">{example.title} {t('uiExamples.carousel.screenExample')}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Description */}
                      <div className="w-full md:w-1/3">
                        <div className="text-primary mb-3 hidden md:block">
                          {example.icon}
                        </div>
                        <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">{example.title}</h3>
                        <p className="text-text-secondary text-sm sm:text-base mb-4 sm:mb-6">{example.description}</p>
                        
                        <div className="bg-white p-3 sm:p-4 rounded-lg border border-gray-100">
                          <h4 className="font-bold mb-1 sm:mb-2 text-sm sm:text-base">
                            {t('common.userExperience')}
                          </h4>
                          <p className="text-xs sm:text-sm text-text-secondary">
                            {t('common.interfaceDescription')}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Navigation */}
            <div className="flex justify-between items-center mt-6 sm:mt-8">
              <button 
                onClick={prevSlide} 
                className="p-2 sm:p-3 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors"
                aria-label={t('common.previousScreen')}
              >
                <ChevronLeft 
                  className="w-5 h-5 sm:w-6 sm:h-6" 
                  aria-hidden="true" 
                  aria-label={t('common.previousScreenIcon')} 
                />
              </button>
              
              {/* Dots */}
              <div className="flex space-x-3" role="tablist" aria-label={t('common.slideNavigation')}>
                {uiExamples.map((example, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full ${activeSlide === index ? 'bg-primary' : 'bg-gray-300'}`}
                    aria-label={`${t('common.goToSlide').replace('{{title}}', example.title)}`}
                    role="tab"
                    aria-selected={activeSlide === index}
                    aria-controls={`slide-${index}`}
                  />
                ))}
              </div>
              
              <button 
                onClick={nextSlide} 
                className="p-2 sm:p-3 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors"
                aria-label={t('common.nextScreen')}
              >
                <ChevronRight 
                  className="w-5 h-5 sm:w-6 sm:h-6" 
                  aria-hidden="true" 
                  aria-label={t('common.nextScreenIcon')} 
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UIExamplesSection;
