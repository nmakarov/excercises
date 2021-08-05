module.exports = [
    {
        id: 1,
        name: 'На опушке леса', // At the edge of the forest
        exits: {
            south: 2
        }
    },
    {
        id: 2,
        name: 'У веселого дуба', // The merry oak
        exits: {
            north: 1,
            south: 3
        }
    },
    {
        id: 3,
        name: 'Ручеек', // Streamlet, brook, brooklet, rill, 
        exits: {
            north: 2
        }
    }
];