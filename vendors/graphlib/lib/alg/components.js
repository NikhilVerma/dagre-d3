import { has, each } from "lodash-es";
export default components;

function components(g) {
  var visited = {};
  var cmpts = [];
  var cmpt;

  function dfs(v) {
    if (has(visited, v)) return;
    visited[v] = true;
    cmpt.push(v);
    each(g.successors(v), dfs);
    each(g.predecessors(v), dfs);
  }

  each(g.nodes(), function (v) {
    cmpt = [];
    dfs(v);
    if (cmpt.length) {
      cmpts.push(cmpt);
    }
  });

  return cmpts;
}
