import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Inicio from "./pages/Inicio";
import Contato from "./pages/Contato";
import Funcionalidades from "./pages/Funcionalidades";
import Precos from "./pages/Precos";
import Obrigado from "./pages/Obrigado";
import NotFound from "./pages/NotFound";
import MobileApp from "./pages/MobileApp";
import FloatingDock from "./components/FloatingDock";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="/funcionalidades" element={<Funcionalidades />} />
          <Route path="/precos" element={<Precos />} />
          <Route path="/obrigado" element={<Obrigado />} />
          <Route path="/mobileapp" element={<MobileApp />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <FloatingDock />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
