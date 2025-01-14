import { filter } from "lodash-es";
import tarjan from "./tarjan";
export default findCycles;

function findCycles(g) {
  return filter(tarjan(g), function (cmpt) {
    return cmpt.length > 1 || (cmpt.length === 1 && g.hasEdge(cmpt[0], cmpt[0]));
  });
}
