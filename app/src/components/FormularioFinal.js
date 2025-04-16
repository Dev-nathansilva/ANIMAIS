"use client";

import Image from "next/image";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useHookFormMask } from "use-mask-input";
import { TbAlertTriangleFilled } from "react-icons/tb";
import { IoIosArrowForward } from "react-icons/io";

const perfisInfo = {
  A: {
    animal: "Tubarão",
    imagem: "tubarao.png",
  },
  C: {
    animal: "Gato",
    imagem: "gato.png",
  },
  O: {
    animal: "Lobo",
    imagem: "lobo.png",
  },
  I: {
    animal: "Águia",
    imagem: "aguia.png",
  },
};

const definicoesPerfis = {
  O: {
    titulo: "LOBO",
    comportamentos: [
      "FAZER CERTO",
      "Detalhista",
      "Organizado",
      "Estrategista",
      "Busca do Conhecimento",
      "Pontual",
      "Conservador",
      "Previsível",
    ],
    pontosFortes: [
      "ORGANIZAÇÃO",
      "Passado, Presente e Futuro",
      "Consistência, Conformidade e Qualidade",
      "Lealdade e Segurança",
      "Regras e Responsabilidades",
    ],
    motivacoes: [
      "Certeza, Compreensão Exata de quais são as Regras",
      "Conhecimento Específico do Trabalho",
      "Ausência de Riscos e Erros",
    ],
    valores: ["Ordem e Controle"],
    pontosMelhoria: [
      "Dificuldade de se Adaptar às mudanças",
      "Pode Impedir o Progresso",
      "Detalhista, estruturado e Demasiado Sistematizado (perfeccionista)",
    ],
  },
  I: {
    titulo: "ÁGUIA",
    comportamentos: [
      "FAZER DIFERENTE",
      "Criativo",
      "Intuitivo",
      "Foco no Futuro",
      "Distraído",
      "Curioso",
      "Informal/Casual",
      "Flexível",
    ],
    pontosFortes: [
      "IDEALIZAÇÃO",
      "Provoca Mudanças Radicais",
      "Antecipa o Futuro",
      "Criatividade",
    ],
    motivacoes: [
      "Liberdade de Expressão",
      "Ausência de Controles Rígidos",
      "Ambiente de Trabalho Descentralizado",
      "Liberdade para Fazer Exceções",
      "Oportunidade para Delegar Tarefas e Detalhes",
    ],
    valores: ["Criatividade e Liberdade (Inspira Ideias)"],
    pontosMelhoria: [
      "Falta de atenção para o Aqui e Agora",
      "Impaciência e Rebeldia",
      "Defender o Novo pelo Novo",
    ],
  },
  A: {
    titulo: "TUBARÃO",
    comportamentos: [
      "FAZER RÁPIDO",
      "Senso de Urgência",
      "Ação, Iniciativa",
      "Impulsivo, Prático",
      "Vencer Desafios",
      "Aqui e Agora",
      "Auto Suficiente",
      "Não Gosta de Delegar Poder",
    ],
    pontosFortes: [
      "AÇÃO",
      "Fazer que Ocorra",
      "Parar com a Burocracia",
      "Motivação",
    ],
    motivacoes: [
      "Liberdade para Agir Individualmente",
      "Controle das Próprias Atividades",
      "Resolver os Problemas do Seu Jeito",
      "Competição Individual",
      "Variedade de Atividades",
      "Não ter que Repetir Tarefas",
    ],
    valores: ["Resultados"],
    pontosMelhoria: [
      "Faz do Modo Mais Fácil",
      "Relacionamento Complicado",
      "Centralizador (Não Pede Ajuda), Individualista",
    ],
  },
  C: {
    titulo: "GATO",
    comportamentos: [
      "FAZER JUNTO",
      "Sensível",
      "Relacionamentos",
      "Time",
      "Tradicionalistas",
      "Contribuição",
      "Busca Harmonia",
      "Delega Autoridade",
    ],
    pontosFortes: [
      "COMUNICAÇÃO",
      "Manter Comunicação Harmoniosa",
      "Desenvolver e Manter a Cultura Empresarial",
      "Comunicação Aberta",
    ],
    motivacoes: [
      "Segurança",
      "Aceitação Social",
      "Construir o Consenso",
      "Reconhecimento da Equipe",
      "Supervisão Compreensiva",
      "Ambiente Harmônico",
      "Trabalho em Grupo",
    ],
    valores: ["Felicidade e Igualdade (Cultura da Empresa - Pensa nos Outros)"],
    pontosMelhoria: [
      "Esconder Conflitos",
      "Felicidade Acima dos Resultados",
      "Manipulação Através dos Sentimentos",
    ],
  },
};

