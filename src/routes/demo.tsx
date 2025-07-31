import { DemoPage } from '@/components/pages/demo-page'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/demo')({
  component: DemoPage,
})