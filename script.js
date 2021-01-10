// python3 -m http.server

function bar_chart(id_1, dataset, is_bio) {
  console.log(is_bio);
  var value;
  if (is_bio) {
    value = "BIODIVERSITY";
  } else {
    value = "PLASTIC";
  }

  const margin = { bottom: 65, left: 40 },
    width = 300 - margin.left,
    height = 150 - margin.bottom;

  const x = d3.scaleBand().range([0, width]).padding(0.1);

  const y = d3.scaleLinear().range([height, 0]);

  const svg = d3
    .select("#" + id_1)
    .append("svg")
    .attr("id", "svg")
    .attr("width", width + margin.left)
    .attr("height", height + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + ")");

  const div = d3
    .select("body")
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

  d3.csv("preprocessing/" + dataset, function (data) {
    x.domain(data.map((d) => d.LABEL));
    y.domain([0, d3.max(data, (d) => d[value])]);

    svg
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x).tickSize(0))
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", "rotate(-30)");

    svg.append("g").call(d3.axisLeft(y).ticks(6));

    svg
      .selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => x(d.LABEL))
      .attr("width", 30)
      .attr("y", (d) => y(d[value]))
      .attr("height", (d) => height - y(d[value]))
      .on("mouseover", function (d) {
        div.transition().duration(200).style("opacity", 0.9);
        div
          .html(value + " " + d[value])
          .style("left", d3.event.pageX + 10 + "px")
          .style("top", d3.event.pageY - 50 + "px");
      })
      .on("mouseout", function (d) {
        div.transition().duration(500).style("opacity", 0);
      });
  });
}

function change_div(id_1, id_2) {
  elmts = document.getElementsByClassName("visualisation__bottom");
  for (var i = 0; i < elmts.length; i++) {
    elmts[i].style.display = "none";
  }
  document.getElementById(id_1).style.display = "inline-block";
  document.getElementById(id_2).style.display = "inline-block";
}
