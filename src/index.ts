import Counter from './counter';
import CounterMap from './counterMap';
import DefaultDict from './defaultDict';

export default Counter;
export { Counter, CounterMap, DefaultDict };

// For CommonJS default export support
module.exports = Counter;
module.exports.default = Counter;

module.exports.Counter = Counter;
module.exports.CounterMap = CounterMap;
module.exports.DefaultDict = DefaultDict;
