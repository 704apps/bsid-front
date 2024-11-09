interface MainMessageProps {
  showContent: boolean;
}

const MainMessage: React.FC<MainMessageProps> = ({ showContent }) => {
  return (
    <>
      {showContent && (
        <div className="w-full max-w-4xl px-4 sm:px-4 py-6 sm:py-12 text-center fade-in">
          <h2 className="text-4xl sm:text-3xl text-white mb-6 sm:mb-12">
            Faça barulho com sua assinatura de áudio inaudível
          </h2>
        </div>
      )}
    </>
  );
};

export default MainMessage;
