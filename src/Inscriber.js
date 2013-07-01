
var circleMagenta = {
		type:"circle", 
		color:"#800000",
		radius:10,
		xCenter:15,
		yCenter:15
};

var circleDeepBlueSky = {
		type:"circle", 
		color: "#00BFFF",
		radius:20,	
		xCenter:30,
		yCenter:30
};

var squarePurple = {
		type:"square",
		edge:0,
		color:"#800080",
		xCenter:0,
		yCenter:0
};

var triangleOrange = {
		type:"triangle",
		color:"#FFA500",
		xCenter:0,
		yCenter:0,
		edge1:1,
		edge2:1,
		edge3:1		
};

function clearCanvas(){
	var c=document.getElementById("myCanvas");
	c.width = c.width;
}

function runCircleInscriber(){
	inscribeShapeinShape( circleDeepBlueSky,circleMagenta);
}

//Inscribe smallShape in largeShape, only 
//if smallShape is actually smaller than largeShape, 
//otherwise, draw shapes side by side. 
function inscribeShapeinShape(smallShape, largeShape){
	
	var compare =compareSize(smallShape, largeShape);
	var xCoordinate=0;
	
	if((compare == 0) || (compare==-1)){
		xCoordinate = computeSideBySidePositions(smallShape,largeShape);
	}
	else{
		xCoordinate = computeConcentricPositions(smallShape,largeShape);
	}
	
	smallShape.xCenter = xCoordinate;
	
	var yCoordinate = computeYCoordinatePosition(smallShape, largeShape);
	
	//Shapes are always at same y coordinate
	smallShape.yCenter = yCoordinate;
	largeShape.yCenter = yCoordinate;
	
	drawShape(largeShape);
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
function computeSideBySidePositions(shape1,shape2){
	var size1 = getSize(shape1);
	var size2 = getSize(shape2); 
	
	//var horizontalShift = 2*sizeSmall.width;    
	var horizontalShift = size1.width/2 + size2.width/2;
	var xCoordinate=0;
	
	if(size1.width>size2.width)
		xCoordinate =  shape1.xCenter+ horizontalShift;
	else
		xCoordinate = shape2.xCenter+ horizontalShift;
	
	return xCoordinate;
}

//Gets the Y coordinate of the larger shape
function computeYCoordinatePosition(shape1, shape2){
	
	var size1 = getSize(shape1);
	var size2 = getSize(shape2); 
	
	var yCoordinate =0;
	
	if(size1.height>size2.height)
		yCoordinate =  shape1.yCenter;
	else
		yCoordinate = shape2.yCenter;
	
	return yCoordinate;
}

function computeConcentricPositions(smallShape,largeShape){
	return largeShape.xCenter;
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
	ctx.strokeStyle=circle.color;
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

