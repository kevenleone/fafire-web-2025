import { Button } from '@chakra-ui/react'
import { createFileRoute } from '@tanstack/react-router'
import useSWR from 'swr'
import Page from '@/components/page'
import Table from '@/components/table'

export const Route = createFileRoute('/allocation/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data: allocations = [], isLoading } = useSWR('/allocations')
  return (
    <Page
      loading={isLoading}
      title="Allocation"
      rightElement={<Button colorScheme="blue">Create Allocation</Button>}
    >
      <Table
        columns={[
          { name: 'id', label: 'ID' },
          { name: 'course', label: 'Course', render: (course) => course.name },
          {
            name: 'professor',
            label: 'Professor',
            render: (professor) => professor.name,
          },
          { name: 'date', label: 'Date' },
        ]}
        items={allocations}
      />
    </Page>
  )
}
