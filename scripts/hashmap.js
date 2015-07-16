//Globals
var textInput;
var hashmap;
var buttonInput;
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");
var activeArray = [];

// new HashMap

// HashMap.add
//HashMap.remove
//HashMap.find

//hashing function needs to have good distribution

//Load Factor
//n / k where n is the number of entries and k

//Collision resolution
//separate chaining
//needs linked lists

function getHashCode(obj, prime) {
	var mult = (typeof prime === 'undefined') ? 16777619 : prime;
	var hash = 0;
	if(obj !== null && typeof obj === 'object') {
		for (var property in obj) {
    		if (obj.hasOwnProperty(property)) {
				hash = hash * mult ^ getHashCode(obj[property]);
				if(hash == Number.MAX_VALUE)
					return getHashCode(obj, 31);
    		}
		}
		return hash;
	}else {
		var type = typeof obj;
		return HashMap.prototype.hash(type+obj);
	}
}

function HashMap(size, loadFactor) {
	this.size = (typeof size === 'undefined') ? 200 : size;
	this.loadFactor = (typeof loadFactor === 'undefined') ? 0.75 : loadFactor;
	this.count = 0;
	// this.hashTable = [];
	this.hashTable = new Array(this.size);
}

HashMap.prototype.resize = function() {
	var newSize = this.size * 2;
	var newHashMap = new HashMap(newSize, this.loadFactor);
	this.hashTable.forEach(function(entry){
		//'entry' is never empty
		var current = entry.head;
		while(current) {
			console.log(current);
			newHashMap.insert(current.value);
			current = current.next;
		}
	});
	this.hashTable = newHashMap.hashTable;
	this.size = newHashMap.size;
	this.count = newHashMap.count;
}

HashMap.prototype.isOverloaded = function() {
	return (this.size * this.loadFactor) < this.count;
}

HashMap.prototype.hash = function(key) {
	var prime = 31, i;
	var hash = 0;
	var length =  key.length;
	for (i=0; i < length; i++) {
   		hash += (key.charCodeAt(i) * prime) ^ (length-(i+1));
	}
	return hash;
	//Java's hashing function adapted
	// s[0]*31^(n-1) + s[1]*31^(n-2) + ... + s[n-1]
}

HashMap.prototype.indexFor = function(hashed) {
	var index = hashed % (this.size -1);
	return index;
}

HashMap.prototype.insert = function(val) {
 		// Compute the index using Hash Function
    	var index = this.indexFor(this.hash(val.key));
    	if(!this.hashTable[index])
    		this.hashTable[index] = new LinkedList();
    	// Insert the element in the linked list at the particular index
    	this.hashTable[index].push(val);
    	this.count++;
    	if(this.isOverloaded())
    		this.resize();
}

HashMap.prototype.remove = function(key) {
	// Compute the index using Hash Function
    var index = this.indexFor(this.hash(key));
    	if(!this.hashTable[index])
    		return;
    this.hashTable[index].remove(key);
    this.count--;
}

HashMap.prototype.find = function(key) {
    // Compute the index using Hash Function
    var index = this.indexFor(this.hash(key));
    if(!this.hashTable[index])
    	return null;
    return this.hashTable[index].find(key);
    // Search the linked list at that particular index
    // for(var i = 0;i < hashTable[index].size();i++)
    // {
    //     if(hashTable[index][i] == s)
    //     {
    //         cout << s << " is found!" << endl;
    //         return;
    //     }
    // }
    // cout << s << " is not found!" << endl;
}

//Linked List
//No you can't remove from this linked list, deal with it
//We could use js objects and arrays to create this, but that's cheating :)
function LinkedList() {
	this.head = null;
	this.length = 0;
}

LinkedList.prototype.toArray = function() {
	var current = this.head;
	var resultArray = [], i=0;
	while(current) {
		resultArray[i] = current;
		i++;
		current = current.next;
	}
	return resultArray;
}

LinkedList.prototype.push = function(val) {
	var node = {
		value: val,
		next: null
	};
	if (!this.head) {
		this.head = node;
	} else {
		var current = this.head;
		while(current.next) {
			current = current.next;
		}
		current.next = node;
	}
	this.length++;
}

LinkedList.prototype.find = function(key) {
	var current = this.head;
	if(!current)
		return null;
	//Value is at the head
	if(current.value.key === key) {
       return current.value.value;
    } else {
    	while(current.next) {
    		//A node in the middle is the selected one
    		if(current.value.key === key) {
    			return current.value.value;
    		}
			current = current.next;
		}
		//Last node
    	if(current.value.key === key){
        	return current.value.value;
        }
    } 
    return null;
}

