import { Button } from "@/components/ui/button";
import { Link, useLocation, useNavigate } from "@/lib/router-compat";
import { type CSSProperties } from "react";
import { Home, Sparkles, Tag, HelpCircle, Search, Info, BookOpen, type LucideIcon } from "lucide-react";
import { MenuContainer, MenuItem } from "@/components/ui/stacked-menu";
import AnimatedDownloadButton from "@/components/ui/animated-download-button";

type MenuItemDef = {
  title: string;
  to: string;
  icon: LucideIcon;
  from: string;
  to2: string;
};

const menuItems: MenuItemDef[] = [
  { title: "Começar", to: "/inicio", icon: Home, from: "#a955ff", to2: "#ea51ff" },
  { title: "Funcionalidades", to: "/funcionalidades", icon: Sparkles, from: "#56CCF2", to2: "#2F80ED" },
  { title: "Preços", to: "/precos", icon: Tag, from: "#FF9966", to2: "#FF5E62" },
  { title: "Dúvidas", to: "/contato", icon: HelpCircle, from: "#ffa9c6", to2: "#f434e2" },
  { title: "Buscar", to: "/search", icon: Search, from: "hsl(var(--accent-purple))", to2: "hsl(var(--primary))" },
  { title: "Sobre", to: "/sobre", icon: Info, from: "#a8edea", to2: "#fed6e3" },
  { title: "Blog", to: "/blog", icon: BookOpen, from: "#ff9a9e", to2: "#fecfef" },
];

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="w-full px-4 md:px-8 pt-4">
      <nav className="mx-auto max-w-7xl rounded-2xl border border-white/20 bg-white/70 backdrop-blur-xl shadow-lg px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/">
            <img src="https://jkdtqihgliygacjtakor.supabase.co/storage/v1/object/public/criativos/sexando.png" alt="Sexando" className="hidden md:block h-11" />
            <img src="https://jkdtqihgliygacjtakor.supabase.co/storage/v1/object/public/criativos/logonav.png" alt="Sexando" className="md:hidden h-11" />
          </Link>

          {/* Desktop Gradient Menu */}
          <ul className="hidden md:flex items-center gap-3">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = location.pathname === item.to;
              return (
                <li
                  key={item.to}
                  style={{ ["--gf" as never]: item.from, ["--gt" as never]: item.to2 } as CSSProperties}
                  className={`relative h-12 bg-white shadow-md rounded-full flex items-center justify-center transition-all duration-500 cursor-pointer group ${
                    active ? "w-[160px] shadow-none" : "w-12 hover:w-[160px] hover:shadow-none"
                  }`}
                >
                  <Link to={item.to} className="absolute inset-0 flex items-center justify-center rounded-full overflow-hidden">
                    <span
                      className={`absolute inset-0 rounded-full bg-[linear-gradient(45deg,var(--gf),var(--gt))] transition-opacity duration-500 ${
                        active ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                      }`}
                    />
                    <Icon
                      className={`relative z-10 h-5 w-5 text-gray-500 transition-transform duration-500 ${
                        active ? "scale-0" : "group-hover:scale-0"
                      }`}
                    />
                    <span
                      className={`absolute z-10 text-white uppercase tracking-wide text-xs font-semibold transition-transform duration-500 delay-150 ${
                        active ? "scale-100" : "scale-0 group-hover:scale-100"
                      }`}
                    >
                      {item.title}
                    </span>
                  </Link>
                  <span
                    aria-hidden
                    className={`pointer-events-none absolute top-2 inset-x-0 h-full rounded-full bg-[linear-gradient(45deg,var(--gf),var(--gt))] blur-[15px] -z-10 transition-opacity duration-500 ${
                      active ? "opacity-50" : "opacity-0 group-hover:opacity-50"
                    }`}
                  />
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-3">
            <div className="hidden md:inline-block">
              <AnimatedDownloadButton href="https://app.sexando.com/signup" label="Cadastrar" />
            </div>
            <div className="md:hidden">
              <AnimatedDownloadButton href="https://app.sexando.com/signup" label="Entrar" expandedWidth={150} />
            </div>

            {/* Mobile Stacked Menu - right aligned */}
            <div className="md:hidden flex justify-end">
              <MenuContainer>
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const active = location.pathname === item.to;
                  return (
                    <MenuItem
                      key={item.to}
                      isActive={active}
                      label={item.title}
                      onClick={() => navigate(item.to)}
                      icon={<Icon className="h-5 w-5" />}
                    />
                  );
                })}
              </MenuContainer>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
