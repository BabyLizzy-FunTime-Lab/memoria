// Global functions
function elementMaker(element) {
	return document.createElement(element);
}
function elementID(id_name) {
	return document.getElementById(id_name);
}
function elementClass(class_name) {
	return document.getElementsByClassName(class_name);
}
// Global variabels
let facedown_img = "url(images/face_down.jpg)";
let grid = elementID("memoria_gridframe");
let win_count = 4;
// Global Array
let tiles_selected = [];
let tiles_found = [];
let pair_count = 0;
///////////////////


let tileArray = [
	{
		name: "mama_papa",
		picture: "url(images/mama_papa.jpg)"
	},
	{
		name: "mama_lizzy",
		picture: "url(images/mama_lizzy.jpg)"
	},
	{
		name: "mama_evee",
		picture: "url(images/mama_evee.jpg)" 
	},
	{
		name: "guitar",
		picture: "url(images/guitar.jpg)"
	},
	{
		name: "guitar",
		picture: "url(images/guitar.jpg)"
	},
	{
		name: "mama_evee",
		picture: "url(images/mama_evee.jpg)"
	},
	{
		name: "mama_papa",
		picture: "url(images/mama_papa.jpg)"
	},
	{
		name: "mama_lizzy",
		picture: "url(images/mama_lizzy.jpg)"
	}
]
function shuffle(array) {
  var m = array.length, t, i;

  // While there remain elements to shuffle…
  while (m) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}

// Check for pair
function check_pair() {
	if (tiles_selected.length == 2) {
		if (tiles_selected[0].name === tiles_selected[1].name) {
			tiles_selected = [];
			pair_count++;
			if (pair_count == win_count) {
				alert("You won");
				pair_count = 0;
				// remove old tiles
				document.querySelectorAll(".memoria_tile").forEach( function(element) {
					element.remove();
				});
				// randomize array
				shuffle(tileArray);
				// load new grid
				tileArray.forEach(createGrid);
			}
		} else {
			elementID(tiles_selected[0].id).style.backgroundImage = facedown_img;
			elementID(tiles_selected[1].id).style.backgroundImage = facedown_img;
			tiles_selected = [];
			alert("Try again");
		}
	}
}

// create tiles in gridframe
tileArray.forEach(createGrid);
function createGrid(tiledata, index) {
	let new_tile = elementMaker("div");
	new_tile.setAttribute("name", tiledata.name);
	new_tile.setAttribute("id", index);
	new_tile.setAttribute("class", "memoria_tile");
	new_tile.style.backgroundImage = facedown_img;
	new_tile.addEventListener("click", function(event) {
		new_tile.style.backgroundImage = tiledata.picture;
		tiles_selected.push({name: tiledata.name, id: index});
		console.log(tiles_selected);
		setTimeout(check_pair, 500);	
	})
	grid.appendChild(new_tile); 
}