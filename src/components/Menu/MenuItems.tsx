import React, { useId } from 'react'
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
import {
    DndContext,
    DragEndEvent,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core'
import { SortableContext } from '@dnd-kit/sortable'
import { moveItemInTree } from '@/utils/menuUtils'

export interface IMenuItemsProps {
    menuItems: IMenuFormFields[]
    openForm: IOpenForm
    closeForm: ICloseForm
    formState: IFormState
    addMenuItem: IAddMenuItem
    deleteMenuItem: IDeleteMenuItem
    editMenuItem: IEditMenuItem
    setMenuItems: React.Dispatch<React.SetStateAction<IMenuFormFields[]>>
}

export const MenuItems = ({
    menuItems,
    openForm,
    closeForm,
    formState,
    addMenuItem,
    editMenuItem,
    deleteMenuItem,
    setMenuItems,
}: IMenuItemsProps) => {
    const id = useId()

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5,
            },
        })
    )

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event
        if (!over || active.id === over.id) return

        const updatedItems = moveItemInTree({
            items: menuItems,
            activeId: active.id,
            overId: over.id,
        })

        setMenuItems(updatedItems)
    }

    return (
        <DndContext id={id} sensors={sensors} onDragEnd={handleDragEnd}>
            <SortableContext items={menuItems.map((item) => item.id)}>
                <div className="w-full">
                    <div className="flex w-full flex-col gap-6 rounded-lg border px-8 pb-4 pt-1">
                        {menuItems.length > 0 ? (
                            <>
                                {menuItems.map((item) => (
                                    <MenuItem
                                        key={item.id}
                                        item={item}
                                        menuItems={menuItems}
                                        formState={formState}
                                        openForm={openForm}
                                        closeForm={closeForm}
                                        addMenuItem={addMenuItem}
                                        editMenuItem={editMenuItem}
                                        deleteMenuItem={deleteMenuItem}
                                    />
                                ))}
                                <Button
                                    className={`w-fit ${formState.isVisible && formState.parentId === null && formState.editingId === null ? 'hidden' : ''}`}
                                    onClick={() => {
                                        openForm({
                                            parentId: null,
                                            editingId: null,
                                        })
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
                                />
                            )}
                    </div>
                </div>
            </SortableContext>
        </DndContext>
    )
}
