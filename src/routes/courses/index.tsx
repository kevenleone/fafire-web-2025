import { Link, createFileRoute } from '@tanstack/react-router'
import {
  Button,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import Page from '@/components/page'

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
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Course</Th>
            </Tr>
          </Thead>
          <Tbody>
            {courses.map((course, index) => (
              <Tr key={index}>
                <Td>{course.id}</Td>
                <Td>{course.name}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Page>
  )
}
