"use client";

import React from 'react';
import { useTranslation } from '../i18n/TranslationContext';
import { Kanban, Archive, Share2, Lightbulb } from 'lucide-react';

/**
 * RoadmapSection component for the Ownabee landing page
 * Shows the future development plans for Ownabee
 * @returns {JSX.Element} The RoadmapSection component
 */
const RoadmapSection: React.FC = () => {
  const { t } = useTranslation();
  const roadmapItems = [
    {
      title: t('roadmap.item1.title'),
      description: t('roadmap.item1.description'),
      icon: (
        <div className="w-10 h-10" role="img" aria-hidden="true">
          <span className="sr-only">{t('roadmap.item1.iconTitle')}</span>
          <Kanban className="w-full h-full" strokeWidth={2} />
        </div>
      ),
      timeline: 'Q3 2025'
    },
    {
      title: t('roadmap.item2.title'),
      description: t('roadmap.item2.description'),
      icon: (
        <div className="w-10 h-10" role="img" aria-hidden="true">
          <span className="sr-only">{t('roadmap.item2.iconTitle')}</span>
          <Archive className="w-full h-full" strokeWidth={2} />
        </div>
      ),
      timeline: 'Q4 2025'
    },
    {
      title: t('roadmap.item3.title'),
      description: t('roadmap.item3.description'),
      icon: (
        <div className="w-10 h-10" role="img" aria-hidden="true">
          <span className="sr-only">{t('roadmap.item3.iconTitle')}</span>
          <Share2 className="w-full h-full" strokeWidth={2} />
        </div>
      ),
      timeline: 'Q1 2026'
    }
  ];

  return (
    <section id="roadmap" className="section section-alt py-10 sm:py-12 md:py-16" aria-labelledby="roadmap-title">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 id="roadmap-title" className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">{t('roadmap.title')}</h2>
          <p className="text-base sm:text-lg text-text-secondary max-w-3xl mx-auto px-2">
            {t('roadmap.subtitle')}
          </p>
        </div>

        <div className="relative">
          {/* Timeline line - hidden on mobile, visible on md and up */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-primary/20 -translate-x-1/2"></div>
          
          <div className="space-y-8 sm:space-y-10 md:space-y-12 relative">
            {roadmapItems.map((item, index) => (
              <div key={index} className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center`}>
                {/* Timeline dot - hidden on mobile, visible on md and up */}
                <div className="hidden md:block absolute left-1/2 -translate-x-1/2 w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 rounded-full bg-primary"></div>
                
                {/* Content */}
                <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:pr-8 lg:pr-12 md:text-right' : 'md:pl-8 lg:pl-12'}`}>
                  <div className={`bg-white p-4 sm:p-5 md:p-6 rounded-lg shadow-sm ${index % 2 === 0 ? 'md:rounded-r-none' : 'md:rounded-l-none'}`}>
                    <div className={`flex items-center mb-3 sm:mb-4 ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                      <div className="text-primary mr-3 md:order-2">
                        <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10">
                          {item.icon}
                        </div>
                      </div>
                      <h3 className={`text-lg sm:text-xl font-bold ${index % 2 === 0 ? 'md:order-1' : ''}`}>{item.title}</h3>
                    </div>
                    <p className="text-sm sm:text-base text-text-secondary mb-3 sm:mb-4">{item.description}</p>
                    <div className={`inline-block bg-primary/10 px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-semibold text-primary ${index % 2 === 0 ? 'md:ml-auto' : ''}`}>
                      {item.timeline}
                    </div>
                  </div>
                </div>
                
                {/* Empty space for timeline layout - hidden on mobile, visible on md and up */}
                <div className="hidden md:block md:w-5/12"></div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-10 sm:mt-12 md:mt-16 bg-white p-5 sm:p-6 md:p-8 rounded-lg shadow-sm" aria-labelledby="innovation-title">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/4 mb-5 sm:mb-6 md:mb-0 flex justify-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-secondary/20 flex items-center justify-center">
                <Lightbulb 
                  className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-secondary" 
                  aria-hidden="true" 
                  aria-label={t('roadmap.innovationIconTitle')} 
                  strokeWidth={2} 
                />
              </div>
            </div>
            
            <div className="md:w-3/4 md:pl-6 lg:pl-8 text-center md:text-left">
              <h3 id="innovation-title" className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">{t('roadmap.innovation.title')}</h3>
              <p className="text-sm sm:text-base text-text-secondary mb-3 sm:mb-4">
                {t('roadmap.innovation.description')}
              </p>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-2 sm:gap-3">
                <span className="bg-primary/10 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm text-primary">{t('roadmap.tag1')}</span>
                <span className="bg-primary/10 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm text-primary">{t('roadmap.tag2')}</span>
                <span className="bg-primary/10 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm text-primary">{t('roadmap.tag3')}</span>
                <span className="bg-primary/10 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm text-primary">{t('roadmap.tag4')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoadmapSection;
