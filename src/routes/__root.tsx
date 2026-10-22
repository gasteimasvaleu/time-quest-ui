import { useEffect, type ReactNode } from "react";
import { QueryClientProvider, type QueryClient } from "@tanstack/react-query";
import {
  createRootRouteWithContext,
  HeadContent,
  Link,
  Outlet,
  Scripts,
  useRouter,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import FloatingDock from "@/components/FloatingDock";
import NotFound from "@/pages/NotFound";
import { reportLovableError } from "@/lib/lovable-error-reporting";
import appCss from "../styles.css?url";

const GTM = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-5ZS2KN3M');`;

const GTAG = `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'GT-WKPX97JL');
function gtagSendEvent(url) {
  gtag('event', 'sign_up_click', {
    event_callback: function () { window.location.href = url || 'https://app.sexando.com/signup'; },
    event_timeout: 2000
  });
  return false;
}`;

const META_PIXEL = `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '1516924189927799');
fbq('track', 'PageView');`;

const ORG_JSONLD = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Sexando",
  url: "https://sexando.com/",
  description: "Sexando é a rede social brasileira para casais liberais, solteiros(as) e o universo swing.",
  logo: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/c975a317-cb71-4059-aeeb-66d3fa2679bf",
});

const DEFAULT_TITLE = "Sexando – Rede social para casais liberais e swing";
const DEFAULT_DESC =
  "Sexando é a rede social brasileira para casais liberais, solteiros(as) e o universo swing. Perfis verificados, comunidade, lives e total privacidade.";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: DEFAULT_TITLE },
      { name: "description", content: DEFAULT_DESC },
      { name: "author", content: "Sexando" },
      { name: "rating", content: "adult" },
      { name: "facebook-domain-verification", content: "hnfvcfwg9jhw6itx588vlgnokii912" },
      { property: "og:site_name", content: "Sexando" },
      { property: "og:locale", content: "pt_BR" },
      { property: "og:type", content: "website" },
      { property: "og:title", content: DEFAULT_TITLE },
      { property: "og:description", content: DEFAULT_DESC },
      { property: "og:image", content: "https://sexando.com/og-image.jpg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@Sexando" },
      { name: "twitter:image", content: "https://sexando.com/og-image.jpg" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap",
      },
    ],
    scripts: [
      { children: GTM },
      { src: "https://www.googletagmanager.com/gtag/js?id=GT-WKPX97JL", async: true },
      { children: GTAG },
      { children: META_PIXEL },
      { type: "application/ld+json", children: ORG_JSONLD },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFound,
  errorComponent: RootError,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5ZS2KN3M"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            alt=""
            src="https://www.facebook.com/tr?id=1516924189927799&ev=PageView&noscript=1"
          />
        </noscript>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Outlet />
        <FloatingDock />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

function RootError({ error, reset }: ErrorComponentProps) {
  const router = useRouter();
  useEffect(() => {
    console.error(error);
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 text-foreground">
      <div className="max-w-md text-center">
        <h1 className="text-2xl font-semibold">Esta página não carregou</h1>
        <p className="mt-2 text-muted-foreground">Algo deu errado. Tente novamente ou volte para o início.</p>
        <div className="mt-6 flex justify-center gap-2">
          <button
            className="rounded-full bg-primary px-5 py-2 text-primary-foreground"
            onClick={() => {
              router.invalidate();
              reset();
            }}
          >
            Tentar de novo
          </button>
          <Link to="/" className="rounded-full border border-border px-5 py-2">
            Ir para o início
          </Link>
        </div>
      </div>
    </div>
  );
}
