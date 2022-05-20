import { has, defaults, each } from "lodash-es";
import { curveLinear } from "d3";
import { layout } from "../vendors/dagre";
export default render;

import { default as createNodesImport } from "./create-nodes";
import { default as createClustersImport } from "./create-clusters";
import { default as createEdgeLabelsImport } from "./create-edge-labels";
import { default as createEdgePathsImport } from "./create-edge-paths";
import { default as shapesImport } from "./shapes";
import { default as arrowsImport } from "./arrows";

import positionNodes from "./position-nodes";
import positionEdgeLabels from "./position-edge-labels";
import positionClusters from "./position-clusters";

var createNodes = createNodesImport;
var createClusters = createClustersImport;
var createEdgeLabels = createEdgeLabelsImport;
var createEdgePaths = createEdgePathsImport;
var shapes = shapesImport;
var arrows = arrowsImport;

// This design is based on http://bost.ocks.org/mike/chart/.
function render() {
  var fn = function (svg, g) {
    preProcessGraph(g);

    var outputGroup = createOrSelectGroup(svg, "output");
    var clustersGroup = createOrSelectGroup(outputGroup, "clusters");
    var edgePathsGroup = createOrSelectGroup(outputGroup, "edgePaths");
    var edgeLabels = createEdgeLabels(createOrSelectGroup(outputGroup, "edgeLabels"), g);
    var nodes = createNodes(createOrSelectGroup(outputGroup, "nodes"), g, shapes);

    layout(g);

    positionNodes(nodes, g);
    positionEdgeLabels(edgeLabels, g);
    createEdgePaths(edgePathsGroup, g, arrows);

    var clusters = createClusters(clustersGroup, g);
    positionClusters(clusters, g);

    postProcessGraph(g);
  };

  fn.createNodes = function (value) {
    if (!arguments.length) return createNodes;
    createNodes = value;
    return fn;
  };

  fn.createClusters = function (value) {
    if (!arguments.length) return createClusters;
    createClusters = value;
    return fn;
  };

  fn.createEdgeLabels = function (value) {
    if (!arguments.length) return createEdgeLabels;
    createEdgeLabels = value;
    return fn;
  };

  fn.createEdgePaths = function (value) {
    if (!arguments.length) return createEdgePaths;
    createEdgePaths = value;
    return fn;
  };

  fn.shapes = function (value) {
    if (!arguments.length) return shapes;
    shapes = value;
    return fn;
  };

  fn.arrows = function (value) {
    if (!arguments.length) return arrows;
    arrows = value;
    return fn;
  };

  return fn;
}

var NODE_DEFAULT_ATTRS = {
  paddingLeft: 10,
  paddingRight: 10,
  paddingTop: 10,
  paddingBottom: 10,
  rx: 0,
  ry: 0,
  shape: "rect"
};

var EDGE_DEFAULT_ATTRS = {
  arrowhead: "normal",
  curve: curveLinear
};

function preProcessGraph(g) {
  g.nodes().forEach(function (v) {
    var node = g.node(v);
    if (!has(node, "label") && !g.children(v).length) {
      node.label = v;
    }

    if (has(node, "paddingX")) {
      defaults(node, {
        paddingLeft: node.paddingX,
        paddingRight: node.paddingX
      });
    }

    if (has(node, "paddingY")) {
      defaults(node, {
        paddingTop: node.paddingY,
        paddingBottom: node.paddingY
      });
    }

    if (has(node, "padding")) {
      defaults(node, {
        paddingLeft: node.padding,
        paddingRight: node.padding,
        paddingTop: node.padding,
        paddingBottom: node.padding
      });
    }

    defaults(node, NODE_DEFAULT_ATTRS);

    each(["paddingLeft", "paddingRight", "paddingTop", "paddingBottom"], function (k) {
      node[k] = Number(node[k]);
    });

    // Save dimensions for restore during post-processing
    if (has(node, "width")) {
      node._prevWidth = node.width;
    }
    if (has(node, "height")) {
      node._prevHeight = node.height;
    }
  });

  g.edges().forEach(function (e) {
    var edge = g.edge(e);
    if (!has(edge, "label")) {
      edge.label = "";
    }
    defaults(edge, EDGE_DEFAULT_ATTRS);
  });
}

function postProcessGraph(g) {
  each(g.nodes(), function (v) {
    var node = g.node(v);

    // Restore original dimensions
    if (has(node, "_prevWidth")) {
      node.width = node._prevWidth;
    } else {
      delete node.width;
    }

    if (has(node, "_prevHeight")) {
      node.height = node._prevHeight;
    } else {
      delete node.height;
    }

    delete node._prevWidth;
    delete node._prevHeight;
  });
}

function createOrSelectGroup(root, name) {
  var selection = root.select("g." + name);
  if (selection.empty()) {
    selection = root.append("g").attr("class", name);
  }
  return selection;
}
