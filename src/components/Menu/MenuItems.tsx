import React from 'react'
import EmptyMenu from './EmptyMenu'
import { Button } from '../Button'
import AddMenuItemForm from './AddMenuItemForm'
import {
    IAddMenuItem,
    ICloseForm,
    IDeleteMenuItem,
    IEditMenuItem,
    IFormState,
    IMenuFormFields,
    IOpenForm,
} from '@/types/form'
import MenuItem from './MenuItem'

export interface MenuItemsProps {
    menuItems: IMenuFormFields[]
    openForm: IOpenForm
    closeForm: ICloseForm
    formState: IFormState
    addMenuItem: IAddMenuItem
    deleteMenuItem: IDeleteMenuItem
    editMenuItem: IEditMenuItem
}

export const MenuItems = ({
    menuItems,
    openForm,
    closeForm,
    formState,
    addMenuItem,
    editMenuItem,
    deleteMenuItem,
}: MenuItemsProps) => {
    return (
        <div className="w-full">
            <div className="flex w-full flex-col gap-6 rounded-lg border px-8 pb-4 pt-1">
                {menuItems.length > 0 ? (
                    <>
                        <MenuItem
                            menuItems={menuItems}
                            formState={formState}
                            openForm={openForm}
                            closeForm={closeForm}
                            addMenuItem={addMenuItem}
                            editMenuItem={editMenuItem}
                            deleteMenuItem={deleteMenuItem}
                        />
                        <Button
                            className={`w-fit ${formState.isVisible && formState.parentId === null && formState.editingId === null ? 'hidden' : ''}`}
                            onClick={() => {
                                openForm({ parentId: null, editingId: null })
                            }}
                        >
                            Dodaj pozycję menu
                        </Button>
                    </>
                ) : (
                    <EmptyMenu openForm={openForm} />
                )}
                {formState.isVisible &&
                    formState.parentId === null &&
                    formState.editingId === null && (
                        <AddMenuItemForm
                            formState={formState}
                            addMenuItem={addMenuItem}
                            editMenuItem={editMenuItem}
                            closeForm={closeForm}
                            menuItems={menuItems}
                        />
                    )}
            </div>
        </div>
    )
}
