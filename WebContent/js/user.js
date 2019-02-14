$(document).ready(function () {
    var canvas = document.getElementById("bossBoard"); // boss 변수들
    if (gameBoard.getContext) {
        var maxLife = 5;
        var life = maxLife;
        var ctx = gameBoard.getContext('2d');
        var keypress = {
            '37': false,
            '38': false,
            '39': false,
            '40': false,
        };

        // show life
        function lifeChanger() {
            $('#life').empty();
            for (var i = 0; i < maxLife; i++) {
                if (i < life)
                    $('#life').append('<img src="img/heart.png" width="20" height="20">');
                else
                    $('#life').append('<img src="img/broken_heart.png" width="20" height="20">');
            }
        }

        lifeChanger();

        $(document).keydown(function (e) {
            keypress[e.which.toString()] = true;
        });

        $(document).keyup(function (e) {
            keypress[e.which.toString()] = false;
        });

        var ctx2 = canvas.getContext("2d");
        var ballRadius = 20;

        var boss_x = canvas.width / 2;
        var boss_y = canvas.height - 30;

        var dx = 2;
        var dy = -2;

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
                $('#p2').css('transform', 'rotate(0deg');
                p2y -= speed;
                keyProcess(map, path, ctx, p2x, p2y);
            }
            if (keypress['40'] == true && $('#p2').offset().top < 640) { // 아래
                $('#p2').css('transform', 'rotate(180deg');
                p2y += speed;
                keyProcess(map, path, ctx, p2x, p2y);
            }
            if (keypress['37'] == true && $('#p2').offset().left > 50) { // 왼쪽
                $('#p2').css('transform', 'rotate(270deg');
                p2x -= speed;
                keyProcess(map, path, ctx, p2x, p2y);
            }
            if (keypress['39'] == true && $('#p2').offset().left < 840) { // 오른쪽
                $('#p2').css('transform', 'rotate(90deg');
                p2x += speed;
                keyProcess(map, path, ctx, p2x, p2y);
            }

            if ($('#score').text() >= 36000) {
                $('#mainBody').empty();
                $('#mainBody').html('<img src="img/win.gif" width="800" height="600">');
                // alert('Victory!!');
                $(document).mousedown(function () {
                    location.reload();
                });
            }
        }, 50);

        function drawBall() {
            ctx2.beginPath();
            ctx2.arc(boss_x, boss_y, ballRadius, 0, Math.PI * 2);
            ctx2.fillStyle = "red";
            ctx2.fill();
            ctx2.closePath();
            for (var x = p2x + 10; x <= p2x + 30; x += 10) {
                for (var y = p2y; y <= p2y + 40; y += 10) {
                    if (ctx2.isPointInPath(x - 50, y - 50)) {
                        p2x = 50;
                        p2y = 50;

                        boss_x = canvas.width / 2;
                        boss_y = canvas.height - 30;

                        path.length = 0;
                        $.each(map, function (i, seg) {
                            if (seg.cover == true) {
                                ctx.fillStyle = "rgb(100,200,100)";
                                ctx.fillRect(x, y, 10, 10);
                            }
                        })

                        life--;
                        lifeChanger();

                        if (life == 0) {
                            $('#mainBody').empty();
                            $('#mainBody').html('<img src="img/over.gif" width="800" height="600">');
                            // alert('YOU DIE')
                            $(document).mousedown(function () {
                                location.reload();
                            });
                        }
                    }
                }
            }
        }

        function draw() {
            ctx2.clearRect(0, 0, canvas.width, canvas.height);
            drawBall();
            if (boss_x + dx > canvas.width - ballRadius || boss_x + dx < ballRadius) {
                dx = -dx;
            }
            if (boss_y + dy > canvas.height - ballRadius || boss_y + dy < ballRadius) {
                dy = -dy;
            }
            boss_x += dx;
            boss_y += dy;
        }

        setInterval(function () { // boss setInterval
            draw();
            // console.log('x ' + boss_x + ', y ' + boss_y)
        }, 25)
    }
})