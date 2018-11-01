// Generated by LiveScript 1.5.0
var stringToAst, astToEstree, estreeToJs, rootMacroTable, environment, toEstree, compile, makeStatefulCompiler, compileOnce, compileWithSourceMap, x$, slice$ = [].slice;
stringToAst = require('./parse');
astToEstree = require('./translate');
estreeToJs = require('escodegen').generate;
rootMacroTable = require('./built-in-macros');
environment = require('./env');
toEstree = function(rootEnv, input, options){
  return astToEstree(rootEnv, stringToAst(
  input.toString()), {
    transformMacros: options.transformMacros
  });
};
compile = function(rootEnv, input, options){
  options == null && (options = {});
  return estreeToJs(
  toEstree.apply(null, arguments));
};
makeStatefulCompiler = function(options){
  var rootEnv;
  options == null && (options = {});
  rootEnv = environment(rootMacroTable, {
    filename: options.filename
  });
  return partialize$.apply(this, [compile, [rootEnv, void 8, options], [1]]);
};
compileOnce = function(input, options){
  var rootEnv;
  options == null && (options = {});
  rootEnv = environment(rootMacroTable, {
    filename: options.filename
  });
  return compile(rootEnv, input, options);
};
compileWithSourceMap = function(input, options){
  var rootEnv, escodegenOpts, estreeObject, ref$, code, mapGenerator;
  options == null && (options = {});
  rootEnv = environment(rootMacroTable, {
    filename: options.filename
  });
  escodegenOpts = {
    sourceMapWithCode: true,
    sourceMap: options.filename || true,
    sourceContent: input.toString()
  };
  estreeObject = toEstree(rootEnv, input, options);
  ref$ = estreeToJs(estreeObject, escodegenOpts), code = ref$.code, mapGenerator = ref$.map;
  return {
    code: code,
    map: mapGenerator.toString()
  };
};
x$ = module.exports = compileOnce;
x$.stateful = makeStatefulCompiler;
x$.withSourceMap = compileWithSourceMap;
function partialize$(f, args, where){
  var context = this;
  return function(){
    var params = slice$.call(arguments), i,
        len = params.length, wlen = where.length,
        ta = args ? args.concat() : [], tw = where ? where.concat() : [];
    for(i = 0; i < len; ++i) { ta[tw[0]] = params[i]; tw.shift(); }
    return len < wlen && len ?
      partialize$.apply(context, [f, ta, tw]) : f.apply(context, ta);
  };
}