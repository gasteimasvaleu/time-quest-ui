import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const FREE_URL = "https://app.sexando.com/login";
const CHECKOUT_URL = "https://app.sexando.com/login";

type Period = "mensal" | "trimestral" | "anual";

const premiumPlans: Record<Period, {
  label: string;
  price: string;
  period: string;
  billing: string;
  equivalent?: string;
  discount?: string;
  popular?: boolean;
  href: string;
}> = {
  mensal: {
    label: "Mensal",
    price: "39,90",
    period: "mês",
    billing: "Cobrança mensal recorrente",
    href: CHECKOUT_URL,
  },
  trimestral: {
    label: "Trimestral",
    price: "89,90",
    period: "3 meses",
    billing: "Cobrança a cada 3 meses",
    equivalent: "Equivale a ~R$ 29,97/mês",
    discount: "~25% de economia",
    href: CHECKOUT_URL,
  },
  anual: {
    label: "Anual",
    price: "239,99",
    period: "ano",
    billing: "Cobrança única anual",
    equivalent: "Equivale a ~R$ 20,00/mês",
    discount: "~50% de economia",
    popular: true,
    href: CHECKOUT_URL,
  },
};

const premiumFeatures = [
  "Mensagens ilimitadas",
  "Lista completa de visitantes (sem blur)",
  "Quem viu seus stories",
  "Ligações de vídeo ilimitadas",
  "Acesso total a Hot or Not, Livecam e AI Avatar",
  "Modo incógnito (visita perfis sem aparecer)",
  "Selo Premium e destaque no feed e busca",
  "Uploads ilimitados (fotos, vídeos, stories, posts)",
];

const freeFeatures = [
  "Perfil completo + fotos e vídeos",
  "Feed, curtidas e comentários",
  "10 mensagens por dia",
  "1 storie / foto / vídeo / publicação por dia",
  "Explorar com cards opacos (preview)",
];

