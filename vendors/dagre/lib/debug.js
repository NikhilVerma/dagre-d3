import { forEach, reduce } from "lodash-es";
import util from "./util";
import { Graph } from "../../graphlib";

export default {
  debugOrdering: debugOrdering
};

/* istanbul ignore next */
function debugOrdering(g) {
  var layerMatrix = util.buildLayerMatrix(g);

  var h = new Graph({ compound: true, multigraph: true }).setGraph({});

  forEach(g.nodes(), function (v) {
    h.setNode(v, { label: v });
    h.setParent(v, "layer" + g.node(v).rank);
  });

  forEach(g.edges(), function (e) {
    h.setEdge(e.v, e.w, {}, e.name);
  });

  forEach(layerMatrix, function (layer, i) {
    var layerV = "layer" + i;
    h.setNode(layerV, { rank: "same" });
    reduce(layer, function (u, v) {
      h.setEdge(u, v, { style: "invis" });
      return v;
    });
  });

  return h;
}
