"use strict";

import { filter, max, map, range, has, forEach, sortBy } from "lodash-es";
export default initOrder;

/*
 * Assigns an initial order value for each node by performing a DFS search
 * starting from nodes in the first rank. Nodes are assigned an order in their
 * rank as they are first visited.
 *
 * This approach comes from Gansner, et al., "A Technique for Drawing Directed
 * Graphs."
 *
 * Returns a layering matrix with an array per layer and each layer sorted by
 * the order of its nodes.
 */
function initOrder(g) {
  var visited = {};
  var simpleNodes = filter(g.nodes(), function (v) {
    return !g.children(v).length;
  });
  var maxRank = max(
    map(simpleNodes, function (v) {
      return g.node(v).rank;
    })
  );
  var layers = map(range(maxRank + 1), function () {
    return [];
  });

  function dfs(v) {
    if (has(visited, v)) return;
    visited[v] = true;
    var node = g.node(v);
    layers[node.rank].push(v);
    forEach(g.successors(v), dfs);
  }

  var orderedVs = sortBy(simpleNodes, function (v) {
    return g.node(v).rank;
  });
  forEach(orderedVs, dfs);

  return layers;
}
