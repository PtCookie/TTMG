$(document).ready(function () {
    if (gameBoard.getContext) {
        var ctx = gameBoard.getContext('2d');
        var keypress = {
            '37': false,
            '38': false,
            '39': false,
            '40': false,
        };

        $(document).keydown(function (e) {
            keypress[e.which.toString()] = true;
        });

        $(document).keyup(function (e) {
            keypress[e.which.toString()] = false;
        });

        var p2x = 50;
        var p2y = 50;
        var speed = 10; //유저 속도

        var map = [];
        for (var x = 50; x < 850; x += 10) {
            for (var y = 50; y < 650; y += 10) {
                map.push(mapMaker(x, y, true));
            }
        }

        var path = [pointMaker(50, 50)];

        position(p2x, p2y);

        setInterval(function () {
            if (keypress['38'] == true && $('#p2').offset().top > 50) { // 위
                p2y -= speed;
                keyProcess(map, path, ctx, p2x, p2y);
            }
            if (keypress['40'] == true && $('#p2').offset().top < 640) { // 아래
                p2y += speed;
                keyProcess(map, path, ctx, p2x, p2y);
            }
            if (keypress['37'] == true && $('#p2').offset().left > 50) { // 왼쪽
                p2x -= speed;
                keyProcess(map, path, ctx, p2x, p2y);
            }
            if (keypress['39'] == true && $('#p2').offset().left < 840) { // 오른쪽
                p2x += speed;
                keyProcess(map, path, ctx, p2x, p2y);
            }

        }, 25);
    }
})