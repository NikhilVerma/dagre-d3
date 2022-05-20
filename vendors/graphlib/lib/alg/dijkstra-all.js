import dijkstra from "./dijkstra";
import { transform } from "lodash-es";
export default dijkstraAll;

function dijkstraAll(g, weightFunc, edgeFunc) {
  return transform(
    g.nodes(),
    function (acc, v) {
      acc[v] = dijkstra(g, v, weightFunc, edgeFunc);
    },
    {}
  );
}
