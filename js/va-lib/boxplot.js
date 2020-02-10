function boxpl(){
// set the dimensions and margins of the graph
localStorage.setItem('stat2', 1);
document.getElementById("boxplt").style.display="block";
document.getElementById("brpplt").style.display="none";
document.getElementById("bxm").style.display="none";
document.getElementById("brpplt1").innerHTML = "";
var margin = {top: 40, right: 30, bottom: 30, left: 40},
    width = 1160 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#boxplt")
 .append("div")
              .classed("svg-container", true) 
              .attr('style','padding-bottom: 55%')
              .append("svg")
              .attr("preserveAspectRatio", "xMinYMin meet")
              .attr("viewBox", "0 0 "+(width+margin.left+margin.right)+" "+height+"")
              .classed("svg-content-responsive", true)
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");


d3.csv("data/clean_dataset.csv", function(error, rows) {

  var i;
  var len=rows.length;
  var di=[];var f1=[];var f2=[];var ho=[];var fr=[];var wc=[];var gd=[];var k1=[];var k2=[];var k3=[];
  var ba=[];var we=[];var mi=[];var li=[];
  for (i=0; i<rows.length; i++) {
      di.push(rows[i]['Dishwasher [kW]']);
      f1.push(rows[i]['Furnace 1 [kW]']);
      f2.push(rows[i]['Furnace 2 [kW]']);
      ho.push(rows[i]['Home office [kW]']);
      fr.push(rows[i]['Fridge [kW]']);
      wc.push(rows[i]['Wine cellar [kW]']);
      gd.push(rows[i]['Garage door [kW]']);
      k1.push(rows[i]['Kitchen 12 [kW]']);
      k2.push(rows[i]['Kitchen 14 [kW]']);
      k3.push(rows[i]['Kitchen 38 [kW]']);
      ba.push(rows[i]['Barn [kW]']);
      we.push(rows[i]['Well [kW]']);
      mi.push(rows[i]['Microwave [kW]']);
      li.push(rows[i]['Living room [kW]']);
  }
  var lung=di.length;

  var sumstat=[
  {key: "Dishwasher", value:{q1: getCII(di, lung)[1], median: getCII(di, lung)[2], q3: getCII(di, lung)[3], interQuantileRange: (getCII(di, lung)[3]-getCII(di,lung)[1]), min: getCII(di, lung)[0], max: getCII(di, lung)[4]}},
  {key: "Furnace 1", value:{q1: getCII(f1, lung)[1], median: getCII(f1, lung)[2], q3: getCII(f1, lung)[3], interQuantileRange: (getCII(f1, lung)[3]-getCII(f1, lung)[1]), min: getCII(f1, lung)[0], max: getCII(f1, lung)[4]}},
  {key: "Furnace 2", value:{q1: getCII(f2, lung)[1], median: getCII(f2, lung)[2], q3: getCII(f2, lung)[3], interQuantileRange: (getCII(f2, lung)[3]-getCII(f2, lung)[1]), min: getCII(f2, lung)[0], max: getCII(f2, lung)[4]}},
  {key: 'Home office', value:{q1: getCII(ho, lung)[1], median: getCII(ho, lung)[2], q3: getCII(ho, lung)[3], interQuantileRange: (getCII(ho, lung)[3]-getCII(ho, lung)[1]), min: getCII(ho, lung)[0], max: getCII(ho, lung)[4]}},
  {key: 'Fridge', value:{q1: getCII(fr, lung)[1], median: getCII(fr,lung)[2], q3: getCII(fr, lung)[3], interQuantileRange: (getCII(fr, lung)[3]-getCII(fr, lung)[1]), min: getCII(fr, lung)[0], max: getCII(fr, lung)[4]}},
  {key: 'Wine cellar', value:{q1: getCII(wc, lung)[1], median: getCII(wc, lung)[2], q3: getCII(wc, lung)[3], interQuantileRange: (getCII(wc, lung)[3]-getCII(wc, lung)[1]), min: getCII(wc, lung)[0], max: getCII(wc, lung)[4]}},
  {key: 'Garage door', value:{q1: getCII(gd, lung)[1], median: getCII(gd, lung)[2], q3: getCII(gd, lung)[3], interQuantileRange: (getCII(gd, lung)[3]-getCII(gd, lung)[1]), min: getCII(gd, lung)[0], max: getCII(gd, lung)[4]}},
  {key: 'Kitchen 12', value:{q1: getCII(k1, lung)[1], median: getCII(k1, lung)[2], q3: getCII(k1, lung)[3], interQuantileRange: (getCII(k1, lung)[3]-getCII(k1, lung)[1]), min: getCII(k1, lung)[0], max: getCII(k1, lung)[4]}},
  {key: 'Kitchen 14', value:{q1: getCII(k2, lung)[1], median: getCII(k2, lung)[2], q3: getCII(k2, lung)[3], interQuantileRange: (getCII(k2, lung)[3]-getCII(k2, lung)[1]), min: getCII(k2, lung)[0], max: getCII(k2, lung)[4]}},
  {key: 'Kitchen 38', value:{q1: getCII(k3, lung)[1], median: getCII(k3, lung)[2], q3: getCII(k3, lung)[3], interQuantileRange: (getCII(k3, lung)[3]-getCII(k3, lung)[1]), min: getCII(k3, lung)[0], max: getCII(k3, lung)[4]}},
  {key: 'Barn', value:{q1: getCII(ba, lung)[1], median: getCII(ba, lung)[2], q3: getCII(ba, lung)[3], interQuantileRange: (getCII(ba, lung)[3]-getCII(ba, lung)[1]), min: getCII(ba, lung)[0], max: getCII(ba, lung)[4]}},
  {key: 'Well', value:{q1: getCII(we, lung)[1], median: getCII(we, lung)[2], q3: getCII(we, lung)[3], interQuantileRange: (getCII(we, lung)[3]-getCII(we, lung)[1]), min: getCII(we, lung)[0], max: getCII(we, lung)[4]}},
  {key: 'Microwave', value:{q1: getCII(mi,lung)[1], median: getCII(mi, lung)[2], q3: getCII(mi, lung)[3], interQuantileRange: (getCII(mi, lung)[3]-getCII(mi, lung)[1]), min: getCII(mi, lung)[0], max: getCII(mi, lung)[4]}},
  {key: 'Living room', value:{q1: getCII(li, lung)[1], median: getCII(li, lung)[2], q3: getCII(li, lung)[3], interQuantileRange: (getCII(li, lung)[3]-getCII(li, lung)[1]), min: getCII(li, lung)[0], max: getCII(li, lung)[4]}}
  ];

  localStorage.setItem('global', JSON.stringify(sumstat));

  var x = d3.scaleBand()
    .range([ 0, width ])
    .domain(["Dishwasher", "Furnace 1", "Furnace 2", "Home office", "Fridge", "Wine cellar", "Garage door", "Kitchen 12", "Kitchen 14", "Kitchen 38", "Barn", "Well", "Microwave", "Living room"])
    .paddingInner(1)
    .paddingOuter(.5)
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))


  // Show the Y scale
  var y = d3.scaleLinear()
    .domain([0, 0.15])
    .range([height, 0])
  svg.append("g").call(d3.axisLeft(y))

  //Color scale
  var color = d3.scaleOrdinal(["#1f77b4", "#aec7e8", "#ff7f0e", "#ffbb78", "#2ca02c", "#98df8a", "#d62728", "#ff9896", "#9467bd", "#c5b0d5", "#8c564b", "#c49c94", "#e377c2", "#f7b6d2", "#7f7f7f", "#c7c7c7", "#bcbd22", "#dbdb8d", "#17becf", "#9edae5"]);
  
  // Show the main vertical line
  svg
    .selectAll("vertLines")
    .data(sumstat)
    .enter()
    .append("line")
      .attr("x1", function(d){return(x(d.key))})
      .attr("x2", function(d){return(x(d.key))})
      .attr("y1", function(d){return(y(d.value.min))})
      .attr("y2", function(d){return(y(d.value.max))})
      .attr("stroke", "black")
      .style("stroke-dasharray", ("3, 3"))
      .style("width", 1)
      .style("opacity", .2);

  // rectangle for the main box
  var boxWidth = 50
  svg
    .selectAll("boxes")
    .data(sumstat)
    .enter()
    .append("rect")
        .attr("x", function(d){return(x(d.key)-boxWidth/2)})
        .attr("y", function(d){return(y(d.value.q3))})
        .attr("height", function(d){return(y(d.value.q1)-y(d.value.q3))})
        .attr("width", boxWidth )
        .attr("stroke", "black")
        .style("fill", function(d,i){return color(i)})
        .style("cursor", "pointer")
        .on("click", function(d) {
          get_bar2(d.key);
         //document.getElementById("dayc").innerHTML = d.key;
         })
        .on("mouseover", function(d){ d3.select("#box"+d.key.replace(/ /g,'').replace('[','').replace(']','')).style("opacity", "1");})
        .on("mouseleave", function(d){ d3.select("#box"+d.key.replace(/ /g,'').replace('[','').replace(']','')).style("opacity", "0");})
        .append("title").text(function(d) { 
           return "Max: "+d.value.max+"\nHigh: "+d.value.q3+"\nMean: "+d.value.median+"\nLow: "+d.value.q1+"\nMin: "+d.value.min; 
        });

  // Show the median
  svg
    .selectAll("medianLines")
    .data(sumstat)
    .enter()
    .append("line")
      .attr("x1", function(d){return(x(d.key)-boxWidth/2) })
      .attr("x2", function(d){return(x(d.key)+boxWidth/2) })
      .attr("y1", function(d){return(y(d.value.median))})
      .attr("y2", function(d){return(y(d.value.median))})
      .attr("stroke", "black")
      .style("width", 80)

  var ss = svg
    .selectAll("medianLines")
    .data(sumstat)
    .enter()
    .append("g")
    .style("opacity",0)
    .attr("id", function(d){return("box"+d.key.replace(/ /g,'').replace('[','').replace(']',''))});

    ss.append("line")
      .attr("x1", 0 )
      .attr("x2", width )
      .attr("y1", function(d){return(y(d.value.q1))})
      .attr("y2", function(d){return(y(d.value.q1))})
      .style("stroke", "rgb(255, 0, 0)")
      .style("width", 220)



    ss.append("line")
      .attr("x1", 0 )
      .attr("x2", width )
      .attr("y1", function(d){return(y(d.value.q3))})
      .attr("y2", function(d){return(y(d.value.q3))})
      .style("stroke", "rgb(255, 0, 0)")
      .style("width", 220)


    ss.append("line")
      .attr("x1", 0 )
      .attr("x2", width )
      .attr("y1", function(d){return(y(d.value.median))})
      .attr("y2", function(d){return(y(d.value.median))})
      .style("width", 220)
      .style("stroke", "rgb(34,139,34)")

  svg
    .selectAll("medianLines")
    .data(sumstat)
    .enter()
    .append("line")
      .attr("x1", function(d){return(x(d.key)-boxWidth/2) })
      .attr("x2", function(d){return(x(d.key)+boxWidth/2) })
      .attr("y1", function(d){return(y(d.value.max))})
      .attr("y2", function(d){return(y(d.value.max))})
      .attr("stroke", "black")
      .style("width", 80)
      .style("opacity", .5);
  svg
    .selectAll("medianLines")
    .data(sumstat)
    .enter()
    .append("line")
      .attr("x1", function(d){return(x(d.key)-boxWidth/2) })
      .attr("x2", function(d){return(x(d.key)+boxWidth/2) })
      .attr("y1", function(d){return(y(d.value.min))})
      .attr("y2", function(d){return(y(d.value.min))})
      .attr("stroke", "black")
      .style("width", 80)
      .style("opacity", .5);

})
}

boxpl();