import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/allocation')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/allocation"!</div>
}
