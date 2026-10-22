import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowRight, ArrowLeft, Check, Sparkles, User, Users, Calendar, Mail, Utensils, ClipboardList, Target, AlertCircle, Smartphone, PartyPopper, MessageCircle, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useConfetti } from "@/hooks/use-confetti";
import { z } from "zod";
import { cn } from "@/lib/utils";

interface LeadCaptureModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const leadSchema = z.object({
  name: z.string().trim().min(2, "Nome muito curto").max(100, "Nome muito longo"),
  sex: z.enum(["masculino", "feminino"], { required_error: "Selecione uma opção" }),
  age: z.number().min(18, "Idade mínima: 18 anos").max(100, "Idade máxima: 100 anos"),
  email: z.string().trim().email("Email inválido").max(255, "Email muito longo"),
});

const LeadCaptureModal = ({ open, onOpenChange }: LeadCaptureModalProps) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    sex: "",
    age: "",
    email: "",
    cuidado_alimentacao: "",
    controle_alimentar: "",
    objetivo_alimentacao: "",
    dificuldade_alimentacao: "",
    interesse_app: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { fireContinuous, fireRealistic } = useConfetti();

  const totalSteps = 9;
  const WHATSAPP_LINK = "https://wa.me/5583999187322?text=dieta";

  useEffect(() => {
    if (step === 10) {
      setTimeout(() => {
        fireContinuous();
      }, 100);
    }
  }, [step, fireContinuous]);

  const getStepIcon = (currentStep: number) => {
    const icons = {
      1: <User className="w-8 h-8" />,
      2: <Users className="w-8 h-8" />,
      3: <Calendar className="w-8 h-8" />,
      4: <Mail className="w-8 h-8" />,
      5: <Utensils className="w-8 h-8" />,
      6: <ClipboardList className="w-8 h-8" />,
      7: <Target className="w-8 h-8" />,
      8: <AlertCircle className="w-8 h-8" />,
      9: <Smartphone className="w-8 h-8" />,
      10: <PartyPopper className="w-8 h-8" />,
    };
    return icons[currentStep as keyof typeof icons];
  };

  const getStepSubtitle = (currentStep: number) => {
    const subtitles = {
      1: "Vamos nos conhecer melhor",
      2: "Personalizando para você",
      3: "Quase lá!",
      4: "Para enviarmos sua dieta",
      5: "Sobre seus hábitos",
      6: "Entendendo sua rotina",
      7: "Definindo seus objetivos",
      8: "Identificando desafios",
      9: "Última pergunta!",
      10: "Parabéns! 🎉",
    };
    return subtitles[currentStep as keyof typeof subtitles];
  };

  const validateStep = () => {
    try {
      setErrors({});
      
      switch (step) {
        case 1:
          leadSchema.pick({ name: true }).parse({ name: formData.name });
          break;
        case 2:
          leadSchema.pick({ sex: true }).parse({ sex: formData.sex });
          break;
        case 3:
          leadSchema.pick({ age: true }).parse({ age: parseInt(formData.age) });
          break;
        case 4:
          leadSchema.pick({ email: true }).parse({ email: formData.email });
          break;
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
          const fieldMap: Record<number, keyof typeof formData> = {
            5: 'cuidado_alimentacao',
            6: 'controle_alimentar',
            7: 'objetivo_alimentacao',
            8: 'dificuldade_alimentacao',
            9: 'interesse_app',
          };
          const field = fieldMap[step];
          if (!field) return false;
          if (!formData[field]) {
            setErrors({ [field]: "Por favor, selecione uma opção" });
            return false;
          }
          break;
      }
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(fieldErrors);
      }
      return false;
    }
  };

  const handleNext = async () => {
    if (!validateStep()) return;

    if (step === totalSteps) {
      setIsSubmitting(true);
      try {
        const { error } = await supabase.from("leads").insert({
          name: formData.name,
          sex: formData.sex,
          age: parseInt(formData.age),
          email: formData.email,
          cuidado_alimentacao: formData.cuidado_alimentacao,
          controle_alimentar: formData.controle_alimentar,
          objetivo_alimentacao: formData.objetivo_alimentacao,
          dificuldade_alimentacao: formData.dificuldade_alimentacao,
          interesse_app: formData.interesse_app,
          source: "monte_sua_dieta",
        });

        if (error) throw error;

        fireRealistic();
        setStep(10);
        toast({
          title: "Dados salvos!",
          description: "Agora vamos te direcionar para o WhatsApp 🎉",
        });
      } catch (error) {
        console.error("Erro ao salvar lead:", error);
        toast({
          title: "Erro ao salvar",
          description: "Tente novamente em alguns instantes",
          variant: "destructive",
        });
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleWhatsApp = () => {
    window.open(WHATSAPP_LINK, "_blank");
    setTimeout(() => {
      handleClose();
    }, 500);
  };

  const handleClose = () => {
    setStep(1);
    setFormData({ 
      name: "", 
      sex: "", 
      age: "", 
      email: "",
      cuidado_alimentacao: "",
      controle_alimentar: "",
      objetivo_alimentacao: "",
      dificuldade_alimentacao: "",
      interesse_app: "",
    });
    setErrors({});
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px] max-w-[calc(100%-2rem)] max-h-[90vh] p-0 overflow-hidden flex flex-col rounded-2xl bg-background/95 backdrop-blur-sm">
        {/* Header Rosa Choque */}
        {step <= totalSteps && (
          <div className="flex-shrink-0 relative overflow-hidden bg-[hsl(330,100%,50%)] p-4 sm:p-6">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white/20 backdrop-blur rounded-full flex items-center justify-center mx-auto mb-3 text-white">
              {getStepIcon(step)}
            </div>
            <div className="bg-[hsl(0,0%,96%)] rounded-2xl p-4 text-center">
              <h2 className="text-xl sm:text-2xl font-bold text-foreground">Monte sua Dieta Grátis</h2>
              <p className="text-muted-foreground text-sm mt-1">{getStepSubtitle(step)}</p>
            </div>
          </div>
        )}

        {/* Progress Bar Visual */}
        {step <= totalSteps && (
          <div className="flex-shrink-0 px-4 sm:px-6 py-3 bg-muted/50">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-muted-foreground">
                Passo {step} de {totalSteps}
              </span>
              <span className="text-sm font-bold text-primary">
                {Math.round((step / totalSteps) * 100)}%
              </span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-[hsl(330,100%,50%)] rounded-full transition-all duration-500 ease-out"
                style={{ width: `${(step / totalSteps) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Step Content - Scrollable */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {step === 1 && (
            <div className="space-y-4 animate-slide-in">
              <div>
                <Label htmlFor="name" className="text-lg mb-2 block">
                  Qual é o seu nome?
                </Label>
                <Input
                  id="name"
                  placeholder="Digite seu nome completo"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="text-lg py-6"
                  autoFocus
                />
                {errors["name"] && (
                  <p className="text-sm text-destructive mt-2">{errors["name"]}</p>
                )}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4 animate-slide-in">
              <Label className="text-lg mb-4 block">Qual é o seu sexo?</Label>
              <RadioGroup
                value={formData.sex}
                onValueChange={(value) => setFormData({ ...formData, sex: value })}
                className="space-y-3"
              >
                {[
                  { value: "masculino", emoji: "👨", label: "Masculino" },
                  { value: "feminino", emoji: "👩", label: "Feminino" },
                ].map((option) => {
                  const isSelected = formData.sex === option.value;
                  return (
                    <label
                      key={option.value}
                       className={cn(
                         "relative flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl border-2 cursor-pointer transition-all duration-300",
                         "hover:border-primary hover:bg-primary/5 hover:scale-[1.02]",
                         isSelected
                           ? "border-primary bg-primary/10 shadow-lg shadow-primary/20"
                           : "border-border bg-card"
                       )}
                     >
                       <div className={cn(
                         "w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-xl sm:text-2xl transition-all",
                         isSelected ? "bg-primary text-white" : "bg-muted"
                       )}>
                         {option.emoji}
                       </div>
                       <div className="flex-1">
                         <span className="font-medium text-sm sm:text-base">{option.label}</span>
                       </div>
                      <RadioGroupItem value={option.value} id={option.value} className="sr-only" />
                      <div className={cn(
                        "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all",
                        isSelected ? "border-primary bg-primary" : "border-muted-foreground/30"
                      )}>
                        {isSelected && <Check className="w-4 h-4 text-white" />}
                      </div>
                    </label>
                  );
                })}
              </RadioGroup>
              {errors["sex"] && (
                <p className="text-sm text-destructive mt-2">{errors["sex"]}</p>
              )}
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4 animate-slide-in">
              <div>
                <Label htmlFor="age" className="text-lg mb-2 block">
                  Qual é a sua idade?
                </Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="Digite sua idade"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  className="text-lg py-6"
                  min="18"
                  max="100"
                  autoFocus
                />
                {errors["age"] && (
                  <p className="text-sm text-destructive mt-2">{errors["age"]}</p>
                )}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4 animate-slide-in">
              <div>
                <Label htmlFor="email" className="text-lg mb-2 block">
                  Qual é o seu email?
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="text-lg py-6"
                  autoFocus
                />
                {errors["email"] && (
                  <p className="text-sm text-destructive mt-2">{errors["email"]}</p>
                )}
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-4 animate-slide-in">
              <Label className="text-lg mb-4 block">
                {formData.name ? `${formData.name.split(' ')[0]}, como` : "Como"} você costuma cuidar da sua alimentação hoje em dia?
              </Label>
              <RadioGroup
                value={formData.cuidado_alimentacao}
                onValueChange={(value) => setFormData({ ...formData, cuidado_alimentacao: value })}
                className="space-y-3"
              >
                {[
                  { value: "nutricionista", emoji: "🥗", label: "Sigo uma dieta com ajuda de nutricionista" },
                  { value: "sozinho", emoji: "🤔", label: "Tento controlar sozinho, mas não sigo nada muito certo" },
                  { value: "sem_planejamento", emoji: "🍕", label: "Como o que dá na hora, sem muito planejamento" },
                ].map((option) => {
                  const isSelected = formData.cuidado_alimentacao === option.value;
                  return (
                    <label
                      key={option.value}
                       className={cn(
                         "relative flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl border-2 cursor-pointer transition-all duration-300",
                         "hover:border-primary hover:bg-primary/5 hover:scale-[1.02]",
                         isSelected
                           ? "border-primary bg-primary/10 shadow-lg shadow-primary/20"
                           : "border-border bg-card"
                       )}
                     >
                       <div className={cn(
                         "w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-xl sm:text-2xl transition-all",
                         isSelected ? "bg-primary text-white" : "bg-muted"
                       )}>
                         {option.emoji}
                       </div>
                       <div className="flex-1">
                         <span className="font-medium text-sm sm:text-base">{option.label}</span>
                       </div>
                       <RadioGroupItem value={option.value} id={option.value} className="sr-only" />
                       <div className={cn(
                         "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all",
                         isSelected ? "border-primary bg-primary" : "border-muted-foreground/30"
                       )}>
                         {isSelected && <Check className="w-4 h-4 text-white" />}
                       </div>
                     </label>
                   );
                 })}
               </RadioGroup>
               {errors["cuidado_alimentacao"] && (
                 <p className="text-sm text-destructive mt-2">{errors["cuidado_alimentacao"]}</p>
               )}
             </div>
           )}

           {step === 6 && (
             <div className="space-y-4 animate-slide-in">
               <Label className="text-lg mb-4 block">Você já tentou anotar ou controlar tudo que come?</Label>
               <RadioGroup
                 value={formData.controle_alimentar}
                 onValueChange={(value) => setFormData({ ...formData, controle_alimentar: value })}
                 className="space-y-3"
               >
                 {[
                   { value: "tentei_dificil", emoji: "😅", label: "Sim, mas é difícil manter esse hábito" },
                   { value: "nunca_tentei", emoji: "💡", label: "Nunca tentei, mas acho que seria bom" },
                   { value: "funciona_bem", emoji: "✅", label: "Sim, e funciona bem pra mim" },
                 ].map((option) => {
                   const isSelected = formData.controle_alimentar === option.value;
                   return (
                     <label
                       key={option.value}
                       className={cn(
                         "relative flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl border-2 cursor-pointer transition-all duration-300",
                         "hover:border-primary hover:bg-primary/5 hover:scale-[1.02]",
                         isSelected
                           ? "border-primary bg-primary/10 shadow-lg shadow-primary/20"
                           : "border-border bg-card"
                       )}
                     >
                       <div className={cn(
                         "w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-xl sm:text-2xl transition-all",
                         isSelected ? "bg-primary text-white" : "bg-muted"
                       )}>
                         {option.emoji}
                       </div>
                       <div className="flex-1">
                         <span className="font-medium text-sm sm:text-base">{option.label}</span>
                       </div>
                       <RadioGroupItem value={option.value} id={option.value} className="sr-only" />
                       <div className={cn(
                         "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all",
                         isSelected ? "border-primary bg-primary" : "border-muted-foreground/30"
                       )}>
                         {isSelected && <Check className="w-4 h-4 text-white" />}
                       </div>
                     </label>
                   );
                 })}
               </RadioGroup>
               {errors["controle_alimentar"] && (
                 <p className="text-sm text-destructive mt-2">{errors["controle_alimentar"]}</p>
               )}
             </div>
           )}

           {step === 7 && (
             <div className="space-y-4 animate-slide-in">
               <Label className="text-lg mb-4 block">Qual é o seu principal objetivo com a alimentação?</Label>
               <RadioGroup
                 value={formData.objetivo_alimentacao}
                 onValueChange={(value) => setFormData({ ...formData, objetivo_alimentacao: value })}
                 className="space-y-3"
               >
                 {[
                   { value: "emagrecer_manter", emoji: "⚖️", label: "Emagrecer ou manter o peso" },
                   { value: "saude_disposicao", emoji: "💪", label: "Ter mais saúde e disposição" },
                   { value: "sem_objetivo", emoji: "🤷", label: "Não tenho nenhum objetivo claro ainda" },
                 ].map((option) => {
                   const isSelected = formData.objetivo_alimentacao === option.value;
                   return (
                     <label
                       key={option.value}
                       className={cn(
                         "relative flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl border-2 cursor-pointer transition-all duration-300",
                         "hover:border-primary hover:bg-primary/5 hover:scale-[1.02]",
                         isSelected
                           ? "border-primary bg-primary/10 shadow-lg shadow-primary/20"
                           : "border-border bg-card"
                       )}
                     >
                       <div className={cn(
                         "w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-xl sm:text-2xl transition-all",
                         isSelected ? "bg-primary text-white" : "bg-muted"
                       )}>
                         {option.emoji}
                       </div>
                       <div className="flex-1">
                         <span className="font-medium text-sm sm:text-base">{option.label}</span>
                       </div>
                       <RadioGroupItem value={option.value} id={option.value} className="sr-only" />
                       <div className={cn(
                         "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all",
                         isSelected ? "border-primary bg-primary" : "border-muted-foreground/30"
                       )}>
                         {isSelected && <Check className="w-4 h-4 text-white" />}
                       </div>
                     </label>
                   );
                 })}
               </RadioGroup>
               {errors["objetivo_alimentacao"] && (
                 <p className="text-sm text-destructive mt-2">{errors["objetivo_alimentacao"]}</p>
               )}
             </div>
           )}

           {step === 8 && (
             <div className="space-y-4 animate-slide-in">
               <Label className="text-lg mb-4 block">O que mais te atrapalha em seguir uma alimentação saudável?</Label>
               <RadioGroup
                 value={formData.dificuldade_alimentacao}
                 onValueChange={(value) => setFormData({ ...formData, dificuldade_alimentacao: value })}
                 className="space-y-3"
               >
                 {[
                   { value: "falta_tempo", emoji: "⏰", label: "Falta de tempo para planejar refeições" },
                   { value: "nao_sei_comer", emoji: "❓", label: "Não sei o que comer no dia a dia" },
                   { value: "nada_funciona", emoji: "😩", label: "Já tentei de tudo e nada funciona" },
                 ].map((option) => {
                   const isSelected = formData.dificuldade_alimentacao === option.value;
                   return (
                     <label
                       key={option.value}
                       className={cn(
                         "relative flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl border-2 cursor-pointer transition-all duration-300",
                         "hover:border-primary hover:bg-primary/5 hover:scale-[1.02]",
                         isSelected
                           ? "border-primary bg-primary/10 shadow-lg shadow-primary/20"
                           : "border-border bg-card"
                       )}
                     >
                       <div className={cn(
                         "w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-xl sm:text-2xl transition-all",
                         isSelected ? "bg-primary text-white" : "bg-muted"
                       )}>
                         {option.emoji}
                       </div>
                       <div className="flex-1">
                         <span className="font-medium text-sm sm:text-base">{option.label}</span>
                       </div>
                       <RadioGroupItem value={option.value} id={option.value} className="sr-only" />
                       <div className={cn(
                         "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all",
                         isSelected ? "border-primary bg-primary" : "border-muted-foreground/30"
                       )}>
                         {isSelected && <Check className="w-4 h-4 text-white" />}
                       </div>
                     </label>
                   );
                 })}
               </RadioGroup>
               {errors["dificuldade_alimentacao"] && (
                 <p className="text-sm text-destructive mt-2">{errors["dificuldade_alimentacao"]}</p>
               )}
             </div>
           )}

           {step === 9 && (
             <div className="space-y-4 animate-slide-in">
               <Label className="text-lg mb-4 block">Se você pudesse ter um app que escaneia sua comida, avalia e ainda gera um cardápio do seu jeito, você usaria?</Label>
               <RadioGroup
                 value={formData.interesse_app}
                 onValueChange={(value) => setFormData({ ...formData, interesse_app: value })}
                 className="space-y-3"
               >
                 {[
                   { value: "com_certeza", emoji: "🚀", label: "Com certeza, isso facilitaria muito minha vida" },
                   { value: "talvez", emoji: "💰", label: "Talvez, dependendo do preço" },
                   { value: "nao_sei", emoji: "🤔", label: "Não sei se funcionaria pra mim" },
                 ].map((option) => {
                   const isSelected = formData.interesse_app === option.value;
                   return (
                     <label
                       key={option.value}
                       className={cn(
                         "relative flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl border-2 cursor-pointer transition-all duration-300",
                         "hover:border-primary hover:bg-primary/5 hover:scale-[1.02]",
                         isSelected
                           ? "border-primary bg-primary/10 shadow-lg shadow-primary/20"
                           : "border-border bg-card"
                       )}
                     >
                       <div className={cn(
                         "w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-xl sm:text-2xl transition-all",
                         isSelected ? "bg-primary text-white" : "bg-muted"
                       )}>
                         {option.emoji}
                       </div>
                       <div className="flex-1">
                         <span className="font-medium text-sm sm:text-base">{option.label}</span>
                       </div>
                       <RadioGroupItem value={option.value} id={option.value} className="sr-only" />
                       <div className={cn(
                         "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all",
                         isSelected ? "border-primary bg-primary" : "border-muted-foreground/30"
                       )}>
                         {isSelected && <Check className="w-4 h-4 text-white" />}
                       </div>
                     </label>
                   );
                 })}
               </RadioGroup>
               {errors["interesse_app"] && (
                 <p className="text-sm text-destructive mt-2">{errors["interesse_app"]}</p>
               )}
             </div>
           )}

           {step === 10 && (
             <div className="text-center space-y-6 animate-fade-in">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto animate-bounce">
                  <Check className="w-12 h-12 text-white" />
                </div>
                <Sparkles className="absolute top-0 left-1/4 w-6 h-6 text-yellow-400 animate-pulse" />
                <Sparkles className="absolute top-4 right-1/4 w-4 h-4 text-pink-400 animate-pulse" style={{ animationDelay: '0.2s' }} />
              </div>
              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
                  Parabéns, {formData.name.split(' ')[0]}!
                </h3>
                <p className="text-muted-foreground mt-2">
                  Seus dados foram salvos. Agora é só clicar abaixo para receber sua dieta personalizada no WhatsApp!
                </p>
              </div>
              <Button
                onClick={handleWhatsApp}
                size="lg"
                className="w-full py-6 text-lg bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 shadow-lg shadow-green-500/30"
              >
                <MessageCircle className="mr-3 h-6 w-6" />
                Receber Dieta no WhatsApp
              </Button>
            </div>
          )}
        </div>

        {/* Navigation Buttons - Fixed at bottom */}
        {step <= totalSteps && (
          <div className="flex-shrink-0 flex gap-3 p-4 sm:p-6 pt-3 border-t bg-background">
            {step > 1 && (
              <Button
                variant="ghost"
                onClick={handleBack}
                disabled={isSubmitting}
                className="flex-1 py-6"
              >
                <ArrowLeft className="mr-2 h-5 w-5" />
                Voltar
              </Button>
            )}
            <Button
              onClick={handleNext}
              disabled={isSubmitting}
              className={cn(
                "flex-1 py-6 transition-all",
                step === totalSteps 
                  ? "bg-gradient-to-r from-primary to-pink-500 hover:opacity-90" 
                  : ""
              )}
            >
              {step === totalSteps ? (
                isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Salvando...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-5 w-5" />
                    Finalizar
                  </>
                )
              ) : (
                <>
                  Continuar
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default LeadCaptureModal;
