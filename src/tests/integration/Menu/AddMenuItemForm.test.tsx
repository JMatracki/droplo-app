import AddMenuItemForm from '@/components/Menu/AddMenuItemForm'
import { IFormState } from '@/types/form'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

const mockAddMenuItem = jest.fn()
const mockEditMenuItem = jest.fn()
const mockCloseForm = jest.fn()

const defaultFormState: IFormState = {
    isVisible: true,
    parentId: null,
    editingId: null,
}

test('Should render the form with default values when no editingItem is provided', () => {
    render(
        <AddMenuItemForm
            formState={defaultFormState}
            addMenuItem={mockAddMenuItem}
            editMenuItem={mockEditMenuItem}
            closeForm={mockCloseForm}
        />
    )

    expect(screen.getByLabelText(/Nazwa/i)).toHaveValue('')
    expect(screen.getByLabelText(/Link/i)).toHaveValue('')
})

test('Should populate form fields with editingItem values if provided', () => {
    const editingItem = {
        id: '1',
        name: 'Test Item',
        url: 'https://example.com',
        subLinks: [],
    }

    render(
        <AddMenuItemForm
            formState={{ ...defaultFormState, editingId: '1' }}
            editingItem={editingItem}
            addMenuItem={mockAddMenuItem}
            editMenuItem={mockEditMenuItem}
            closeForm={mockCloseForm}
        />
    )

    expect(screen.getByLabelText(/Nazwa/i)).toHaveValue('Test Item')
    expect(screen.getByLabelText(/Link/i)).toHaveValue('https://example.com')
})

test('Should validate required fields and show errors', async () => {
    const user = userEvent.setup()
    render(
        <AddMenuItemForm
            formState={defaultFormState}
            addMenuItem={mockAddMenuItem}
            editMenuItem={mockEditMenuItem}
            closeForm={mockCloseForm}
        />
    )

    await user.click(screen.getByRole('button', { name: /Dodaj/i }))

    expect(screen.getByText(/Nazwa jest wymagana/i)).toBeVisible()
})

test('Should call addMenuItem on form submission if editingId is null', async () => {
    const user = userEvent.setup()
    render(
        <AddMenuItemForm
            formState={defaultFormState}
            addMenuItem={mockAddMenuItem}
            editMenuItem={mockEditMenuItem}
            closeForm={mockCloseForm}
        />
    )

    await user.type(screen.getByLabelText(/Nazwa/i), 'New Item')
    await user.type(screen.getByLabelText(/Link/i), 'https://example.com')
    await user.click(screen.getByRole('button', { name: /Dodaj/i }))

    expect(mockAddMenuItem).toHaveBeenCalledWith({
        newItem: expect.objectContaining({
            name: 'New Item',
            url: 'https://example.com',
        }),
        parentId: null,
    })
    expect(mockCloseForm).toHaveBeenCalled()
})

test('Should call editMenuItem on form submission if editingId is provided', async () => {
    const user = userEvent.setup()
    render(
        <AddMenuItemForm
            formState={{ ...defaultFormState, editingId: '1' }}
            editingItem={{
                id: '1',
                name: 'Old Item',
                url: 'https://old.com',
                subLinks: [],
            }}
            addMenuItem={mockAddMenuItem}
            editMenuItem={mockEditMenuItem}
            closeForm={mockCloseForm}
        />
    )

    await user.clear(screen.getByLabelText(/Nazwa/i))
    await user.type(screen.getByLabelText(/Nazwa/i), 'Updated Item')
    await user.click(screen.getByRole('button', { name: /Zapisz/i }))

    expect(mockEditMenuItem).toHaveBeenCalledWith({
        updatedItem: expect.objectContaining({
            id: '1',
            name: 'Updated Item',
        }),
    })
    expect(mockCloseForm).toHaveBeenCalled()
})

test('Should close the form when the "Cancel" button is clicked', async () => {
    const user = userEvent.setup()
    render(
        <AddMenuItemForm
            formState={defaultFormState}
            addMenuItem={mockAddMenuItem}
            editMenuItem={mockEditMenuItem}
            closeForm={mockCloseForm}
        />
    )

    await user.click(screen.getByRole('button', { name: /Anuluj/i }))

    expect(mockCloseForm).toHaveBeenCalled()
})
