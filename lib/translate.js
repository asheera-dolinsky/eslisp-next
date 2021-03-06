// Generated by LiveScript 1.5.0
var concatMap, rootMacroTable, statementify, environment, compile, createTransformMacro, errors;
concatMap = require('prelude-ls').concatMap;
rootMacroTable = require('./built-in-macros');
statementify = require('./es-statementify');
environment = require('./env');
compile = require('./compile');
createTransformMacro = require('./import-macro').createTransformMacro;
errors = require('esvalid').errors;
module.exports = function(rootEnv, ast, options){
  var transformMacros, statements, programAst, err, firstError, this$ = this;
  options == null && (options = {});
  transformMacros = (options.transformMacros || []).map(function(func){
    var isolatedEnv;
    isolatedEnv = environment(rootMacroTable);
    return createTransformMacro(isolatedEnv, func);
  });
  statements = ast;
  transformMacros.forEach(function(macro){
    var this$ = this;
    return statements = macro.apply(null, statements).filter((function(it){
      return it !== null;
    }));
  });
  programAst = {
    type: 'Program',
    body: function(it){
      return it.map(statementify);
    }(
    function(it){
      return it.filter((function(it){
        return it !== null;
      }));
    }(
    concatMap(function(it){
      return compile(rootEnv, it);
    })(
    statements)))
  };
  err = errors(programAst);
  if (err.length) {
    firstError = err[0];
    throw firstError;
  } else {
    return programAst;
  }
};