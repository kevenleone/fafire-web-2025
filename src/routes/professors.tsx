import { Button } from '@chakra-ui/react'
import { Link, createFileRoute } from '@tanstack/react-router'
import useSWR from 'swr'
import Page from '@/components/page'
import Table from '@/components/table'

export const Route = createFileRoute('/professors')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data: professors = [], isLoading } = useSWR('/professors')

  return (
    <Page
      loading={isLoading}
      title="Professor"
      rightElement={
        <Button as={Link} to="/professors/new" colorScheme="blue">
          Add Professor
        </Button>
      }
    >
      <Table
        columns={[
          { label: 'ID', name: 'id' },
          { label: 'CPF', name: 'cpf' },
          {
            label: 'Name',
            name: 'name',
          },
          {
            label: 'Actions',
            name: 'options',
            render: (item, row) => <Button colorScheme="red">Delete</Button>,
          },
        ]}
        items={professors}
      />
    </Page>
  )
}
