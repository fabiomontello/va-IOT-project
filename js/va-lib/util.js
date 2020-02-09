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
    var inter=parseInt(localStorage.getItem('interval'));
    if(isNaN(inter)){
        inter=1.96;
    }
   // alert(inter);
	mean=getMean(data, len);
	std=getSD(data, len);
	low=mean-inter*(std/Math.sqrt(len));
	high=mean+inter*(std/Math.sqrt(len));
    return [low,mean,high];
};

function getCII(data, len){
	mean=getMean(data, len);
	std=getSD(data, len);
	low=mean-1.95*(std/Math.sqrt(len));
	high=mean+1.95*(std/Math.sqrt(len));
	min=Math.min.apply(Math, data);
    max=Math.max.apply(Math, data);
    return [min, low, mean, high, max];
};

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
    boxpl();
}