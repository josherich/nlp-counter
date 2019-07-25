import { expect } from 'chai';
import { Counter } from '../src';

describe("Counter", () => {
	let counter = new Counter();

	beforeEach(function() {
		counter.clear();
  });

  let initWithAB = () => {
  	counter.inc('a', 1);
  	counter.inc('a', 1);
  	counter.inc('b', 1);
  }

	it("Should return empty after init, or delete all", () => {
		expect(counter.isEmpty()).to.equal(true);

		counter.inc('a', 1);
		expect(counter.isEmpty()).to.equal(false);

		counter.removeKey('a');
		expect(counter.isEmpty()).to.equal(true);
	});

	it("Should count", () => {
		initWithAB();
		expect(counter.getCount('a')).to.equal(2);
		expect(counter.getCount('b')).to.equal(1);
		expect(counter.size()).to.equal(2);
	});

	it("should return correct iterate", () => {
		initWithAB();
		expect(counter.keys()).to.eql(new Map([['a', 0], ['b', 0]]).keys());
		expect(counter.values()).to.eql(new Map([['c', 2], ['d', 1]]).values());
	});

	it("should contains", () => {
		initWithAB();
		expect(counter.contains('a')).to.equal(true);
		expect(counter.contains('b')).to.equal(true);
	});

	it("should return argMax", () => {
		initWithAB();
		expect(counter.argMax()).to.equal('a');
	});

	it("should return max count", () => {
		initWithAB();
		expect(counter.maxCount()).to.equal(2);
	});

	it("should remove key", () => {
		initWithAB();
		let count = counter.removeKey('a');
		expect(counter.contains('a')).to.equal(false);
		expect(count).to.equal(2);
	});

	it("should element wise maximize", () => {
		initWithAB();
		let counter2 = new Counter();
		counter2.inc('a', 1);
		counter2.inc('a', 1);
		counter2.inc('a', 1);

		counter2.inc('b', 1);
		counter2.inc('b', 1);

		counter.elementwiseMax(counter2);

		expect(counter.getCount('a')).to.equal(3);
		expect(counter.getCount('b')).to.equal(2);
		expect(counter.size()).to.equal(2);
	});

	it("should subtract", () => {
		initWithAB();
		let counter2 = new Counter();
		counter2.inc('a', 1);
		counter2.inc('a', 1);
		counter2.inc('a', 1);

		counter2.inc('b', 1);
		counter2.inc('b', 1);

		counter2.subtract(counter);

		expect(counter2.getCount('a')).to.equal(1);
		expect(counter2.getCount('b')).to.equal(1);
		expect(counter2.size()).to.equal(2);
	});

	it("should total", () => {
		initWithAB();
		expect(counter.totalCount()).to.equal(3);
	});

	it("should normalize", () => {
		initWithAB();
		counter.inc('b', 1);
		// a: 2/4, b: 2/4
		counter.normalize();
		expect(counter.getCount('a')).to.equal(0.5);
		expect(counter.getCount('b')).to.equal(0.5);
		expect(counter.size()).to.equal(2);
	});

	it("should scale", () => {
		initWithAB();
		counter.scale(10);
		expect(counter.getCount('a')).to.equal(20);
		expect(counter.getCount('b')).to.equal(10);
		expect(counter.size()).to.equal(2);
	});

});
