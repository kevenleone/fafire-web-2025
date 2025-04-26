import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/fafire')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/fafire"!</div>
}
