// Arithmetic mean
function getMean(data, len) {
    return data.reduce(function (a, b) {
        return Number(a) + Number(b);
    }) / len;
};

// Standard deviation
function getSD(data, len) {
    let m = getMean(data,len);
    return Math.sqrt(data.reduce(function (sq, n) {
            return sq + Math.pow(n - m, 2);
        }, 0) / (len - 1));
};

// Confidential interval 95%
function getCI(data, len){
	mean=getMean(data, len);
	std=getSD(data, len);
	low=mean-1.96*(std/Math.sqrt(len));
	high=mean+1.96*(std/Math.sqrt(len));
    return [low,mean,high];
};

/*
function getCII(data, len){
	mean=getMean(data, len);
	std=getSD(data, len);
	low=mean-1.96*(std/Math.sqrt(len));
	high=mean+1.96*(std/Math.sqrt(len));
	min=Math.min.apply(Math, data);
    max=Math.max.apply(Math, data);
    return [min, low, mean, high, max];
};*/

function back_state(){
	var st=localStorage.getItem('state');
    if(st==3){
    	var dd=localStorage.getItem('day');
    	var hh=localStorage.getItem('hour');
        chart2(dd, hh);
    }else{
    	chart1();
    }
}

function back_state2(){
    document.getElementById("boxplt").style.display="block";
    document.getElementById("brpplt").style.display="none";
    document.getElementById("bxm").style.display="none";
    document.getElementById("brpplt1").innerHTML = "";
}

function Median(data) {
  return Quartile_50(data);
}

function Quartile_25(data) {
  return Quartile(data, 0.05);
}

function Quartile_50(data) {
  return Quartile(data, 0.5);
}

function Quartile_75(data) {
  return Quartile(data, 0.95);
}

function Quartile(data, q) {
  data=Array_Sort_Numbers(data);
  console.log(data);
  var pos = ((data.length) - 1) * q;
  var base = Math.floor(pos);
  var rest = pos - base;
  if( (data[base+1]!==undefined) ) {
    return data[base] + rest * (data[base+1] - data[base]);
  } else {
    return data[base];
  }
}

function Array_Sort_Numbers(inputarray){
  return inputarray.sort(function(a, b) {
    return a - b;
  });
}


function getCII(data, len){
    return [Math.min.apply(Math, data), Quartile_25(data), Quartile_50(data), Quartile_75(data), Math.max.apply(Math, data)];
};
