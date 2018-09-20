/**
 * Return the global object which is either self, or window or the defined global object
 * {return} the global object
 */
var primGlobal = function () {	 
	if (typeof self !== 'undefined') { return self; }      //eslint-disable-line no-undef
	if (typeof window !== 'undefined') { return window; }  //eslint-disable-line no-undef
	if (typeof global !== 'undefined') { return global; }  //eslint-disable-line no-undef
	throw new Error('No global object');
};

////////////////////////////////////////////
// Namespace
////////////////////////////////////////////
function Namespace(newName) {
    this._name = newName;
}

Namespace.prototype.toString = function() {
    return this._name;
}

/**
 * Create a new namespace.
 * {@param} {String} namespace the fully qualified 
 * {return} the created Namespace
 */
Namespace.create = function(namespace) {    
    var path = '';
    return namespace.split('.').reduce(function(holder, name){
    if(holder[name] == undefined) {
        path = path + name;
        var ns = new Namespace(path); 
        holder[name] = holder[name] || ns;
        path = path + '.';
    }
    return holder[name];
  }, primGlobal());
}

////////////////////////////////////////////
// OJO
////////////////////////////////////////////
var OJO = function() {}

/**
 * Map the given object to the given workspace
 */
OJO._mapObjectToNamespace = function(foo, namespaceName) {
  if (typeof foo !== 'undefined') {       
      (Namespace.create(namespaceName))[foo.name] = foo;
  }
  return foo;    
};

/**
 * Bootstrap the system
 */
OJO.bootstrap = function() {
    [Array, Number, Boolean].forEach(function(element) {    
        OJO._mapObjectToNamespace(element, "js.lang");
    })
}


////////////////////////////////////////////
// BOOTSTRAP
////////////////////////////////////////////
OJO.bootstrap();