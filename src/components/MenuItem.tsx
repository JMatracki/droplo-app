import React from 'react'
import EmptyMenu from './EmptyMenu'

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

const MenuItem = ({ menuItems }: { menuItems: IMenuFormFields[] }) => {
    return (
        <>
            {menuItems.map((el) => {
                return (
                    <div key={el.name}>
                        {el.name}
                        {el.subLinks ? (
                            <div style={{ marginLeft: '10px' }}>
                                <MenuItem
                                    key={el.name}
                                    menuItems={el.subLinks}
                                />
                            </div>
                        ) : null}
                    </div>
                )
            })}
        </>
    )
}

export const MenuItems = ({
    menuItems,
    setShowAddMenuItemForm,
}: MenuItemsProps) => {
    console.log(menuItems)
    return (
        <>
            {menuItems.length > 0 ? (
                <MenuItem menuItems={menuItems} />
            ) : (
                <EmptyMenu setShowAddMenuItemForm={setShowAddMenuItemForm} />
            )}
        </>
    )
}
