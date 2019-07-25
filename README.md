# Counter [![Build Status](https://travis-ci.com/josherich/counter.svg?branch=master)](https://travis-ci.com/josherich/counter)

<img src="counting.gif" width="182" align="right">

```js
import Counter from 'counter';

let words = ['the', 'the', 'the', 'the'];
let counter = new Counter();
counter.incAll(words);

counter.inc('a', 1);
counter.inc('a', 1);
counter.inc('b', 1);
counter.inc('b', 1);

counter.normalize();
counter.maxCount();
counter.argMax();
```

## Install

```
$ npm install nlp-counter
```

## Usage

```js
let counter = new Counter();
let counter_another = new Counter();

let text = `I am firm, You are obstinate, He is a pig-headed fool. I am righteously indignant, you are annoyed, he is making a fuss over nothing. I have reconsidered the matter, you have changed your mind, he has gone back on his word.`
let words = tokenize(text);

words.map(w => {
	counter.inc(w);
});

counter.incAll(words);
counter_another.incAll(['the', 'the', 'the', 'the']);

counter.keys();
counter.values();
counter.size();

counter.normalize();
counter.maxCount();
counter.argMax();
counter.elementwiseMax(counter_another);
counter.subtract(counter_another);
```


## API

### Counter

```js
inc(key: string, increment = 1)

incAll(keys: [string], increment = 1)

incBy(counter: Counter)

getCount(key: string): number

setCount(key: string, count: number)

removeKey(key: string): number

elementwiseMax(counter: Counter)

totalCount(): number

normalize()

scale(factor: number)

maxCount(): number

argMax(): string

subtract(other: Counter)

toString(): string

clear()

keys(): Iterator

values(): Iterator

size(): number

isEmpty(): boolean

contains(key: string): boolean
```

### CounterMap

```js
inc(key: string, value: string, increment = 1)

incAll(keys: [[string, string]], increment = 1)

getCount(key: string, value: string): number

setCount(key: string, value: string, count: number)

removeKey(key: string, value?: string): number

totalCount(): number

normalize(): number

scale(factor: number)

subtract(other: CounterMap)

toString(): string

keys(): string[]

keySize(): number

totalSize(): number

isEmpty(): boolean

contains(key: string, value?: string): boolean
```

## Maintainers

- [Josherich](https://github.com/josherich)
