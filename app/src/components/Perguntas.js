"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

const perguntas = [
  {
    id: 1,
    texto: "Eu sou...",
    opcoes: [
      { label: "Idealista, criativo e visionário", value: "I" },
      { label: "Divertido, espirituoso e benéfico", value: "C" },
      { label: "Confiável, meticuloso e previsível", value: "O" },
      { label: "Focado, determinado e persistente", value: "A" },
    ],
  },
  {
    id: 2,
    texto: "Eu gosto de ...",
    opcoes: [
      { label: "Ser piloto", value: "A" },
      { label: "Conversar com os passageiros", value: "C" },
      { label: "Planejar a viagem", value: "O" },
      { label: "Explorar novas rotas", value: "I" },
    ],
  },
  {
    id: 3,
    texto: "Se você quiser se dar bem comigo ...",
    opcoes: [
      { label: "Me dê liberdade", value: "I" },
      { label: "Me deixe saber sua expectativa", value: "O" },
      { label: "Lidere, siga ou saia do caminho", value: "A" },
      { label: "Seja amigável, carinhoso e compreensivo", value: "C" },
    ],
  },
  {
    id: 4,
    texto: "Para conseguir obter bons resultados é preciso ...",
    opcoes: [
      { label: "Ter incertezas", value: "I" },
      { label: "Controlar o essencial", value: "O" },
      { label: "Diversão e celebração", value: "C" },
      { label: "Planejar e obter recursos", value: "A" },
    ],
  },
  {
    id: 5,
    texto: "Eu me divirto quando ...",
    opcoes: [
      { label: "Estou me exercitando", value: "A" },
      { label: "Tenho novidades", value: "I" },
      { label: "Estou com os outros", value: "C" },
      { label: "Determino as regras", value: "O" },
    ],
  },
  {
    id: 6,
    texto: "Eu penso que ...",
    opcoes: [
      { label: "Unidos venceremos, divididos perderemos", value: "C" },
      { label: "O ataque é melhor que a defesa", value: "A" },
      { label: "É bom ser manso, mas andar com um porrete", value: "I" },
      { label: "Um homem prevenido vale por dois", value: "O" },
    ],
  },
  {
    id: 7,
    texto: "Minha preocupação é ...",
    opcoes: [
      { label: "Gerar a ideia global", value: "I" },
      { label: "Fazer com que as pessoas gostem", value: "C" },
      { label: "Fazer com que funcione", value: "O" },
      { label: "Fazer com que aconteça", value: "A" },
    ],
  },
  {
    id: 8,
    texto: "Eu prefiro ...",
    opcoes: [
      { label: "Perguntas a respostas", value: "I" },
      { label: "Ter todos os detalhes", value: "O" },
      { label: "Vantagens a meu favor", value: "A" },
      { label: "Que todos tenham a chance de serem ouvidos", value: "C" },
    ],
  },
  {
    id: 9,
    texto: "Eu gosto de ...",
    opcoes: [
      { label: "Fazer progresso", value: "A" },
      { label: "Construir memórias", value: "C" },
      { label: "Fazer sentido", value: "O" },
      { label: "Tornar as pessoas confortáveis", value: "I" },
    ],
  },
  {
    id: 10,
    texto: "Eu gosto de chegar ...",
    opcoes: [
      { label: "Na frente", value: "A" },
      { label: "Junto", value: "C" },
      { label: "Na hora", value: "O" },
      { label: "Em outro lugar", value: "I" },
    ],
  },
  {
    id: 11,
    texto: "Um ótimo dia para mim é quando ...",
    opcoes: [
      { label: "Consigo fazer muitas coisas", value: "A" },
      { label: "Me divirto com meus amigos", value: "C" },
      { label: "Tudo segue conforme planejado", value: "O" },
      { label: "Desfruto de coisas novas e estimulantes", value: "I" },
    ],
  },
  {
    id: 12,
    texto: "Eu vejo a morte como ...",
    opcoes: [
      { label: "Uma grande aventura misteriosa", value: "I" },
      { label: "Oportunidade para rever os falecidos", value: "C" },
      { label: "Um modo de receber recompensas", value: "O" },
      { label: "Algo que sempre chega muito cedo", value: "A" },
    ],
  },
  {
    id: 13,
    texto: "Minha filosofia de vida é ...",
    opcoes: [
      {
        label: "Há ganhadores e perdedores, e eu acredito ser um ganhador",
        value: "A",
      },
      { label: "Para eu ganhar, ninguém precisa perder", value: "C" },
      { label: "Para ganhar, é preciso seguir as regras", value: "O" },
      { label: "Para ganhar, é necessário inventar novas regras", value: "I" },
    ],
  },
  {
    id: 14,
    texto: "Eu sempre gostei de ...",
    opcoes: [
      { label: "Explorar", value: "I" },
      { label: "Evitar surpresas", value: "O" },
      { label: "Focalizar a meta", value: "A" },
      { label: "Realizar uma abordagem natural", value: "C" },
    ],
  },
  {
    id: 15,
    texto: "Eu gosto de mudanças se ...",
    opcoes: [
      { label: "Me der uma vantagem competitiva", value: "A" },
      { label: "For divertido e puder ser compartilhado", value: "C" },
      { label: "Me der mais liberdade e variedade", value: "I" },
      { label: "Melhorar ou me der mais controle", value: "O" },
    ],
  },
  {
    id: 16,
    texto: "Não existe nada de errado em ...",
    opcoes: [
      { label: "Se colocar na frente", value: "A" },
      { label: "Colocar os outros na frente", value: "C" },
      { label: "Mudar de ideia", value: "I" },
      { label: "Ser consistente", value: "O" },
    ],
  },
  {
    id: 17,
    texto: "Eu gosto de buscar conselhos de ...",
    opcoes: [
      { label: "Pessoas bem-sucedidas", value: "A" },
      { label: "Anciões e conselheiros", value: "C" },
      { label: "Autoridades no assunto", value: "O" },
      { label: "Lugares, os mais estranhos", value: "I" },
    ],
  },
  {
    id: 18,
    texto: "Meu lema é ...",
    opcoes: [
      { label: "Fazer o que precisa ser feito", value: "I" },
      { label: "Fazer bem feito", value: "O" },
      { label: "Fazer junto com o grupo", value: "C" },
      { label: "Simplesmente fazer", value: "A" },
    ],
  },
  {
    id: 19,
    texto: "Eu gosto de ...",
    opcoes: [
      { label: "Complexidade, mesmo se confuso", value: "I" },
      { label: "Ordem e sistematização", value: "O" },
      { label: "Calor humano e animação", value: "C" },
      { label: "Coisas claras e simples", value: "A" },
    ],
  },
  {
    id: 20,
    texto: "Tempo pra mim ...",
    opcoes: [
      { label: "Algo que detesto desperdiçar", value: "A" },
      { label: "Um grande ciclo", value: "C" },
      { label: "Uma flecha que leva ao inevitável", value: "O" },
      { label: "Irrelevante", value: "I" },
    ],
  },
  {
    id: 21,
    texto: "Se eu fosse bilionário ...",
    opcoes: [
      { label: "Faria doações para muitas entidades", value: "C" },
      { label: "Criaria uma poupança avantajada", value: "O" },
      { label: "Faria o que desse na cabeça", value: "I" },
      { label: "Me exibiria bastante para algumas pessoas", value: "A" },
    ],
  },
  {
    id: 22,
    texto: "Eu acredito que ...",
    opcoes: [
      { label: "O destino é mais importante que a jornada", value: "A" },
      { label: "A jornada é mais importante que o destino", value: "C" },
      { label: "Um centavo economizado é um centavo ganho", value: "O" },
      { label: "Bastam um navio e uma estrela para navegar", value: "I" },
    ],
  },
  {
    id: 23,
    texto: "Eu acredito também que ...",
    opcoes: [
      { label: "Aquele que hesita está perdido", value: "A" },
      { label: "De grão em grão a galinha enche o papo", value: "O" },
      { label: "O que vai, volta", value: "C" },
      {
        label: "Um sorriso ou uma careta é o mesmo para quem é cego",
        value: "I",
      },
    ],
  },
  {
    id: 24,
    texto: "Eu acredito ainda que ...",
    opcoes: [
      { label: "É melhor prudência do que arrependimento", value: "O" },
      { label: "A autoridade deve ser desafiada", value: "I" },
      { label: "Ganhar é fundamental", value: "A" },
      { label: "O coletivo é mais importante do que o individual", value: "C" },
    ],
  },
  {
    id: 25,
    texto: "Eu penso que ...",
    opcoes: [
      { label: "Não é fácil ficar encurralado", value: "I" },
      { label: "É preferível olhar, antes de pular", value: "O" },
      { label: "Duas cabeças pensam melhor do que uma", value: "C" },
      {
        label: "Se você não tem condições de competir, não compita",
        value: "A",
      },
    ],
  },
];

