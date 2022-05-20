"use strict";

import { forEach, max, map } from "lodash-es";
import util from "../util";
import { positionX } from "./bk";
export default position;

function position(g) {
  g = util.asNonCompoundGraph(g);

  positionY(g);
  forEach(positionX(g), function (x, v) {
    g.node(v).x = x;
  });
}

function positionY(g) {
  var layering = util.buildLayerMatrix(g);
  var rankSep = g.graph().ranksep;
  var prevY = 0;
  forEach(layering, function (layer) {
    var maxHeight = max(
      map(layer, function (v) {
        return g.node(v).height;
      })
    );
    forEach(layer, function (v) {
      g.node(v).y = prevY + maxHeight / 2;
    });
    prevY += maxHeight + rankSep;
  });
}
