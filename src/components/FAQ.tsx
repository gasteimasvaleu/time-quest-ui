import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    emoji: "📸",
    question: "Como funciona o reconhecimento de alimentos por foto?",
    answer: "Basta tirar uma foto do seu prato ou lanche. O sistema identifica automaticamente os alimentos, estima porções e calorias, e registra no seu diário alimentar. É rápido, intuitivo e preciso."
  },
  {
    emoji: "🔢",
    question: "O app calcula calorias e macros?",
    answer: "Sim! Com base no alimento detectado ou registrado, o Wediet calcula calorias, proteínas, carboidratos e gorduras. Você pode acompanhar metas diárias e ver gráficos da sua alimentação."
  },
  {
    emoji: "🏋️‍♂️",
    question: "O que é o FitTracker?",
    answer: "É a área onde você registra seus treinos, atividades físicas e preferências. O sistema calcula automaticamente o gasto calórico diário e atualiza sua meta nutricional conforme seus objetivos."
  },
  {
    emoji: "🧑‍🍳",
    question: "Posso receber receitas saudáveis?",
    answer: "Sim. A IA do app sugere receitas com base no que você já come, nas suas metas e preferências (low carb, vegano, hipertrofia, etc). Basta ativar o modo \"Chef Inteligente\"."
  },
  {
    emoji: "🥗",
    question: "O plano alimentar é realmente personalizado?",
    answer: "Totalmente. Ele é criado com base no seu IMC, idade, rotina, metas (emagrecer, manter ou ganhar massa), histórico de alimentação e nível de atividade física."
  },
  {
    emoji: "🧾",
    question: "O que posso registrar no meu diário?",
    answer: "Você pode registrar refeições, snacks, líquidos, treinos, avaliação física com fotos, medidas corporais, sono, humor e muito mais. É um diário completo de evolução."
  },
  {
    emoji: "🎥",
    question: "O que tem na seção de vídeos?",
    answer: "Você encontra treinos guiados, dicas de nutrição, receitas práticas e vídeos educativos sobre reeducação alimentar, metabolismo, jejum intermitente e estratégias para melhorar sua saúde."
  },
  {
    emoji: "🧠",
    question: "A IA dá dicas ou responde dúvidas?",
    answer: "Sim! O Wediet possui um assistente inteligente que responde suas dúvidas sobre dieta, treino, saúde, emagrecimento e até receitas. É como ter um nutricionista digital 24h."
  },
  {
    emoji: "📊",
    question: "Como acompanho minha evolução?",
    answer: "Na aba \"Perfil\", você vê gráficos de peso, calorias ingeridas, treinos, fotos antes/depois e outras métricas para acompanhar seu progresso de forma visual e motivadora."
  },
  {
    emoji: "📱",
    question: "Funciona em qualquer celular?",
    answer: "Sim, a plataforma é 100% responsiva e pode ser acessada pelo navegador ou app. Compatível com Android, iOS e desktop."
  }
];

const FAQ = () => {
  return (
    <section className="bg-background py-4 md:py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-foreground mb-4">
            Perguntas Frequentes
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Tire suas dúvidas sobre o Wediet
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-secondary rounded-2xl border-none px-6"
              >
                <AccordionTrigger className="text-left hover:no-underline py-5">
                  <span className="flex items-center gap-3 text-foreground font-medium">
                    <span className="text-2xl">{faq.emoji}</span>
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5 pl-11">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
