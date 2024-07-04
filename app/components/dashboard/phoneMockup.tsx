import React from 'react';
import PreviewCard from "@/app/components/dashboard/previewCard";

interface PhoneMockupProps {
  formData: {
    logoPreview?: string;
    title?: string;
    shortDescription?: string;
    link?: string;
    bannerPreview?: string;
  };
}

const PhoneMockup: React.FC<PhoneMockupProps> = ({ formData }) => {
  return (
    <div className="relative w-full h-auto flex items-center justify-center">
      <img
        src="/celular.png"
        alt="Phone Mockup"
        className="w-full h-auto"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="transform scale-50 sm:scale-75 md:scale-75 lg:scale-50 xl:scale-50 w-full max-w-xs md:max-w-sm lg:max-w-md">
          <PreviewCard formData={formData} isSmall isMockPhone />
        </div>
      </div>
    </div>
  );
};

export default PhoneMockup;
