import React from 'react'
import EmptyMenu from './EmptyMenu'
import Image from 'next/image'
import searchIcon from '../icons/search-lg.svg'
import { Button } from './Button'

export interface IMenuFormFields {
    id: string
    name: string
    url?: string
    subLinks?: IMenuFormFields[]
}

interface MenuItemsProps {
    menuItems: IMenuFormFields[]
    setShowAddMenuItemForm: React.Dispatch<React.SetStateAction<boolean>>
}

interface MenuItemProps {
    menuItems: IMenuFormFields[]
    className?: string
}

const MenuItem = ({ menuItems, className }: MenuItemProps) => {
    return (
        <div className={`${className}`}>
            {menuItems.map((item) => {
                return (
                    <div key={item.name}>
                        <div className="flex justify-between py-4">
                            <div className="flex items-center gap-3">
                                <Image
                                    className="h-6 w-6"
                                    src={searchIcon}
                                    alt="search icon"
                                />
                                <div className="flex flex-col gap-1">
                                    <h5 className="font-bold">{item.name}</h5>
                                    <p className="text-gray-500">{item.url}</p>
                                </div>
                            </div>
                            <div className="w-fil h-fit rounded-lg border">
                                <Button className="border-none">Usuń</Button>
                                <Button className="rounded-l-none rounded-r-none border-b-0 border-t-0">
                                    Edytuj
                                </Button>
                                <Button className="border-none">
                                    Dodaj pozycję menu
                                </Button>
                            </div>
                        </div>
                        {item.subLinks ? (
                            <div style={{ marginLeft: '10px' }}>
                                <MenuItem
                                    key={item.name}
                                    menuItems={item.subLinks}
                                    className="pl-16"
                                />
                            </div>
                        ) : null}
                    </div>
                )
            })}
        </div>
    )
}

export const MenuItems = ({
    menuItems,
    setShowAddMenuItemForm,
}: MenuItemsProps) => {
    console.log(menuItems)
    return (
        <div className="flex w-full flex-col gap-6 rounded-lg border px-8 pb-4 pt-1">
            {menuItems.length > 0 ? (
                <MenuItem menuItems={menuItems} />
            ) : (
                <EmptyMenu setShowAddMenuItemForm={setShowAddMenuItemForm} />
            )}
            <Button
                className="w-fit"
                onClick={() => setShowAddMenuItemForm(true)}
            >
                Dodaj pozycję menu
            </Button>
        </div>
    )
}
