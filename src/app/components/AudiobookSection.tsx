"use client";

import React from 'react';
import Link from 'next/link';
import { useTranslation } from '../i18n/TranslationContext';
import { Mic, MessageSquare, Users, ArrowRight, Rewind, PauseCircle, FastForward, Music } from 'lucide-react';

/**
 * AudiobookSection component for the Ownabee landing page
 * Highlights the audiobook features with AI voice synthesis
 * @returns {JSX.Element} The AudiobookSection component
 */
const AudiobookSection: React.FC = () => {
  const { t } = useTranslation();
  // Define our features data structure manually since our t function doesn't support returnObjects
  const featuresData = [
    {
      title: t('audiobook.features.0.title'),
      description: t('audiobook.features.0.description'),
      iconTitle: t('audiobook.features.0.iconTitle')
    },
    {
      title: t('audiobook.features.1.title'),
      description: t('audiobook.features.1.description'),
      iconTitle: t('audiobook.features.1.iconTitle')
    },
    {
      title: t('audiobook.features.2.title'),
      description: t('audiobook.features.2.description'),
      iconTitle: t('audiobook.features.2.iconTitle')
    }
  ];
  
  // Map features to Lucide icon components
  const features = featuresData.map((feature, index) => {
    // Select the appropriate Lucide icon based on index
    let IconComponent;
    switch (index) {
      case 0:
        IconComponent = Mic;
        break;
      case 1:
        IconComponent = MessageSquare;
        break;
      case 2:
        IconComponent = Users;
        break;
      default:
        IconComponent = Mic;
    }
    
    return {
      ...feature,
      icon: (
        <div className="w-12 h-12 text-current" role="img" aria-hidden="true">
          <span className="sr-only">{feature.iconTitle}</span>
          <IconComponent className="w-full h-full" strokeWidth={2} />
        </div>
      )
    };
  });

  return (
    <section id="audiobook" className="section section-alt py-10 sm:py-12 md:py-16" aria-labelledby="audiobook-title">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          {/* Left side - Text content */}
          <div className="w-full md:w-1/2 mb-8 md:mb-0 md:pr-4 lg:pr-8">
            <h2 id="audiobook-title" className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-center md:text-left">{t('audiobook.title')}</h2>
            
            <div className="space-y-4 sm:space-y-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start">
                  <div className="mr-3 sm:mr-4 text-primary">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12">
                      {feature.icon}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2">{feature.title}</h3>
                    <p className="text-sm sm:text-base text-text-secondary">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 sm:mt-8 text-center md:text-left">
              <Link 
                href="https://app.sorisori.ai/ai-edu-demo" 
                target="_blank"
                className="btn-secondary px-4 sm:px-6 py-2 sm:py-3 rounded-full font-bold text-white inline-flex items-center text-sm sm:text-base"
                aria-label="오디오북 데모 보기 (외부 사이트로 연결)"
              >
                <span>{t('examples.viewMore')}</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" aria-hidden="true" />
              </Link>
            </div>
          </div>
          
          {/* Right side - Audio player mockup */}
          <div className="w-full md:w-1/2">
            <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 relative max-w-md mx-auto md:mx-0">
              <div className="bg-primary text-white rounded-t-lg p-3 sm:p-4 absolute top-0 left-0 right-0">
                <h3 className="font-bold text-sm sm:text-base">{t('audiobook.player.title')}</h3>
              </div>
              
              <div className="pt-12 sm:pt-16 pb-3 sm:pb-4">
                <div className="bg-background-alt rounded-lg p-4 sm:p-6 mb-4 sm:mb-6">
                  <div className="flex items-center justify-center mb-3 sm:mb-4">
                    <Music 
                      className="w-8 h-8 sm:w-10 sm:h-10 text-primary mr-2 sm:mr-3" 
                      aria-hidden="true" 
                      aria-label={t('audiobook.player.audioIcon')} 
                    />
                  </div>
                  <div className="text-center mb-3 sm:mb-4">
                    <h4 className="font-bold text-base sm:text-lg">{t('audiobook.player.storyTitle')}</h4>
                    <p className="text-text-secondary text-xs sm:text-sm">{t('audiobook.player.timeDisplay')}</p>
                  </div>
                  
                  {/* Audio controls */}
                  <div className="flex justify-center space-x-4 sm:space-x-6" role="group" aria-label={t('audiobook.player.controls')}>
                    <button 
                      className="text-text-secondary hover:text-primary"
                      aria-label={t('audiobook.player.prevTrack')}
                    >
                      <Rewind 
                        className="w-6 h-6 sm:w-8 sm:h-8" 
                        aria-hidden="true" 
                        aria-label={t('audiobook.player.prevTrackButton')} 
                      />
                    </button>
                    <button 
                      className="text-primary"
                      aria-label={t('audiobook.player.pause')}
                    >
                      <PauseCircle 
                        className="w-10 h-10 sm:w-12 sm:h-12" 
                        aria-hidden="true" 
                        aria-label={t('audiobook.player.pauseButton')} 
                        fill="currentColor" 
                      />
                    </button>
                    <button 
                      className="text-text-secondary hover:text-primary"
                      aria-label={t('audiobook.player.nextTrack')}
                    >
                      <FastForward 
                        className="w-6 h-6 sm:w-8 sm:h-8" 
                        aria-hidden="true" 
                        aria-label={t('audiobook.player.nextTrackButton')} 
                      />
                    </button>
                  </div>
                </div>
                
                <p className="text-center text-xs sm:text-sm text-text-secondary">
                  {t('audiobook.player.experienceText')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AudiobookSection;
