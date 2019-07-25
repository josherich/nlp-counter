class DefaultDict {
	[key:string]: any;
  constructor(defaultInit: any) {
    return new Proxy({}, {
      get: (target: any, name: string) => name in target ?
        target[name] :
        (target[name] = typeof defaultInit === 'function' ?
          new defaultInit().valueOf() :
          defaultInit)
    })
  }
}

export default DefaultDict;

// For CommonJS default export support
module.exports = DefaultDict;
module.exports.default = DefaultDict;
