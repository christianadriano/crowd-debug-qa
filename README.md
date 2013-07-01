crowd-debug-qa
==============

Experimentation with crowd debugging via questions and answers

The code is aimed at illustrating scenarios of bugs which could be identified by means of asking questions to the crowd.
Below are the features.

1. Circle in Circle (implemented)
Depends on the order of circles. Circle1 inscribes circle2, means that circle1 is 
inside cicle2. If circle1 is smaller than circle2, then circle1 is drawn inside (and centralized) circle2. 
Otherwise, circle1 is drawn by the side of circle2 with y coordinates at same level.

2. Circle and Triangle (not implemented)

2.1 Circumscribing a triangle. 
Here is a method for constructing the circle that circumscribes a triangle.

Draw the triangle.
Draw the perpendicular bisector to each side of the triangle. Draw the lines long enough so that you see a point of intersection of all three lines.
Draw the circle with radius at the intersection point of the bisectors that passes through one of the vertices. You should see that this circle passes through all three vertices, and that it is the desired circle.


2.2 Inscribing a triangle. 
Here is a method for constructing the circle that inscribes a triangle.

Draw the triangle.
Draw the angle bisector for each angle of the triangle. Draw the lines long enough so that you see a point of intersection of all three lines.
Draw a line perpendicular to any side that passes through the intersection point. Mark the point on the side through which this line passes.
Draw the circle with radius at the intersection point that passes through the point you obtained in the last step. This is the desired circle.