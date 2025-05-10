import { Box, Button, FormControl, FormLabel, Select } from '@chakra-ui/react'
import { createFileRoute } from '@tanstack/react-router'
import useSWR from 'swr'
import type { Course } from '@/types'
import Page from '@/components/page'

export const Route = createFileRoute('/allocation/new')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data: courses = [] } = useSWR<Array<Course>>('/courses')

  return (
    <Page title="Create Allocation">
      <FormControl>
        <FormLabel>Course</FormLabel>
        <Select placeholder="Select Course">
          {courses.map((course, index) => (
            <option key={index}>{course.name}</option>
          ))}
        </Select>
      </FormControl>

      <Box display="flex" justifyContent={'space-between'} mt={5}>
        <Button>Cancel</Button>
        <Button ml={5} colorScheme="blue">
          Save
        </Button>
      </Box>
    </Page>
  )
}
