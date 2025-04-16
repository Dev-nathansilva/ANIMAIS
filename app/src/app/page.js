"use client";

import { useState } from "react";
import Image from "next/image";
import { BiSend } from "react-icons/bi";
import Perguntas from "@/components/Perguntas";
import FormularioFinal from "@/components/FormularioFinal";

export default function Home() {
  const [start, setStart] = useState(false);
  const [finalizado, setFinalizado] = useState(false);
  const [resultado, setResultado] = useState(null);

  const handleFinalizar = (dados) => {
    setResultado(dados);
    setFinalizado(true);
  };

  return (
    <>
      {!start ? (
        <div className="banner-home min-h-screen bg-black flex flex-col items-center justify-center px-4 text-center">
          <div className="w-[360px] sm:w-[1100px]">
            <div className="flex flex-col items-center sm:items-start text-center  sm:text-start">
              <Image
                src="/logo-completa-colorido.png"
                alt="Logo"
                width={198}
                height={198}
                className="mb-6"
              />
              <h1 className="text-3xl font-bold mb-4 text-white leading-[40px] w-[300px] ">
                Avaliação de Perfil Comportamental
              </h1>
              <p className="text-[14px] text-gray-400 mb-6 w-[300px] sm:w-[450px]">
                Estudos da Harvard Business Review mostram que o
                autoconhecimento é uma das principais competências de líderes de
                alta performance.
              </p>
              <h2 className="text-xl font-semibold mb-6 text-white w-[300px] sm:w-[450px]">
                Você está pronta(o) para conhecer seu perfil comportamental
                predominante?
              </h2>
              <button
                onClick={() => setStart(true)}
                className="flex gap-3 items-center bg-gray-300 text-black px-6 py-3 rounded-lg shadow hover:bg-gray-400 cursor-pointer font-semibold transition"
              >
                Iniciar agora
                <BiSend />
              </button>
            </div>
          </div>
        </div>
      ) : finalizado ? (
        <FormularioFinal resultado={resultado} />
      ) : (
        <Perguntas onFinalizar={handleFinalizar} />
      )}
    </>
  );
}
