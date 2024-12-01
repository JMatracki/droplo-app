import Image from 'next/image'
import { Button } from '../Button'
import AddMenuItemForm from './AddMenuItemForm'
import searchIcon from '@/icons/search-lg.svg'
import {
    IAddMenuItem,
    ICloseForm,
    IDeleteMenuItem,
    IEditMenuItem,
    IFormState,
    IMenuFormFields,
    IOpenForm,
} from '@/types/form'
import { findMenuItemById } from '@/utils/menuUtils'
import { useSortable } from '@dnd-kit/sortable'

export interface IMenuItemProps {
    menuItems: IMenuFormFields[]
    item: IMenuFormFields
    openForm: IOpenForm
    closeForm: ICloseForm
    formState: IFormState
    addMenuItem: IAddMenuItem
    deleteMenuItem: IDeleteMenuItem
    editMenuItem: IEditMenuItem
    className?: string
}

const MenuItem = ({
    item,
    menuItems,
    formState,
    className,
    openForm,
    closeForm,
    addMenuItem,
    editMenuItem,
    deleteMenuItem,
}: IMenuItemProps) => {
    const editingItem = formState.editingId
        ? findMenuItemById({ id: formState.editingId, menuItems })
        : null
    const { attributes, listeners, setNodeRef, isOver } = useSortable({
        id: item.id,
    })
    const style = {
        color: isOver ? 'green' : undefined,
        backgroundColor: isOver ? '#f7fafc' : undefined,
    }

    return (
        <div
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            style={style}
            className={`${className}`}
        >
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
                        onClick={() => deleteMenuItem({ itemId: item.id })}
                    >
                        Usuń
                    </Button>
                    <Button
                        className="rounded-l-none rounded-r-none border-b-0 border-t-0 focus-within:rounded-lg"
                        onClick={() =>
                            openForm({
                                parentId: null,
                                editingId: item.id,
                            })
                        }
                    >
                        Edytuj
                    </Button>
                    <Button
                        className="border-none"
                        onClick={() => {
                            openForm({
                                parentId: item.id,
                                editingId: null,
                            })
                        }}
                    >
                        Dodaj pozycję menu
                    </Button>
                </div>
            </div>
            {formState.isVisible &&
                (formState.parentId === item.id ||
                    formState.editingId === item.id) && (
                    <AddMenuItemForm
                        key={`${formState.parentId || ''}-${formState.editingId || ''}`}
                        formState={formState}
                        editingItem={editingItem}
                        closeForm={closeForm}
                        addMenuItem={addMenuItem}
                        editMenuItem={editMenuItem}
                    />
                )}
            {item.subLinks && item.subLinks?.length > 0 && (
                <div>
                    {item.subLinks.map((subItem) => (
                        <MenuItem
                            key={subItem.id}
                            item={subItem}
                            menuItems={menuItems}
                            formState={formState}
                            openForm={openForm}
                            closeForm={closeForm}
                            addMenuItem={addMenuItem}
                            editMenuItem={editMenuItem}
                            deleteMenuItem={deleteMenuItem}
                            className="pl-16"
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

export default MenuItem
