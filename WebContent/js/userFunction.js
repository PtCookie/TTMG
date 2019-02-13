function lineDraw(ctx, x, y) {
    ctx.fillStyle = "rgb(255,255,255)";
    ctx.fillRect(x, y, 10, 10);
};

function position(x, y) {
    $('#p2').css({
        top: y,
        left: x
    });
}

function isClosed(path) {
    if (path.length < 4)
        return false;

    var origin = path[0].x + path[0].y;
    var last = path[path.length - 1].x + path[path.length - 1].y;

    if (path[0].x == path[path.length - 1].x)
        if (path[0].y == path[path.length - 1].y)
            return true;
}

function keyProcess(map, path, ctx, x, y) {
    position(x, y);
    console.log(path)
    if (map[mapFinder(map, x, y)].cover) {
        path.push(pointMaker(x, y));

        lineDraw(ctx, x - 50, y - 50);
        if (isClosed(path)) {
            for (var i = 0; i < path.length; i++) {
                ctx.clearRect(path[i].x - 50, path[i].y - 50, 10, 10);
            }
            discover(ctx, path, map);
            console.log(path[0])
            path.length = 0;
        }
    }
}