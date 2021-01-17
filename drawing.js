function Drawing(options) {
  const height = 1000;
  const width = 1500;
  const margin = 20;
  const debug = false;
  const svg = d3
    .select(options.container)
    .append("svg")
    .attr("height", height)
    .attr("width", width);
  // .on("mousemove", () => {
  //   console.log(d3.event.pageX, d3.event.pageY);
  // });

  const tooltip = d3
    .select("body")
    .append("div")
    .attr("class", "tooltip")
    .style("position", "absolute")
    .style("z-index", "2")
    .style("visibility", "hidden");

  d3.json("assets/data.json").then((data) => {
    svg
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d) => d.start[0] - margin)
      .attr("y", (d) => d.start[1] - margin)
      .attr("width", (d) => d.end[0] - d.start[0])
      .attr("height", (d) => d.end[1] - d.start[1])
      .style("fill", "white")
      .style("fill-opacity", "0")
      .style("stroke", () => (debug ? "red" : "none"))
      .on("mouseover", (d) =>
        tooltip
          .style("visibility", "visible")
          .html(`<p>${d.message}</p><p>${d.sign ? d.sign : `— ${d.name}`}</p>`)
      )
      .on("mousemove", () => {
        tooltip
          .style("top", d3.event.pageY - 10 + "px")
          .style("left", d3.event.pageX + 10 + "px");
      })
      .on("mouseout", () => {
        tooltip.style("visibility", "hidden");
      });
  });
}