export default function Perguntas({ onFinalizar }) {
  const [indice, setIndice] = useState(0);
  const [respostas, setRespostas] = useState({});

  const perguntaAtual = perguntas[indice];
  const progresso = Math.round(
    (Object.keys(respostas).length / perguntas.length) * 100
  );

  const selecionarOpcao = (valor) => {
    const novasRespostas = { ...respostas, [perguntaAtual.id]: valor };
    setRespostas(novasRespostas);

    setTimeout(() => {
      if (indice < perguntas.length - 1) {
        setIndice(indice + 1);
      } else {
        // fim do teste, conta os valores
        const contagem = { A: 0, C: 0, O: 0, I: 0 };
        Object.values(novasRespostas).forEach((v) => {
          contagem[v] += 1;
        });
        onFinalizar(contagem);
      }
    }, 300);
  };

  if (!perguntaAtual) return null;

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 py-8 h-screen flex flex-col sm:justify-center">
        <h1 className="text-4xl font-bold text-center mb-6 py-3 bg-gradient-to-r from-black to-blue-500 text-transparent bg-clip-text">
          Avaliação de Perfil Comportamental
        </h1>

        <div className="bg-gray-100 p-6 rounded-xl shadow mb-6">
          <p className="text-center text-lg mb-4 text-gray-500">
            Vamos começar...
          </p>
          <p className="text-center text-gray-800 text-lg mb-6 font-bold">
            {perguntaAtual.texto}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
            {perguntaAtual.opcoes.map((opcao, index) => {
              const selecionada = respostas[perguntaAtual.id] === opcao.value;

              return (
                <button
                  key={index}
                  onClick={(e) => {
                    e.currentTarget.blur(); // remove o foco visual
                    selecionarOpcao(opcao.value);
                  }}
                  className={`text-center cursor-pointer border border-gray-300 p-5 rounded-lg transition 
        ${
          selecionada
            ? "bg-blue-500 text-white"
            : "bg-white hover:bg-blue-500 hover:text-white active:bg-blue-500 active:text-white focus:bg-blue-500 focus:text-white"
        }`}
                >
                  {opcao.label}
                </button>
              );
            })}
          </div>

          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-1 font-semibold">
              {progresso}%
            </p>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-blue-400 h-4 rounded-full transition-all duration-900"
                style={{ width: `${progresso}%` }}
              />
            </div>
          </div>
        </div>

        <div className="bg-blue-100 p-4 rounded-lg text-sm text-gray-700 mb-6">
          <p className="font-semibold mb-2">Dicas:</p>
          <ul className="list-decimal pl-5 space-y-1">
            <li>Não há resultado bom ou ruim, por isso, seja sincera(o).</li>
            <li>Escolha um momento tranquilo para fazer o teste.</li>
            <li>
              Não pense muito, a primeira resposta geralmente será a mais
              correta.
            </li>
            <li>
              Responda pensando em quem você é e não em quem gostaria de ser.
            </li>
          </ul>
        </div>

        <footer className=" text-center">
          <Image
            src="/logo-completa-texto-preto.png"
            alt="Logo"
            width={80}
            height={80}
            className="mx-auto mb-20"
          />
        </footer>
      </div>
    </div>
  );
}
