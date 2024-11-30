import { IMenuFormFields } from '@/components/Menu/MenuItems'

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
