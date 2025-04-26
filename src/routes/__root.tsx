import { Outlet, createRootRoute } from '@tanstack/react-router'
import { Container } from '@chakra-ui/react'
import Header from '@/components/header'
import Footer from '@/components/footer'

export const Route = createRootRoute({
  component: () => (
    <>
      <Header />
      <Container height={'60vh'}>
        <Outlet />
      </Container>
      <Footer />
    </>
  ),
})
