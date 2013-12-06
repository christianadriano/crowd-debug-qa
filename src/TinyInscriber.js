var circleA={x:1,y:1,diameter:6};
var circleB={x:2,y:2,diameter:4};

function inscribe(fig1, fig2){
	
	var message;
	fig1.y=fig2.y;
	if(fig1.diameter<fig2.diameter){
		fig1.x = fig2.x;
		message = "Centered";
	}
	else{
		fig1.x = shiftRight(fig1.diameter, fig2.diameter,fig2.x);
		message = "Aligned";
	}
	console.log(message + " at ("+fig1.x+","+fig1.y+")"
			+"("+fig2.x+","+fig2.y+")");
}

function shiftRight(center, diameter1, diameter2){
	return (center + (diameter1 + diameter2)/2);
}
