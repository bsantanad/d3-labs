'use strict';

let margin = {
    left: 100,
    right: 10,
    top: 10,
    bottom: 100,
};

let heights = [];
let names = [];
d3.json('data/buildings.json').then((data) => {
    data.forEach((d) => {
        d.age = +d.height;
        heights.push(d.height);
        names.push(d.name);
    });
    draw(names, heights);
}).catch((error)=> {
    console.log(error);
});

function draw(names, heights) {
    let w = 400
    let h = 600
    
    /* new code */
    let svg = d3.select('#chart-area').append('svg')
        .attr('width', h + margin.right + margin.left)
        .attr('height', w + margin.top + margin.bottom);

    let g = svg.append('g')
        .attr(
            'transform',
            'translate(' + margin.left + ',' + margin.top + ')'
        );

    let max_h = d3.max(heights)

    let x = d3.scaleBand()
        .domain(names)
        .range([0, h])
        .paddingInner(0.3)
        .paddingOuter(0.3)

    let y = d3.scaleLinear()
        .domain([0, max_h])
        .range([0, h]);

    let colours = d3.scaleOrdinal()
        .domain(names)
        .range(d3.schemeAccent);

    let buildings = g.selectAll('rect')
        .data(heights);

    buildings.enter()
        .append('rect')
            .attr('x', function(h, i) {
                return x(names[i]);
            })
            .attr('y', function(h) {
                return w - y(h);
            })
            .attr('height', function(h) {
                return y(h);
            })
            .attr('width', x.bandwidth())
            .attr('fill', function(h, i) {
                return colours(names[i]);
            })

    let x_axis = d3.axisBottom(x);
    g.append('g')
        .attr('class', 'x_axis')
        .attr(
            'transform',
            'translate(0, ' + h + ')'
        )
        .call(x_axis)
        .selectAll('text')
        .attr('x', '10')
        .attr('y', '-5')
        .attr('text-anchor', 'end')
        .attr('transform', 'rotate(-20)');

    let y_axis = d3.axisLeft(y)
        .ticks(5)
        .tickFormat( function(d) {
            return d + ' m'; //FIXME
        })

    g.append('g')
        .attr('class', 'y_axis')
        .call(y_axis);

    g.append('text')
        .attr('class', 'x_label')
        .attr('x', w / 2)
        .attr('y', h + 140)
        .attr('font-size', '20px')
        .attr('text-anchor', 'middle')
        .attr(
            'transform',
            'translate(-120, -50)'
        )
        .text('the world\'s tallest buildings');

    g.append('text')
        .attr('class', 'y_label')
        .attr('x', - (h / 2))
        .attr('y', -60)
        .attr('font-size', '20px')
        .attr('text-anchor', 'middle')
        .attr(
            'transform',
            'rotate(-90)'
        )
        .text('height (m)');
}
