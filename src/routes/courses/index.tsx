import { Link, createFileRoute } from '@tanstack/react-router'
import { Button } from '@chakra-ui/react'
import useSWR from 'swr'
import Page from '@/components/page'
import Table from '@/components/table'

export const Route = createFileRoute('/courses/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data: courses = [], isLoading } = useSWR('/courses')

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
        ]}
        items={courses}
      />
    </Page>
  )
}
