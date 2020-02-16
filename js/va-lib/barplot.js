
function chart2(dd, hh){

    localStorage.setItem('state', 2);
    localStorage.setItem('day', dd);
    localStorage.setItem('hour', hh);
    document.getElementById("g1").innerHTML="<b class='h5 mb-0 font-weight-bold text-gray-800'>Day:</b> "+dd+" January, <b class='h5 mb-0 font-weight-bold text-gray-800'>Hour:</b> "+hh+":00";
    document.getElementById("bac").style.display="block";
    document.getElementById("rad").style.display="block";
    document.getElementById("chart").innerHTML = "";
    var margin = {top: 10, right: 10, bottom: 30, left: 100},
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
              .append("g")
              .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


d3.csv("data/clean_dataset.csv", function(error, datas) {

  var i;
  var len=datas.length;
  var di=[];var f1=[];var f2=[];var ho=[];var fr=[];var wc=[];var gd=[];var k1=[];var k2=[];var k3=[];
  var ba=[];var we=[];var mi=[];var li=[];
  for (i=0; i<datas.length; i++) {
    var date = new Date(datas[i]['time_europe']);

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

  var dataa=[{salesperson: "Dishwasher", sales: getMean(di, di.length)}, {salesperson: "Furnace 1", sales: getMean(f1, f1.length)}, {salesperson: "Furnace 2", sales: getMean(f2, f2.length)}, {salesperson: "Home office", sales: getMean(ho, ho.length)}, {salesperson: "Fridge", sales: getMean(fr, fr.length)}, {salesperson: "Wine cellar", sales: getMean(wc, wc.length)}, {salesperson: "Garage door", sales: getMean(gd, gd.length)},{salesperson: "Kitchen 12", sales: getMean(k1, k1.length)}, {salesperson: "Kitchen 14", sales: getMean(k2, k2.length)}, {salesperson: "Kitchen 38", sales: getMean(k3, k3.length)}, {salesperson: "Barn", sales: getMean(ba, ba.length)}, {salesperson: "Well", sales: getMean(we, we.length)}, {salesperson: "Microwave", sales: getMean(mi, mi.length)}, {salesperson: "Living room", sales: getMean(li, li.length)}];

  var data = dataa.slice(0);
  data.sort(function(a,b) {
    return a.sales - b.sales;
  });
  // format the data
  data.forEach(function(d) {
    d.sales = +d.sales;
  });

  x.domain([0, d3.max(data, function(d){ return d.sales+0.01; })]);
  y.domain(data.map(function(d) { return d.salesperson; }));

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
      .append("title").text(function(d) { return "Value: "+Number((d.sales).toFixed(4))+ "Kw"; });

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

  var lq=di.length;

  var interval=[
  {mean: getMean(di, lq), device: "Dishwasher"},
  {mean: getMean(f1, lq), device: "Furnace 1"},
  {mean: getMean(f2, lq), device: "Furnace 2"},
  {mean: getMean(ho, lq), device: "Home office"},
  {mean: getMean(fr, lq), device: "Fridge"},
  {mean: getMean(wc, lq), device: "Wine cellar"},
  {mean: getMean(gd, lq), device: "Garage door"},
  {mean: getMean(k1, lq), device: "Kitchen 12"},
  {mean: getMean(k2, lq), device: "Kitchen 14"},
  {mean: getMean(k3, lq), device: "Kitchen 38"},
  {mean: getMean(ba, lq), device: "Barn"},
  {mean: getMean(we, lq), device: "Well"},
  {mean: getMean(mi, lq), device: "Microwave"},
  {mean: getMean(li, lq), device: "Living room"}
  ]
  

  var i;
  var len=datas.length;
  var di=[];var f1=[];var f2=[];var ho=[];var fr=[];var wc=[];var gd=[];var k1=[];var k2=[];var k3=[];
  var ba=[];var we=[];var mi=[];var li=[];
  for (i=0; i<datas.length; i++) {
    var date = new Date(datas[i]['time']*1000);
    if(parseInt(date.getDate())==parseInt(dd)){

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

  var lq=di.length;

  var interval2=[
  {mean: getMean(di, lq), device: "Dishwasher"},
  {mean: getMean(f1, lq), device: "Furnace 1"},
  {mean: getMean(f2, lq), device: "Furnace 2"},
  {mean: getMean(ho, lq), device: "Home office"},
  {mean: getMean(fr, lq), device: "Fridge"},
  {mean: getMean(wc, lq), device: "Wine cellar"},
  {mean: getMean(gd, lq), device: "Garage door"},
  {mean: getMean(k1, lq), device: "Kitchen 12"},
  {mean: getMean(k2, lq), device: "Kitchen 14"},
  {mean: getMean(k3, lq), device: "Kitchen 38"},
  {mean: getMean(ba, lq), device: "Barn"},
  {mean: getMean(we, lq), device: "Well"},
  {mean: getMean(mi, lq), device: "Microwave"},
  {mean: getMean(li, lq), device: "Living room"}
  ]


  d3.select("#rad").html("<p style='float:left;''><input type='radio' id='test1' name='radio-group' value='1' checked><label for='test1'>Weekly average for hour</label></p><p><input type='radio' id='test2'  value='2'  name='radio-group'><label for='test2'>Average for day</label></p>");


      svg.selectAll("#mmi").remove()
      svg.append("g")
        .attr("id","mmi")
        .selectAll("myRect")
        .data(interval2)
        .enter()
        .append("rect")
        .attr('class', (d)=>{return 'meanline'+d.device.replace(/[^a-z0-9]/gi,'')})
        .attr("x", 0)
        .attr("y", function(d) { return y(d.device); })
        .transition().duration(1750).attr("x", function(d) {return x(d.mean); } )
        .attr("width", "3px")
        .attr("height", "28px")
        .attr("fill", "#F31526")
        .style("cursor", "pointer")

      d3.selectAll("input").on("change", function(){
        console.log(interval)
      if(this.value==2){
        interval.forEach(function(d){
          svg.selectAll('.meanline'+d.device.replace(/[^a-z0-9]/gi,''))
                .transition().duration(1750)
                .attr("x", x(d.mean) )
        })
      }else{
        interval2.forEach(function(d){
          svg.selectAll('.meanline'+d.device.replace(/[^a-z0-9]/gi,''))
              .transition().duration(1750)
                .attr("x", x(d.mean) )
        })
      }
    });

 });

});

}