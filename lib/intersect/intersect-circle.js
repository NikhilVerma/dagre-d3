import intersectEllipse from "./intersect-ellipse";
export default intersectCircle;

function intersectCircle(node, rx, point) {
  return intersectEllipse(node, rx, rx, point);
}
