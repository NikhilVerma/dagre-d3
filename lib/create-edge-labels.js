"use strict";

import { has } from "lodash-es";
import addLabel from "./label/add-label";
import util from "./util";
import { select } from "d3";
export default createEdgeLabels;

function createEdgeLabels(selection, g) {
  var svgEdgeLabels = selection
    .selectAll("g.edgeLabel")
    .data(g.edges(), function (e) {
      return util.edgeToId(e);
    })
    .classed("update", true);

  svgEdgeLabels.exit().remove();
  svgEdgeLabels.enter().append("g").classed("edgeLabel", true).style("opacity", 0);

  svgEdgeLabels = selection.selectAll("g.edgeLabel");

  svgEdgeLabels.each(function (e) {
    var root = select(this);
    root.select(".label").remove();
    var edge = g.edge(e);
    //@ts-expect-error
    var label = addLabel(root, g.edge(e), 0, 0).classed("label", true);
    var bbox = label.node().getBBox();

    if (edge.labelId) {
      label.attr("id", edge.labelId);
    }
    if (!has(edge, "width")) {
      edge.width = bbox.width;
    }
    if (!has(edge, "height")) {
      edge.height = bbox.height;
    }
  });

  var exitSelection;

  if (svgEdgeLabels.exit) {
    exitSelection = svgEdgeLabels.exit();
  } else {
    exitSelection = svgEdgeLabels.selectAll(null); // empty selection
  }

  util.applyTransition(exitSelection, g).style("opacity", 0).remove();

  return svgEdgeLabels;
}
