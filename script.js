// python3 -m http.server

function draw_barchart(svg, x, y, div, data, selector, display_y_axis) {
  var label = "Marine plastic pollution : ";
  var unit = " average g/km²/sea";

  svg
    .selectAll(".bar")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", function () {
      if (display_y_axis) {
        label = "Marine fauna & flora density : ";
        unit = " average normalised density/ sea";
        return "bar_right";
      } else {
        return "bar_left";
      }
    })
    .on("mouseover", function (d) {
      div.style("opacity", 0.9).style("display", "block");
      div
        .html(label + d[selector] + unit)
        .style("left", d3.event.pageX + 10 + "px")
        .style("top", d3.event.pageY - 50 + "px");
    })
    .on("mouseout", function (d) {
      div
        .style("display", "none")
        .style("left", 0 + "px")
        .style("top", 0 + "px");
    })
    .attr("x", function (d) {
      if (display_y_axis) {
        return 0;
      } else {
        return x(d[selector]);
      }
    })
    .attr("width", function (d) {
      if (display_y_axis) {
        return x(d[selector]);
      } else {
        return x(0) - x(d[selector]);
      }
    })
    .attr("y", function (d) {
      return y(d.LABEL);
    })
    .attr("height", y.bandwidth());

  svg
    .append("g")
    .attr("class", "x-axis")
    .attr("transform", "translate(0,175)")
    .call(d3.axisBottom(x));

  if (display_y_axis) {
    svg
      .append("g")
      .attr("class", "y-axis")
      .attr("transform", "translate(-125,0)")
      .call(d3.axisRight(y));
  }
}

function print_barchart(id, dataset) {
  var margin = {
      top: 20,
      right: 20,
      bottom: 30,
      left: 130
    },
    width = 500 - margin.left - margin.right,
    height = 225 - margin.top - margin.bottom;

  var y = d3.scaleBand().range([height, 0]).padding(0.1);

  var x = d3
    .scaleLinear() // BIODIVERSITE
    .range([0, width]);

  var x2 = d3
    .scaleLinear() // PLASTIC
    .range([width, 0]);

  var svg = d3
    .select("#" + id)
    .append("svg")
    .attr("width", width + 10)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(0," + margin.top + ")");

  var svg2 = d3
    .select("#" + id)
    .append("svg")
    .attr("width", width + margin.left)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var div = d3
    .select("body")
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

  d3.csv("preprocessing/" + dataset, function (data) {
    x.domain([
      0,
      d3.max(data, function (d) {
        return parseFloat(d.BIODIVERSITY);
      })
    ]);

    x2.domain([
      0,
      d3.max(data, function (d) {
        return parseFloat(d.PLASTIC);
      })
    ]);

    y.domain(
      data.map(function (d) {
        return d["LABEL"];
      })
    );
    draw_barchart(svg, x2, y, div, data, "PLASTIC", false);
    draw_barchart(svg2, x, y, div, data, "BIODIVERSITY", true);
  });
}

function change_div(id_1) {
  elmts = document.getElementsByClassName("visualisation__bottom");
  for (var i = 0; i < elmts.length; i++) {
    elmts[i].style.display = "none";
  }
  document.getElementById(id_1).style.display = "block";
}
