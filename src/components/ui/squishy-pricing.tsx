import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

interface PricingCardProps {
  label: string;
  price: string;
  period: string;
  originalPrice?: string;
  discount?: string;
  equivalent?: string;
  description: string;
  features: string[];
  cta: string;
  href: string;
  background: string;
  BGComponent: React.ComponentType;
  popular?: boolean;
  cancelled?: boolean;
}

export const SquishyPricing = () => {
  return (
    <section className="px-4 py-16">
      <div className="mx-auto flex w-fit flex-wrap justify-center gap-6">
        <PricingCard
          label="🔥 Promoção por Tempo Limitado"
          price="49,90"
          period="mês"
          originalPrice="99,90"
          discount="-50%"
          description="Acesso completo ao Wediet com análise ilimitada"
          features={[
            "Análise ilimitada de fotos",
            "Relatórios nutricionais detalhados",
            "Acompanhamento diário",
            "Compartilhamento WhatsApp",
            "MasterCheFIT completo",
            "ServiNUTRI completo"
          ]}
          cta="Aproveitar Oferta"
          href="https://apps.apple.com/app/we-diet/id6761124021"
          background="bg-pink-600"
          BGComponent={BGComponent1}
        />
        <PricingCard
          label="Preço Inicial"
          price="99,90"
          period="mês"
          description="Acesso completo ao Wediet com análise ilimitada"
          features={[
            "Análise ilimitada de fotos",
            "Relatórios nutricionais detalhados",
            "Acompanhamento diário",
            "Compartilhamento WhatsApp",
            "MasterCheFIT completo",
            "ServiNUTRI completo"
          ]}
          cta="Assinar Agora"
          href="https://apps.apple.com/app/we-diet/id6761124021"
          background="bg-neutral-500"
          BGComponent={BGComponent2}
          cancelled={true}
        />
      </div>
    </section>
  );
};

const PricingCard = ({ 
  label, 
  price, 
  period, 
  originalPrice,
  discount,
  equivalent,
  description, 
  features,
  cta,
  href, 
  background, 
  BGComponent,
  popular,
  cancelled
}: PricingCardProps) => {
  return (
    <motion.div
      whileHover="hover"
      transition={{ duration: 1, ease: "backInOut" }}
      variants={{ hover: { scale: cancelled ? 1 : 1.05 } }}
      className={`relative h-[580px] w-80 shrink-0 overflow-hidden rounded-xl p-8 ${background} shadow-lg hover:shadow-xl transition-shadow ${cancelled ? 'opacity-60 grayscale' : ''}`}
    >
      {popular && !cancelled && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
          <span className="inline-flex items-center gap-1 rounded-full bg-white px-4 py-1 text-sm font-semibold text-indigo-600 shadow-md">
            ⭐ Melhor Oferta
          </span>
        </div>
      )}

      {cancelled && (
        <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none">
          <div className="relative">
            <div className="w-48 h-48 rounded-full border-[6px] border-red-500/80 flex items-center justify-center">
              <X className="w-32 h-32 text-red-500/80" strokeWidth={3} />
            </div>
          </div>
        </div>
      )}
      
      <div className="relative z-10 text-white">
        <span className="mb-3 block w-fit rounded-full bg-white/20 backdrop-blur-sm px-3 py-0.5 text-sm font-medium text-white border border-white/20">
          {label}
        </span>
        
        {originalPrice && (
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg text-white/70 line-through">R$ {originalPrice}</span>
            <span className="rounded-full bg-red-500 px-2 py-0.5 text-xs font-bold text-white">
              {discount}
            </span>
          </div>
        )}
        
        <motion.div
          initial={{ scale: 0.85 }}
          variants={{ hover: { scale: cancelled ? 0.85 : 1 } }}
          transition={{ duration: 1, ease: "backInOut" }}
          className="my-2 block origin-top-left"
        >
          <span className={`font-mono text-5xl font-black leading-[1.2] ${cancelled ? 'line-through decoration-red-500 decoration-4' : ''}`}>
            R$ {price}
          </span>
          <span className="text-2xl font-bold">/{period}</span>
        </motion.div>
        
        {equivalent && (
          <p className="text-sm text-white/90 font-medium mb-3">{equivalent}</p>
        )}
        
        <p className="text-sm text-white/90 mb-4">{description}</p>
        
        <div className="space-y-2 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start gap-2">
              <Check className="h-4 w-4 text-white flex-shrink-0 mt-0.5" />
              <span className="text-xs text-white/95">{feature}</span>
            </div>
          ))}
        </div>
      </div>
      
      {cancelled ? (
        <div className="absolute bottom-4 left-4 right-4 z-20 rounded-lg border-2 border-white/50 bg-white/30 py-2.5 text-center font-mono font-black uppercase text-white/70 cursor-not-allowed block">
          Indisponível
        </div>
      ) : (
        <a 
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-4 left-4 right-4 z-20 rounded-lg border-2 border-white bg-white py-2.5 text-center font-mono font-black uppercase text-neutral-800 backdrop-blur-sm transition-all duration-200 hover:bg-white/10 hover:text-white hover:border-white/80 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent block"
        >
          {cta}
        </a>
      )}
      
      <BGComponent />
    </motion.div>
  );
};

const BGComponent1 = () => (
  <motion.svg
    width="320"
    height="580"
    viewBox="0 0 320 580"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    variants={{ hover: { scale: 1.5 } }}
    transition={{ duration: 1, ease: "backInOut" }}
    className="absolute inset-0 z-0"
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
      cy="340"
      rx="101.5"
      ry="43.5"
      fill="rgba(0, 0, 0, 0.2)"
    />
  </motion.svg>
);

const BGComponent2 = () => (
  <motion.svg
    width="320"
    height="580"
    viewBox="0 0 320 580"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    variants={{ hover: { scale: 1.05 } }}
    transition={{ duration: 1, ease: "backInOut" }}
    className="absolute inset-0 z-0"
  >
    <motion.rect
      x="14"
      width="153"
      height="153"
      rx="15"
      fill="rgba(0, 0, 0, 0.2)"
      variants={{ hover: { y: 395, rotate: "90deg", scaleX: 2 } }}
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
      style={{ y: 395 }}
      transition={{ delay: 0.2, duration: 1, ease: "backInOut" }}
    />
  </motion.svg>
);
