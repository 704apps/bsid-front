import React from "react";
import PreviewCard from "@/app/components/dashboard/previewCard";
import PhoneMockup from "@/app/components/dashboard/phoneMockup";

const Preview = ({ formData }: { formData: any }) => {
  return (
    <div className="top-0 mt-4 flex flex-col items-center w-full">
      <div className="text-center mb-2 text-lg">Preview</div>
      <div className="w-full border-b-2 border-gray-300 mb-4"></div>
      <div className="p-4 w-full max-w-5xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:space-x-4 w-full">
          <div className="w-full lg:w-6/12">
            <PreviewCard formData={formData} isSmallerDesktop />
          </div>
          <div className="w-full lg:w-6/12">
            <PhoneMockup formData={formData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preview;
