BOUNDING_BOX = {
    width: 600,
    height: 600,
    depth: 2000,
    splitX: 6,
    splitY: 6,
    splitZ: 20
};

CUBE = {
    size: BOUNDING_BOX.width / BOUNDING_BOX.splitX
}

STATIC_BLOCK_COLORS = [
    0x6666ff, 
    0x66ffff, 
    0xcc68EE, 
    0x666633, 
    0x66ff66, 
    0x9966ff, 
    0x00ff66, 
    0x66EE33, 
    0x003399, 
    0x330099, 
    0xFFA500, 
    0x99ff00, 
    0xee1289, 
    0x71C671, 
    0x00BFFF, 
    0x666633, 
    0x669966, 
    0x9966ff
];

SHAPES = [
    [
        {x: 0, y: 0, z: 0},
        {x: 0, y: 1, z: 0},
        {x: 0, y: 2, z: 0},
    ],
    [
        {x: 0, y: 0, z: 0},
        {x: 1, y: 0, z: 0},
        {x: 1, y: 1, z: 0},
        {x: 1, y: 2, z: 0}
    ],
    [
        {x: 0, y: 0, z: 0},
        {x: 0, y: 1, z: 0},
        {x: 1, y: 0, z: 0},
        {x: 1, y: 1, z: 0}
    ],
    [
        {x: 0, y: 0, z: 0},
        {x: 0, y: 1, z: 0},
        {x: 0, y: 2, z: 0},
        {x: 1, y: 1, z: 0}
    ],
    [
        {x: 0, y: 0, z: 0}, 
        {x: 0, y: 1, z: 0},
        {x: 1, y: 1, z: 0},
        {x: 1, y: 2, z: 0}
    ]
]

Object.freeze(SHAPES);
Object.freeze(STATIC_BLOCK_COLORS);
Object.freeze(CUBE);
Object.freeze(BOUNDING_BOX);