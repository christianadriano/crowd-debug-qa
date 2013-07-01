

var circle1 = {
		type:"circle", 
		color:"#E8EDFF",
		radius:10,
		xCenter:10, //X coordinate of the center
		yCenter:10 //Y coordinate of the center
};

var circle2 = {
		type:"circle", 
		color:"#29344B",
		radius:20,	
		xCenter:20, //X coordinate of the center
		yCenter:20 //Y coordinate of the center
};

var square = {
		type:"square",
		edge:0,
		color:1,
		xCenter:0, //X coordinate of the center
		yCenter:0 //Y coordinate of the center
};

var triangle = {
		type:"triangle",
		color:1,
		xCenter:0, //X coordinate of the center
		yCenter:0, //Y coordinate of the center
		edge1:1,
		edge2:1,
		edge3:1		
};

function run(){
	inscribeShapeinShape(circle1,circle2);
}

//Inscribe smallShape in largeShape, only 
//if smallShape is actually smaller than largeShape, 
//otherwise, draw shapes side by side. 
function inscribeShapeinShape(smallShape, largeShape){
	
	var compare =compareSize(smallShape, largeShape);
	
	drawShape(largeShape);
	
	var coordinatesSmallShape = {
			x:0,
			y:0
	};
	
	if((compare == 0) || (compare==-1)){
		coordinatesSmallShape = computeSideBySidePositions(smallShape,largeShape);
	}
	else{
		coordinatesSmallShape = computeConcentricPositions(smallShape,largeShape);
	}
	
	smallShape.xCenter = coordinatesSmallShape.x;
	smallShape.yCenter = coordinatesSmallShape.y;
	
	drawShape(smallShape);
}


function compareSize(smallShape, largeShape){
	var smallSize = getSize(smallShape);
	var largeSize = getSize(largeShape);
	
	if((smallSize.width>largeSize.width) || (smallSize.height>largeSize.height)){
		return -1;
	}
	else
		if((largeShape.width>smallSize.width) && (largeSize.height>smallSize.height)){
			return 1;
		}
		else	if((smallSize.width==largeSize.width) && (smallSize.height==largeSize.height)){
			return 0;
		}
}

//Size in terms of maximum height and width
function getSize(shape){
	
	var height=0;
	var width=0;
	if(shape.type=="circle"){
		height=shape.radius*2; //take the diameter as size
		width=height;
	}
	
	if(shape.type=="square"){
		height=shape.edge;
		width=height;
	}
	
	var size={
			height:height,
			width:width
	};
	return size;
}




//Takes the width of the larger shape to calculate the position of the smaller shape.
function computeSideBySidePositions(smallShape,largeShape){
	var sizeLarge = largeShape.getSize();
	var sizeSmall = smallShape.getSize();
	var horizontalShift = 2*sizeSmall.width;    ///sizeLarge.width + sizeSmall.width;
	
	var coordinates = {
			x : largeShape.xCenter + horizontalShift,
			y : largeShape.yCenter
	};
	
	return coordinates;
}

function computeConcentricPositions(smallShape,largeShape){
	var coordinates = {
			x : largeShape.xCenter,
			y : largeShape.yCenter
	};
	return coordinates;
}

function drawShape(shape){
	if(shape.type=="circle"){
		drawCircle(shape.xCenter, shape.yCenter, shape);
	}
	else
		if(shape.type=="square") drawSquare(shape);
}

function drawCircle(x,y,circle){
	var c=document.getElementById("myCanvas");
	var ctx=c.getContext("2d");
	ctx.beginPath();
	ctx.arc(x, y,circle.radius,0,2*Math.PI);
	ctx.stroke();
}

function drawSquare(coordinates,square){
	var c=document.getElementById("myCanvas");
	var ctx=c.getContext("2d");
	ctx.moveTo(0,0);
	var pointTopLeft ={}; 
	var pointTopRight ={};
	var pointBottomRight = {};
	var pointBottomLeft = {};
	//ctx.lineTo(square.xCenter-square.edge/2, square.yCenter,200,100);
	
}