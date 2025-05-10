const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL

const sleep = (timer: number) =>
  new Promise((resolve) => setTimeout(() => resolve(null), timer))

class FetchError extends Error {
  constructor(message: string) {
    super(message)
  }
}

export async function fetcher(endpoint: string, options?: RequestInit) {
  await sleep(1500)

  const response = await fetch(`${BACKEND_BASE_URL}${endpoint}`, options)

  if (response.ok) {
    return response.json()
  }

  throw new FetchError('An unexpected error happened.')
}
