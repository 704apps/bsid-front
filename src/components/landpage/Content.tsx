import Link from 'next/link';

interface ContentProps {
  showContent: boolean;
}

const Content: React.FC<ContentProps> = ({ showContent }) => {
  return (
    <>
      {showContent && (
        <div className="flex justify-center mt-8 fade-in">
          <Link href="/login">
            <div className="bg-gray-500 text-white px-6 py-3 mb-8 rounded-lg text-lg font-semibold hover:bg-gray-600 transition-colors duration-300 cursor-pointer">
              CRIE SEU BS ID GRATUITAMENTE
            </div>
          </Link>
        </div>
      )}
    </>
  );
};

export default Content;
