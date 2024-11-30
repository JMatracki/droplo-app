import { MenuItems } from '@/components/Menu/MenuItems'
import { IFormState, IMenuFormFields } from '@/types/form'
import {
    addItemToMenu,
    deleteItemFromMenu,
    editMenuItem,
} from '@/utils/menuUtils'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

export default function Home() {
    const [formState, setFormState] = useState<IFormState>({
        isVisible: false,
        parentId: null,
        editingId: null,
    })
    const [menuItems, setMenuItems] = useState<IMenuFormFields[]>([
        {
            id: uuidv4(),
            name: 'Promocje',
            url: 'https://rc32141.redcart.pl/promocje',
            subLinks: [
                {
                    id: uuidv4(),
                    name: 'Ostatnie 7 dni',
                    url: 'https://rc32141.redcart.pl/7dni',
                    subLinks: [
                        {
                            id: uuidv4(),
                            name: 'Popularne',
                            url: 'https://rc32141.redcart.pl/popularne',
                        },
                        {
                            id: uuidv4(),
                            name: 'Najlepsze',
                            url: 'https://rc32141.redcart.pl/najlepsze',
                        },
                    ],
                },
            ],
        },
        {
            id: uuidv4(),
            name: 'Diamenty forbesa',
            url: 'https://www.forbes.pl/diamenty',
        },
    ])

    const addMenuItem = (newItem: IMenuFormFields, parentId: string | null) => {
        setMenuItems((prevItems) => addItemToMenu(prevItems, newItem, parentId))
    }

    const editMenuItemInState = (updatedItem: IMenuFormFields) => {
        setMenuItems((prevItems) => editMenuItem(prevItems, updatedItem))
    }

    const deleteMenuItem = (itemId: string) => {
        setMenuItems((prevItems) => deleteItemFromMenu(prevItems, itemId))
    }

    const openForm = ({
        parentId,
        editingId,
    }: {
        parentId: string | null
        editingId?: string | null
    }) => {
        setFormState({
            isVisible: true,
            parentId,
            editingId: editingId || null,
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
                    openForm={openForm}
                    formState={formState}
                    closeForm={closeForm}
                    addMenuItem={addMenuItem}
                    deleteMenuItem={deleteMenuItem}
                    editMenuItem={editMenuItemInState}
                />
            </main>
        </div>
    )
}
