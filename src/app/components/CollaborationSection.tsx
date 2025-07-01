"use client";

import React from 'react';
import { useTranslation } from '../i18n/TranslationContext';
import { Users, Check, Mail, Phone } from './ui/icons';

/**
 * CollaborationSection component for the Ownabee landing page
 * Contains a call-to-action for collaboration requests
 * @returns {JSX.Element} The CollaborationSection component
 */
const CollaborationSection: React.FC = () => {
  const { t } = useTranslation();
  return (
    <section id="collaboration" className="section bg-white py-10 sm:py-12 md:py-16" aria-labelledby="collaboration-title">
      <div className="container mx-auto px-4">
        <div className="bg-primary/10 rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Left side - Content */}
            <div className="md:w-3/5 p-5 sm:p-6 md:p-8 lg:p-12">
              <h2 id="collaboration-title" className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-5 md:mb-6">{t('collaboration.title')}</h2>
              <p className="text-base sm:text-lg mb-6 sm:mb-7 md:mb-8">
                {t('collaboration.subtitle')}<br className="hidden sm:block" />
                {t('collaboration.description')}
              </p>
              
              <div className="bg-white p-4 sm:p-5 md:p-6 rounded-lg shadow-sm mb-6 sm:mb-7 md:mb-8">
                <h3 className="font-bold text-lg sm:text-xl mb-3 sm:mb-4">{t('collaboration.areas.title')}</h3>
                <ul className="space-y-2 sm:space-y-3">
                  {[
                    t('collaboration.areas.item1'),
                    t('collaboration.areas.item2'),
                    t('collaboration.areas.item3'),
                    t('collaboration.areas.item4')
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <div className="mr-2 sm:mr-3 mt-1 text-primary">
                        <Check className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
                      </div>
                      <span className="text-sm sm:text-base">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <h3 id="form-title" className="sr-only">{t('collaboration.form.title')}</h3>
              <form className="space-y-3 sm:space-y-4" aria-labelledby="form-title" role="form">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label htmlFor="name" className="block text-xs sm:text-sm font-medium mb-1">{t('collaboration.form.nameLabel')}</label>
                    <input 
                      type="text" 
                      id="name" 
                      className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                      placeholder={t('collaboration.form.namePlaceholder')}
                      required
                      aria-required="true"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs sm:text-sm font-medium mb-1">{t('collaboration.form.emailLabel')}</label>
                    <input 
                      type="email" 
                      id="email" 
                      className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                      placeholder="example@email.com"
                      required
                      aria-required="true"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-xs sm:text-sm font-medium mb-1">{t('collaboration.form.subjectLabel')}</label>
                  <input 
                    type="text" 
                    id="subject" 
                    className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    placeholder={t('collaboration.form.subjectPlaceholder')}
                    required
                    aria-required="true"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-xs sm:text-sm font-medium mb-1">{t('collaboration.form.messageLabel')}</label>
                  <textarea 
                    id="message" 
                    rows={4} 
                    className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    placeholder={t('collaboration.form.messagePlaceholder')}
                    required
                    aria-required="true"
                  ></textarea>
                </div>
                
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="privacy" 
                    className="mr-2 h-3 w-3 sm:h-4 sm:w-4" 
                    required 
                    aria-required="true"
                  />
                  <label htmlFor="privacy" className="text-xs sm:text-sm">{t('collaboration.form.privacyLabel')}</label>
                </div>
                
                <button 
                  type="submit" 
                  className="btn-primary w-full py-2 sm:py-3 rounded-lg font-bold text-white text-sm sm:text-base mt-2"
                  aria-label="협업 문의 양식 제출"
                >
                  {t('collaboration.form.submitButton')}
                </button>
              </form>
            </div>
            
            {/* Right side - Image/Illustration - hidden on mobile, visible on md and up */}
            <div className="md:w-2/5 bg-secondary/10 relative hidden md:block">
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Collaboration illustration with Next.js Image component for optimization */}
                <div className="relative w-full h-full p-6 md:p-8">
                  <div className="flex items-center justify-center w-full h-full">
                    <Users size={180} className="text-primary" aria-hidden="true" />
                  </div>
                </div>
                <div className="absolute bottom-6 md:bottom-8 left-0 right-0 text-center bg-white/80 mx-6 md:mx-8 py-3 rounded-lg shadow-sm">
                  <h3 className="text-xl sm:text-2xl font-bold mb-2">{t('collaboration.growTogether.title')}</h3>
                  <p className="text-sm sm:text-base text-text-secondary">
                    {t('collaboration.growTogether.description1')}<br />
                    {t('collaboration.growTogether.description2')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-10 sm:mt-12 md:mt-16 text-center">
          <h3 id="quick-contact-title" className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">{t('collaboration.quickContact.title')}</h3>
          <div className="flex flex-col md:flex-row justify-center gap-3 sm:gap-4 md:gap-8" aria-labelledby="quick-contact-title">
            <a href="mailto:info@ownabee.com" className="flex items-center justify-center bg-white p-3 sm:p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow" aria-label={t('collaboration.quickContact.emailAriaLabel')}>
              <Mail className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-primary" aria-hidden="true" />
              <span className="text-sm sm:text-base">info@ownabee.com</span>
            </a>
            <a href="tel:+8210-1234-5678" className="flex items-center justify-center bg-white p-3 sm:p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow" aria-label={t('collaboration.quickContact.phoneAriaLabel')}>
              <Phone className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-primary" aria-hidden="true" />
              <span className="text-sm sm:text-base">010-1234-5678</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CollaborationSection;
