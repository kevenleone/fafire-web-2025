import { Link, createFileRoute, useNavigate } from '@tanstack/react-router'
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
import { z } from 'zod'
import type { Course } from '@/types'
import Page from '@/components/page'
import { fetcher } from '@/services/fetcher'

export const Route = createFileRoute('/courses/new')({
  component: CourseForm,
})

type CourseFormProps = {
  course?: Course
  id?: string
}

const courseSchema = z.object({
  description: z.string().max(1000).optional(),
  name: z.string().min(3).max(30),
})

export function CourseForm({ course, id }: CourseFormProps) {
  const [description, setDescription] = useState(course?.description)
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState(course?.name)
  const navigate = useNavigate()
  const toast = useToast()

  async function onSubmit() {
    try {
      setLoading(true)

      const path = id ? `/courses/${id}` : '/courses'
      const method = id ? 'PATCH' : 'POST'

      await fetcher(path, {
        body: JSON.stringify({
          description,
          name,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        method,
      })

      toast({
        title: 'Success.',
        description: 'Action completed successfully',
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
    <Page title={id ? 'Update Course' : 'Create Course'}>
      <FormControl>
        <FormLabel>Name</FormLabel>
        <Input
          value={name}
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
          value={description}
          id="description"
          name="description"
          onChange={({ target: { value } }) => setDescription(value)}
        />
      </FormControl>

      <Box display="flex" justifyContent="space-between" mt={5}>
        <Button as={Link} to="/courses">
          Cancel
        </Button>
        <Button
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
