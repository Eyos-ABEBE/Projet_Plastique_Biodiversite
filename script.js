// python3 -m http.server

function draw_barchart(svg, x, y, data, selector, display_y_axis) {

    console.log(data)
    svg.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", function() {
            if (display_y_axis) {
                return "bar";
            } else {
                return "bar";
            }
        })
        .attr("x", function(d) {
            if (display_y_axis) {
                return 0;
            } else {
                return x(d[selector]);
            }
        })
        .attr("width", function(d) {
            if (display_y_axis) {
                return x(d[selector]);
            } else {
                return x(0) - x(d[selector]);
            }
        })
        .attr("y", function(d) {
            return y(d.LABEL);
        })
        .attr("height", y.bandwidth());

    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    if (display_y_axis) {
        svg.append("g")
            .call(d3.axisLeft(y));
    }
}

function print_barchart(id, dataset) {
    var margin = {
            top: 20,
            right: 20,
            bottom: 30,
            left: 100,
        },
        width = 450 - margin.left - margin.right,
        height = 225 - margin.top - margin.bottom;

    var y = d3.scaleBand()
        .range([height, 0])
        .padding(0.1);

    var x = d3.scaleLinear()
        .range([0, width]);

    var x2 = d3.scaleLinear()
        .range([width, 0]);
    var svg = d3.select("#" + id).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    var svg2 = d3.select("#" + id).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");
    console.log('coucou');
    d3.csv("preprocessing/" + dataset, function(data) {
        x.domain([0, d3.max(data, function(d) {
            return (d.BIODIVERSITY);
        })])

        x2.domain([0, d3.max(data, function(d) {
            return (d.PLASTIC);
        })])

        y.domain(data.map(function(d) {
            return d['LABEL'];
        }));
        draw_barchart(svg, x2, y, data, 'PLASTIC', false)
        draw_barchart(svg2, x, y, data, 'BIODIVERSITY', true)
    });
}




function change_div(id_1) {
    elmts = document.getElementsByClassName("visualisation__bottom");
    for (var i = 0; i < elmts.length; i++) {
        elmts[i].style.display = "none";
    }
    document.getElementById(id_1).style.display = "block";
}