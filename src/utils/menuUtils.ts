import { IMenuFormFields } from '@/types/form'
import { UniqueIdentifier } from '@dnd-kit/core'

export const addItemToMenu = ({
    items,
    newItem,
    parentId,
}: {
    items: IMenuFormFields[]
    newItem: IMenuFormFields
    parentId: string | null
}): IMenuFormFields[] => {
    if (!parentId) {
        return [...items, newItem]
    }

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
                subLinks: addItemToMenu({
                    items: item.subLinks,
                    newItem,
                    parentId,
                }),
            }
        }

        return item
    })
}

export const editItemInMenu = ({
    items,
    updatedItem,
}: {
    items: IMenuFormFields[]
    updatedItem: IMenuFormFields
}): IMenuFormFields[] => {
    return items.map((item) => {
        if (item.id === updatedItem.id) {
            return { ...item, ...updatedItem }
        }

        if (item.subLinks) {
            return {
                ...item,
                subLinks: editItemInMenu({ items: item.subLinks, updatedItem }),
            }
        }

        return item
    })
}

export const deleteItemFromMenu = ({
    items,
    itemId,
}: {
    items: IMenuFormFields[]
    itemId: string
}): IMenuFormFields[] => {
    return items
        .filter((item) => item.id !== itemId)
        .map((item) => ({
            ...item,
            subLinks: item.subLinks
                ? deleteItemFromMenu({ items: item.subLinks, itemId })
                : [],
        }))
}

export const findMenuItemById = ({
    id,
    menuItems,
}: {
    menuItems: IMenuFormFields[]
    id: string
}): IMenuFormFields | null => {
    for (const item of menuItems) {
        if (item.id === id) {
            return item
        }
        if (item.subLinks) {
            const found = findMenuItemById({ id, menuItems: item.subLinks })
            if (found) {
                return found
            }
        }
    }
    return null
}

export const moveItemInTree = ({
    items,
    activeId,
    overId,
}: {
    items: IMenuFormFields[]
    activeId: UniqueIdentifier
    overId: UniqueIdentifier
}): IMenuFormFields[] => {
    const [removedItem, updatedItems] = findAndRemoveItem(items, activeId)
    if (!removedItem) return items
    return insertItem(updatedItems, overId, removedItem)
}

const findAndRemoveItem = (
    items: IMenuFormFields[],
    id: UniqueIdentifier
): [IMenuFormFields | null, IMenuFormFields[]] => {
    let removedItem: IMenuFormFields | null = null
    const updatedItems: IMenuFormFields[] = []

    for (const item of items) {
        if (item.id === id) {
            removedItem = item
        } else if (item.subLinks) {
            const [found, updatedSubLinks] = findAndRemoveItem(
                item.subLinks,
                id
            )
            if (found) {
                removedItem = found
            }
            updatedItems.push({ ...item, subLinks: updatedSubLinks })
        } else {
            updatedItems.push(item)
        }
    }
    return [removedItem, updatedItems]
}

const insertItem = (
    items: IMenuFormFields[],
    targetId: UniqueIdentifier,
    itemToInsert: IMenuFormFields
): IMenuFormFields[] => {
    return items.map((item) => {
        if (item.id === targetId) {
            return {
                ...item,
                subLinks: [...(item.subLinks || []), itemToInsert],
            }
        }
        if (item.subLinks) {
            return {
                ...item,
                subLinks: insertItem(item.subLinks, targetId, itemToInsert),
            }
        }
        return item
    })
}
