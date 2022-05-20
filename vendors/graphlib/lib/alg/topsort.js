import { has, each, size } from "lodash-es";
export default topsort;
topsort.CycleException = CycleException;

function topsort(g) {
  var visited = {};
  var stack = {};
  var results = [];

  function visit(node) {
    if (has(stack, node)) {
      throw new CycleException();
    }

    if (!has(visited, node)) {
      stack[node] = true;
      visited[node] = true;
      each(g.predecessors(node), visit);
      delete stack[node];
      results.push(node);
    }
  }

  each(g.sinks(), visit);

  if (size(visited) !== g.nodeCount()) {
    throw new CycleException();
  }

  return results;
}

function CycleException() {}
CycleException.prototype = new Error(); // must be an instance of Error to pass testing
