"use strict";

import util from "./util";
import { select } from "d3";
export default positionClusters;

function positionClusters(selection, g) {
  var created = selection.filter(function () {
    return !select(this).classed("update");
  });

  function translate(v) {
    var node = g.node(v);
    return "translate(" + node.x + "," + node.y + ")";
  }

  created.attr("transform", translate);

  util.applyTransition(selection, g).style("opacity", 1).attr("transform", translate);

  util
    .applyTransition(created.selectAll("rect"), g)
    .attr("width", function (v) {
      return g.node(v).width;
    })
    .attr("height", function (v) {
      return g.node(v).height;
    })
    .attr("x", function (v) {
      var node = g.node(v);
      return -node.width / 2;
    })
    .attr("y", function (v) {
      var node = g.node(v);
      return -node.height / 2;
    });
}
