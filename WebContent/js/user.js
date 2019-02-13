	$(function() {
	    var keypress = {
	    '37' : false,
	    '38' : false,
		'39' : false,
		'40' : false,
	    };
	    
	    var p2x = 50; //player start x 좌표
	    var p2y = 50; //player start y 좌표                   
	    var speed = 3; //유저 속도
	    setInterval(function () {
	        // p2
	        	
	        if (keypress['38'] == true && $('#p2').offset().top > 50) { // 위
	        	lineTest();
	        	p2y -= speed;
	        	lineDraw();
	        }
	        if (keypress['40'] == true && $('#p2').offset().top <= 644) { // 아래
	        	lineTest();
	        	p2y += speed;
	        	lineDraw();
	        }
	        if (keypress['37'] == true && $('#p2').offset().left >50) { // 왼쪽
	        	lineTest();
	        	p2x -= speed; 
	        	lineDraw();
	        }
	        if (keypress['39'] == true && $('#p2').offset().left <= 843) { // 오른쪽
	        	lineTest();
	        	p2x += speed;
	        	lineDraw();
	        }
	
	        // update position
	        $('#p2').css({
	            top: p2y,
	            left: p2x
	        });
	    }, 5);     
	    
	    $(document).keydown(function (e) {
	        keypress[e.which.toString()] = true;
	    });
	    
	    $(document).keyup(function (e) {
	        keypress[e.which.toString()] = false;
	    });
	
	});
	
	function lineDraw() {
		var line = $('<img />');
	    line.attr('src', 'img/line.jpg');
	    line.attr('id', 'line');
	    line.css('position', 'absolute');
	    line.css('left', $('#p2').css('left'));
	    line.css('top', $('#p2').css('top'));
	    $('div').append(line);
	};
	
	function lineTest() {
		$('#print').text($('#p2').offset().left);
		$('#print2').text($('#p2').offset().top);
	};
		