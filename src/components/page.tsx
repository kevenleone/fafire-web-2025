import { Box, Container, Heading, Spinner } from '@chakra-ui/react'

import type { ReactNode } from 'react'

interface PageProps {
  rightElement?: ReactNode
  children: ReactNode
  title: string
  loading?: boolean
}

export default function Page(props: PageProps) {
  return (
    <Container maxWidth="4xl" marginTop={10}>
      <Box display="flex" justifyContent="space-between">
        <Heading>{props.title}</Heading>

        {props.rightElement}
      </Box>

      {props.loading ? (
        <Box display="flex" justifyContent="center" mt={100}>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Box>
      ) : (
        <Box marginTop={10}>{props.children}</Box>
      )}
    </Container>
  )
}
