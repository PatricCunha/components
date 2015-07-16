/* JS Problem */


// console.log(+![]);
// console.log(+!![]);
// console.log(+!![]+[+![]]);
// console.log(+!![]+[+![]]+[+![]]);
// console.log(+[]);
// console.log(+!![]);

// console.log(+[[]+[+!![]][+![]]+[!![]+!![]][+![]]+[!![]+!![]+!![]][+![]]][+![]]);
// console.log(!![]+!![]+!![]+!![]+!![]+!![]+!![]);



// console.log(+[[]+[+!![]][+![]]+[!![]+!![]][+![]]+[!![]+!![]+!![]][+![]]][+![]]);
// console.log(
// 	[
// 		[]+
// 		[+!![]][+![]]+
// 		[!![]+!![]][+![]]+
// 		[!![]+!![]+!![]][+![]]
// 	]
// 	);

// simplest(1000);
// function simplest(number) {
// 	var val=+![]; //= +!![];
// 	for(var i =0; i<=number; i++) {
// 		console.log(val);
// 		val+=+!![];
// 	}
// }
for(var i = 0; i<= 10; i++) {
	console.log(simple(i));
}
function simple(number) {
	var val = '+[';
	val += '[';
	if((number/1000)<1) {
		val += ']';
	} else {
		val+='+';
		for(var i=1; i<=number/1000;i++) {
			val+='!![]';
		}
		val+= '][+![]]';
	}
	val += '+[';
	if((number/100)<1) {
		val += ']';
	} else {
		val+='+';
		for(var i=1; i<=number/100;i++) {
			val+='!![]';
		}
		val+= '][+![]]';
	}
	val += '+[';
	if((number/10)<1) {
		val += ']';
	} else {
		val+='+';
		for(var i=1; i<=number/10;i++) {
			val+='!![]';
		}
		val+= '][+![]]';
	}
	if((number/1)<1) {
		val += ']';
	} else {
		val+='+';
		for(var i=1; i<=number;i++) {
			val+='!![]';
		}
		val+= '][+![]]';
	}
	val+=']';
	return val;
}

//http://codepen.io/anon/pen/zGjBLW?editors=101
//http://www.jsfuck.com/
//http://ipsc.ksp.sk/2015/real/solutions/m.html
//http://ipsc.ksp.sk/2015/real/problems/m.html

// digits 0-9 as numbers
var numbers = [
  "+[+![]]",
  "+[+!![]]",
  "+[!![]+!![]]",
  "+[!![]+!![]+!![]]",
  "+[!![]+!![]+!![]+!![]]",
  "+[!![]+!![]+!![]+!![]+!![]]",
  "+[[!![]+!![]]*[!![]+!![]+!![]]]",
  "+[+!![]+[+![]]-!![]-!![]-!![]]",
  "+[+!![]+[+![]]-!![]-!![]]",
  "+[+!![]+[+![]]-!![]]",
];

// digits 0-9 as characters
var chars = [
  "[+![]]",
  "[+!![]]",
  "[!![]+!![]]",
  "[!![]+!![]+!![]]",
  "[!![]+!![]+!![]+!![]]",
  "[!![]+!![]+!![]+!![]+!![]]",
  "[[!![]+!![]]*[!![]+!![]+!![]]]",
  "[+!![]+[+![]]-!![]-!![]-!![]]",
  "[+!![]+[+![]]-!![]-!![]]",
  "[+!![]+[+![]]-!![]]",
];

function SolveNum(num) {
  var encodedNum = '';
  if (num.length === 1){
    return numbers[num];
  }
  for (var i = 0; i < (+num); i++) {
    encodedNum += chars[num[0]] + '';
    for (var j = 1, len = num.length; j < len; j++) {
      encodedNum += numbers[num[j]];
    }
  }
  return encodedNum;
}

//window.onload = function() {
  var result = document.getElementById('resultP');
  result.innerHTML = SolveNum('1001');
//};