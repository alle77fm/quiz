/**
 * Matriz inicial de validação comercial do MVP — texto do relatório.
 *
 * Diferente do compositor anterior (que era puramente estrutural e não
 * derivava de cálculo real), este texto é gerado a partir do
 * `ScoreSnapshot` de `engine.ts` — a variação entre percursos é real.
 * O que continua pendente de validação da psicóloga é a REDAÇÃO
 * definitiva de cada bloco (docs/REPORT_COMPOSER.md) e a ratificação
 * das seis definições de dimensão (docs/SCORING_MATRIX.md §1.1). As
 * frases descritivas de cada dimensão abaixo reaproveitam a redação
 * provisória já registrada naquele documento — não são conteúdo novo,
 * nem clínico.
 */

import type { Dimension } from "@/config/quiz/mvp/dimensions";
import type { MapaId } from "@/config/quiz/mvp/mapas";
import { MVP_MAPA_NOME } from "@/config/quiz/mvp/mapas";
import type { Intencao } from "@/components/quiz/IntentionScreen";

export type PerfilMoradia = "sozinha" | "acompanhada";

/** Redação provisória (docs/SCORING_MATRIX.md §1.1), não validada pela
 * psicóloga — usada só para compor uma frase legível por dimensão. */
const DESCRICAO_DIMENSAO: Record<Dimension, string> = {
  acolhimento: "a presença de segurança, escuta e conforto nas relações e nos espaços da casa",
  limites: "a capacidade de reconhecer, comunicar e preservar necessidades, tempo, espaço e escolhas pessoais",
  autocuidado: "a capacidade de incluir descanso, atenção às próprias necessidades e recuperação de energia na rotina",
  vinculos: "a qualidade da presença, da confiança e da conexão emocional nas relações do dia a dia",
  reciprocidade: "o equilíbrio na circulação de cuidado, escuta, responsabilidades e apoio entre quem compartilha a rotina",
  movimento: "a capacidade de transformar percepção em pequenos passos conscientes",
};

const ROTINA_DIMENSAO: Record<Dimension, string> = {
  acolhimento: "certos momentos do dia trazem mais tranquilidade e menos vigilância",
  limites: "fica mais fácil perceber o que cabe e o que não cabe para você",
  autocuidado: "sobra um pouco mais de espaço para descansar e recuperar energia",
  vinculos: "a presença das pessoas próximas se sente mais confiável",
  reciprocidade: "as tarefas e a escuta circulam de forma mais equilibrada entre quem convive com você",
  movimento: "pequenas mudanças começam a parecer possíveis, não só desejadas",
};

const MAPA_INTRODUCAO: Record<MapaId, string> = {
  "casa-refugio":
    "A Casa-Refúgio fala sobre pausar, proteger seu espaço e recuperar energia antes de qualquer outro passo.",
  "casa-de-reencontro":
    "A Casa de Reencontro fala sobre reaproximar-se de quem está por perto e de si mesma, com mais presença.",
  "casa-dos-vinculos":
    "A Casa dos Vínculos fala sobre fortalecer a confiança e o equilíbrio nas relações que atravessam sua rotina.",
  "casa-em-renovacao":
    "A Casa em Renovação fala sobre transformar o que você percebeu em pequenos passos possíveis.",
};

export function nomeMapa(mapaId: MapaId): string {
  return MVP_MAPA_NOME[mapaId];
}

export function textoAbertura(nome: string): string {
  return nome
    ? `${nome}, este é o seu mapa a partir do que você percorreu aqui.`
    : "Este é o seu mapa a partir do que você percorreu aqui.";
}

export function textoMapa(mapaId: MapaId): string {
  return MAPA_INTRODUCAO[mapaId];
}

export function textoForca(dimensao: Dimension): string {
  return `${capitaliza(dimensao)} aparece como um recurso presente no seu percurso: ${DESCRICAO_DIMENSAO[dimensao]}.`;
}

