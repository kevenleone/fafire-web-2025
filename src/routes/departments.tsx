import { createFileRoute } from '@tanstack/react-router'
import useSWR from 'swr'
import { Button } from '@chakra-ui/react'
import Page from '@/components/page'
import Table from '@/components/table'

export const Route = createFileRoute('/departments')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data: departments = [], isLoading } = useSWR('/departments')

  return (
    <Page
      loading={isLoading}
      title="Departments"
      rightElement={<Button colorScheme="blue">Create Department</Button>}
    >
      <Table
        columns={[
          { name: 'id', label: 'ID' },
          { name: 'name', label: 'Name' },
        ]}
        items={departments}
      />
    </Page>
  )
}
