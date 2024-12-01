import { MenuItems } from '@/components/Menu/MenuItems'
import {
    IAddMenuItem,
    IDeleteMenuItem,
    IEditMenuItem,
    IFormState,
    IMenuFormFields,
    IOpenForm,
} from '@/types/form'
import { INITIAL_MENU_ITEMS } from '@/utils/constants'
import {
    addItemToMenu,
    deleteItemFromMenu,
    editItemInMenu,
} from '@/utils/menuUtils'
import { useState } from 'react'

export default function Home() {
    const [formState, setFormState] = useState<IFormState>({
        isVisible: false,
        parentId: null,
        editingId: null,
    })
    const [menuItems, setMenuItems] =
        useState<IMenuFormFields[]>(INITIAL_MENU_ITEMS)

    const addMenuItem: IAddMenuItem = ({ newItem, parentId }) => {
        setMenuItems((prevItems) =>
            addItemToMenu({ items: prevItems, newItem, parentId })
        )
    }

    const editMenuItemInState: IEditMenuItem = ({ updatedItem }) => {
        setMenuItems((prevItems) =>
            editItemInMenu({ items: prevItems, updatedItem })
        )
    }

    const deleteMenuItem: IDeleteMenuItem = ({ itemId }) => {
        setMenuItems((prevItems) =>
            deleteItemFromMenu({ items: prevItems, itemId })
        )
    }

    const openForm: IOpenForm = ({ parentId, editingId }) => {
        setFormState({
            isVisible: true,
            parentId,
            editingId,
        })
    }

    const closeForm = () => {
        setFormState({ isVisible: false, parentId: null, editingId: null })
    }

    return (
        <div
            className={`grid min-h-screen grid-rows-[20px_1fr_20px] justify-items-center gap-16 p-8 pb-20 pt-20 font-[family-name:var(--font-geist-sans)] sm:p-20`}
        >
            <main className="row-start-2 flex w-full flex-col items-center gap-8 sm:items-start">
                <MenuItems
                    menuItems={menuItems}
                    formState={formState}
                    openForm={openForm}
                    closeForm={closeForm}
                    addMenuItem={addMenuItem}
                    setMenuItems={setMenuItems}
                    deleteMenuItem={deleteMenuItem}
                    editMenuItem={editMenuItemInState}
                />
            </main>
        </div>
    )
}