export const SquishyPricing = () => {
  const [period, setPeriod] = useState<Period>("anual");
  const plan = premiumPlans[period];

  return (
    <section className="px-4 pt-20 pb-16">
      <div className="mx-auto flex w-fit flex-wrap items-stretch justify-center gap-6">
        {/* Free Card */}
        <motion.div
          whileHover="hover"
          transition={{ duration: 1, ease: "backInOut" }}
          variants={{ hover: { scale: 1.03 } }}
          className="relative flex min-h-[620px] w-80 shrink-0 flex-col overflow-hidden rounded-xl bg-neutral-700 p-8 shadow-lg transition-shadow hover:shadow-xl"
        >
          <div className="relative z-10 flex flex-1 flex-col text-white">
            <span className="mb-3 block w-fit rounded-full border border-white/20 bg-white/20 px-3 py-0.5 text-sm font-medium text-white backdrop-blur-sm">
              Sexando Free
            </span>

            <div className="my-2 origin-top-left">
              <span className="font-mono text-5xl font-black leading-[1.2]">R$ 0</span>
            </div>

            <p className="mb-4 text-sm text-white/90">O básico, com limites diários.</p>

            <div className="mb-6 space-y-2">
              {freeFeatures.map((feature, index) => (
                <div key={index} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-white" />
                  <span className="text-xs text-white/95">{feature}</span>
                </div>
              ))}
            </div>

            <a
              href={FREE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto block rounded-lg border-2 border-white bg-white py-2.5 text-center font-mono font-black uppercase text-neutral-800 backdrop-blur-sm transition-all duration-200 hover:bg-white/10 hover:text-white focus:outline-hidden focus:ring-2 focus:ring-white/50"
            >
              Começar grátis
            </a>
          </div>
          <FreeBG />
        </motion.div>

        {/* Premium Card */}
        <div className="relative w-80 shrink-0">
          {plan.popular && (
            <div className="absolute -top-3 left-1/2 z-30 -translate-x-1/2">
              <span className="inline-flex items-center gap-1 rounded-full bg-white px-4 py-1 text-sm font-semibold text-primary shadow-md">
                ⭐ Melhor oferta
              </span>
            </div>
          )}

          <motion.div
            whileHover="hover"
            transition={{ duration: 1, ease: "backInOut" }}
            variants={{ hover: { scale: 1.05 } }}
            className="relative flex min-h-[620px] w-full flex-col overflow-hidden rounded-xl bg-primary p-8 shadow-lg transition-shadow hover:shadow-xl"
          >
            <div className="relative z-10 flex flex-1 flex-col text-white">
              <span className="mb-3 block w-fit rounded-full border border-white/20 bg-white/20 px-3 py-0.5 text-sm font-medium text-white backdrop-blur-sm">
                Sexando Premium
              </span>

              {/* Period selector */}
              <div className="mb-4 grid grid-cols-3 gap-1 rounded-full bg-black/20 p-1">
                {(Object.keys(premiumPlans) as Period[]).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPeriod(p)}
                    className={`rounded-full py-1.5 text-xs font-semibold capitalize transition-colors ${
                      period === p ? "bg-white text-primary" : "text-white/80 hover:text-white"
                    }`}
                  >
                    {premiumPlans[p].label}
                  </button>
                ))}
              </div>

              <motion.div
                key={period}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="my-2 origin-top-left"
              >
                <span className="font-mono text-5xl font-black leading-[1.2]">R$ {plan.price}</span>
                <span className="text-2xl font-bold">/{plan.period}</span>
              </motion.div>

              <p className="text-sm text-white/90">{plan.billing}</p>
              {plan.equivalent && (
                <p className="mt-1 text-sm font-medium text-white/90">{plan.equivalent}</p>
              )}
              {plan.discount && (
                <span className="mt-2 inline-block w-fit rounded-full bg-white/25 px-3 py-0.5 text-xs font-bold text-white">
                  {plan.discount}
                </span>
              )}

              <div className="my-4 space-y-2">
                {premiumFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-white" />
                    <span className="text-xs text-white/95">{feature}</span>
                  </div>
                ))}
              </div>

              <a
                href={plan.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto block rounded-lg border-2 border-white bg-white py-2.5 text-center font-mono font-black uppercase text-primary backdrop-blur-sm transition-all duration-200 hover:bg-white/10 hover:text-white focus:outline-hidden focus:ring-2 focus:ring-white/50"
              >
                Assinar Premium
              </a>
            </div>
            <PremiumBG />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const FreeBG = () => (
  <motion.svg
    width="320"
    height="620"
    viewBox="0 0 320 620"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    variants={{ hover: { scale: 1.05 } }}
    transition={{ duration: 1, ease: "backInOut" }}
    className="absolute inset-0 z-0 h-full w-full"
    preserveAspectRatio="xMidYMid slice"
  >
    <motion.rect
      x="14"
      width="153"
      height="153"
      rx="15"
      fill="rgba(0, 0, 0, 0.2)"
      variants={{ hover: { y: 435, rotate: "90deg", scaleX: 2 } }}
      style={{ y: 12 }}
      transition={{ delay: 0.2, duration: 1, ease: "backInOut" }}
    />
    <motion.rect
      x="155"
      width="153"
      height="153"
      rx="15"
      fill="rgba(0, 0, 0, 0.2)"
      variants={{ hover: { y: 12, rotate: "90deg", scaleX: 2 } }}
      style={{ y: 435 }}
      transition={{ delay: 0.2, duration: 1, ease: "backInOut" }}
    />
  </motion.svg>
);

const PremiumBG = () => (
  <motion.svg
    width="320"
    height="620"
    viewBox="0 0 320 620"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    variants={{ hover: { scale: 1.5 } }}
    transition={{ duration: 1, ease: "backInOut" }}
    className="absolute inset-0 z-0 h-full w-full"
    preserveAspectRatio="xMidYMid slice"
  >
    <motion.circle
      variants={{ hover: { scaleY: 0.5, y: -25 } }}
      transition={{ duration: 1, ease: "backInOut", delay: 0.2 }}
      cx="160.5"
      cy="114.5"
      r="101.5"
      fill="rgba(0, 0, 0, 0.2)"
    />
    <motion.ellipse
      variants={{ hover: { scaleY: 2.25, y: -25 } }}
      transition={{ duration: 1, ease: "backInOut", delay: 0.2 }}
      cx="160.5"
      cy="380"
      rx="101.5"
      ry="43.5"
      fill="rgba(0, 0, 0, 0.2)"
    />
  </motion.svg>
);
