import { DictionaryCategory } from 'src/dictionary/dictionary-category.enum';

export const SYSTEM_DICTIONARIES = [
    {
        category: DictionaryCategory.HORSE_COAT,
        items: ['Gniada', 'Kara', 'Kasztanowata', 'Siwa', 'Srokata', 'Izabelowata', 'Myszata'],
    },
    {
        category: DictionaryCategory.HORSE_BREED,
        items: [
            'Koń czystej krwi arabskiej',
            'Quarter Horse',
            'Koń pełnej krwi angielskiej',
            'Koń fryzyjski',
            'Kuc',
            'Kuc szetlandzki',
            'Kuc walijski',
            'Koń małopolski',
            'Koń wielkopolski',
            'Koń huculski',
            'Koń śląski',
            'Polski koń szlachetn półkri',
            'Koń andaluzyjski',
            'Shire',
            'Fiord',
            'Koń ardeński',
            'Koń zimnokrwisty belgijski',
            'Polski koń zimnokrwisty',
        ],
    },
    {
        category: DictionaryCategory.FEED_TYPE,
        items: [
            'Pasza pełnoporcjowa',
            'Mieszanka uzupełniająca',
            'Siano',
            'Sieczka',
            'Mesz',
            'Dodatki i Suplementy',
            'Słoma',
            'Gnieciony owies',
            'Gnieciony jęczmień',
        ],
    },
    {
        category: DictionaryCategory.STABLE_FACILITY,
        items: [
            'Arena',
            'Round pen (Lonżownik)',
            'Wash rack (Myjka)',
            'Tack room (Siodlarnia)',
            'Paddock (Padok)',
            'Indoor arena (Hala)',
        ],
    },
    {
        category: DictionaryCategory.STABLE_SERVICE,
        items: ['Boarding (Pensjonat)', 'Training (Trening koni)', 'Lessons (Jazdy)', 'Farrier (Kowal na miejscu)'],
    },
];
