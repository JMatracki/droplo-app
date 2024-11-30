import Image from 'next/image'
import { Button } from '../Button'
import AddMenuItemForm from './AddMenuItemForm'
import { MenuItemsProps } from './MenuItems'
import searchIcon from '@/icons/search-lg.svg'

interface MenuItemProps extends MenuItemsProps {
    className?: string
}

const MenuItem = ({
    menuItems,
    formState,
    className,
    openForm,
    closeForm,
    addMenuItem,
    deleteMenuItem,
}: MenuItemProps) => {
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
                                <Button
                                    className="border-none"
                                    onClick={() => deleteMenuItem(item.id)}
                                >
                                    Usuń
                                </Button>
                                <Button className="rounded-l-none rounded-r-none border-b-0 border-t-0 focus-within:rounded-lg">
                                    Edytuj
                                </Button>
                                <Button
                                    className="border-none"
                                    onClick={() => {
                                        openForm({
                                            parentId: item.id,
                                        })
                                    }}
                                >
                                    Dodaj pozycję menu
                                </Button>
                            </div>
                        </div>
                        {item.subLinks ? (
                            <div style={{ marginLeft: '10px' }}>
                                <MenuItem
                                    key={item.name}
                                    formState={formState}
                                    menuItems={item.subLinks}
                                    openForm={openForm}
                                    closeForm={closeForm}
                                    addMenuItem={addMenuItem}
                                    deleteMenuItem={deleteMenuItem}
                                    className="pl-16"
                                />
                            </div>
                        ) : null}
                        {formState.parentId === item.id &&
                            formState.isVisible && (
                                <AddMenuItemForm
                                    addMenuItem={addMenuItem}
                                    formState={formState}
                                    closeForm={closeForm}
                                />
                            )}
                    </div>
                )
            })}
        </div>
    )
}

export default MenuItem
