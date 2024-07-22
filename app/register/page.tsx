"use client";

import Image from "next/image";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Footer from '../components/common/footer';
import { useRouter } from 'next/navigation';

export default function Register() {
	const [showPassword, setShowPassword] = useState(false);
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const router = useRouter();

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	const handleRegister = () => {
		const userData = { name, email, password };
		localStorage.setItem('user', JSON.stringify(userData));
		router.push('/login');
	};

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			handleRegister();
		}
	};

	return (
		<div className="bg-gradient-to-tl from-white via-gray-100 to-white shadow-lg min-h-screen flex flex-col">
			<div className="flex-grow flex flex-col items-center justify-center px-4 md:px-0">
				<div className="flex flex-col items-center justify-center w-full max-w-sm py-2">
					<div className="flex flex-col items-center mb-8">
						<Image
							src="/logo.png"
							alt="BSID Logo"
							width={150}
							height={150}
						/>
					</div>
					<div className="w-full space-y-4 flex flex-col items-center">
						<h2 className="text-2xl text-center font-semibold text-black mb-6">
							REGISTRE-SE!
						</h2>
						<input
							type="text"
							placeholder="Nome Completo"
							value={name}
							onChange={(e) => setName(e.target.value)}
							className="w-3/4 md:w-full p-3 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-black"
							onKeyDown={handleKeyDown}
						/>
						<input
							type="email"
							placeholder="Endereço de e-mail"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="w-3/4 md:w-full p-3 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-black"
							onKeyDown={handleKeyDown}
						/>
						<div className="relative w-3/4 md:w-full">
							<input
								type={showPassword ? "text" : "password"}
								placeholder="Senha"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className="w-full p-3 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-black"
								onKeyDown={handleKeyDown}
							/>
							<button
								type="button"
								onClick={togglePasswordVisibility}
								className="absolute right-3 top-3"
							>
								{showPassword ? (
									<EyeOff className="w-6 h-6 text-gray-600" />
								) : (
									<Eye className="w-6 h-6 text-gray-600" />
								)}
							</button>
						</div>
						<button
							onClick={handleRegister}
							className="w-3/4 md:w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition duration-200"
						>
							Registrar
						</button>
						<div className="text-center mt-4">
							<span className="text-gray-600">Já tem uma conta? </span>
							<a href="/login" className="text-black font-semibold">
								Login
							</a>
						</div>
						<div className="flex items-center my-4 w-3/4 md:w-full">
							<hr className="flex-grow border-t border-gray-300" />
							<span className="mx-2 text-gray-500">OU</span>
							<hr className="flex-grow border-t border-gray-300" />
						</div>
						<button className="w-3/4 md:w-full flex items-center justify-center border border-black py-3 rounded-md hover:bg-gray-100 transition duration-200 text-sm md:text-base">
							<div className="flex items-center justify-center">
								<Image
									src="/gmail.png"
									alt="Google"
									width={24}
									height={24}
									className="mr-2"
								/>
								<span>Continuar com Google</span>
							</div>
						</button>
						<button className="w-3/4 md:w-full flex items-center justify-center border border-black py-3 rounded-md hover:bg-gray-100 transition duration-200 text-sm md:text-base">
							<div className="flex items-center justify-center">
								<Image
									src="/microsoft.png"
									alt="Microsoft"
									width={24}
									height={24}
									className="mr-2"
								/>
								<span>Continuar com Microsoft Account</span>
							</div>
						</button>
						<button className="w-3/4 md:w-full flex items-center justify-center border border-black py-3 rounded-md hover:bg-gray-100 transition duration-200 text-sm md:text-base">
							<div className="flex items-center justify-center">
								<Image
									src="/apple.png"
									alt="Apple"
									width={24}
									height={24}
									className="mr-2"
								/>
								<span>Continuar com Apple</span>
							</div>
						</button>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
}
