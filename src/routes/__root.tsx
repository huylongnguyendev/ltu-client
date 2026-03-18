import {
  HeadContent,
  Scripts,
  createRootRoute,
  useMatches,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { TanStackDevtools } from "@tanstack/react-devtools";
import Footer from "../components/Footer";
import { Toaster } from "sonner";
import appCss from "../styles.css?url";
import Header from "#/components/header/Header";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import baseApiClient from "#/services/base.service";
import { useAppStore } from "magos/react";
import { store } from "#/store/store";

// const THEME_INIT_SCRIPT = `(function(){try{var stored=window.localStorage.getItem('theme');var mode=(stored==='light'||stored==='dark'||stored==='auto')?stored:'auto';var prefersDark=window.matchMedia('(prefers-color-scheme: dark)').matches;var resolved=mode==='auto'?(prefersDark?'dark':'light'):mode;var root=document.documentElement;root.classList.remove('light','dark');root.classList.add(resolved);if(mode==='auto'){root.removeAttribute('data-theme')}else{root.setAttribute('data-theme',mode)}root.style.colorScheme=resolved;}catch(e){}})();`

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "TanStack Start Starter",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootDocument,
});

const queryClient = new QueryClient();

function RootDocument({ children }: { children: React.ReactNode }) {
  const matches = useMatches();
  const hideLayout = matches.some((match) => match.staticData?.hideLayout);
  const [, setUser] = useAppStore(store.user);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Gọi một API nhẹ nhàng như /auth/me hoặc /profile
        const res = await baseApiClient.get("/auth/me");
        setUser.setUser(res.data);
        // Nếu thành công, set thông tin User vào Store của ông
      } catch (err) {
        // Nếu lỗi 401, Interceptor của ông sẽ tự chạy /refresh.
        // Nếu refresh cũng tạch thì nó mới đẩy về /login.
        console.error("Chưa đăng nhập hoặc hết hạn");
      }
    };

    checkAuth();
  }, []);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} /> */}
        <HeadContent />
      </head>
      <body className="font-sans antialiased wrap-anywhere">
        <QueryClientProvider client={queryClient}>
          {!hideLayout && <Header />}
          {children}
          <Toaster richColors expand closeButton />
          {!hideLayout && <Footer />}
        </QueryClientProvider>
        <TanStackDevtools
          config={{
            position: "bottom-right",
          }}
          plugins={[
            {
              name: "Tanstack Router",
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  );
}
