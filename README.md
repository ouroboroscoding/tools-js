
# @ouroboros/tools

[![npm version](https://img.shields.io/npm/v/@ouroboros/tools.svg)](https://www.npmjs.com/package/@ouroboros/tools) ![MIT License](https://img.shields.io/npm/l/@ouroboros/tools.svg)

A library with several generic functions for standard javascript problems

## Installation
npm
```bash
npm install @ouroboros/tools
```
## Functions

### afindi
Use to find the index of an object in an array based on a key and value.
```javascript
import { afindi } from  '@ouroboros/tools';

let  i;
const  a = [
    {iso:  'CA', name:  'Canada'},
    {iso:  'MX', name:  'Mexico'},
    {iso:  'US', name:  'United States'}
];

// i = 1
i = afindi(a, 'iso', 'MX');

// i = 0
i = afindi(a, 'name', 'Canada');

// i = -1
i = afindi(a, 'iso', 'GB');
```
### afindo
Used to find an object in an array of objects based on key and value.
```javascript
import { afindo } from '@ouroboros/tools';

let  o;
const  a = [
    {iso:  'CA', name:  'Canada'},
    {iso:  'MX', name:  'Mexico'},
    {iso:  'US', name:  'United States'}
];

// o = {iso: 'MX', name: 'Mexico'}
o = afindo(a, 'iso', 'MX');

// o = {iso:  'CA', name:  'Canada'}
o = afindo(a, 'name', 'Canada');

// o = null
o = afindo(a, 'iso', 'GB');
```
### ashift
Shifts an item in an array from one index to another.
```javascript
import { ashift } from '@ouroboros/tools';

const a = ['!', 'hello', 'world'];

// a = ['hello', 'world', '!']
ashift(a, 0, 2);
```
### bytesHuman
Converts a number of bytes into a human readable string.
```javascript
import { bytesHuman } from '@ouroboros/tools';

const bytes = 1073741824; // 1024 * 1024 * 1024

// s = 1.0GiB
const s = bytesHuman(bytes);
```
### clone
Does a deep copy of pure data arrays and objects. In other words, it will not work as expected if any of the data at any level is class instances or other complex types.
```javascript
import { clone } from '@ouroboros/tools';

const a = {hello: ['w', 'o', 'r', 'l', 'd']};

// b = {hello: ['w', 'o', 'r', 'l', 'd']}
const b = clone(a)

// false, as they are not the same object anymore
a === b
```
### combine
Combines two objects into a new one and returns it. If there are any duplicate keys, those in "a" are overwritten by those in "b".
```javascript
import { combine } from '@ouroboros/tools';

const a = {hello: 'world', one: 1, three: 4};
const b = {two: 2, three: 3}

// c = {hello: 'world', one: 1, three: 3, two: 2}
const c = combibe(a, b);
```

### compare
Compares two values of any type to see if they contain the same data or not.
```javascript
import { compare } from '@ouroboros/tools';

// true
compare([1, 2, 3], [1, 2, 3])

// false
compare([1, 2, 3], [1, 3, 2]);

// true
compare(
    {one: 1, two: 2, three: 3},
    {three: 3, two: 2, one: 1}
);

// false
compare(
    {one: [1, 1, 1]},
    {one: [1, 1}
);
```

### divmod
Take two (non complex) numbers as arguments and return a pair of numbers consisting of their quotient and remainder when using integer division.
```javascript
import { divmod } from '@ouroboros/tools';
let l;

// l = [11, 1]
l = divmod(100, 9);

// l = [24, 3]
l = divmod(123, 5)
```
### empty
Returns true if the value type is empty.
```javascript
import { empty } from '@ouroboros/tools';

// true
empty('');
empty([]);
empty({});
let a;
empty(a);

// false
empty(' ');
empty(['']);
```
### isDecimal
Returns true if the variable is a number.
```javascript
import { isDecimal } from '@ouroboros/tools';

// true
isDecimal(0);
isDecimal(1);
isDecimal(1.0);
isDecimal(0.1);
isDecimal(0x00);

// false
isDecimal('');
isDecimal('1');
isDecimal([]);
```

### isInteger
Returns true if the variable is a true integer.
```javascript
import { isInteger } from '@ouroboros/tools';

// true
isInteger(0);
isInteger(123);
isInteger(1.0);

// false
isInteger('1');
isInteger(1.1);
isInteger([]);
```
### isNumeric
Returns true if a string is made up only of digits.
```javascript
import { isNumeric } from '@ouroboros/tools';

// true
isNumeric(1);
isNumeric('1');

// false
isNumeric('one');
isNumeric(' 1');
isNumeric('1.');
isNumeric('1.1');
```
### isObject
Returns true if the variable is a true object.
```javascript
import { isObject } from '@ouroboros/tools';

// true
isObject({});
isObject({one: 1, two: 2, three: 3});

// false
isObject(null);
isObject([]);
isObject('hello');
```

### join
Creates a single string from a list of members that may or may not exist in the passed object.
```javascript
import { join } from '@ouroboros/tools';

const name1 = {title: 'Mr', first: 'Chris', last: 'Nasr'};
const name2 = {first: 'Frank', middle: 'Gary', last: 'Smith'};

// Mr Chris Nasr
join(name1, ['title', 'first', 'middle', 'last']);

// FrankGarySmith
join(name2, ['title', 'first', 'middle', 'last'], '');
```
### max
Returns the maximum (largest) value in an array.
```javascript
import { max } from '@ouroboros/tools';

// 3
max([2, 3, 1]);

// Zebra
max(['Lion', 'Alligator', 'Zebra']);
```

### merge
Merges the keys from the second object into the first.
```javascript
import { merge } from '@ouroboros/tools';

let a = {one: 1, two: 3};
let b = {three: 3};

// a = {one: 1, two: 2, three: 3}
merge(a, b);
```
### min
Returns the minimum (smallest) value in an array
```javascript
import { min } from '@ouroboros/tools';

// 1
max([2, 3, 1]);

// Alligator
max(['Lion', 'Alligator', 'Zebra']);
```
### nicePhone
Returns a more easily readable phone number in the NA format.
```javascript
import { nicePhone } from '@ouroboros/tools';

// +1 (555) 123-4444
nicePhone('15551234444');

// +1 (800) 555-1234
nicePhone('8005551234');
```
### omap
Works like map for arrays, but iterates over an object returning the value, the key, and the index, in that order.
```javascript
import { omap } from '@ouroboros/tools';

const o = {one: 'uno', two: 'dos', three: 'tres'};

// ['uno', 'dos', 'tres']
omap(o, (v, k) => v);

// ['one', 'two', 'three']
omap(o, (v, k) => k);

// [0, 1, 2]
omap(o, (v, k, i) => i);

// ['one:uno', 'two:dos', 'three:tres']
omap(o, (v, k) => {
	return k + ':' + v;
});
```
### opop
Removes an element from an object by name, then returns it.
```javascript
import { opop } from '@ouroboros/tools';

let o = {one: 1, two: 2, three: 3};

// o = {one: 1, three: 3}
// i = 2
let i = opop(o, 'two');
```

### parseQuery
Turns a query string into an object.
```javascript
import { parseQuery } from '@ouroboros/tools';

// { one: '1', two: '2', three: '3' }
parseQuery('one=1&two=2&three=3');

// { numbers: ['one', 'two', 'three'] }
parseQuery('numbers[0]=one&numbers[1]=two&numbers[2]=three');

// { n: { one: '1', two: '2' } }
parseQuery('n[one]=1&n[two]=2');
```

### sortByKey
Returns a callback function that will compare two objects by the key name. Useful for sorting arrays of objects using sort
```javascript
import { sortByKey } from '@ouroboros/tools';

let people = [
    {first: 'Chris', last: 'Nasr'},
    {first: 'Brendan', last: 'Eich'},
    {first: 'Guido', last: 'van Rossum'}
];

// people = [
//  {first: 'Brendan', last: 'Eich'},
//  {first: 'Chris', last: 'Nasr'},
//  {first: 'Guido', last: 'van Rossum'}
//]
people.sort(sortByKey('first'));
```
### ucfirst
Makes the first character of each word in the text upper case.
```javascript
import { ucfirst } from '@ouroboros/tools';

// Hello, World!
ucfirst('hello, world!');

// Hello, World!
ucfirst('HELLO, WORLD!');
```