import { Card, CardContent } from '@/components/ui/card'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <div className="w-full">
      <div className="grid m-4">
        <Card className="dark:bg-gray-900">
          <CardContent className="p-4">
            <div className="grid gap-2">
              <div className="flex flex-col items-center gap-4">
                <p className="text-2xl font-semibold">Hello! This is your React, Tanstack Boilerplate v0</p>
                <p className="text-muted-foreground">
                  This application uses React, Tanstack (Router, Query, Form), TaiwindCSS (with Shadcn), Zod, Zustand. This is still in development and still lack a lot of functionalities and components,
                  so please do not use if your not patient enough to debug and fix errors.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
