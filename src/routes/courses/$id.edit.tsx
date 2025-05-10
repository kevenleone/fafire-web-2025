import { createFileRoute } from '@tanstack/react-router'
import useSWR from 'swr'
import { CourseForm } from './new'
import type { Course } from '@/types'

export const Route = createFileRoute('/courses/$id/edit')({
  component: RouteComponent,
})

function RouteComponent() {
  const { id } = Route.useParams()

  const { data: course } = useSWR<Course>(`/courses/${id}`)

  if (course) {
    return <CourseForm course={course} id={id} />
  }

  return null
}
