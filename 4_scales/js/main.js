'use strict';

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
    let svg = d3.select('#chart-area').append('svg')
        .attr('width', 500)
        .attr('height', 500)

    let max_h = d3.max(heights)

    let x = d3.scaleBand()
        .domain(names)
        .range([0, 500])
        .paddingInner(0.3)
        .paddingOuter(0.3)

    let y = d3.scaleLinear()
        .domain([0, max_h])
        .range([0, 500]);

    let colours = d3.scaleOrdinal()
        .domain(names)
        .range(d3.schemeAccent);


    let buildings = svg.selectAll('rect')
        .data(heights);

    buildings.enter()
        .append('rect')
            .attr('x', function(h, i) {
                return x(names[i]);
            })
            .attr('y', function(h) {
                return 500 - y(h);
            })
            .attr('height', function(h) {
                return y(h);
            })
            .attr('width', x.bandwidth())
            .attr('fill', function(h, i) {
                return colours(names[i]);
            })
}
