import { IMenuFormFields } from '@/types/form'

export const addItemToMenu = (
    items: IMenuFormFields[],
    newItem: IMenuFormFields,
    parentId: string | null
): IMenuFormFields[] => {
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
                subLinks: addItemToMenu(item.subLinks, newItem, parentId),
            }
        }

        return item
    })
}

export const editMenuItem = (
    items: IMenuFormFields[],
    updatedItem: IMenuFormFields
): IMenuFormFields[] => {
    return items.map((item) => {
        if (item.id === updatedItem.id) {
            return { ...item, ...updatedItem }
        }

        if (item.subLinks) {
            return {
                ...item,
                subLinks: editMenuItem(item.subLinks, updatedItem),
            }
        }

        return item
    })
}

export const deleteItemFromMenu = (
    items: IMenuFormFields[],
    itemId: string
): IMenuFormFields[] => {
    return items
        .filter((item) => item.id !== itemId)
        .map((item) => ({
            ...item,
            subLinks: item.subLinks
                ? deleteItemFromMenu(item.subLinks, itemId)
                : [],
        }))
}
