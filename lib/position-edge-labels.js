"use strict";

import util from "./util";
import { select } from "d3";
import { has } from "lodash-es";
export default positionEdgeLabels;

function positionEdgeLabels(selection, g) {
  var created = selection.filter(function () {
    return !select(this).classed("update");
  });

  function translate(e) {
    var edge = g.edge(e);
    return has(edge, "x") ? "translate(" + edge.x + "," + edge.y + ")" : "";
  }

  created.attr("transform", translate);

  util.applyTransition(selection, g).style("opacity", 1).attr("transform", translate);
}
