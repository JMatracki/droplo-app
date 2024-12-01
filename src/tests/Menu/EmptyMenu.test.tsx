import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import EmptyMenu from '@/components/Menu/EmptyMenu'

const mockOpenForm = jest.fn()

test('Should render an empty state message', async () => {
    render(<EmptyMenu openForm={mockOpenForm} />)
})

test('Should call openForm when "Add Menu Item" is clicked', async () => {})
