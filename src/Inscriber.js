
//Default values to help user -----------------------------------------------

var circleMagenta = {
		type:"circle", 
		color:"#800090",
		radius:10,
		xCenter:15,
		yCenter:15,
};

var circleDeepBlueSky = {
		type:"circle", 
		color: "#00BFFF",
		radius:20,	
		xCenter:30,
		yCenter:30
};inscribeShapeinShape

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

//----------------------------------------------------------------------------
//Inner and Outer Shapes
var circleInner = {
    	type:"circle", 
		color:"#800000",
		radius:10,
		xCenter:15,
		yCenter:15
};

var circleOuter = {
		type:"circle", 
		color: "#00BFFF",
		radius:20,	
		xCenter:30,
		yCenter:30
};

var squareInner = {
		type:"square",
		edge:0,
		color:"#800080",
		xCenter:0,
		yCenter:0
};

var squareOuter = {
    	type:"square",
		edge:0,
		color:"#00BFFF",
		xCenter:0,
		yCenter:0
}

var shape = {
        type:"",
		edge:0,
		color:"#00BFFF",
		xCenter:0,
		yCenter:0
}

//var any = loadDefaultShapes();

//handleInscribeButton();
//-----------------------------------------------------------------------------------------------------------
// HANDLING GUI EVENTS

function clearCanvas(){
	var c=document.getElementById("inscriberCanvas");
	c.width = c.width;
}

function loadDefaultShapes() {
    setDefaultValues("inner", circleMagenta);
    setDefaultValues("outer", circleDeepBlueSky);
}

function setDefaultValues(option, shape){
    var input = document.getElementById("color_"+option);
    input.value = shape.color;
    var input2 = document.getElementById("xcenter_"+option);
    input2.value = shape.xCenter;
    var input3 = document.getElementById("ycenter_"+option);
    input3.value = shape.yCenter;
    var input4 = document.getElementById("height_"+option);
    input4.value = shape.radius*2;
}

function handleInscribeButton() {
    clearCanvas();
    //Obtain values
    var op = document.getElementById('selectInnerType');
    var selItem = op.options[op.selectedIndex].value;
    var innerShape = initializeShape(selItem,"inner");
    op = document.getElementById("selectOuterType");
    selItem = op.options[op.selectedIndex].value;
    var outerShape = initializeShape(selItem,"outer");  
    inscribeShapeinShape(innerShape,outerShape);
}

function initializeShape(type, option) {
    var shape = new Object();
    shape.type = type;
    var input = document.getElementById("color_" + option);
    shape.color = input.value;
     input = document.getElementById("xcenter_" + option);
    shape.xCenter = input.value;
     input = document.getElementById("ycenter_" + option);
    shape.yCenter = input.value;
     input = document.getElementById("height_" + option);
    shape.height = input.value;

    if (type == "circle") {
        shape.radius = shape.height / 2;
    }
    else {
        shape.edge = shape.height;
    }   return shape;
}

//-------------------------------------------------------------------------------------------------------------------------
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
//var horizontalShift = size1.width/2 + size2.width/2;
function computeSideBySidePositions(shape1,shape2){
	var size1 = getSize(shape1);
	//var size2 = getSize(shape2); 
	
	var horizontalShift = size1.width/2;//size1.width/2 + size2.width/2;  
	var xCoordinate=shape2.xCenter+ horizontalShift;
	
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
		drawCircle(shape.xCenter, shape.yCenter, shape.radius, shape.color);
	}
	else
		if(shape.type=="square") 
            drawSquare(shape.xCenter, shape.yCenter, shape.width, shape.color);
}

function drawCircle(x, y, radius, color) {
    var canvas = document.getElementById("inscriberCanvas");
    if (canvas != null && canvas.getContext) {
        var ctx = canvas.getContext("2d");
        ctx.beginPath();
        //console.log("circle: x="+x+",y="+y);
        var arcSize = 2 * Math.PI;
        alert("ctx.arc(x="+x+",y="+y+",radius="+radius+",0,arcSize="+arcSize+")");
        ctx.arc(x, y, radius, 0, arcSize);
        ctx.strokeStyle = color;
        ctx.stroke();
    }
    else { 
        alert("This page uses HTML 5 to render correctly. Please use Firefox or Chrome.");
    }
}

function drawSquare(x, y, width, color) {
    var canvas = document.getElementById("inscriberCanvas");
    if (canvas != null && canvas.getContext) {
        var ctx = canvas.getContext("2d");
        ctx.moveTo(0, 0);
        ctx.strokeStyle = color;
        alert("ctx.strokeRect(x="+x+",y="+y+",width="+width+",width="+width+")");
        ctx.strokeRect(x, y, width, width);
    }
    else { 
        alert("This page uses HTML 5 to render correctly. Please use Firefox or Chrome.");
    }
}

