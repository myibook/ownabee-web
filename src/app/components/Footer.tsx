'use client';

import { useTranslation } from '../i18n/TranslationContext';
import { Facebook, Instagram, Twitter } from 'lucide-react';

/**
 * Footer component for the Ownabee landing page
 * Contains navigation links, contact information, and social media links
 * @returns {JSX.Element} Footer component with navigation links and copyright information
 */
export default function Footer() {
  const { t } = useTranslation();
  
  return (
    <footer className="bg-gray-900 text-white py-8 sm:py-10 md:py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-6 sm:mb-8 md:mb-0">
            <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Ownabee</h3>
            <p className="text-gray-400 max-w-md text-sm sm:text-base">
              {t('footer.tagline')}
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            <div>
              <h4 className="font-bold text-sm sm:text-base mb-3 sm:mb-4">{t('footer.services.title')}</h4>
              <ul className="space-y-1 sm:space-y-2">
                <li><a href="#journey" className="text-gray-400 hover:text-white text-xs sm:text-sm">{t('footer.services.howToUse')}</a></li>
                <li><a href="#examples" className="text-gray-400 hover:text-white text-xs sm:text-sm">{t('footer.services.useCases')}</a></li>
                <li><a href="#tech" className="text-gray-400 hover:text-white text-xs sm:text-sm">{t('footer.services.technology')}</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-sm sm:text-base mb-3 sm:mb-4">{t('footer.company.title')}</h4>
              <ul className="space-y-1 sm:space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white text-xs sm:text-sm">{t('footer.company.about')}</a></li>
                <li><a href="#roadmap" className="text-gray-400 hover:text-white text-xs sm:text-sm">{t('footer.company.roadmap')}</a></li>
                <li><a href="#collaboration" className="text-gray-400 hover:text-white text-xs sm:text-sm">{t('footer.company.collaboration')}</a></li>
              </ul>
            </div>
            
            <div className="col-span-2 md:col-span-1 mt-4 md:mt-0">
              <h4 className="font-bold text-sm sm:text-base mb-3 sm:mb-4">{t('footer.contact.title')}</h4>
              <ul className="space-y-1 sm:space-y-2">
                <li className="text-gray-400 text-xs sm:text-sm">contact@ownabee.com</li>
                <li className="text-gray-400 text-xs sm:text-sm">010-1234-5678</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 sm:mt-10 md:mt-12 pt-6 sm:pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-xs sm:text-sm mb-4 md:mb-0">{t('footer.copyright')}</p>
          <div className="flex space-x-3 sm:space-x-4">
            <a href="#" className="text-gray-400 hover:text-white">
              <span className="sr-only">{t('footer.social.facebook')}</span>
              <Facebook className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <span className="sr-only">{t('footer.social.instagram')}</span>
              <Instagram className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <span className="sr-only">{t('footer.social.twitter')}</span>
              <Twitter className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
