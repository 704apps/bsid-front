import React, { useState, useEffect } from "react";
import { TabsContent } from "@/components/ui/tabs";
import { FaImage, FaTrash, FaPlay, FaPause } from "react-icons/fa";

const StepForm = ({
  currentStep,
  steps,
  formData,
  handleInputChange,
  handleFileChange,
  handleNextStep,
  handlePrevStep,
  handleDeleteImage,
}: {
  currentStep: string;
  steps: string[];
  formData: any;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleNextStep: () => void;
  handlePrevStep: () => void;
  handleDeleteImage: (field: string) => void;
}) => {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioFile, setAudioFile] = useState<string | null>(null);

  useEffect(() => {
    if (formData.option !== "mixSound" && audio) {
      audio.pause();
      setIsPlaying(false);
    }
  }, [formData.option]);

  useEffect(() => {
    if (!formData.option) {
      handleInputChange({
        target: {
          name: "option",
          value: "mixSound",
        },
      } as React.ChangeEvent<HTMLInputElement>);
    }
  }, []);

  const handlePlayPause = () => {
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileChange(e);
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      if (audio) {
        audio.pause();
        setIsPlaying(false);
      }
      setAudio(new Audio(url));
      setAudioFile(file.name);
    }
  };

  const clearAudioFile = () => {
    if (audio) {
      audio.pause();
      setIsPlaying(false);
    }
    setAudioFile(null);
    setAudio(null);
  };

  const handleNext = () => {
    if (audio) {
      audio.pause();
      setIsPlaying(false);
    }
    handleNextStep();
  };

  const handlePrev = () => {
    if (audio) {
      audio.pause();
      setIsPlaying(false);
    }
    handlePrevStep();
  };

  return (
    <div className="p-4 w-full">
      <style jsx>{`
        input:focus,
        textarea:focus {
          outline: none;
          box-shadow: 0 0 0 1px #a0aec0;
        }
        input[type="radio"]:checked {
          accent-color: black;
        }
      `}</style>
      {steps.map((step, index) => (
        <TabsContent
          key={index}
          value={(index + 1).toString()}
          className="w-full"
        >
          {currentStep === (index + 1).toString() && (
            <div className="flex flex-col lg:flex-row lg:space-x-8 w-full">
              <div className={`flex-1 w-full lg:w-3/4`}>
                {/* Tab 1: Criar direcionamento*/}
                {index === 0 && (
                  <>
                    <label className="block text-lg font-medium mb-4 mt-4">
                      Texto a ser exibido ao usuário via Push
                    </label>
                    <div className="mb-4">
                      <label className="block text-sm font-medium">
                        Título
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm cursor-text"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium">
                        Descrição curta
                      </label>
                      <input
                        type="text"
                        name="shortDescription"
                        value={formData.shortDescription}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm cursor-text"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium">
                        Link a direcionar o usuário
                      </label>
                      <input
                        type="text"
                        name="link"
                        value={formData.link}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm cursor-text"
                        placeholder="Facebook · Instagram · WhatsApp ou site específico"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium">
                        Descrição longa
                      </label>
                      <textarea
                        name="longDescription"
                        value={formData.longDescription}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm cursor-text"
                        rows={4}
                      ></textarea>
                    </div>
                  </>
                )}

                {/* Tab 2: Mixar ao som*/}
                {index === 1 && (
                  <>
                    <div className="mb-4 w-full">
                      <label className="block text-lg mb-4 mt-4">
                        Selecionar Opção
                      </label>
                      <div className="flex flex-col space-y-4">
                        <div className="flex items-center mb-2">
                          <input
                            type="radio"
                            id="mixSound"
                            name="option"
                            value="mixSound"
                            checked={formData.option === "mixSound"}
                            onChange={(e) => {
                              handleInputChange(e);
                              clearAudioFile();
                            }}
                            className="mr-3 h-6 w-6 text-black border-gray-400"
                          />
                          <label htmlFor="mixSound" className="text-lg">
                            Escolher som para misturar (mixar apenas mp3)
                          </label>
                        </div>
                        {formData.option === "mixSound" && (
                          <div className="flex flex-col mb-4 w-full pl-9">
                            <input
                              key={audioFile || ""}
                              type="file"
                              name="audioFile"
                              accept="audio/mp3"
                              onChange={onFileChange}
                              disabled={!!audioFile}
                              className={`mt-1 block  border border-gray-300 rounded-md shadow-sm cursor-pointer ${
                                audioFile
                                  ? "text-transparent"
                                  : "text-transparent sm:text-current"
                              }`}
                            />
                            {audioFile && (
                              <div className="mt-2 text-gray-900 flex items-center">
                                <span className="flex-3 mr-2">{audioFile}</span>
                                <button
                                  onClick={clearAudioFile}
                                  className="ml-2 text-gray-700"
                                >
                                  <FaTrash />
                                </button>
                              </div>
                            )}
                            <button
                              className="flex items-center justify-center bg-gray-200 text-black py-1 px-3 rounded mt-2 w-full lg:w-1/2"
                              onClick={handlePlayPause}
                            >
                              {isPlaying ? (
                                <>
                                  <span className="mr-2">Pause</span>
                                  <FaPause className="text-lg" />
                                </>
                              ) : (
                                <>
                                  <span className="mr-2">Play</span>
                                  <FaPlay className="text-lg" />
                                </>
                              )}
                            </button>
                          </div>
                        )}
                        <div className="flex items-center">
                          <input
                            type="radio"
                            id="inactiveSignature"
                            name="option"
                            value="inactiveSignature"
                            checked={formData.option === "inactiveSignature"}
                            onChange={(e) => {
                              handleInputChange(e);
                              clearAudioFile();
                            }}
                            className="mr-3 h-6 w-6 text-black border-gray-400"
                          />
                          <label
                            htmlFor="inactiveSignature"
                            className="text-lg"
                          >
                            Apenas a assinatura inaldível
                          </label>
                        </div>
                        {formData.option === "inactiveSignature" && (
                          <div className="flex flex-col mb-4 w-full pl-9">
                            <div className="flex items-center space-x-2">
                              <div className="w-1/4">
                                <input
                                  type="number"
                                  name="audioInactiveDuration"
                                  value={formData.audioInactiveDuration}
                                  onChange={handleInputChange}
                                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm cursor-text"
                                  min="1"
                                />
                              </div>
                              <span className="text-gray-500">minutos</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                )}

                {/* Tab 3: Testar */}
                {index === 2 && (
                  <>
                    <div className="mb-4">
                      <label className="block text-lg font-medium mt-4">
                        Acione o código
                      </label>
                      <label className="text-md text-gray-500 mb-4 font-medium">
                        Provavelmente o código será inaudível ao seus ouvidos
                      </label>
                      <button
                        className="flex items-center justify-center bg-gray-200 text-black py-1 px-3 rounded mt-2 w-full lg:w-1/2"
                        onClick={handlePlayPause}
                      >
                        {isPlaying ? (
                          <>
                            <span className="mr-2">Pause</span>
                            <FaPause className="text-lg" />
                          </>
                        ) : (
                          <>
                            <span className="mr-2">Play</span>
                            <FaPlay className="text-lg" />
                          </>
                        )}
                      </button>
                    </div>
                    <div className="mb-4">
                    <label className="block text-lg font-medium mt-6">
                    Baixe o app para testar:
                      </label>
                      <a
                        href="https://www.bsid.com.br/download/appver01.apk"
                        className="text-blue-500"
                      >
                        www.bsid.com.br/download/appver01.apk
                      </a>
                    </div>
                  </>
                )}
                {/* Tab 4: Compartilhar */}
                {index === 3 && (
                  <>
                    <div className="mb-4">
                    <label className="block text-lg font-medium mt-4">
                    Salvar Arquivo | Compartilhar
                      </label>
                      <a
                        href="https://www.bsid.com.br/download/assinatura.mp3"
                        className="block text-lg font-medium mt-4 text-blue-500"
                      >
                        www.bsid.com.br/download/assinatura.mp3
                      </a>
                    </div>
                  </>
                )}
                <div className="flex space-x-4">
                  <button
                    onClick={handlePrev}
                    className="text-green-500 py-2 px-4 rounded"
                  >
                    Voltar
                  </button>
                  <button
                    onClick={handleNext}
                    className="bg-green-500 text-white py-2 px-4 rounded"
                  >
                    Avançar
                  </button>
                </div>
              </div>
              <div
                className={`flex-1 ${index === 0 ? "lg:w-1/4" : "lg:w-1/5"}`}
              >
                {index === 0 && (
                  <>
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-6 ml-4">
                        Imagens
                      </label>
                      <div className="flex space-x-4 ml-4">
                        <div className="relative w-24 h-24 bg-gray-200 flex flex-col items-center justify-center border border-gray-300 rounded-full shadow-sm hover:cursor-pointer">
                          {formData.logoPreview ? (
                            <img
                              src={formData.logoPreview}
                              alt="Logo Preview"
                              className="w-full h-full object-cover rounded-full"
                              style={{ aspectRatio: "1 / 1" }}
                            />
                          ) : (
                            <>
                              <FaImage className="text-3xl text-gray-700" />
                              <span className="text-xs mt-2">50 x 50</span>
                            </>
                          )}
                          <input
                            type="file"
                            name="logo"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="absolute opacity-0 w-full h-full cursor-pointer"
                          />
                          {formData.logoPreview && (
                            <button
                              type="button"
                              className="absolute top-1 right-1 bg-white text-gray-700 rounded-full p-1 shadow"
                              onClick={() => handleDeleteImage("logo")}
                            >
                              <FaTrash />
                            </button>
                          )}
                        </div>
                        <div className="relative w-48 h-24 bg-gray-200 flex flex-col items-center justify-center border border-gray-300 rounded-md shadow-sm hover:cursor-pointer">
                          {formData.bannerPreview ? (
                            <img
                              src={formData.bannerPreview}
                              alt="Banner Preview"
                              className="w-full h-full object-cover rounded-md"
                            />
                          ) : (
                            <>
                              <FaImage className="text-3xl text-gray-700" />
                              <span className="text-xs mt-2">150 x 80px</span>
                            </>
                          )}
                          <input
                            type="file"
                            name="banner"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="absolute opacity-0 w-full h-full cursor-pointer"
                          />
                          {formData.bannerPreview && (
                            <button
                              type="button"
                              className="absolute top-1 right-1 bg-white text-gray-700 rounded-full p-1 shadow"
                              onClick={() => handleDeleteImage("banner")}
                            >
                              <FaTrash />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </TabsContent>
      ))}
    </div>
  );
};

export default StepForm;
