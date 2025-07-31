import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'

import type { QueryClient } from '@tanstack/react-query'
import { ThemeProvider } from '@/components/layout/theme-provider'
import { AppLayout } from '@/components/layout/app-layout'

interface MyRouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <AppLayout>
          <Outlet />
        </AppLayout>
      </ThemeProvider>
    </>
  ),
})
