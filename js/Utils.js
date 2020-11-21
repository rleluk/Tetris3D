Utils = {}

// function from three/examples/jsm/utils - wasn't included in three.js
// used to add 2 materials to cube - wireframes of cube and colored cube itself
Utils.createMultiMaterialObject = ( geometry, materials ) => {
    var i, il = materials.length, group = new THREE.Object3D();
    for ( i = 0; i < il; i ++ ) {
    var object = new THREE.Mesh( geometry, materials[ i ] );
    group.add( object );
    }
    return group;
}

Utils.cloneVector = vector => {
    return {
        x: vector.x, 
        y: vector.y, 
        z: vector.z
    }
}

// needed to fix applyEuler function's result (js's floats are weird)
Utils.roundVector = vector => {
    vector.x = Math.round(vector.x);
    vector.y = Math.round(vector.y);
    vector.z = Math.round(vector.z);
};

const COLLISION = {
    NONE: 1, 
    WALL:1, 
    GROUND: 2
};

const FIELD = {
    EMPTY: 0,
    MOVING: 1,
    STATIC: 2
}

Object.freeze(COLLISION);
Object.freeze(FIELD);