class Counter {
	entries: Map<string, number>;
	cacheChangeCount: number;
	currentChangeCount: number;
	cacheTotal: number;
	constructor(list?: string[]);
	constructor(counter?: Counter);
	constructor(obj?: any) {
		this.entries = new Map();
		this.cacheChangeCount = -1;
		this.currentChangeCount = 0;
		this.cacheTotal = 0;
		if (obj instanceof Counter) {
			this.incBy(obj);
		}
		if (Array.isArray(obj)) {
			for (let k in obj) {
				this.inc(obj[k], 1);
			}
		}
	}

	inc(key: string, increment = 1) {
		this.setCount(key, this.getCount(key) + increment);
	}

	incAll(keys: [string], increment = 1) {
		for (let i = 0; i < keys.length; i++) {
			this.inc(keys[i], increment);
		}
	}

	incBy(counter: Counter) {
		let keys = counter.keys();
		for (let key of keys) {
			this.inc(key, counter.getCount(key));
		}
	}

	getCount(key: string): number {
		return this.entries.get(key) || 0;
	}

	setCount(key: string, count: number) {
		this.currentChangeCount++;
		this.entries.set(key, count);
	}

	removeKey(key: string): number {
		let count = this.getCount(key);
		this.entries.delete(key);
		return count;
	}

	elementwiseMax(counter: Counter) {
		let keys = counter.keys();
		for (let key of keys) {
			let count = counter.getCount(key);
			if (this.getCount(key) < count) {
				this.setCount(key, count);
			}
		}
	}

	totalCount(): number {
		if (this.currentChangeCount != this.cacheChangeCount) {
			// compute count
			let total = 0;
			let keys = this.keys();
			for (let key of keys) {
				total += this.getCount(key);
			}
			this.cacheChangeCount = this.currentChangeCount;
			this.cacheTotal = total;
		}
		return this.cacheTotal;
	}

	normalize() {
		let itotal = 1 / this.totalCount();
		this.scale(itotal);
	}

	scale(factor: number) {
		let keys = this.keys();
		for (let key of keys) {
			this.setCount(key, this.getCount(key) * factor);
		}
	}

	maxCount(): number {
		let keys = this.keys();
		let maxCount = -1;
		for (let key of keys) {
			let count = this.getCount(key);
			if (count > maxCount) {
				maxCount = count;
			}
		}
		return maxCount;
	}

	argMax(): string {
		let keys = this.keys();
		let maxKey = null;
		let maxCount = -1;
		for (let key of keys) {
			let count = this.getCount(key);
			if (count > maxCount) {
				maxKey = key;
				maxCount = count;
			}
		}
		return maxKey;
	}

	subtract(other: Counter) {
		let keys = this.keys();
		for (let key of keys) {
			if (other.contains(key)) {
				this.setCount(key, this.getCount(key) - other.getCount(key));
			}
		}
	}

	toString(): string {
		let keys = this.keys();
		let out = [];
		for (let key of keys) {
			let count = this.getCount(key).toFixed(2);
			out.push(`[${key}, ${count}]`);
		}
		return out.join(' ');
	}

	clear() {
		this.entries.clear();
	}

	keys() {
		return this.entries.keys();
	}

	values() {
		return this.entries.values();
	}

	size(): number {
		return this.entries.size;
	}

	isEmpty(): boolean {
		return this.entries.size === 0;
	}

	contains(key: string): boolean {
		return this.entries.get(key) !== undefined;
	}

}

export default Counter;

// For CommonJS default export support
module.exports = Counter;
module.exports.default = Counter;
