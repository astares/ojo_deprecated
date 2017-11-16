/**
 * Return the global object which is either self, or window or the defined global object
 * {return} the global object
 */
var primGlobal = function () {	 
	if (typeof self !== 'undefined') { return self; }
	if (typeof window !== 'undefined') { return window; }
	if (typeof global !== 'undefined') { return global; }
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

Namespace.create("js.lang");

js.lang.Array = Array;
js.lang.Namespace = Namespace;

