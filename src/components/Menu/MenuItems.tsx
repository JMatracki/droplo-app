import React from 'react'
import EmptyMenu from './EmptyMenu'
import { Button } from '../Button'
import AddMenuItemForm from './AddMenuItemForm'
import {
    IAddMenuItem,
    ICloseForm,
    IDeleteMenuItem,
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
}

export const MenuItems = ({
    menuItems,
    openForm,
    closeForm,
    formState,
    addMenuItem,
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
                            addMenuItem={addMenuItem}
                            openForm={openForm}
                            closeForm={closeForm}
                            deleteMenuItem={deleteMenuItem}
                        />
                        <Button
                            className={`w-fit ${formState.isVisible && formState.parentId === null ? 'hidden' : ''}`}
                            onClick={() => {
                                openForm({ parentId: null })
                            }}
                        >
                            Dodaj pozycję menu
                        </Button>
                    </>
                ) : (
                    <EmptyMenu openForm={openForm} />
                )}
                {formState.isVisible && formState.parentId === null && (
                    <AddMenuItemForm
                        formState={formState}
                        addMenuItem={addMenuItem}
                        closeForm={closeForm}
                    />
                )}
            </div>
        </div>
    )
}
