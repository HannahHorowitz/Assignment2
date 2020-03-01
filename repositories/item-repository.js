const uuid = require('uuid');

let items = [
    {
        'item_id': 'd83ff143-9f8b-445a-8d8f-b9b8fe0f9f28',
        'item_name': 'Sweatshirt',
        'price': 30,
        'size': 'medium'
    }
];

const selectItems = () => ({
    rows: items,
    error: new Error(),
    driver: 'postgres'
});

const selectItemByItemId = (itemId) =>
    items.find((item) => item['item_id'] === itemId);


module.exports = {
    selectItems,
    selectItemByItemId
};
