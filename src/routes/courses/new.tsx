import { createFileRoute, useNavigate } from '@tanstack/react-router'
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useToast,
} from '@chakra-ui/react'
import { useState } from 'react'
import Page from '@/components/page'
import { fetcher } from '@/services/fetcher'

export const Route = createFileRoute('/courses/new')({
  component: RouteComponent,
})

function RouteComponent() {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const toast = useToast()
  const [description, setDescription] = useState('')
  const [name, setName] = useState('')

  async function onSubmit() {
    try {
      setLoading(true)

      await fetcher('/courses', {
        body: JSON.stringify({
          description,
          name,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      })

      toast({
        title: 'Course created.',
        description: "We've created your course for you.",
        status: 'success',
      })

      navigate({ to: '/courses' })
    } catch (error) {
      toast({
        title: 'Error.',
        description: 'An unexpected error happened',
        status: 'error',
      })
    }
    setLoading(false)
  }

  return (
    <Page title="Create Course">
      <FormControl>
        <FormLabel>Name</FormLabel>
        <Input
          id="name"
          name="name"
          type="text"
          onChange={function (event) {
            setName(event.target.value)
          }}
        />
      </FormControl>

      <FormControl>
        <FormLabel>Description</FormLabel>
        <Textarea
          id="description"
          name="description"
          onChange={({ target: { value } }) => setDescription(value)}
        />
      </FormControl>

      <Box display="flex" justifyContent="space-between" mt={5}>
        <Button>Cancel</Button>
        <Button
          disabled={!name.trim() || !description.trim()}
          isLoading={loading}
          ml={5}
          colorScheme="blue"
          onClick={onSubmit}
        >
          Submit
        </Button>
      </Box>
    </Page>
  )
}
