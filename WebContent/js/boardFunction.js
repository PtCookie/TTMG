function pointMaker(x, y) {
    return {
        "x": x,
        "y": y
    };
}

function mapMaker(x, y, cover) {
    return {
        "x": x,
        "y": y,
        "cover": cover
    }
}

function mapFinder(map, x, y) {
    for (var index = 0; index < map.length; index++)
        if (map[index].x == x && map[index].y == y)
            return index;
}

function discover(ctx, trails, map) {
    var minX = trails[0].x;
    var minY = trails[0].y;
    var maxX = trails[0].x;
    var maxY = trails[0].y;

    ctx.beginPath();
    // start point
    ctx.moveTo(trails[0].x, trails[0].y);

    // make path of points
    $.each(trails, function (index, point) {
        // set max/min value
        if (point.x >= maxX)
            maxX = point.x;
        if (point.x <= minX)
            minX = point.x;
        if (point.y >= maxY)
            maxY = point.y;
        if (point.y <= minY)
            minY = point.y;

        ctx.lineTo(point.x, point.y);
    })
    ctx.closePath();

    // remove cover
    for (var x = minX; x <= maxX; x += 10) {
        for (var y = minY; y <= maxY; y += 10) {
            if (ctx.isPointInPath(x, y)) {
                ctx.clearRect(x, y, 10, 10);
                map[mapFinder(map, x, y)] = mapMaker(x, y, false);
            }
        }
    }
}

function discoverPoint(ctx, x, y, map) {
    // remove cover
    ctx.clearRect(x, y, 10, 10);
    map[mapFinder(map, x, y)] = mapMaker(x, y, false);
}

function scoreCheck(map) {
    var score = 0;
    $.each(map, function (index, seg) {
        if (seg.cover == false)
            score += 10;
    })

    return score;
}