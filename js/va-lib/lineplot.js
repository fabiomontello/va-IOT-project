
function chart3(time, hours, dev){ // m, cl, ch,
    localStorage.setItem('state', 3);
    document.getElementById("g1").innerHTML="<b class='h5 mb-0 font-weight-bold text-gray-800'>Day:</b> "+time+" January, <b class='h5 mb-0 font-weight-bold text-gray-800'>Hour:</b> "+hours+":00, <b class='h5 mb-0 font-weight-bold text-gray-800'>Device:</b> "+dev+"";

    document.getElementById("chart").innerHTML = "";
    var margin = {top: 10, right: 30, bottom: 10, left: 20},
    margin2 = {top: 600, right: 20, bottom: 30, left: 40},
    width =  1200 - margin.left - margin.right,
    height = 400- margin.top - margin.bottom;
    height2 = 400 - margin2.top - margin2.bottom;


    var svg = d3.select("#chart").append("div")
              .classed("svg-container", true) 
              .attr('style','padding-bottom: 36%')
              .append("svg")
              .attr("preserveAspectRatio", "xMinYMin meet")
              .attr("viewBox", "0 0 "+(width+margin.left+margin.right)+" "+height+"")
              .classed("svg-content-responsive", true)
              
            //  .attr("width", width + margin.left + margin.right)
            //  .attr("height", height + margin.top + margin.bottom)
              .append("g")
              .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var parseDate = d3.timeParse("%m/%d/%Y %H:%M");

    var x = d3.scaleTime().range([0, width]),
    x2 = d3.scaleTime().range([0, width]),
    y = d3.scaleLinear().range([height, 0]),
    y2 = d3.scaleLinear().range([height2, 0]);

    var xAxis = d3.axisBottom(x),
    xAxis2 = d3.axisBottom(x2),
    yAxis = d3.axisLeft(y);

    var brush = d3.brushX()
    .extent([[0, 0], [width, height2]])
    .on("brush end", brushed);

    var zoom = d3.zoom()
    .scaleExtent([1, Infinity])
    .translateExtent([[0, 0], [width, height]])
    .extent([[0, 0], [width, height]])
    .on("zoom", zoomed);

    var line = d3.line()
        .x(function (d) { return x(d.Date); })
        .y(function (d) { return y(d.kw); });

    var line2 = d3.line()
        .x(function (d) { return x2(d.Date); })
        .y(function (d) { return y2(d.kw); });

    var clip = svg.append("defs").append("svg:clipPath")
        .attr("id", "clip")
        .append("svg:rect")
        .attr("width", width)
        .attr("height", height)
        .attr("x", 0)
        .attr("y", 0); 

    var Line_chart = svg.append("g")
        .attr("class", "focus")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .attr("clip-path", "url(#clip)");


    var focus = svg.append("g")
        .attr("class", "focus")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var context = svg.append("g")
        .attr("class", "context")
        .attr("transform", "translate(" + margin2.left + "," + margin2.top+50 + ")");
  var data=[];
  var devv=[];
  d3.csv("data/clean_dataset.csv", function (error, datas) {
      var i;
      var l=0;
      for (i=0; i<61; i++) {
        var date = new Date(datas[i]['time']*1000);
        data[l]={Date: date, kw: datas[i][dev]};
        devv.push(datas[i][dev]);
        l=l+1;
      }
  var c_i = getCI(devv, devv.length)

  x.domain(d3.extent(data, function(d) { return d.Date; }));
  y.domain([0, d3.max(data, function (d) { return d.kw; })]);
  x2.domain(x.domain());
  y2.domain(y.domain());

  focus.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

  focus.append("g")
        .attr("class", "axis axis--y")
        .call(yAxis);

  Line_chart.append("path")
        .datum(data)
        .attr("class", "line")
        .attr("d", line);

  context.append("path")
        .datum(data)
        .attr("class", "line")
        .attr("d", line2);

  context.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height2 + ")")
      .call(xAxis2);

  context.append("g")
      .attr("class", "brush")
      .call(brush)
      .call(brush.move, x.range());

  svg.append("rect")
      .attr("class", "zoom")
      .attr("width", width)
      .attr("height", height)
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
      .call(zoom);

  svg.append("line")
        .attr("x1", 0)
        .attr("x2", width)
        .attr("y1", y(c_i[1]))
        .attr("y2", y(c_i[1]))
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .style("stroke", "rgb(34,139,34)");

  svg.append("line")
        .attr("x1", 0)
        .attr("x2", width)
        .attr("y1", y(c_i[2]))
        .attr("y2", y(c_i[2]))
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .style("stroke", "rgb(255, 0, 0)");

  svg.append("line")
        .attr("x1", 0)
        .attr("x2", width)
        .attr("y1", y(c_i[0]))
        .attr("y2", y(c_i[0]))
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .style("stroke", "rgb(255, 0, 0)");
 
  });


function brushed() {
  if (d3.event.sourceEvent && d3.event.sourceEvent.type === "zoom") return; // ignore brush-by-zoom
  var s = d3.event.selection || x2.range();
  x.domain(s.map(x2.invert, x2));
  Line_chart.select(".line").attr("d", line);
  focus.select(".axis--x").call(xAxis);
  svg.select(".zoom").call(zoom.transform, d3.zoomIdentity
      .scale(width / (s[1] - s[0]))
      .translate(-s[0], 0));
}

function zoomed() {
  if (d3.event.sourceEvent && d3.event.sourceEvent.type === "brush") return; // ignore zoom-by-brush
  var t = d3.event.transform;
  x.domain(t.rescaleX(x2).domain());
  Line_chart.select(".line").attr("d", line);
  focus.select(".axis--x").call(xAxis);
  context.select(".brush").call(brush.move, x.range().map(t.invertX, t));
}

function type(d) {
  d.Date = parseDate(d.Date);
  d.kw = +d.kw;
  return d;
}
}