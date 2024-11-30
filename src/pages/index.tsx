import AddMenuItemForm from '@/components/AddMenuItemForm'
import { IMenuFormFields, MenuItems } from '@/components/MenuItems'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

export default function Home() {
    const [showAddMenuItemForm, setShowAddMenuItemForm] = useState(false)
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

    const addMenuItem = (
        newItem: IMenuFormFields,
        parentId: string | null = null
    ) => {
        setMenuItems((prevItems) => {
            const addItemRecursively = (
                items: IMenuFormFields[]
            ): IMenuFormFields[] => {
                return items.map((item) => {
                    if (item.id === parentId) {
                        return {
                            ...item,
                            subLinks: [...(item.subLinks || []), newItem],
                        }
                    }
                    if (item.subLinks) {
                        return {
                            ...item,
                            subLinks: addItemRecursively(item.subLinks),
                        }
                    }
                    return item
                })
            }

            if (parentId === null) {
                return [...prevItems, newItem]
            }

            return addItemRecursively(prevItems)
        })
    }

    return (
        <div
            className={`grid min-h-screen grid-rows-[20px_1fr_20px] justify-items-center gap-16 p-8 pb-20 pt-20 font-[family-name:var(--font-geist-sans)] sm:p-20`}
        >
            <main className="row-start-2 flex w-full flex-col items-center gap-8 sm:items-start">
                <MenuItems
                    menuItems={menuItems}
                    setShowAddMenuItemForm={setShowAddMenuItemForm}
                />
                <AddMenuItemForm
                    parentId={null}
                    addMenuItem={addMenuItem}
                    showAddMenuItemForm={showAddMenuItemForm}
                    setShowAddMenuItemForm={setShowAddMenuItemForm}
                />
            </main>
        </div>
    )
}
