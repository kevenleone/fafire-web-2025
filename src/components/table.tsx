import {
  Table as ChakraTable,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import type { ReactNode } from 'react'

interface Column<T> {
  name: string
  label: string
  render?: (item: any, row: T) => ReactNode | string
}

interface TableProps<T> {
  columns: Array<Column<T>>
  items: Array<T>
}

export default function Table<T>(props: TableProps<T>) {
  return (
    <TableContainer>
      <ChakraTable variant="simple">
        <Thead>
          <Tr>
            {props.columns.map((column, index) => (
              <Th key={index}>{column.label}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {props.items.map((item, index) => (
            <Tr key={index}>
              {props.columns.map((column, columnIndex) => {
                const value = column.render
                  ? column.render(item[column.name], item)
                  : item[column.name]

                return <Td key={columnIndex}>{value}</Td>
              })}
            </Tr>
          ))}
        </Tbody>
      </ChakraTable>
    </TableContainer>
  )
}
