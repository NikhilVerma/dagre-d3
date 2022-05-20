"use strict";

import util from "./util";
import { select } from "d3";
export default positionNodes;

function positionNodes(selection, g) {
  var created = selection.filter(function () {
    return !select(this).classed("update");
  });

  function translate(v) {
    var node = g.node(v);
    return "translate(" + node.x + "," + node.y + ")";
  }

  created.attr("transform", translate);

  util.applyTransition(selection, g).style("opacity", 1).attr("transform", translate);
}
