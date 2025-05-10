import { Link, createFileRoute } from '@tanstack/react-router'
import { Box, Button, useToast } from '@chakra-ui/react'
import useSWR from 'swr'
import type { Course } from '@/types'
import Page from '@/components/page'
import Table from '@/components/table'
import { fetcher } from '@/services/fetcher'

export const Route = createFileRoute('/courses/')({
  component: RouteComponent,
})

function RouteComponent() {
  const toast = useToast()
  const {
    data: courses = [],
    isLoading,
    mutate,
  } = useSWR<Array<Course>>('/courses')

  async function onDelete(course: Course) {
    try {
      await fetcher(`/courses/${course.id}`, { method: 'DELETE' })

      toast({
        description: 'Course deleted',
        title: 'Success.',
        status: 'success',
      })

      mutate(
        courses.filter(({ id }) => course.id !== id),
        { revalidate: false },
      )
    } catch (error) {
      toast({
        description: error.message,
        title: 'Error.',
        status: 'error',
      })
    }
  }

  return (
    <Page
      loading={isLoading}
      title="Courses"
      rightElement={
        <Button as={Link} to="/courses/new" colorScheme="blue">
          Add Course
        </Button>
      }
    >
      <Table
        columns={[
          { label: 'ID', name: 'id' },
          { label: 'Name', name: 'name' },
          { label: 'Description', name: 'description' },
          {
            label: 'Actions',
            name: '',
            render: (_, course) => (
              <Box>
                <Button size="xs" as={Link} to={`/courses/${course.id}/edit`}>
                  Edit
                </Button>
                <Button
                  ml={2}
                  size="xs"
                  colorScheme="red"
                  onClick={() => onDelete(course)}
                >
                  Delete
                </Button>
              </Box>
            ),
          },
        ]}
        items={courses}
      />
    </Page>
  )
}
