import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Header } from "../components/Header";

const RootLayout = () => (
  <>
    <Header />
    <main className="pt-24 pb-12 px-6 md:px-12">
      <div className="flex-1 px-6 py-10 pb-32 md:px-12 md:pb-20">
        <Outlet />
      </div>
    </main>
    <TanStackRouterDevtools />
  </>
);

export const Route = createRootRoute({ component: RootLayout });
