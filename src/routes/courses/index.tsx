import { Link, createFileRoute } from '@tanstack/react-router'
import { Button } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import Page from '@/components/page'
import Table from '@/components/table'

export const Route = createFileRoute('/courses/')({
  component: RouteComponent,
})

function RouteComponent() {
  const [courses, setCourses] = useState([])

  useEffect(() => {
    fetch('http://localhost:4444/courses')
      .then((response) => response.json())
      .then((result) => setCourses(result))
      .catch((error) => console.error(error))
  }, [])

  return (
    <Page
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
