"use client";

import { useState } from "react";
import { Tabs } from "@/components/ui/tabs";
import ProtectedRoute from "@/app/hoc/protectedroute";
import { resizeImage } from "@/util/imageResize";
import ProgressBar from "@/app/components/dashboard/createAudioSignature/progressBar";
import StepForm from "@/app/components/dashboard/createAudioSignature/stepForm";
import Preview from "@/app/components/dashboard/createAudioSignature/preview";
import Footer from '@/app/components/common/footer';
import { Navigation } from '@/app/components/common/navigation';

const steps = ["Criar Direcionamento", "Mixar ao som", "Testar", "Compartilhar"];

const createAudioSignature = () => {
  const [currentStep, setCurrentStep] = useState<string>("1");
  const [formData, setFormData] = useState({
    title: "",
    shortDescription: "",
    link: "",
    longDescription: "",
    audioFile: null,
    audioInactiveDuration: 2,
    logo: null,
    banner: null,
    logoPreview: null,
    bannerPreview: null,
  });

  const handleNextStep = () => {
    if (parseInt(currentStep) < steps.length) {
      setCurrentStep((parseInt(currentStep) + 1).toString());
    }
  };

  const handlePrevStep = () => {
    if (parseInt(currentStep) > 1) {
      setCurrentStep((parseInt(currentStep) - 1).toString());
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      const size = name === "logo" ? 200 : 900;
      const height = name === "logo" ? 200 : 481;
      const resizedFile = await resizeImage(files[0], size, height, name === "logo");

      setFormData((prevData) => ({
        ...prevData,
        [name]: resizedFile,
        [`${name}Preview`]: URL.createObjectURL(resizedFile),
      }));
    }
  };

  const handleDeleteImage = (field: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: null,
      [`${field}Preview`]: null,
    }));
  };

  return (
    <ProtectedRoute>
      <Navigation />
      <div className="min-h-screen flex flex-col">
        <div className="flex-grow flex flex-col items-center bg-white p-4">
          <h1 className="text-4xl font-bold mb-8 mt-8 w-full text-left sm:text-center md:text-left" style={{ fontSize: 'calc(1rem + 1vw)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            BSID - Crie sua assinatura de áudio
          </h1>
          <div className="flex flex-col lg:flex-row w-full gap-4 flex-grow">
            <div className="w-full lg:w-7/10 flex-grow p-4 bg-white rounded-lg h-full">
              <Tabs
                value={currentStep}
                onValueChange={(value) => setCurrentStep(value)}
                className="w-full h-full"
              >
                <ProgressBar step={parseInt(currentStep)} steps={steps} />
                <StepForm
                  currentStep={currentStep}
                  steps={steps}
                  formData={formData}
                  handleInputChange={handleInputChange}
                  handleFileChange={handleFileChange}
                  handleNextStep={handleNextStep}
                  handlePrevStep={handlePrevStep}
                  handleDeleteImage={handleDeleteImage}
                />
              </Tabs>
            </div>
            <div className="w-full lg:w-3/10 flex-grow p-4 bg-white rounded-lg flex flex-col h-full">
              <Tabs value="preview" className="w-full flex-grow h-full">
                <Preview formData={formData} />
              </Tabs>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </ProtectedRoute>
  );
};

export default createAudioSignature;
