import Parser, { plugins } from "./parser";
import "./parser/util";
import "./parser/statement";
import "./parser/lval";
import "./parser/expression";
import "./parser/node";
import "./parser/location";
import "./parser/comments";

import { types as tokTypes } from "./tokenizer/types";
import "./tokenizer";
import "./tokenizer/context";

import flowPlugin from "./plugins/flow";
import jsxPlugin from "./plugins/jsx";
plugins.flow = flowPlugin;
plugins.jsx = jsxPlugin;

export function parse(input, options) {
  return new Parser(options, input).parse();
}

export function tokenize(input, options) {
  let parser = new Parser(options, input);
  return () => {
    if (!parser) return null;

    parser.next();
    if (parser.eat(tokTypes.eof)) {
      parser = null; // deallocate when done
      return null;
    }

    const {state} = parser;
    return {
      type: state.type,
      value: state.value,
      start: state.start,
      end: state.end,
      startLoc: state.startLoc,
      endLoc: state.endLoc,
    };
  };
}

export { tokTypes };