function analisarResultado(resultado) {
  const perfis = Object.entries(resultado).map(([letra, valor]) => ({
    letra,
    valor,
    porcentagem: valor * 4,
    ...perfisInfo[letra],
  }));

  // Ordenar por valor (maior para menor)
  perfis.sort((a, b) => b.valor - a.valor);

  // Filtrar todos os que têm o valor máximo (caso de empate)
  const maxValor = perfis[0].valor;
  const perfisPredominantes = perfis.filter((p) => p.valor === maxValor);

  return {
    predominantes: perfisPredominantes, // pode haver mais de um em caso de empate
    todos: perfis, // todos os perfis com porcentagens e animais
  };
}

export default function FormularioFinal({ resultado }) {
  const [enviado, setEnviado] = useState(false);
  const [erroEnvio, setErroEnvio] = useState(""); // novo estado de erro

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "onChange" });

  const onSubmit = async (data) => {
    setErroEnvio(""); // limpa qualquer erro anterior

    const payload = { ...data, ...resultado };

    try {
      const res = await fetch(`/api/resultado`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setEnviado(true);
      } else {
        setErroEnvio(
          "Não foi possível enviar os dados. Tente novamente mais tarde."
        );
      }
    } catch (error) {
      setErroEnvio(
        "Erro de conexão. Verifique sua internet ou tente novamente em instantes."
      );
    }
  };

  // Máscara de telefone (simples)
  const aplicarMascaraTelefone = (valor) => {
    return valor
      .replace(/\D/g, "")
      .replace(/^(\d{2})(\d)/g, "($1) $2")
      .replace(/(\d{5})(\d{1,4})/, "$1-$2")
      .replace(/(-\d{4})\d+?$/, "$1");
  };

  const handleTelefoneChange = (e) => {
    const valorFormatado = aplicarMascaraTelefone(e.target.value);
    setValue("telefone", valorFormatado);
    trigger("telefone");
  };

  if (enviado) {
    const { predominantes, todos } = analisarResultado(resultado);

    return (
      <div className="min-h-screen max-w-screen flex items-center text-center flex-col overflow-hidden">
        <div className="bg-[#002779] h-[350px] sm:h-[250px] w-full flex flex-col items-center pt-6">
          <Image
            src="/logo-completa-colorido.png"
            alt="Logo"
            width={120}
            height={120}
            className="mx-auto"
          />
          <h2 className="text-[30px] sm:text-4xl font-bold text-center py-3 bg-gradient-to-r from-white to-blue-300 text-transparent bg-clip-text">
            Avaliação de Perfil Comportamental
          </h2>
          <p className="text-x text-gray-300">
            Confira abaixo o resultado da sua avaliação comportamental
          </p>
        </div>
        <div className="mt-[-60px] sm:mt-[-50px] bg-gray-50 shadow border border-gray-300 p-6 rounded-[20px] w-[350px] sm:w-full sm:max-w-2xl space-y-2">
          <p className="text-lg text-gray-800 mb-2">
            {predominantes.length > 1
              ? "Seus perfis predominantes são:"
              : "Seu perfil predominante é:"}
          </p>
          <div className="flex justify-center gap-3 items-center">
            {predominantes.map((p) => (
              <div key={p.letra} className="mb-4">
                <Image
                  src={`/${p.imagem}`}
                  alt={p.animal}
                  width={100}
                  height={100}
                  className=""
                />
                <p className="text-3xl font-bold text-blue-600">{p.animal}</p>
                <p className="text-3xl text-gray-600 mt-1">{p.porcentagem} %</p>
              </div>
            ))}
          </div>

          <p className="text-sm text-gray-600 font-medium mb-1">
            Distribuição completa:
          </p>
          <ul className="text-sm text-gray-700">
            {todos.map((p) => (
              <li key={p.letra}>
                {p.letra} - {p.animal}: <strong>{p.porcentagem}%</strong>
              </li>
            ))}
          </ul>
        </div>

        <hr className="my-4" />

        <h3 className="mt-3 text-[19px] font-bold">
          Entenda seu Perfil Comportamental
        </h3>
        <div className="flex gap-4 ">
          {predominantes.map((perfil) => {
            const definicao = definicoesPerfis[perfil.letra];
            if (!definicao) return null;

            return (
              <div
                key={perfil.letra}
                className="bg-gray-100 border border-gray-300 rounded-4xl p-7 text-left mt-6 w-[360px] sm:w-[400px] mb-20 relative"
              >
                <Image
                  src={`/${perfil.imagem}`}
                  alt={perfil.animal}
                  width={100}
                  height={100}
                  className="top-0 right-0 absolute"
                />
                <h2 className="text-2xl font-bold text-blue-700 mb-2">
                  {definicao.titulo}
                </h2>

                <div className="mb-3">
                  <h3 className="font-semibold text-gray-700 mb-2">
                    Comportamentos:
                  </h3>
                  <ul className="ml-2 text-gray-600 space-y-1">
                    {definicao.comportamentos.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <IoIosArrowForward
                          size={18}
                          className="text-blue-600 mt-0.5"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-3">
                  <h3 className="font-semibold text-gray-700 mb-2">
                    Pontos Fortes:
                  </h3>
                  <ul className="ml-2 text-gray-600 space-y-1">
                    {definicao.pontosFortes.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <IoIosArrowForward
                          size={18}
                          className="text-blue-600 mt-0.5"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-3">
                  <h3 className="font-semibold text-gray-700 mb-2">
                    Motivações:
                  </h3>
                  <ul className="ml-2 text-gray-600 space-y-1">
                    {definicao.motivacoes.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <IoIosArrowForward
                          size={18}
                          className="text-blue-600 mt-0.5"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-3">
                  <h3 className="font-semibold text-gray-700 mb-2">Valores:</h3>
                  <ul className="ml-2 text-gray-600 space-y-1">
                    {definicao.valores.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <IoIosArrowForward
                          size={18}
                          className="text-blue-600 mt-0.5"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-3">
                  <h3 className="font-semibold text-gray-700 mb-2">
                    Pontos de Melhoria:
                  </h3>
                  <ul className="ml-2 text-gray-600 space-y-1">
                    {definicao.pontosMelhoria.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <IoIosArrowForward
                          size={18}
                          className="text-blue-600 mt-0.5"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-white p-6 rounded-lg shadow"
      >
        <h1 className="text-4xl font-bold text-center mb-6 py-3 bg-gradient-to-r from-black to-blue-500 text-transparent bg-clip-text">
          Avaliação de Perfil Comportamental
        </h1>

        <p className="text-xl font-medium text-center text-gray-600">
          Falta pouco para você ver o resultado da sua avaliação de perfil
        </p>
        <p className="text-center text-sm mb-6">
          Digite seu nome, telefone e e-mail abaixo
        </p>

        <div className="flex flex-col gap-3 ">
          <div>
            <input
              type="text"
              placeholder="Nome"
              {...register("nome", { required: "Digite seu nome." })}
              className={`w-full mb-1 px-4 py-3 border rounded-[30px] ${
                errors.nome ? "border-red-500" : "border-gray-300"
              } focus-visible:outline-none focus-visible:border-gray-700`}
            />
            {errors.nome && (
              <p className="pl-3 text-red-500 text-sm">{errors.nome.message}</p>
            )}
          </div>

          <div>
            <input
              type="text"
              placeholder="Telefone"
              {...register("telefone", {
                required: "Digite um telefone válido.",
                pattern: {
                  value: /^\(\d{2}\) \d{4,5}-\d{4}$/,
                  message: "Formato de telefone inválido.",
                },
                onChange: handleTelefoneChange,
                onInput: handleTelefoneChange,
              })}
              className={`w-full mb-1 px-4 py-3 border rounded-[30px] ${
                errors.telefone ? "border-red-500" : "border-gray-300"
              }  focus-visible:outline-none focus-visible:border-gray-700`}
            />
            {errors.telefone && (
              <p className="pl-3 text-red-500 text-sm">
                {errors.telefone.message}
              </p>
            )}
          </div>

          <div>
            <input
              type="email"
              placeholder="E-mail"
              {...register("email", {
                required: "Digite um e-mail válido.",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Formato de e-mail inválido.",
                },
              })}
              className={`w-full mb-1 px-4 py-3 border rounded-[30px] ${
                errors.email ? "border-red-500" : "border-gray-300"
              } focus-visible:outline-none focus-visible:border-gray-700`}
            />
            {errors.email && (
              <p className="pl-3 text-red-500 text-sm ">
                {errors.email.message}
              </p>
            )}
          </div>
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="cursor-pointer mt-6 flex mx-auto bg-blue-600 text-white py-3 px-6 rounded-[20px] hover:bg-blue-700 transition disabled:opacity-50"
        >
          {isSubmitting ? "Enviando..." : "Ver o resultado do meu teste"}
        </button>

        <footer className="mt-5 text-center">
          <Image
            src="/logo-completa-texto-preto.png"
            alt="Logo"
            width={80}
            height={80}
            className="mx-auto"
          />
        </footer>
      </form>

      {erroEnvio && (
        <div className="border border-gray-200  bg-gray-100 mt-4 p-3 rounded-2xl absolute top-0 left-[50%] translate-x-[-50%] flex gap-3 items-center">
          <TbAlertTriangleFilled className="text-orange-500" />

          <p className="text-center text-orange-500 text-sm">{erroEnvio}</p>
        </div>
      )}
    </div>
  );
}
