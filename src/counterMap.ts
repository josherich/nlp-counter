import Counter from './counter';
import DefaultDict from './defaultDict';

class CounterMap {
	entries: DefaultDict;
	cacheChangeCount: number;
	currentChangeCount: number;
	cacheTotal: number;
	// [[k, v, count], ...]
	constructor(list?: [string, string, number][]) {
		this.entries = new DefaultDict(Counter);
		this.cacheChangeCount = -1;
		this.currentChangeCount = 0;
		this.cacheTotal = 0;
		if (Array.isArray(list)) {
			for (let i in list) {
				this.setCount(list[i][0], list[i][1], list[i][2]);
			}
		}
	}

	inc(key: string, value: string, increment = 1) {
		let counter = this.entries[key];
		counter.setCount(key, counter.getCount(value) + increment);
		this.currentChangeCount++;
	}

	incAll(keys: [[string, string]], increment = 1) {
		for (let i = 0; i < keys.length; i++) {
			this.inc(keys[i][0], keys[i][1], increment);
		}
	}

	getCount(key: string, value: string): number {
		let counter = this.entries[key];
		return counter.getCount(value);
	}

	setCount(key: string, value: string, count: number) {
		let counter = this.entries[key];
		counter.setCount(value, count);
		this.currentChangeCount++;
	}

	removeKey(key: string, value?: string): number {
		if (value == undefined) {
			delete this.entries[key];
			return 0;
		} else {
			let counter = this.entries[key];
			let count = counter.getCount(value);
			counter.removeKey(value);
			return count;
		}
	}

	totalCount() {
		if (this.currentChangeCount != this.cacheChangeCount) {
			let total = 0;
			for (let key in this.entries) {
				total += this.entries[key].totalCount();
			}
			this.cacheChangeCount = this.currentChangeCount;
			this.cacheTotal = total;
		}
		return this.cacheTotal;
	}

	normalize() {
		for (let key in this.entries) {
			let counter = this.entries[key];
			counter.normalize();
		}
	}

	scale(factor: number) {
		for (let key in this.entries) {
			let counter = this.entries[key];
			counter.scale(factor);
		}
	}

	subtract(other: CounterMap) {
		for (let key in this.entries) {
			let counter = this.entries[key];
			for (let value of counter.keys()) {
				if (other.contains(key, value))
					this.setCount(key, value, this.getCount(key, value) - other.getCount(key, value));
			}
		}
	}

	toString(): string {
		let out = "";
		for (let key in this.entries) {
			let counter = this.entries[key];
			out += counter.toString();
		}
		return out;
	}

	keys(): string[] {
		let keys = [];
		for (let key in this.entries) {
			keys.push(key);
		}
		return keys;
	}

	keySize(): number {
		return this.keys().length;
	}

	totalSize(): number {
		let total = 0;
		for (let key in this.entries) {
			total += this.entries[key].size();
		}
		return total;
	}

	isEmpty(): boolean {
		return this.keySize() === 0;
	}

	contains(key: string, value?: string): boolean {
		if (value === undefined) {
			return key in this.entries;
		} else {
			let counter = this.entries[key];
			return counter.contains(value);
		}
	}

}

export default CounterMap;

// For CommonJS default export support
module.exports = CounterMap;
module.exports.default = CounterMap;
