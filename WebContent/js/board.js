$(document).ready(function () {
    var gameBoard = document.getElementById('gameBoard');

    if (gameBoard.getContext) {
        var ctx = gameBoard.getContext('2d');

        // make cover
        ctx.fillStyle = "rgb(100,200,100)";
        ctx.fillRect(0, 0, 800, 600);

        // make position map
        var map = [];
        for (var x = 50; x < 850; x += 10) {
            for (var y = 50; y < 650; y += 10) {
                map.push(mapMaker(x, y, true));
            }
        }

        // var trail1 = [pointMaker(200, 200), pointMaker(300, 200), pointMaker(300, 250), pointMaker(250,
        //     250), pointMaker(250, 300), pointMaker(450, 300), pointMaker(450, 400), pointMaker(
        //     200, 400)];

        // var trail2 = [pointMaker(200, 200), pointMaker(300, 100), pointMaker(400, 200), pointMaker(300,
        //     300)];

        // remove cover
        // discover(ctx, trail2, map);

        $('#gameBoard').mousedown(function (event) {
            x = event.pageX;
            y = event.pageY;

            x = x - x % 10;
            y = y - y % 10;

            // console.log(x + ", " + y)
            // console.log('map : ' + map[mapFinder(map, x, y)].x + ", " + map[mapFinder(map, x, y)].y)
            // console.log('index : ' + mapFinder(map, x, y))
            // discoverPoint(ctx, x, y, map);
        })
    }
});