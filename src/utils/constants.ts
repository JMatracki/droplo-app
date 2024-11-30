import { v4 as uuidv4 } from 'uuid'

export const INITIAL_MENU_ITEMS = [
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
]