LinkedList.prototype.remove = function(key) {
	var current = this.head;
	if(!current) 
		return;
	//Value is at the head, just swith the second node to be the head
	if(current.value.key === key) {
       this.head = current.next;
       this.length--;
    } else {
    	var previous = current;
    	while(current.next ) {
    		//A node in the middle is the selected one
    		//we have to point the previous node to the currents nextnode
    		if(current.value.key === key) {
    			previous.next = current.next;
    			this.length--;
    			break;
    		}
			current = current.next;
		}
		//Last node, we only have to remove a reference to it
    	if(current.value.key === key){
    		this.length--;
        	previous.next = null;
      	}
    } 
}

//Key Value particular
function KeyValuePair(key, value) {
	this.key = key;
	this.value = value;
}
window.onload = function() {
	hashmap = new HashMap(5);
	addToHashMap(hashmap, "cube");
	addToHashMap(hashmap, "sphere");
	addToHashMap(hashmap, "pyramid");
	textInput = document.getElementById('hashInput');
	buttonInput = document.getElementById('inputButton');
 	textInput.addEventListener("input", inputChanged, false);
 	buttonInput.addEventListener("click", buttonClicked, false);
}

function inputChanged() {
	var val = textInput.value;
	// var pair = new KeyValuePair(val, {value:val});
	var exists = !! (hashmap.find(val));
	if(exists)
		buttonInput.value = '-' ;
	else
		buttonInput.value = '+' ;
}

function buttonClicked() {
	var val = buttonInput.value;
	if(val === '-') {
		removeFromHashMap(hashmap, textInput.value);
		textInput.value = '';
	} else {
		addToHashMap(hashmap, textInput.value);
		textInput.value = '';
	}
}

function removeFromHashMap(map, string) {
	map.remove(string);
	// updateLists(map);
	updatePresentation(map);
}

function addToHashMap(map, string) {
	map.insert(new KeyValuePair(string, {value:string}));
	// updateLists(map);
	updatePresentation(map);
}

// TODO: don't do entire list
function updateLists(map) {
	var w = canvas.width = canvas.clientWidth;
	var h = canvas.height = canvas.clientHeight;
	ctx = canvas.getContext("2d");
	var namesNode = document.getElementById('hashNames');
	var keysNode = document.getElementById('hashKeys');
	var startX, startY, endX, endY, rect;
	clearChildren(namesNode);
	clearChildren(keysNode);
	var length = map.hashTable.length, i;
	for(i=0; i<length;i++) {
		var li = document.createElement('LI');
		var span = document.createElement('SPAN');
		if(!map.hashTable[i] || !map.hashTable[i].head) {
			li.id = 'name-li-'+i;
			li.innerHTML = '" "';
			namesNode.appendChild(li);
			rect = getOffset(li);
			startX = rect.left+rect.width;
			startY = rect.top + rect.height/2;
			li = document.createElement('LI');
			li.id = "key-li-"+i;
			li.innerHTML = i;
			keysNode.appendChild(li);
			rect = getOffset(li);
			endX = rect.left;
			endY = rect.top + rect.height/2;
		} else {
			li.id = 'name-li-'+i;
			li.innerHTML = '"' + map.hashTable[i].head.value.key + '"';
			if(map.hashTable[i].length > 1) {
				var ul = document.createElement('UL'), li;
				li.className = 'hidden';
				var array = map.hashTable[i].toArray();
				array.forEach(function(val){
					if(val.value.key === array[0].value.key){}
					else {
						innerLi = document.createElement('LI');
						innerLi.innerHTML = val.value.key;
						ul.appendChild(innerLi);
					}
				});
				span.className  += 'number';
				span.innerHTML ="+" + (map.hashTable[i].length - 1);
				li.appendChild(span);
				li.appendChild(ul);
				li.addEventListener("mouseover", showBucket, false);
				li.addEventListener("mouseout", hideBucket, false);
			}
			namesNode.appendChild(li);
			rect = getOffset(li);
			startX = rect.left+rect.width;
			startY = rect.top + rect.height/2;
			li = document.createElement('LI');
			li.id = "key-li-"+i;
			li.innerHTML = i;
			keysNode.appendChild(li);
			rect = getOffset(li);
			endX = rect.left;
			endY = rect.top + rect.height/2;
		}
		// console.log(li.offsetLeft);
		// console.log(getOffset(canvas));
		var canOffset = getOffset(canvas);
		// console.log(startX-canOffset.left, startY-canOffset.top, endX-canOffset.left, endY-canOffset.top);
		ctx.beginPath();
		ctx.moveTo(startX-canOffset.left, startY-canOffset.top);
		ctx.lineTo(endX-canOffset.left, endY-canOffset.top);
		ctx.lineWidth = 1;
		ctx.stroke();
	}
	newNoise(map);
}


