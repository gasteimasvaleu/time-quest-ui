-- =====================================================================
-- Montagem do banco da LP (projeto Supabase sexando-lp).
-- Recria o que o Lovable Cloud tinha (drizzle/migrations 0000-0002) e o
-- bucket blog-covers, que o Lovable criava sozinho.
-- Pode ser rodado mais de uma vez sem erro.
-- =====================================================================

-- ---------- Papéis (admin do blog) ----------
DO $$ BEGIN
  CREATE TYPE public.app_role AS ENUM ('admin', 'user');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

CREATE TABLE IF NOT EXISTS public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role public.app_role NOT NULL,
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users read own roles" ON public.user_roles;
CREATE POLICY "Users read own roles" ON public.user_roles FOR SELECT TO authenticated USING (user_id = auth.uid());

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

-- O usuário com este e-mail vira admin ao ser criado.
CREATE OR REPLACE FUNCTION public.assign_admin_role()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF lower(NEW.email) = 'caiorobbb@gmail.com' THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'admin') ON CONFLICT DO NOTHING;
  END IF;
  RETURN NEW;
END;
$$;
REVOKE EXECUTE ON FUNCTION public.assign_admin_role() FROM PUBLIC, anon, authenticated;
DROP TRIGGER IF EXISTS on_auth_user_created_assign_admin ON auth.users;
CREATE TRIGGER on_auth_user_created_assign_admin
AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.assign_admin_role();

-- ---------- Blog ----------
CREATE TABLE IF NOT EXISTS public.posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  excerpt text NOT NULL DEFAULT '',
  content text NOT NULL DEFAULT '',
  cover_url text,
  meta_title text NOT NULL DEFAULT '',
  meta_description text NOT NULL DEFAULT '',
  keywords text[] NOT NULL DEFAULT '{}',
  status text NOT NULL DEFAULT 'draft',
  published_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.posts TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.posts TO authenticated;
GRANT ALL ON public.posts TO service_role;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public reads published" ON public.posts;
DROP POLICY IF EXISTS "Admins read all" ON public.posts;
DROP POLICY IF EXISTS "Admins insert" ON public.posts;
DROP POLICY IF EXISTS "Admins update" ON public.posts;
DROP POLICY IF EXISTS "Admins delete" ON public.posts;
CREATE POLICY "Public reads published" ON public.posts FOR SELECT TO anon, authenticated USING (status = 'published');
CREATE POLICY "Admins read all" ON public.posts FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins insert" ON public.posts FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update" ON public.posts FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete" ON public.posts FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE OR REPLACE FUNCTION public.posts_before_write()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
  IF NEW.status NOT IN ('draft','published') THEN RAISE EXCEPTION 'invalid status'; END IF;
  NEW.updated_at = now();
  IF NEW.status = 'published' AND NEW.published_at IS NULL THEN NEW.published_at = now(); END IF;
  RETURN NEW;
END;
$$;
DROP TRIGGER IF EXISTS posts_before_write ON public.posts;
CREATE TRIGGER posts_before_write BEFORE INSERT OR UPDATE ON public.posts FOR EACH ROW EXECUTE FUNCTION public.posts_before_write();

-- ---------- Leads (formulário público; ninguém lê pela API) ----------
CREATE TABLE IF NOT EXISTS public.leads (
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
DROP POLICY IF EXISTS "Anyone can insert leads" ON public.leads;
CREATE POLICY "Anyone can insert leads" ON public.leads FOR INSERT TO anon, authenticated WITH CHECK (true);

-- ---------- Capas do blog (bucket público) ----------
INSERT INTO storage.buckets (id, name, public)
VALUES ('blog-covers', 'blog-covers', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Public read blog covers" ON storage.objects;
DROP POLICY IF EXISTS "Admin insert blog covers" ON storage.objects;
DROP POLICY IF EXISTS "Admin update blog covers" ON storage.objects;
DROP POLICY IF EXISTS "Admin delete blog covers" ON storage.objects;
CREATE POLICY "Public read blog covers" ON storage.objects FOR SELECT USING (bucket_id = 'blog-covers');
CREATE POLICY "Admin insert blog covers" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'blog-covers' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admin update blog covers" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'blog-covers' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admin delete blog covers" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'blog-covers' AND public.has_role(auth.uid(), 'admin'));
