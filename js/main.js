$(function () {
    // find all slides
    var slides = $('.slider li');
    // starting index
    var i = 0;
    // click listener
    $('.btn-next').click(function (e) {
        e.preventDefault();
        // find next index
        // i + 1 or 0 if end of slides
        i = --i % slides.length;
        // scroll to that index
        $('.slider').animate({
                'left': -(slides.eq(i).position().left)
            },
            600
        );
    });
    $('.btn-prev').click(function (e) {
        e.preventDefault();
        // find next index
        // i + 1 or 0 if end of slides
        i = ++i % slides.length;
        // scroll to that index
        $('.slider').animate({
                'left': -(slides.eq(i).position().left)
            },
            600
        );
    });

    var el = $("*[draggable='true']");
    el.each(function () {
        $(this).bind("touchstart", drag);
        $(this).bind("touchleave", drop);
        $(this).bind("touchmove", drag_over);
    });


    function handleStart(event) {
        // Handle the start of the touch
    }

});


var offset_data; //Global variable as Chrome doesn't allow access to event.dataTransfer in dragover

function drag(ev) {

    var style = window.getComputedStyle(ev.target, null);
    offset_data = ev.target.id + ',' + -(ev.target.width / 2)+','+ -(ev.target.height / 2);
    //offset_data = ev.target.id + ',' + (parseInt(style.getPropertyValue("left"), 10) - ev.clientX) + ',' + (parseInt(style.getPropertyValue("top"), 10) - ev.clientY);
    //if ($('html.touch') !== undefined) {
    var img = document.createElement("img");
    img.src = "img/none.png";
    ev.dataTransfer.setDragImage(img, 0, 0);
    // }

    ev.dataTransfer.setData("text/plain", offset_data);
}

function drag_over(event) {
    var offset;
    try {
        offset = event.dataTransfer.getData("text/plain").split(',');
    } catch (e) {
        offset = offset_data.split(',');
    }
    var dm = document.getElementById(offset[0]);
    console.log(dm);
    
    
    dm.style.left = (event.clientX + parseInt(offset[1], 10)) + 'px';
    dm.style.top = (event.clientY + parseInt(offset[2], 10)) + 'px';
    event.preventDefault();
    return false;
}

function drop(ev) {
    ev.preventDefault();
    var data;
    try {
        data = ev.dataTransfer.getData("text/plain").split(',');
    } catch (e) {
        data = offset_data.split(',');
    }

    var dm;
    if (ev.toElement.id.indexOf('-') == -1) {
        dm = document.getElementById(data[0]).cloneNode(true);
        dm.id = dm.id + '-' + Math.random();
    } else
        dm = document.getElementById(data[0])

    //tooltip
    //$(dm).addClass("tooltip");

      
        
    dm.style.left = (ev.clientX + parseInt(data[1], 10)) + 'px';
    dm.style.top = (ev.clientY + parseInt(data[2], 10)) + 'px';
    if (ev.target.id == 'landscape')
        ev.target.appendChild(dm);
}