function updatePresentation(map) {
	var w = canvas.width = canvas.clientWidth;
	var h = canvas.height = canvas.clientHeight;
	ctx = canvas.getContext("2d");
	createKeysList(map);
	createNameList(map);
}

function createNameList(map) {
	var namesNode = document.getElementById('hashNames');
	var sortedArray = map.hashTable.sort();
	var contain = document.getElementById('c3');
	var li, innerLi, span;
	clearChildren(namesNode);
	sortedArray.forEach(function(val){
		li = document.createElement('LI');
		li.id = 'name2-li-'+val.head.value.key;
		li.innerHTML = val.head.value.key;
		if(val.length > 1) {
			var ul = document.createElement('UL');
			span = document.createElement('SPAN');
			li.className = 'hidden';
			var array = val.toArray();
			array.forEach(function(innerVal){
				if(innerVal.value.key === array[0].value.key){}
				else {
					innerLi = document.createElement('LI');
					innerLi.innerHTML = innerVal.value.key; 
					ul.appendChild(innerLi);
				}
			});
			span.className  += 'number';
			span.innerHTML ="+" + (val.length - 1);
			li.appendChild(span);
			li.appendChild(ul);
			li.addEventListener("mouseover", showBucket, false);
			li.addEventListener("mouseout", hideBucket, false);
		}
		namesNode.appendChild(li);
		connectToKey(li, map.indexFor(map.hash(li.id)));
	});
}

/**
* Creates the list elements for c2
* corresponding to the keys(buckets) in the hashtable
* map: the HashMap
**/
function createKeysList(map) {
	var keysNode = document.getElementById('hashKeys'), li;
	var i, length;
	length = map.hashTable.length;
	clearChildren(keysNode);
	for(i=0; i<length; i++) {
		li = document.createElement('LI');
		li.id = 'key-li-'+i;
		li.innerHTML = i;
		keysNode.appendChild(li);
	}
}
/**
* Draw a line between starting from the element in c1
* to the corresponding element in c2
* startNode: the node in c1
* endIndex: number corresponding to the index/hash of the name
**/
function connectToKey(startNode, endIndex) {
	//Get starting position from the node with the string (left / c1)
	var rect = getOffset(startNode);
	var startX = rect.left+rect.width;
	var startY = rect.top + rect.height/2;
	var endNode = document.getElementById("key-li-" + endIndex);
	//Get ending position from the node with the key, (on the center / c2)
	rect = getOffset(endNode);
	var endX = rect.left;
	var endY = rect.top + rect.height/2;
	//DrawLine
	var canOffset = getOffset(canvas);
	ctx.beginPath();
	ctx.moveTo(startX-canOffset.left, startY-canOffset.top);
	ctx.lineTo(endX-canOffset.left, endY-canOffset.top);
	ctx.lineWidth = 1;
	ctx.stroke();
}

/*
* Removes all children from the given node
* node: the node to clear of children
*/
function clearChildren(node) {
	while (node.hasChildNodes()) {
    	node.removeChild(node.lastChild);
	}
}

/*
* Gets the offset of an object acounting for
* scroll offset
* el: the object to calculate the offset of
* return 
*{
*	left:"left offset of the element",
*	top:"top offset of the element",
*	width:"width of the element",
*	height:"height of the element"
*};
*/
function getOffset( el ) {
    var rect = el.getBoundingClientRect();
    return {
        left: rect.left + window.pageXOffset,
        top: rect.top + window.pageYOffset,
        width: rect.width || el.offsetWidth,
        height: rect.height || el.offsetHeight
    };
}

function showBucket(e) {
	if(e.target.nodeName === 'LI')
		e.target.className = '';
}

function hideBucket(e) {
	if(e.target.nodeName === 'LI')
		e.target.className = 'hidden';
}

/**names.sort();
* visually we want the keys to the left sorted
* the hashes sorted too
* and finally a list of entries
**/

