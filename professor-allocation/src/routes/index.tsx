import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <div className="App">
      <h1>oi</h1>
    </div>
  )
}