export function textoAtencao(dimensao: Dimension): string {
  return `${capitaliza(dimensao)} é um tema que vale observar com mais cuidado agora: ${DESCRICAO_DIMENSAO[dimensao]}.`;
}

export function textoComplementar(dimensao: Dimension): string {
  return `${capitaliza(dimensao)} aparece como um outro ângulo do seu percurso, complementar aos anteriores: ${DESCRICAO_DIMENSAO[dimensao]}.`;
}

export function textoRotina(dimensao: Dimension): string {
  return `No dia a dia, isso pode aparecer em momentos em que ${ROTINA_DIMENSAO[dimensao]}.`;
}

const TEXTO_CONTEXTO_MORADIA: Record<PerfilMoradia, string> = {
  sozinha:
    "Morando só, vale considerar não apenas quem divide o teto, mas também as pessoas que atravessam sua rotina de outras formas: família, amigos, relacionamentos e visitas frequentes também entram nesse retrato.",
  acompanhada:
    "Dividir a casa com outras pessoas também molda esse retrato — as relações mais próximas do seu dia a dia entram diretamente nessa leitura.",
};

export function textoContextoMoradia(perfil: PerfilMoradia): string {
  return TEXTO_CONTEXTO_MORADIA[perfil];
}

export function textoDirecao(labelQ15: string | undefined): string {
  const desejo = (labelQ15 ?? "").toLowerCase();
  if (!desejo) {
    return "O que você gostaria de sentir mais, dentro da sua casa e dentro de você, é um bom ponto de partida para observar nos próximos dias.";
  }
  return `Você declarou que gostaria de sentir mais ${desejo} dentro da sua casa e dentro de você. Esse é um bom ponto de partida para observar nos próximos dias.`;
}

export function textoReflexao(dimensaoAtencao: Dimension): string {
  return `Se pudesse escolher um pequeno gesto nesta semana relacionado a ${dimensaoAtencao}, qual seria?`;
}

type Intencao3 = Intencao;

const TEXTO_CHEGADA: Record<Intencao3, string> = {
  explorando: "Você chega até aqui com vontade de explorar esse momento.",
  considerando: "Você chega até aqui considerando uma conversa.",
  pronto_para_conversar: "Você chega até aqui com abertura para conversar.",
};

export function textoChegada(intencao: Intencao3 | null): string {
  if (!intencao) return TEXTO_CHEGADA.explorando;
  return TEXTO_CHEGADA[intencao];
}

const TEXTO_CONVITE: Record<Intencao3, string> = {
  explorando:
    "Se quiser, você pode continuar refletindo no seu tempo — e, quando fizer sentido, a psicóloga Jeruska Maciel está disponível para uma conversa mais profunda sobre o que apareceu aqui.",
  considerando:
    "A psicóloga Jeruska Maciel pode ajudar a aprofundar exatamente os temas que apareceram no seu percurso, numa conversa dedicada a isso.",
  pronto_para_conversar:
    "A psicóloga Jeruska Maciel está disponível para dar sequência a partir do que apareceu no seu mapa.",
};

const CTA_CONVITE: Record<Intencao3, string> = {
  explorando: "Quero aprofundar meu mapa",
  considerando: "Quero aprofundar meu mapa",
  pronto_para_conversar: "Conversar com a Jeruska",
};

export function textoConvite(intencao: Intencao3 | null): string {
  if (!intencao) return TEXTO_CONVITE.explorando;
  return TEXTO_CONVITE[intencao];
}

export function ctaConvite(intencao: Intencao3 | null): string {
  if (!intencao) return CTA_CONVITE.explorando;
  return CTA_CONVITE[intencao];
}

export const TEXTO_AVISO_ESCOPO =
  "Este conteúdo é uma demonstração comercial e não constitui diagnóstico, tratamento ou orientação psicológica. Ele não substitui avaliação profissional.";

function capitaliza(texto: string): string {
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}
