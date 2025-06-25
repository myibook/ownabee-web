"use client";

import React from 'react';
import Link from 'next/link';
import { useTranslation } from '../i18n/TranslationContext';

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
  
  const iconPaths = [
    "M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z",
    "M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z",
    "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
  ];
  
  const features = featuresData.map((feature, index) => ({
    ...feature,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-12 h-12" role="img" aria-hidden="true">
        <title>{feature.iconTitle}</title>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={iconPaths[index]} />
      </svg>
    )
  }));

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
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 sm:w-5 sm:h-5 ml-2" role="img" aria-hidden="true">
                  <title>외부 링크</title>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
          
          {/* Right side - Audio player mockup */}
          <div className="w-full md:w-1/2">
            <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 relative max-w-md mx-auto md:mx-0">
              <div className="bg-primary text-white rounded-t-lg p-3 sm:p-4 absolute top-0 left-0 right-0">
                <h3 className="font-bold text-sm sm:text-base">오디오북 플레이어</h3>
              </div>
              
              <div className="pt-12 sm:pt-16 pb-3 sm:pb-4">
                <div className="bg-background-alt rounded-lg p-4 sm:p-6 mb-4 sm:mb-6">
                  <div className="flex justify-center mb-3 sm:mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-12 h-12 sm:w-16 sm:h-16 text-primary" role="img" aria-hidden="true">
                      <title>오디오북 아이콘</title>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                    </svg>
                  </div>
                  <div className="text-center mb-3 sm:mb-4">
                    <h4 className="font-bold text-base sm:text-lg">우리 아이의 목소리로 읽어주는 동화</h4>
                    <p className="text-text-secondary text-xs sm:text-sm">00:45 / 03:22</p>
                  </div>
                  
                  {/* Audio controls */}
                  <div className="flex justify-center space-x-4 sm:space-x-6" role="group" aria-label="오디오 재생 컨트롤">
                    <button 
                      className="text-text-secondary hover:text-primary"
                      aria-label="이전 트랙"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 sm:w-8 sm:h-8" role="img" aria-hidden="true">
                        <title>이전 트랙 버튼</title>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0019 16V8a1 1 0 00-1.6-.8l-5.333 4zM4.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0011 16V8a1 1 0 00-1.6-.8l-5.334 4z" />
                      </svg>
                    </button>
                    <button 
                      className="text-primary"
                      aria-label="일시정지"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-10 h-10 sm:w-12 sm:h-12" role="img" aria-hidden="true">
                        <title>일시정지 버튼</title>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </button>
                    <button 
                      className="text-text-secondary hover:text-primary"
                      aria-label="다음 트랙"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 sm:w-8 sm:h-8" role="img" aria-hidden="true">
                        <title>다음 트랙 버튼</title>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.933 12.8a1 1 0 000-1.6L6.6 7.2A1 1 0 005 8v8a1 1 0 001.6.8l5.333-4zM19.933 12.8a1 1 0 000-1.6l-5.333-4A1 1 0 0013 8v8a1 1 0 001.6.8l5.333-4z" />
                      </svg>
                    </button>
                  </div>
                </div>
                
                <p className="text-center text-xs sm:text-sm text-text-secondary">
                  BeeGM AI 기술로 구현된 자연스러운 음성 합성 기술을 체험해보세요.
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
