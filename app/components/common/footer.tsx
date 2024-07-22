import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-black text-white text-xs md:text-sm w-full">
            <div className="container mx-auto py-4 flex flex-col md:flex-row justify-between items-center">
                <div className="mb-4 md:mb-0 text-center md:text-left">
                    <p>BSID - BACKGROUND SOUND IDENTIFY</p>
                    <p>CNPJ: 01.000.000/0001-00</p>
                    <p>Patente registro: 12454/2023</p>
                </div>
                <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-8 mb-4 md:mb-0 text-center md:text-left">
                    <div className="flex flex-col">
                        <a href="#">Sobre dados e impulsionamentos</a>
                        <a href="#">Publicidade impulsionada</a>
                        <a href="#">Parcerias</a>
                    </div>
                    <div className="flex flex-col">
                        <a href="#">Manual de uso e suporte</a>
                        <a href="#">Documentação para integração</a>
                        <a href="#">Termos de uso e Políticas de privacidade</a>
                    </div>
                    <div className="flex flex-col">
                        <a href="#">BSID na mídia</a>
                        <a href="#">Canal do Youtube</a>
                        <a href="#">Instagram</a>
                    </div>
                </div>
                <div className="text-center md:text-right">
                    <p>Fale conosco</p>
                    <p>contato@bsid.com.br</p>
                    <p>85 - 99285.0808</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
