import React from "react";
import PreviewCard from "@/app/components/dashboard/createAudioSignature/previewCard";
import PhoneMockup from "@/app/components/dashboard/createAudioSignature/phoneMockup";

const Preview = ({ formData }: { formData: any }) => {
  return (
    <div className="top-0 mt-4 flex flex-col items-center w-full h-full">
      <div className="text-center mb-2 text-lg">Preview</div>
      <div className="w-full border-b-2 border-gray-300 mb-4"></div>
      <div className="p-4 w-full max-w-5xl mx-auto flex-grow h-full">
        <div className="flex flex-col lg:flex-row lg:space-x-4 w-full h-full">
          <div className="w-full lg:w-6/12 h-full">
            <PreviewCard formData={formData} isSmallerDesktop />
          </div>
          <div className="w-full lg:w-6/12 h-full flex-grow">
            <PhoneMockup formData={formData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preview;
