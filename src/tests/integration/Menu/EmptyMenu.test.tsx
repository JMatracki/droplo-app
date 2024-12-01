import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import EmptyMenu from '@/components/Menu/EmptyMenu'

const mockOpenForm = jest.fn()

test('Should render an empty state message', async () => {
    render(<EmptyMenu openForm={mockOpenForm} />)

    expect(
        screen.getByRole('heading', { name: /Menu jest puste/i })
    ).toBeVisible()
    expect(
        screen.getByText('W tym menu nie ma jeszcze żadnych linków.')
    ).toBeVisible()
    expect(
        screen.getByRole('button', {
            name: /Dodaj pozycję menu/i,
        })
    ).toBeVisible()
})

test('Should call openForm when "Add Menu Item" is clicked', async () => {
    render(<EmptyMenu openForm={mockOpenForm} />)

    screen.getByRole('button', { name: /Dodaj pozycję menu/i }).click()

    expect(mockOpenForm).toHaveBeenCalledWith({
        parentId: null,
        editingId: null,
    })
})
