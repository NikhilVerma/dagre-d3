import util from "./util";
import { select } from "d3";
import addLabel from "./label/add-label";
export default createClusters;

function createClusters(selection, g) {
  var clusters = g.nodes().filter(function (v) {
    return util.isSubgraph(g, v);
  });
  var svgClusters = selection.selectAll("g.cluster").data(clusters, function (v) {
    return v;
  });

  svgClusters.selectAll("*").remove();
  svgClusters
    .enter()
    .append("g")
    .attr("class", "cluster")
    .attr("id", function (v) {
      var node = g.node(v);
      return node.id;
    })
    .style("opacity", 0);

  svgClusters = selection.selectAll("g.cluster");

  util.applyTransition(svgClusters, g).style("opacity", 1);

  svgClusters.each(function (v) {
    var node = g.node(v);
    var thisGroup = select(this);
    select(this).append("rect");
    var labelGroup = thisGroup.append("g").attr("class", "label");
    addLabel(labelGroup, node, node.clusterLabelPos);
  });

  svgClusters.selectAll("rect").each(function (c) {
    var node = g.node(c);
    var domCluster = select(this);
    util.applyStyle(domCluster, node.style);
  });

  var exitSelection;

  if (svgClusters.exit) {
    exitSelection = svgClusters.exit();
  } else {
    exitSelection = svgClusters.selectAll(null); // empty selection
  }

  util.applyTransition(exitSelection, g).style("opacity", 0).remove();

  return svgClusters;
}
