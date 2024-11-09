interface DescriptionProps {
  showContent: boolean;
}

const Description: React.FC<DescriptionProps> = ({ showContent }) => {
  return (
    <>
      {showContent && (
        <div className={`flex flex-col items-center justify-center w-full max-w-4xl px-4 py-8 transition-opacity duration-1000 md:flex-row md:justify-center fade-in`}>
          <div className="w-full md:w-2/5 md:mr-4 flex justify-center md:justify-end">
            <img
              src="/images/mock-mobile.png"
              alt="Mockup"
              className="object-cover w-full h-auto rounded-lg shadow-lg"
            />
          </div>
          <div className="w-full md:w-3/5 flex flex-col justify-center">
            <div className="flex flex-col md:ml-4 px-4 md:px-0">
              <h2 className="mb-6 text-4xl text-white font-bold">Mil possibilidades</h2>
              <p className="text-xl mb-4 text-zinc-400 text-justify">
                Uso para publicidades, palestras e treinamentos, acessibilidade de deficientes visuais.
              </p>
              <p className="text-sm mt-4 text-zinc-400 text-justify">
                Assinatura de áudio inaudível aos ouvidos humanos, sua nova forma de impactar e fazer conexões
                usando a tecnologia mais moderna e revolucionária de linkagem, surpreenda a todos usando o BSID
                como meio de compartilhamento e acesso ao seu perfil, conteúdo e outras centenas de possibilidades.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Description;
