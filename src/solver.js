function Queue() {
    this.__a = [];
}

Queue.prototype.enqueue = function (o) {
    this.__a.push(o);
}

Queue.prototype.dequeue = function () {
    if (this.__a.length > 0) {
        return this.__a.shift();
    }
    return null;
}
Queue.prototype.empty = function () {
    return this.__a.length === 0;
}

Queue.prototype.size = function () {
    return this.__a.length;
}

Queue.prototype.toString = function () {
    return '[' + this.__a.join(',') + ']';
}

const slove = (mapsize, maze, goals) => {
    // wmap[x][y]
    // pos = [x,y]
    let wmap = Array.from({ length: mapsize[1] }, (i, v) => Array.from({ length: mapsize[0] }, (i, v) => 255))
    var q = new Queue();
    for (let i = 0; i < goals.length; i++) {
        q.enqueue(goals[i])
        wmap[goals[i][1]][goals[i][0]] = 0
    }
    console.log(maze)
    let cpos = q.dequeue();
    while (cpos !== null) {
        let count = wmap[cpos[1]][cpos[0]];
        const number = cpos[0] + cpos[1] * mapsize[1];
        // console.log(number,cpos)
        // Top
        if (maze[number][0] === 0 && cpos[1] + 1 < mapsize[1] && wmap[cpos[1] + 1][cpos[0]] === 255) {
            wmap[cpos[1] + 1][cpos[0]] = count + 1;
            q.enqueue([cpos[0], cpos[1] + 1])
        }
        // Right
        if (maze[number][1] === 0 && cpos[0] + 1 < mapsize[0] && wmap[cpos[1]][cpos[0] + 1] === 255) {
            wmap[cpos[1]][cpos[0] + 1] = count + 1;
            q.enqueue([cpos[0] + 1, cpos[1]])
        }
        // Bottom
        if (maze[number][2] === 0 && cpos[1] - 1 > -1 && wmap[cpos[1] - 1][cpos[0]] === 255) {
            wmap[cpos[1] - 1][cpos[0]] = count + 1;
            q.enqueue([cpos[0], cpos[1] - 1])
        }
        // Left
        if (maze[number][3] === 0 && cpos[0] - 1 > -1 && wmap[cpos[1]][cpos[0] - 1] === 255) {
            wmap[cpos[1]][cpos[0] - 1] = count + 1;
            q.enqueue([cpos[0] - 1, cpos[1]])
        }
        cpos = q.dequeue();
    }
    return wmap;
}
export default slove