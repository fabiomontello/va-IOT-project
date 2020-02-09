
var margin = {top: 0, right: 30, bottom: 70, left: 90},
    width = 720 - margin.left - margin.right,
    height = 460 - margin.top - margin.bottom;

var svg = d3.select("#brpplt2")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

var x = d3.scaleBand()
  .range([ 0, width ])
  .padding(0.2);
var xAxis = svg.append("g")
  .attr("transform", "translate(0," + height + ")")

// Initialize the Y axis
var y = d3.scaleLinear()
  .range([ height, 0]);
var yAxis = svg.append("g")
  .attr("class", "myYaxis")


function update(data, day) {

  // Update the X axis
  x.domain(data.map(function(d) { return d.day; }))
  xAxis.call(d3.axisBottom(x))

  // Update the Y axis
  y.domain([0, d3.max(data, function(d) { return d.value }) ]);
  yAxis.transition().duration(1000).call(d3.axisLeft(y));

  // Create the u variable
  var u = svg.selectAll("rect")
    .data(data)

  u
    .enter()
    .append("rect") // Add a new rect for each new elements
    .merge(u) // get the already existing elements as well
    .transition() // and apply changes to all of them
    .duration(1000)
      .attr("x", function(d) { return x(d.day); })
      .attr("y", function(d) { return y(d.value); })
      .attr("width", x.bandwidth())
      .attr("height", function(d) { return height - y(d.value); })
      .attr("fill", "#1d91c0")

  // If less group in the new dataset, I delete the ones not in use anymore
  u
    .exit()
    .remove()

    document.getElementById("dayc").innerHTML = "";
    document.getElementById("dayc").innerHTML = day;
}

function get_bar3(keys, dayss){
localStorage.setItem('state2', 3);
document.getElementById("brpplt2").style.display="block";

d3.csv("data/clean_dataset.csv", function(datas) {

  var len=datas.length;
  var use_de=[];
  for (i=0; i<datas.length; i++) {
  	var date = new Date(datas[i]['time']*1000);
  	if((parseInt(date.getDate())==parseInt(dayss.substr(-2)))){
         use_de.push(datas[i][keys]);
  	}
  }

  var days=["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"];
  var k; var xx=0, yy=60;
  var data=[];
  var a=1,b=0;
  for (k=0; k<parseInt(24); k++){
      var v = getMean(use_de.slice(xx, yy), 60);
      data[k]={day: days[k], value: v};
      xx=yy;
      yy=yy+60;
  }
   update(data, dayss);
})
}



function get_bar2(keys){
localStorage.setItem('state2', 2);
localStorage.setItem('keyss', keys);

document.getElementById("boxplt").style.display="none";
document.getElementById("brpplt").style.display="block";
document.getElementById("bxm").style.display="block";
document.getElementById("brpplt2").style.display="none";


var margin = {top: 20, right: 30, bottom: 70, left: 60},
    width = 520 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var svg = d3.select("#brpplt1")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

var x = d3.scaleBand()
  .range([ 0, width ])
  .padding(0.2);
var xAxis = svg.append("g")
  .attr("transform", "translate(0," + height + ")")

// Initialize the Y axis
var y = d3.scaleLinear()
  .range([ height, 0]);
var yAxis = svg.append("g")
  .attr("class", "myYaxis")

var device=keys+" [kW]";

d3.csv("data/clean_dataset.csv", function(datas) {

  var len=datas.length;
  var use_de=[];
  for (i=0; i<datas.length; i++) {
     use_de.push(datas[i][device]);
  }

  var days=["Fr_01", "Sa_02", "Su_03", "Mo_04", "Tu_05", "We_06", "Th_07"];
  var k; var xx=0, yy=1440;
  var data=[];
  var a=1,b=0;
  for (k=0; k<parseInt(datas.length/1440); k++){
      var v = getMean(use_de.slice(xx, yy), 1440);
      data[k]={day: days[k], value: v};
      xx=yy;
      yy=yy+1440;
  }


  x.domain(data.map(function(d) { return d.day; }))
  xAxis.call(d3.axisBottom(x))

  // Update the Y axis
  y.domain([0, d3.max(data, function(d) { return d.value }) ]);
  yAxis.transition().duration(1000).call(d3.axisLeft(y));

  // Create the u variable
  var u = svg.selectAll("rect")
    .data(data)

  u
    .enter()
    .append("rect") // Add a new rect for each new elements
    .merge(u) // get the already existing elements as well
    .transition() // and apply changes to all of them
    .duration(1000)
      .attr("x", function(d) { return x(d.day); })
      .attr("y", function(d) { return y(d.value); })
      .attr("width", x.bandwidth())
      .attr("height", function(d) { return height - y(d.value); })
      .attr("fill", "#1d91c0")

  // If less group in the new dataset, I delete the ones not in use anymore
  u
    .exit()
    .remove()
    
    	svg.selectAll("rect")
       .data(data)
       .style("cursor", "pointer")
       .on("click", function(d){
         	get_bar3(device, d.day);
       })
       .append("title").text(function(d) { return Number((d.value).toFixed(5))+" KW"; });
   
})
}