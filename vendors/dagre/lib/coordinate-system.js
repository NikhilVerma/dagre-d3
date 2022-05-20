"use strict";

import { forEach, has } from "lodash-es";

export default {
  adjust: adjust,
  undo: undo
};

function adjust(g) {
  var rankDir = g.graph().rankdir.toLowerCase();
  if (rankDir === "lr" || rankDir === "rl") {
    swapWidthHeight(g);
  }
}

function undo(g) {
  var rankDir = g.graph().rankdir.toLowerCase();
  if (rankDir === "bt" || rankDir === "rl") {
    reverseY(g);
  }

  if (rankDir === "lr" || rankDir === "rl") {
    swapXY(g);
    swapWidthHeight(g);
  }
}

function swapWidthHeight(g) {
  forEach(g.nodes(), function (v) {
    swapWidthHeightOne(g.node(v));
  });
  forEach(g.edges(), function (e) {
    swapWidthHeightOne(g.edge(e));
  });
}

function swapWidthHeightOne(attrs) {
  var w = attrs.width;
  attrs.width = attrs.height;
  attrs.height = w;
}

function reverseY(g) {
  forEach(g.nodes(), function (v) {
    reverseYOne(g.node(v));
  });

  forEach(g.edges(), function (e) {
    var edge = g.edge(e);
    forEach(edge.points, reverseYOne);
    if (has(edge, "y")) {
      reverseYOne(edge);
    }
  });
}

function reverseYOne(attrs) {
  attrs.y = -attrs.y;
}

function swapXY(g) {
  forEach(g.nodes(), function (v) {
    swapXYOne(g.node(v));
  });

  forEach(g.edges(), function (e) {
    var edge = g.edge(e);
    forEach(edge.points, swapXYOne);
    if (has(edge, "x")) {
      swapXYOne(edge);
    }
  });
}

function swapXYOne(attrs) {
  var x = attrs.x;
  attrs.x = attrs.y;
  attrs.y = x;
}
