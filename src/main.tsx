import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { ChakraProvider } from '@chakra-ui/react'

// Import the generated route tree
import { SWRConfig } from 'swr'
import { routeTree } from './routeTree.gen'
import { fetcher } from './services/fetcher'

function localStorageProvider() {
  // When initializing, we restore the data from `localStorage` into a map.
  const map = new Map(
    JSON.parse(localStorage.getItem('@fafire-web/swr') || '[]'),
  )

  // Before unloading the app, we write back all the data into `localStorage`.
  window.addEventListener('beforeunload', () => {
    const appCache = JSON.stringify(Array.from(map.entries()))
    localStorage.setItem('@fafire-web/swr', appCache)
  })

  // We still use the map for write & read for performance.
  return map
}

// Create a new router instance
const router = createRouter({
  routeTree,
  context: {},
  defaultPreload: 'intent',
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 0,
})

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

// Render the app
const rootElement = document.getElementById('app')

if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <ChakraProvider
      toastOptions={{
        defaultOptions: { isClosable: true, position: 'bottom-right' },
      }}
    >
      <SWRConfig value={{ fetcher, provider: localStorageProvider }}>
        <RouterProvider router={router} />
      </SWRConfig>
    </ChakraProvider>,
  )
}
