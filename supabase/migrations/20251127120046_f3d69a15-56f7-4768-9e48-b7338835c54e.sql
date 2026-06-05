-- Create leads table for lead capture
CREATE TABLE public.leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  sex TEXT NOT NULL CHECK (sex IN ('masculino', 'feminino')),
  age INTEGER NOT NULL CHECK (age >= 18 AND age <= 100),
  email TEXT NOT NULL,
  source TEXT NOT NULL DEFAULT 'monte_sua_dieta',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert leads (public form)
CREATE POLICY "Anyone can insert leads"
ON public.leads
FOR INSERT
WITH CHECK (true);

-- Create policy to prevent public reading (only admins can read via service role)
CREATE POLICY "No public read access"
ON public.leads
FOR SELECT
USING (false);

-- Create index on email for faster lookups
CREATE INDEX idx_leads_email ON public.leads(email);

-- Create index on created_at for analytics
CREATE INDEX idx_leads_created_at ON public.leads(created_at DESC);