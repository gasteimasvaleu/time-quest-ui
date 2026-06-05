import { TestimonialsColumn } from "@/components/ui/testimonials-columns";
import { motion } from "framer-motion";

const testimonials = [
  {
    text: "O app mudou completamente minha relação com a comida. A análise por foto é incrível e me ajudou a entender o que realmente estou comendo!",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    name: "Ana Carolina",
    role: "Perdeu 12kg em 4 meses",
  },
  {
    text: "Como atleta, preciso controlar meus macros com precisão. O Wediet é a ferramenta perfeita para isso. O scanner de código de barras economiza muito tempo!",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    name: "Ricardo Santos",
    role: "Atleta amador",
  },
  {
    text: "Consegui melhorar a alimentação de toda a família. O MasterChefit me ajuda a criar cardápios saudáveis que as crianças adoram!",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    name: "Marina Oliveira",
    role: "Mãe de 2 filhos",
  },
  {
    text: "Indico o app para todos os meus alunos. A precisão no tracking de nutrientes e a facilidade de uso fazem toda a diferença nos resultados.",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
    name: "João Pedro Silva",
    role: "Personal Trainer",
  },
  {
    text: "Como nutricionista, recomendo o Wediet pela praticidade do scanner e relatórios detalhados. Meus pacientes adoram a simplicidade!",
    image: "https://randomuser.me/api/portraits/women/5.jpg",
    name: "Fernanda Costa",
    role: "Nutricionista",
  },
  {
    text: "Na correria da faculdade, o app me ajuda a manter uma alimentação equilibrada. O planejamento de refeições é perfeito para estudantes!",
    image: "https://randomuser.me/api/portraits/men/6.jpg",
    name: "Lucas Mendes",
    role: "Estudante",
  },
  {
    text: "Com a rotina agitada de empresária, consegui finalmente organizar minha alimentação. O app é intuitivo e os resultados aparecem rapidamente!",
    image: "https://randomuser.me/api/portraits/women/7.jpg",
    name: "Patricia Almeida",
    role: "Empresária",
  },
  {
    text: "O tracking de macros é extremamente preciso. Como desenvolvedor, aprecio a interface limpa e a tecnologia por trás do reconhecimento de alimentos.",
    image: "https://randomuser.me/api/portraits/men/8.jpg",
    name: "Thiago Rodrigues",
    role: "Desenvolvedor",
  },
  {
    text: "O planejamento semanal de cardápios me economiza horas. Agora consigo conciliar minha rotina de professora com uma alimentação saudável!",
    image: "https://randomuser.me/api/portraits/women/9.jpg",
    name: "Camila Santos",
    role: "Professora",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

const Testimonials = () => {
  return (
    <section className="bg-background py-4 md:py-20 relative">
      <div className="container z-10 mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-[540px] mx-auto"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-foreground">
            Nossos Depoimentos
          </h2>
          <p className="text-center mt-5 text-muted-foreground">
            Milhares de pessoas já transformaram suas vidas Milhares de pessoas já transformaram suas vidas com o Wediet
          </p>
        </motion.div>

        <div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
