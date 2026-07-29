"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const captureSchema = z
  .object({
    nome: z.string().trim().min(2, "Informe seu nome"),
    whatsapp: z.string().trim().optional(),
    consentiuTratamento: z.boolean().refine((v) => v === true, {
      message: "É necessário autorizar para continuar",
    }),
    consentiuContato: z.boolean(),
  })
  .refine(
    (data) => !data.consentiuContato || Boolean(data.whatsapp && data.whatsapp.length > 0),
    {
      message: "Informe um WhatsApp para autorizar o contato",
      path: ["whatsapp"],
    },
  );

export type CaptureData = z.infer<typeof captureSchema>;

type CaptureScreenProps = {
  onSubmit: (data: CaptureData) => void;
};

/**
 * Tela 6 — Captura e consentimentos. Nenhum consentimento vem
 * pré-marcado (docs/FINAL_SEQUENCE.md §10; docs/PRIVACY_RULES.md).
 * WhatsApp só é obrigatório se o contato for autorizado.
 */
export function CaptureScreen({ onSubmit }: CaptureScreenProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CaptureData>({
    resolver: zodResolver(captureSchema),
    defaultValues: {
      nome: "",
      whatsapp: "",
      consentiuTratamento: false,
      consentiuContato: false,
    },
  });

  const consentiuContato = watch("consentiuContato");

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col gap-5"
    >
      <h1 className="font-display text-2xl font-extrabold leading-tight text-cream sm:text-3xl">
        Para guardar seu mapa
      </h1>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="nome" className="text-sm font-medium text-muted">
          Nome
        </label>
        <input
          id="nome"
          type="text"
          autoComplete="name"
          {...register("nome")}
          className="min-h-12 rounded-xl border border-cream/15 bg-cream/[0.03] px-4 text-base text-cream outline-none focus:border-gold/60"
        />
        {errors.nome && (
          <p className="text-sm text-amber">{errors.nome.message}</p>
        )}
      </div>

      {consentiuContato && (
        <div className="flex flex-col gap-1.5">
          <label htmlFor="whatsapp" className="text-sm font-medium text-muted">
            WhatsApp
          </label>
          <input
            id="whatsapp"
            type="tel"
            autoComplete="tel"
            {...register("whatsapp")}
            className="min-h-12 rounded-xl border border-cream/15 bg-cream/[0.03] px-4 text-base text-cream outline-none focus:border-gold/60"
          />
          {errors.whatsapp && (
            <p className="text-sm text-amber">{errors.whatsapp.message}</p>
          )}
        </div>
      )}

      <label className="flex items-start gap-3 text-sm text-muted">
        <input
          type="checkbox"
          {...register("consentiuTratamento")}
          className="mt-0.5 h-5 w-5 shrink-0 rounded border-cream/30 bg-transparent accent-gold"
        />
        Autorizo o armazenamento das minhas respostas e a criação do meu
        acesso individual ao resultado.
      </label>
      {errors.consentiuTratamento && (
        <p className="-mt-3 text-sm text-amber">
          {errors.consentiuTratamento.message}
        </p>
      )}

      <label className="flex items-start gap-3 text-sm text-muted">
        <input
          type="checkbox"
          {...register("consentiuContato")}
          className="mt-0.5 h-5 w-5 shrink-0 rounded border-cream/30 bg-transparent accent-gold"
        />
        Autorizo o compartilhamento com a psicóloga Jeruska Maciel para
        contato via WhatsApp (opcional).
      </label>

      <button
        type="submit"
        disabled={isSubmitting}
        className="min-h-12 rounded-xl bg-olive px-8 text-base font-semibold text-cream transition-colors hover:bg-olive-deep disabled:opacity-60"
      >
        Ver meu resultado
      </button>
    </form>
  );
}
