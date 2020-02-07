
function chart2(dd, hh){
    localStorage.setItem('state', 2);
    localStorage.setItem('day', dd);
    localStorage.setItem('hour', hh);
    document.getElementById("g1").innerHTML="<b class='h5 mb-0 font-weight-bold text-gray-800'>Day:</b> "+dd+" January, <b class='h5 mb-0 font-weight-bold text-gray-800'>Hour:</b> "+hh+":00";
  
    document.getElementById("chart").innerHTML = "";
    var margin = {top: 20, right: 10, bottom: 30, left: 100},
    width = 1160 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

    var y = d3.scaleBand()
          .range([height, 0])
          .padding(0.1);

    var x = d3.scaleLinear()
          .range([0, width]);
          
    var svg = d3.select("#chart")
        .append("div")
              .classed("svg-container", true) 
              .attr('style','padding-bottom: 45%')
              .append("svg")
              .attr("preserveAspectRatio", "xMinYMin meet")
              .attr("viewBox", "0 0 "+(width+margin.left+margin.right)+" "+height+"")
              .classed("svg-content-responsive", true)
              
            //  .attr("width", width + margin.left + margin.right)
            //  .attr("height", height + margin.top + margin.bottom)
              .append("g")
              .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


d3.csv("data/clean_dataset.csv", function(error, datas) {

  var i;
  var len=datas.length;
  var di=[];var f1=[];var f2=[];var ho=[];var fr=[];var wc=[];var gd=[];var k1=[];var k2=[];var k3=[];
  var ba=[];var we=[];var mi=[];var li=[];
  for (i=0; i<datas.length; i++) {
    var date = new Date(datas[i]['time']*1000);
    if((parseInt(date.getDate())==parseInt(dd)) && (parseInt(date.getHours())==parseInt(hh))){

      di.push(datas[i]['Dishwasher [kW]']);
      f1.push(datas[i]['Furnace 1 [kW]']);
      f2.push(datas[i]['Furnace 2 [kW]']);
      ho.push(datas[i]['Home office [kW]']);
      fr.push(datas[i]['Fridge [kW]']);
      wc.push(datas[i]['Wine cellar [kW]']);
      gd.push(datas[i]['Garage door [kW]']);
      k1.push(datas[i]['Kitchen 12 [kW]']);
      k2.push(datas[i]['Kitchen 14 [kW]']);
      k3.push(datas[i]['Kitchen 38 [kW]']);
      ba.push(datas[i]['Barn [kW]']);
      we.push(datas[i]['Well [kW]']);
      mi.push(datas[i]['Microwave [kW]']);
      li.push(datas[i]['Living room [kW]']);
    }
  }
  var dataa=[{salesperson: "Dishwasher", sales: getMean(di, len)}, {salesperson: "Furnace 1", sales: getMean(f1, len)}, {salesperson: "Furnace 2", sales: getMean(f2, len)}, {salesperson: "Home office", sales: getMean(ho, len)}, {salesperson: "Fridge", sales: getMean(fr, len)}, {salesperson: "Wine cellar", sales: getMean(wc, len)}, {salesperson: "Garage door", sales: getMean(gd, len)},{salesperson: "Kitchen 12", sales: getMean(k1, len)}, {salesperson: "Kitchen 14", sales: getMean(k2, len)}, {salesperson: "Kitchen 38", sales: getMean(k3, len)}, {salesperson: "Barn", sales: getMean(ba, len)}, {salesperson: "Well", sales: getMean(we, len)}, {salesperson: "Microwave", sales: getMean(mi, len)}, {salesperson: "Living room", sales: getMean(li, len)}];

  var data = dataa.slice(0);
  data.sort(function(a,b) {
    return a.sales - b.sales;
  });
  // format the data
  data.forEach(function(d) {
    d.sales = +d.sales;
  });

  // Scale the range of the data in the domains
  x.domain([0, d3.max(data, function(d){ return d.sales+0.01; })]);
  y.domain(data.map(function(d) { return d.salesperson; }));
  //y.domain([0, d3.max(data, function(d) { return d.sales; })]);

  // append the rectangles for the bar chart
  svg.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      //.attr("x", function(d) { return x(d.sales); })
      .attr("width", function(d) {return x(d.sales); } )
      .attr("y", function(d) { return y(d.salesperson); })
      .attr("height", y.bandwidth())
      .on("click", function(d) {
          chart3(dd, hh, d.salesperson+" [kW]");
      })
      .append("title").text(function(d) { return "Value: "+d.sales+ "Kw"; });
      
  // add the x Axis
  svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  // add the y Axis
  svg.append("g")
      .call(d3.axisLeft(y));

  d3.csv("data/clean_dataset.csv", function(error, datas) {

  var i;
  var len=datas.length;
  var di=[];var f1=[];var f2=[];var ho=[];var fr=[];var wc=[];var gd=[];var k1=[];var k2=[];var k3=[];
  var ba=[];var we=[];var mi=[];var li=[];
  for (i=0; i<datas.length; i++) {
    var date = new Date(datas[i]['time']*1000);
    if(parseInt(date.getHours())==parseInt(hh)){

      di.push(datas[i]['Dishwasher [kW]']);
      f1.push(datas[i]['Furnace 1 [kW]']);
      f2.push(datas[i]['Furnace 2 [kW]']);
      ho.push(datas[i]['Home office [kW]']);
      fr.push(datas[i]['Fridge [kW]']);
      wc.push(datas[i]['Wine cellar [kW]']);
      gd.push(datas[i]['Garage door [kW]']);
      k1.push(datas[i]['Kitchen 12 [kW]']);
      k2.push(datas[i]['Kitchen 14 [kW]']);
      k3.push(datas[i]['Kitchen 38 [kW]']);
      ba.push(datas[i]['Barn [kW]']);
      we.push(datas[i]['Well [kW]']);
      mi.push(datas[i]['Microwave [kW]']);
      li.push(datas[i]['Living room [kW]']);
    }
  }

  var interval=[
  {mean: getCI(di, len)[1], ci95_hi: getCI(di, len)[2], ci95_lo: getCI(di, len)[0], device: "Dishwasher"},
  {mean: getCI(f1, len)[1], ci95_hi: getCI(f1, len)[2], ci95_lo: getCI(f1, len)[0], device: "Furnace 1"},
  {mean: getCI(f2, len)[1], ci95_hi: getCI(f2, len)[2], ci95_lo: getCI(f2, len)[0], device: "Furnace 2"},
  {mean: getCI(ho, len)[1], ci95_hi: getCI(ho, len)[2], ci95_lo: getCI(ho, len)[0], device: "Home office"},
  {mean: getCI(fr, len)[1], ci95_hi: getCI(fr, len)[2], ci95_lo: getCI(fr, len)[0], device: "Fridge"},
  {mean: getCI(wc, len)[1], ci95_hi: getCI(wc, len)[2], ci95_lo: getCI(wc, len)[0], device: "Wine cellar"},
  {mean: getCI(gd, len)[1], ci95_hi: getCI(gd, len)[2], ci95_lo: getCI(gd, len)[0], device: "Garage door"},
  {mean: getCI(k1, len)[1], ci95_hi: getCI(k1, len)[2], ci95_lo: getCI(k1, len)[0], device: "Kitchen 12"},
  {mean: getCI(k2, len)[1], ci95_hi: getCI(k2, len)[2], ci95_lo: getCI(k2, len)[0], device: "Kitchen 14"},
  {mean: getCI(k3, len)[1], ci95_hi: getCI(k3, len)[2], ci95_lo: getCI(k3, len)[0], device: "Kitchen 38"},
  {mean: getCI(ba, len)[1], ci95_hi: getCI(ba, len)[2], ci95_lo: getCI(ba, len)[0], device: "Barn"},
  {mean: getCI(we, len)[1], ci95_hi: getCI(we, len)[2], ci95_lo: getCI(we, len)[0], device: "Well"},
  {mean: getCI(mi, len)[1], ci95_hi: getCI(mi, len)[2], ci95_lo: getCI(mi, len)[0], device: "Microwave"},
  {mean: getCI(li, len)[1], ci95_hi: getCI(li, len)[2], ci95_lo: getCI(li, len)[0], device: "Living room"}
  ]

  svg.append("g")
      .selectAll("myRect")
      .data(interval)
      .enter()
      .append("rect")
        .attr("x", function(d) {return x(d.mean); } )
        .attr("y", function(d) { return y(d.device); })
        .attr("width", "3px")
        .attr("height", "28px")
        .attr("fill", "#228B22")
      .style("cursor", "pointer")
      ///.attr("transform", "translate(0,+17.5)")
      .append("title").text(function(d) { return "Mean Value: "+d.mean+ "Kw"; });
      
  svg.append("g")
      .selectAll("myRect")
      .data(interval)
      .enter()
      .append("rect")
        .attr("x", function(d) {return x(d.ci95_hi); } )
        .attr("y", function(d) { return y(d.device); })
        .attr("width", "3px")
        .attr("height", "28px")
        .attr("fill", "#F31526")
      .style("cursor", "pointer")
      //.attr("transform", "translate(0,+17.5)")
      .append("title").text(function(d) { return "High Value: "+d.ci95_hi+ "Kw"; });
      
  svg.append("g")
      .selectAll("myRect")
      .data(interval)
      .enter()
      .append("rect")
        .attr("x", function(d) {return x(d.ci95_lo); } )
        .attr("y", function(d) { return y(d.device); })
        .attr("width", "3px")
        .attr("height", "28px")
        .attr("fill", "#F31526")
      //.style("cursor", "pointer")
      .append("title").text(function(d) { return "Low Value: "+d.ci95_lo+ "Kw"; });
  });

});

}