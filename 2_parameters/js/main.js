var data = [25, 20, 15, 10, 5];

var svg = d3.select('#chart-area').append('svg')
    .attr('width', 400)
    .attr('height', 400)

var rectangles = svg.selectAll('rectangle')
    .data(data)

rectangles.enter()
    .append('rect')
        .attr('x', function(d, i) {
            return (i * 50);
        })
        .attr('y', 100)
        .attr('width', 40)
        .attr('height', function(d) {
            return d;
        })
        .attr('fill', 'red');

