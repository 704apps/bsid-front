import React from 'react';
import { FaImage } from 'react-icons/fa';

interface PreviewCardProps {
  formData: {
    logoPreview?: string;
    title?: string;
    shortDescription?: string;
    link?: string;
    bannerPreview?: string;
  };
  isSmall?: boolean;
  isSmallerDesktop?: boolean;
  isMockPhone?: boolean;
}

const PreviewCard: React.FC<PreviewCardProps> = ({ formData, isSmall, isSmallerDesktop, isMockPhone }) => {
  return (
    <div className={`relative w-full bg-gray-200 p-4 rounded-md flex flex-col overflow-hidden ${isSmall ? 'text-xs' : isSmallerDesktop ? 'text-sm lg:text-base' : 'text-sm lg:text-base'} ${isMockPhone ? 'text-lg' : ''}`} style={{ height: 'auto', minHeight: '180px', margin: '0 auto' }}>
      <div className="flex flex-col flex-grow">
        <div className="flex w-full items-center justify-start mb-4 flex-wrap">
          {formData.logoPreview ? (
            <img
              src={formData.logoPreview}
              alt="Logo"
              className={`rounded-full object-cover mr-4 ${isSmall ? 'w-8 h-8' : 'w-12 h-12'} ${isSmallerDesktop && !isSmall ? 'lg:w-10 lg:h-10' : ''}`}
            />
          ) : (
            <div className={`bg-gray-300 flex items-center justify-center rounded-full ${isSmall ? 'w-8 h-8' : 'w-12 h-12'} mr-4 ${isSmallerDesktop && !isSmall ? 'lg:w-10 lg:h-10' : ''}`}>
              <FaImage className={`${isSmall ? 'text-sm' : 'text-lg'}`} />
            </div>
          )}
          <div className="flex-1 overflow-hidden">
            <p className={`font-bold break-words ${isMockPhone ? 'text-2xl' : ''}`}>{formData.title || "Título"}</p>
            <p className={`break-words ${isMockPhone ? 'text-xl' : ''}`}>{formData.shortDescription || "Descrição curta"}</p>
            {formData.link ? (
              <a href={formData.link} className={`text-blue-500 break-words ${isMockPhone ? 'text-xl' : ''}`} target="_blank" rel="noopener noreferrer">
                {formData.link}
              </a>
            ) : (
              <p className={`text-blue-500 break-words ${isMockPhone ? 'text-xl' : ''}`}>https://www.link-do-site.com</p>
            )}
          </div>
        </div>
        <div className="relative w-full h-0 flex-grow pb-[53.33%]">
          {formData.bannerPreview ? (
            <img
              src={formData.bannerPreview}
              alt="Banner"
              className="absolute inset-0 w-full h-full rounded-md object-cover"
            />
          ) : (
            <div className="absolute inset-0 bg-gray-300 flex items-center justify-center rounded-md">
              <FaImage className={`${isMockPhone ? 'text-3xl' : 'text-2xl'}`} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PreviewCard;