class MovingBlock {
    position = {x: 0, y: 0, z: 0};
    mesh = null;
    shape = null;
    type = null;
    boundingBox = null;
    scene = null;

    constructor(scene, boundingBox) {
        this.boundingBox = boundingBox;
        this.scene = scene;
    }

    rotate = (x, y, z) => {
        // converting angles to radians
        this.mesh.rotation.x += x * Math.PI / 180;
        this.mesh.rotation.y += y * Math.PI / 180;
        this.mesh.rotation.z += z * Math.PI / 180;

        for (let i = 0; i < this.shape.length; i++) {
            let vector = Utils.cloneVector(SHAPES[this.type][i]);
            this.shape[i] = new THREE.Vector3(vector.x, vector.y, vector.z).applyEuler(this.mesh.rotation);
            Utils.roundVector(this.shape[i]);
        }

        if (this.checkCollision(false) === COLLISION.WALL) {
            this.rotate(-x, -y, -z); 
        }
    };

    move = (x ,y, z) => {
        this.mesh.position.x += x * CUBE.size;
        this.mesh.position.y += y * CUBE.size;
        this.mesh.position.z += z * CUBE.size;
        this.position.x += x;
        this.position.y += y;
        this.position.z += z;

        switch(this.checkCollision(z != 0)) {
            case COLLISION.WALL:
                this.move(-x, -y, 0);
                break;
            case COLLISION.GROUND: 
                this.hitBottom();
                break;
        }

        this.boundingBox.checkIfLevelCompleted();
    };

    convertToStatic = () => {
        for(let i = 0 ; i < this.shape.length; i++) {
            this.boundingBox.addStaticBlock(this.position.x + this.shape[i].x, this.position.y + this.shape[i].y, this.position.z + this.shape[i].z);
            this.boundingBox.blocks[this.position.x + this.shape[i].x][this.position.y + this.shape[i].y][this.position.z + this.shape[i].z] = FIELD.STATIC;
        }
    };

    checkCollision = (ground_check) => {
        for(let i = 0; i < this.shape.length; i++) {
            if ( 
                this.shape[i].x + this.position.x < 0 ||
                this.shape[i].x + this.position.x >= BOUNDING_BOX.splitX ||
                this.shape[i].y + this.position.y < 0 ||
                this.shape[i].y + this.position.y >= BOUNDING_BOX.splitY
            ) return COLLISION.WALL;
            
            if (this.boundingBox.blocks[this.position.x + this.shape[i].x][this.position.y + this.shape[i].y][this.position.z + this.shape[i].z - 1] === FIELD.STATIC) {
                return ground_check ? COLLISION.GROUND : COLLISION.WALL;
            }

            if (this.shape[i].z + this.position.z <= 0) {
                return COLLISION.GROUND;
            }

        }
    };

    generate = () => {
        this.type = Math.floor(Math.random() * SHAPES.length);

        this.shape = [];
        for (let i = 0; i < SHAPES[this.type].length; i++) {
            this.shape[i] = Utils.cloneVector(SHAPES[this.type][i]);
        }
    
        let geometry = new THREE.CubeGeometry(CUBE.size, CUBE.size, CUBE.size); 
        for(let i = 1 ; i < this.shape.length; i++) {
            let tmpGeometry = new THREE.Mesh(new THREE.CubeGeometry(CUBE.size, CUBE.size, CUBE.size));
            tmpGeometry.position.x = CUBE.size * this.shape[i].x;
            tmpGeometry.position.y = CUBE.size * this.shape[i].y;
            THREE.GeometryUtils.merge(geometry, tmpGeometry);
        }
    
        this.mesh = Utils.createMultiMaterialObject(
            geometry, 
            [
                new THREE.MeshBasicMaterial({color: 0x000000, flatShading: true, wireframe: true, transparent: true}),
                new THREE.MeshBasicMaterial({color: 0x9c4406})
            ]
        );
    
        this.position = {
            x: Math.floor(BOUNDING_BOX.splitX / 2) - 1,
            y: Math.floor(BOUNDING_BOX.splitY / 2) - 1, 
            z: 16
        };
     
        this.mesh.position.x = (this.position.x - BOUNDING_BOX.splitX / 2) * CUBE.size / 2;
        this.mesh.position.y = (this.position.y - BOUNDING_BOX.splitY / 2) * CUBE.size / 2;
        this.mesh.position.z = (this.position.z - BOUNDING_BOX.splitZ / 2) * CUBE.size + CUBE.size / 2;
        this.mesh.overdraw = true;

        if(this.checkCollision(true) === COLLISION.GROUND) {
            isGameOver = true;
            document.getElementById('game-over').style.display = 'flex';
        }
        
        this.scene.add(this.mesh);
    }

    hitBottom = () => {
        this.convertToStatic();
        this.scene.remove(this.mesh);
        this.generate();
    };
}