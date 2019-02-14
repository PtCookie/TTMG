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
    if (path[0].x == path[path.length - 1].x)
        if (path[0].y == path[path.length - 1].y)
            return true;
}

function isBlocked(map, path) {
    var origin = mapFinder(map, path[0].x, path[0].y);
    var last = mapFinder(map, path[path.length - 1].x, path[path.length - 1].y);

    map[origin]
}

function keyProcess(map, path, ctx, x, y) {
    // console.log(pointMaker(x, y))
    console.log(path)
    // console.log(pointMaker(x, y) == path[path.length - 1])
    // console.log($.inArray(pointMaker(x, y), path))
    position(x, y);

    if (map[mapFinder(map, x, y)].cover) {
        if ($.inArray(pointMaker(x, y), path) === -1)
            path.push(pointMaker(x, y));

        lineDraw(ctx, x - 50, y - 50);
        if (isClosed(path)) {
            for (var i = 0; i < path.length; i++) {
                ctx.clearRect(path[i].x - 50, path[i].y - 50, 10, 10);
            }
            discover(ctx, path, map);
            path.length = 0;
        }
    }
}