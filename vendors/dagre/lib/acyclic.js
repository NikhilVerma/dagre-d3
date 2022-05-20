"use strict";

import { forEach, uniqueId, has } from "lodash-es";
import greedyFAS from "./greedy-fas";

export default {
  run: run,
  undo: undo
};

function run(g) {
  var fas = g.graph().acyclicer === "greedy" ? greedyFAS(g, weightFn(g)) : dfsFAS(g);
  forEach(fas, function (e) {
    var label = g.edge(e);
    g.removeEdge(e);
    label.forwardName = e.name;
    label.reversed = true;
    g.setEdge(e.w, e.v, label, uniqueId("rev"));
  });

  function weightFn(g) {
    return function (e) {
      return g.edge(e).weight;
    };
  }
}

function dfsFAS(g) {
  var fas = [];
  var stack = {};
  var visited = {};

  function dfs(v) {
    if (has(visited, v)) {
      return;
    }
    visited[v] = true;
    stack[v] = true;
    forEach(g.outEdges(v), function (e) {
      if (has(stack, e.w)) {
        fas.push(e);
      } else {
        dfs(e.w);
      }
    });
    delete stack[v];
  }

  forEach(g.nodes(), dfs);
  return fas;
}

function undo(g) {
  forEach(g.edges(), function (e) {
    var label = g.edge(e);
    if (label.reversed) {
      g.removeEdge(e);

      var forwardName = label.forwardName;
      delete label.reversed;
      delete label.forwardName;
      g.setEdge(e.w, e.v, label, forwardName);
    }
  });
}
