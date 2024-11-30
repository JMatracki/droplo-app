import { IMenuFormFields, MenuItems } from '@/components/Menu/MenuItems'
import { addItemToMenu } from '@/utils/menuUtils'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

export default function Home() {
    const [formState, setFormState] = useState<{
        isVisible: boolean
        parentId: string | null
    }>({ isVisible: false, parentId: null })
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

    const openForm = ({ parentId }: { parentId: string | null }) => {
        setFormState({ isVisible: true, parentId })
    }

    const closeForm = () => {
        setFormState({ isVisible: false, parentId: null })
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
                />
            </main>
        </div>
    )
}
