import { useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Mail, Smartphone, Apple, Chrome, AlertTriangle, Download } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useConfetti } from "@/hooks/use-confetti";

const Obrigado = () => {
  const { fireRealistic } = useConfetti();

  useEffect(() => {
    fireRealistic();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-background to-primary/5">
      <Navbar />
      
      <section className="container mx-auto px-4 py-16 md:py-24">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-5xl mx-auto space-y-8"
        >
          {/* Hero de Sucesso */}
          <motion.div variants={itemVariants} className="text-center space-y-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-block"
            >
              <CheckCircle2 className="w-24 h-24 text-green-500 mx-auto" />
            </motion.div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Parabéns! Sua compra foi confirmada! 🎉
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Obrigado por confiar no Wediet. Estamos muito felizes em tê-lo(a) conosco nessa jornada de transformação!. Estamos muito felizes em tê-lo(a) conosco nessa jornada de transformação!
            </p>
          </motion.div>

          {/* Card: Verifique seu Email */}
          <motion.div variants={itemVariants}>
            <Card className="border-2 border-primary/20 shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-green-500/5 via-background to-blue-500/5">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 text-white">
                    <Mail className="w-8 h-8" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-2xl mb-2">Verifique seu Email</CardTitle>
                    <CardDescription className="text-base">
                      Em até 5 minutos você receberá um email com as instruções para criar seu cadastro e acessar o aplicativo.
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-3 p-4 rounded-lg bg-orange-500/10 border border-orange-500/20">
                  <AlertTriangle className="w-6 h-6 text-orange-500 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-orange-700 dark:text-orange-400 mb-1">
                      Importante: Verifique sua caixa de spam!
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Caso não encontre o email na sua caixa de entrada, verifique as pastas de <strong>Spam</strong>, <strong>Lixo Eletrônico</strong> ou <strong>Promoções</strong>.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Título da Seção PWA */}
          <motion.div variants={itemVariants} className="text-center pt-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              Instale o App no seu Celular
            </h2>
            <p className="text-muted-foreground">
              Tenha acesso rápido ao Wediet direto da tela inicial do seu dispositivo direto da tela inicial do seu dispositivo
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Card: iOS Installation */}
            <motion.div variants={itemVariants}>
              <Card className="border-2 border-primary/20 shadow-lg hover:shadow-xl transition-shadow h-full bg-gradient-to-br from-blue-500/5 via-background to-indigo-500/5">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-lg bg-gradient-to-br from-slate-700 to-slate-900 text-white">
                      <Apple className="w-8 h-8" />
                    </div>
                    <CardTitle className="text-2xl">iPhone / iPad</CardTitle>
                  </div>
                  <CardDescription>
                    Siga os passos abaixo para instalar no Safari
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <StepItem number={1} text="Abra o Safari e acesse app.dietainteligente.app" />
                    <StepItem number={2} text='Toque no ícone de compartilhamento (📤) na parte inferior' />
                    <StepItem number={3} text='Role para baixo e selecione "Adicionar à Tela de Início"' />
                    <StepItem number={4} text='Confirme tocando em "Adicionar"' />
                    
                    <div className="pt-4 flex items-center gap-2 text-sm text-muted-foreground">
                      <Download className="w-4 h-4" />
                      <span>Pronto! O ícone aparecerá na sua tela inicial</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Card: Android Installation */}
            <motion.div variants={itemVariants}>
              <Card className="border-2 border-primary/20 shadow-lg hover:shadow-xl transition-shadow h-full bg-gradient-to-br from-green-500/5 via-background to-emerald-500/5">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 text-white">
                      <Chrome className="w-8 h-8" />
                    </div>
                    <CardTitle className="text-2xl">Android</CardTitle>
                  </div>
                  <CardDescription>
                    Siga os passos abaixo para instalar no Chrome
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <StepItem number={1} text="Abra o Chrome e acesse app.dietainteligente.app" />
                    <StepItem number={2} text="Toque nos 3 pontinhos (⋮) no canto superior direito" />
                    <StepItem number={3} text='Selecione "Instalar aplicativo" ou "Adicionar à tela inicial"' />
                    <StepItem number={4} text='Confirme a instalação tocando em "Instalar"' />
                    
                    <div className="pt-4 flex items-center gap-2 text-sm text-muted-foreground">
                      <Download className="w-4 h-4" />
                      <span>Pronto! O app será instalado no seu celular</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Card de Suporte */}
          <motion.div variants={itemVariants}>
            <Card className="border-2 border-primary/20 shadow-lg bg-gradient-to-br from-purple-500/5 via-background to-pink-500/5">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 text-white">
                    <Smartphone className="w-8 h-8" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">Precisa de Ajuda?</CardTitle>
                    <CardDescription className="text-base">
                      Nossa equipe está pronta para ajudá-lo(a)
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Se você tiver qualquer dúvida sobre o processo de instalação ou cadastro, 
                  não hesite em entrar em contato conosco através do email de suporte que você receberá.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
};

// Componente auxiliar para os passos
const StepItem = ({ number, text }: { number: number; text: string }) => (
  <div className="flex items-start gap-3">
    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
      {number}
    </div>
    <p className="text-sm pt-1 flex-1">{text}</p>
  </div>
);

export default Obrigado;
