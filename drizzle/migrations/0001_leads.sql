CREATE TABLE public.leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  sex text NOT NULL,
  age integer NOT NULL,
  email text NOT NULL,
  cuidado_alimentacao text,
  controle_alimentar text,
  objetivo_alimentacao text,
  dificuldade_alimentacao text,
  interesse_app text,
  source text NOT NULL DEFAULT 'monte_sua_dieta',
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.leads TO anon, authenticated;
GRANT ALL ON public.leads TO service_role;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can insert leads" ON public.leads FOR INSERT TO anon, authenticated WITH CHECK (true);