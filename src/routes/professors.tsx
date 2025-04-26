import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/professors')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/professors"!</div>
}
