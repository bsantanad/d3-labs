'use strict';

/*
d3.csv('./data/ages.csv', function(data){
    console.log(data) 
});

d3.tsv('./data/ages.tsv', function(data){
    console.log(data) 
});
*/

let ages = [];
d3.json('data/ages.json').then((data) => {
    data.forEach((d) => {
        d.age = +d.age;
        ages.push(d.age);
    });
    draw(ages);
}).catch((error)=> {
    console.log(error);
});


function draw(data) {
    let svg = d3.select('#chart-area').append('svg')
        .attr('width', 400)
        .attr('height', 400)

    let circles = svg.selectAll('circle')
        .data(data);

    circles.enter()
        .append('circle')
            .attr('cx', function(d, i) {
                return (i * 50) + 50;
            })
            .attr('cy', 100)
            .attr('r', function(d) {
                return d;
            })
            .attr('fill', 'blue');
}
