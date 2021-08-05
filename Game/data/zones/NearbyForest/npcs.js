module.exports = [
    {
        type: "rabbit",
        spawnRoom: 1,
        props: {
            name: "маленький зайчик",
            randomMoveChance: 0.5,
            randomMoveExcludedRooms: [ 3 ],
        },
        // mixins: {
        //     aiRandomMove
        // }
        // ai: {
        //     onCharEnter: ``
        // }
    },
    {
        type: "rabbit",
        spawnRoom: "random",
        count: 3,
        props: {
            name: "зайчиха"
        }
    },
    {
        type: "rabbit",
        spawnRoom: 3,
        props: {
            name: "матерый заяц"
        }
    },
];
