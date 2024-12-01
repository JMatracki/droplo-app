// Should render the form with default values when no editingItem is provided.
// Should populate form fields with editingItem values if provided.
// Should validate required fields and show errors.
// Should call addMenuItem or editMenuItem on form submission.
// Should close the form when the "Cancel" button is clicked.

import AddMenuItemForm from '@/components/Menu/AddMenuItemForm'
import { IFormState } from '@/types/form'
import { render, screen } from '@testing-library/react'

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
