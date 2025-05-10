import { Link, createFileRoute, useNavigate } from '@tanstack/react-router'
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
  useToast,
} from '@chakra-ui/react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
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
  const navigate = useNavigate()
  const toast = useToast()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isValid, errors },
  } = useForm({
    defaultValues: course,
    mode: 'all',
    resolver: zodResolver(courseSchema),
  })

  const nameErrorMessage = errors.name?.message

  async function onSubmit(form: Course) {
    try {
      const path = id ? `/courses/${id}` : '/courses'
      const method = id ? 'PATCH' : 'POST'

      await fetcher(path, {
        body: JSON.stringify(form),
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
      console.log(error)
      toast({
        title: 'Error.',
        description: 'An unexpected error happened',
        status: 'error',
      })
    }
  }

  return (
    <Page title={id ? 'Update Course' : 'Create Course'}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={!!nameErrorMessage}>
          <FormLabel>Name</FormLabel>
          <Input id="name" type="text" {...register('name')} />
          {nameErrorMessage && (
            <FormErrorMessage>{nameErrorMessage}</FormErrorMessage>
          )}
        </FormControl>

        <FormControl>
          <FormLabel>Description</FormLabel>
          <Textarea id="description" {...register('description')} />
        </FormControl>

        <Box display="flex" justifyContent="space-between" mt={5}>
          <Button as={Link} to="/courses">
            Cancel
          </Button>
          <Button
            disabled={!isValid}
            isLoading={isSubmitting}
            ml={5}
            colorScheme="blue"
            type="submit"
          >
            Submit
          </Button>
        </Box>
      </form>
    </Page>
  )
}
