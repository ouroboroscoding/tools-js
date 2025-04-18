# @ouroboros/tools
[![npm version](https://img.shields.io/npm/v/@ouroboros/tools.svg)](https://www.npmjs.com/package/@ouroboros/tools) ![MIT License](https://img.shields.io/npm/l/@ouroboros/tools.svg)

A library with several generic functions for standard javascript problems.

See [Releases](https://github.com/ouroboroscoding/tools-js/blob/main/releases.md)
for changes from release to release.

## Installation
npm
```bash
npm install @ouroboros/tools
```

## Functions
- [afindi](#afindi)
- [afindo](#afindo)
- [arrayFindDelete](#arrayfinddelete)
- [arrayFindMerge](#arraydindmerge)
- [arrayFindOverwrite](#arrayfindoverwrite)
- [ashift](#ashift)
- [bytesHuman](#byteshuman)
- [classes](#classes)
- [combine](#combine)
- [compare](#compare)
- [difference](#difference)
- [divmod](#divmod)
- [empty](#empty)
- [isDecimal](#isdecimal)
- [isInteger](#isinteger)
- [isNumeric](#isnumeric)
- [isObject](#isobject)
- [join](#join)
- [latitudeToDegrees](#latitudetodegrees)
- [longitudeToDegrees](#longitudetodegrees)
- [max](#max)
- [merge](#merge)
- [min](#min)
- [nicePhone](#nicephone)
- [normalize](#normalize)
- [objectArrayToObject](#objectarraytoobject)
- [omap](#omap)
- [opop](#opop)
- [owithout](#owithout)
- [parseQuery](#parsequery)
- [pathToTree](#pathtotree)
- [random](#random)
- [sortByKey](#sortbykey)
- [ucfirst](#ucfirst)
- [uuidAddDashes](#uuidadddashes)
- [uuidStripDashes](#uuidstripdashes)

## afindi
Use to find the index of an object in an array based on a key and value.
```javascript
import { afindi } from  '@ouroboros/tools';

let  i;
const  a = [
    {iso: 'CA', name: 'Canada'},
    {iso: 'MX', name: 'Mexico'},
    {iso: 'US', name: 'United States'}
];

// i = 1
i = afindi(a, 'iso', 'MX');

// i = 0
i = afindi(a, 'name', 'Canada');

// i = -1
i = afindi(a, 'iso', 'GB');
```

[ [functions](#functions) ]

## afindo
Used to find an object in an array of objects based on key and value.
```javascript
import { afindo } from '@ouroboros/tools';

let  o;
const  a = [
    {iso: 'CA', name: 'Canada'},
    {iso: 'MX', name: 'Mexico'},
    {iso: 'US', name: 'United States'}
];

// o = {iso: 'MX', name: 'Mexico'}
o = afindo(a, 'iso', 'MX');

// o = {iso: 'CA', name: 'Canada'}
o = afindo(a, 'name', 'Canada');

// o = null
o = afindo(a, 'iso', 'GB');
```

[ [functions](#functions) ]

## arrayFindDelete
Used to delete an object in an array of objects based on key and value.

Passing the optional returnClone argument as true will return a new
copy of the array instead of updating it in place.
```javascript
import { arrayFindDelete } from '@ouroboros/tools';

const a = [
    {iso: 'CA', name: 'Canada'},
    {iso: 'MX', name: 'Mexico'},
    {iso: 'US', name: 'United States'}
];

// returns true
// a = [
//	{iso: 'CA', name: 'Canada'},
//	{iso: 'US', name: 'United States'}
// ]
arrayFindDelete(a, 'iso', 'MX');

// returns false
arrayFindDelete(a, 'iso', 'GB');

// returns new array [
//	{iso: 'CA', name: 'Canada'},
// ]
arrayFindDelete(a, 'iso', 'US', true);
```

[ [functions](#functions) ]

## arrayFindMerge
Used to find an object in an array of objects based on key and value, then
merges the new passed data with the existing object found.

Passing the optional returnClone argument as true will return a new
copy of the array instead of updating it in place.
```javascript
import { arrayFindMerge } from '@ouroboros/tools';

const a = [
    {iso: 'CA', name: 'Canada'},
    {iso: 'MX', name: 'Mexico'},
    {iso: 'US', name: 'United States'}
];

// returns true
// a = [
//	{iso: 'CA', name: 'Canada'},
//	{iso: 'MX', name: 'Mexico'},
//	{iso: 'US', name: 'United States of America'}
// ]
arrayFindMerge(a, 'iso', 'US', { name: 'United States of America' });

// returns false
arrayFindMerge(a, 'iso', 'GB', { name: 'Great Britain' });

// returns new array [
//	{iso: 'CA', name: 'Kanata'},
//	{iso: 'MX', name: 'Mexico'},
//	{iso: 'US', name: 'United States of America'}
// ]
arrayFindMerge(a, 'iso', 'CA', { name: 'Kanata' }, true);
```

[ [functions](#functions) ]

## arrayFindOverwrite
Used to find an object in an array of objects based on key and value, then
overwrites it with the new passed data.

Passing the optional returnClone argument as true will return a new
copy of the array instead of updating it in place.
```javascript
import { arrayFindOverwrite } from '@ouroboros/tools';

const a = [
    {iso: 'CA', name: 'Canada'},
    {iso: 'MX', name: 'Mexico'},
    {iso: 'US', name: 'United States'}
];

// returns true
// a = [
//	{iso: 'CA', name: 'Canada'},
//	{iso: 'MX', name: 'Mexico'},
//	{iso: 'GB', name: 'Great Britain'}
// ]
arrayFindOverwrite(a, 'iso', 'US', {iso: 'GB', name: 'Great Britain'});

// returns false
arrayFindOverwrite(a, 'iso', 'US', {iso: 'GB', name: 'Great Britain'});

// returns new array [
//	{name: 'France'},
//	{iso: 'MX', name: 'Mexico'},
//	{iso: 'GB', name: 'Great Britain'}
// ]
arrayFindOverwrite(a, 'iso', 'CA', {name: 'France'}, true);

// returns `a` untouched
arrayFindOverwrite(a, 'iso', 'CA', {name: 'France'}, true);
```

[ [functions](#functions) ]

## ashift
Shifts an item in an array from one index to another.
```javascript
import { ashift } from '@ouroboros/tools';

const a = ['!', 'hello', 'world'];

// a = ['hello', 'world', '!']
ashift(a, 0, 2);
```

[ [functions](#functions) ]

## bytesHuman
Converts a number of bytes into a human readable string.
```javascript
import { bytesHuman } from '@ouroboros/tools';

const bytes = 1073741824; // 1024 * 1024 * 1024

// s = '1.0GiB'
const s = bytesHuman(bytes);
```

[ [functions](#functions) ]

## classes
Converts an object of css class names as keys into a string. A simplified replacement for React's classSet.
```javascript
import { classes } from '@ouroboros/tools';

const s;

// s = 'tab'
s = classes({ tab: true, selected: false });

// s = 'tab selected'
s = classes({ tab: true, selected: true });

// s = 'red tab selected'
s = classes({ 'red tab': true, selected: true });
```

[ [functions](#functions) ]

## combine
Combines two objects into a new one and returns it. If there are any duplicate keys, those in "a" are overwritten by those in "b".
```javascript
import { combine } from '@ouroboros/tools';

const a = {hello: 'world', one: 1, three: 4};
const b = {two: 2, three: 3}

// c = { hello: 'world', one: 1, three: 3, two: 2 }
const c = combine(a, b);
```

[ [functions](#functions) ]

## compare
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
    {one: [1, 1]}
);
```

[ [functions](#functions) ]

## difference
Returns the changes from the original value, x, to the new value, y.
```javascript
import { difference } from '@ouroboros/tools';

// { two: 'deux', three: 3 }
difference(
  { one, 1, two: 2 },
  { one, 1, two: 'deux', three: 3 }
);
```

[ [functions](#functions) ]

## divmod
Take two (non complex) numbers as arguments and return a pair of numbers consisting of their quotient and remainder when using integer division.
```javascript
import { divmod } from '@ouroboros/tools';
let l;

// l = [11, 1]
l = divmod(100, 9);

// l = [24, 3]
l = divmod(123, 5)
```

[ [functions](#functions) ]

## empty
Returns true if the value is "empty" for its type. Similar to how Python checks for False in dicts, lists, and strs.
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

[ [functions](#functions) ]

## isDecimal
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

[ [functions](#functions) ]

## isInteger
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

[ [functions](#functions) ]

## isNumeric
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

[ [functions](#functions) ]

## isObject
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

[ [functions](#functions) ]

## join
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

[ [functions](#functions) ]

## latitudeToDegrees
Returns the string representation of a latitude from a decimal/float value
```javascript
import { latitudeToDegrees } from '@ouroboros/tools';

// N45° 30' 32.00"
latitudeToDegrees(45.508888);

// Nord45° 30' 32.00"
latitudeToDegrees(45.508888, [ 'Nord', 'Sud' ]);
```

[ [functions](#functions) ]

## longitudeToDegrees
Returns the string representation of a longitude from a decimal/float value
```javascript
import { longitudeToDegrees } from '@ouroboros/tools';

// W45° 30' 32.00"
longitudeToDegrees(-73.561668);

// O45° 30' 32.00"
longitudeToDegrees(-73.561668, [ 'E', 'O' ]);
```

[ [functions](#functions) ]

## max
Returns the maximum (largest) value in an array.
```javascript
import { max } from '@ouroboros/tools';

// 3
max([2, 3, 1]);

// Zebra
max(['Lion', 'Alligator', 'Zebra']);
```

[ [functions](#functions) ]

## merge
Merges the keys from the second object into the first.
```javascript
import { merge } from '@ouroboros/tools';

let a = {one: 1, two: 3};
let b = {three: 3};

// a = {one: 1, two: 2, three: 3}
merge(a, b);
```

[ [functions](#functions) ]

## min
Returns the minimum (smallest) value in an array
```javascript
import { min } from '@ouroboros/tools';

// 1
max([2, 3, 1]);

// Alligator
max(['Lion', 'Alligator', 'Zebra']);
```

[ [functions](#functions) ]

## nicePhone
Returns a more easily readable phone number in the NA format.
```javascript
import { nicePhone } from '@ouroboros/tools';

// +1 (555) 123-4444
nicePhone('15551234444');

// +1 (800) 555-1234
nicePhone('8005551234');
```

[ [functions](#functions) ]

## normalize
Returns, as well as possible, a normalized string converted from another string containing characters with special accents. It does this by finding special characters and converting them into their simpler, single character, versions. This is useful for things like automaticlaly generating urls, or for generating from unicode into ascii.
```javascript
import { normalize } from '@ouroboros/tools';

// 'Hello, World!'
normalize('Ȟěƚľỡ, Ẉợɽḷᶁ!');

// 'ffiDAEij'
normalize('ﬃǲǼĳ');
```

[ [functions](#functions) ]

## objectArrayToObject
Turns an Array of Objects with set key names into an object built of two spefici keys.
```javascript
import { objectArrayToObject } from '@ouroboros/tools';

const a = [
    { a: 'first_a', b: 'first_b', c: 'first_c' },
    { a: 'second_a', b: 'second_b', c: 'second_c' },
    { a: 'third_a', b: 'third_b', c: 'third_c' }
];

// {first_a: 'first_b', second_a: 'second_b', third_a: 'third_b'}
objectArrayToObject(a, 'a', 'b');

// {first_a: 'first_c', second_a: 'second_c', third_a: 'third_c'}
objectArrayToObject(a, 'a', 'c');

// {first_c: 'first_b', second_c: 'second_b', third_c: 'third_b'}
objectArrayToObject(a, 'c', 'b');
```

[ [functions](#functions) ]

## omap
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
    return `${k}:${v}`;
});
```

[ [functions](#functions) ]

## opop
Removes an element from an object by name, then returns it.
```javascript
import { opop } from '@ouroboros/tools';

const o = {one: 1, two: 2, three: 3};

// o = {one: 1, three: 3}
// i = 2
const i = opop(o, 'two');
```

[ [functions](#functions) ]

## owithout
Takes an object and removes the given key(s) from it and returns a copy of it
```javascript
import { owithout } from '@ouroboros/tools';

const o1 = {'one': 1, 'two': 2, 'three': 3}

// {'one': 1, 'two': 2}
owithout(o1, 'three');

// {'two': 2}
owithout(o1, ['one', 'three']);
```

[ [functions](#functions) ]

## parseQuery
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

[ [functions](#functions) ]

## pathToTree
Turns a array containing arrays of paths and values, and converts them to a tree
```javascript
import { pathToTree } from '@ouroboros/tools';

// { address: { line_one: 'missing',
//              postal_code: 'invalid' },
//   title: 'missing' }
pathToTree([['address.line_one', 'missing'],
            ['address.postal_code', 'invalid'],
            ['title', 'missing']
]);
```

[ [functions](#functions) ]

## random
Generates random strings
```javascript
import { random } from '@ouroboros/tools';

// 'YBHhTfsy'
random(8)

// Generate a 4 character string from 'abcd', allow duplicates
// 'ccdb'
random(4, 'abcd')

// Generate a 4 character string from 'abcd', don't allow duplicates
// 'cdab'
random(4, 'abcd', false);

// Throws Error, not enough available characters
random(10, '01234567', false);
```
`random` also has predefined sets of characters which can be used

    0x    0123456789abcdef
    0     01234567
    10    0123456789
    az    abcdefghijklmnopqrstuvwxyz
    az*   abcdefghijkmnopqrstuvwxyz
    AZ    ABCDEFGHIJKLMNOPQRSTUVWXYZ
    AZ*   ABCDEFGHJKLMNPQRSTUVWXYZ
    aZ    abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ
    aZ*   abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ
    !     !@#$%^&*-_+.?
    !*    !@$%^*-_.

```javascript
// Use hexedecimal characters
// '961f37208cae'
random(12, ['0x'])

// Use all letters, lower and upper case, and decimal numbers
// 'TP8KEFTvlgqTnxK1CVi1'
random(20, ['aZ', '10'])

// Use special characters, and hexedecimal characters
// '!c66c_&b'
random(8, ['!', '0x'])

// Use special characters, and hexedecimal characters, no duplicates
// '*.c#ab46'
random(8, ['!', '0x'], false)
```

[ [functions](#functions) ]

## sortByKey
Returns a callback function that will compare two objects by the key name. Useful for sorting arrays of objects using sort
```javascript
import { sortByKey } from '@ouroboros/tools';

let people = [
    {first: 'Chris', last: 'Nasr'},
    {first: 'Brendan', last: 'Eich'},
    {first: 'Guido', last: 'van Rossum'}
];

// people = [
//   { first: 'Brendan', last: 'Eich' },
//   { first: 'Chris', last: 'Nasr' },
//   { first: 'Guido', last: 'van Rossum' }
// ]
people.sort(sortByKey('first'));
```

[ [functions](#functions) ]

## ucfirst
Makes the first character of each word in the text upper case.
```javascript
import { ucfirst } from '@ouroboros/tools';

// Hello, World!
ucfirst('hello, world!');

// Hello, World!
ucfirst('HELLO, WORLD!');
```

[ [functions](#functions) ]

## uuidAddDashes
Takes a UUID string in which the dash character has been stripped out, and adds the dashes back in the proper location.
```javascript
import { uuidAddDashes } from '@ouroboros/tools';

// d23de65e-bbdd-11ef-8f05-8f48b9c7b948
uuidAddDashes('d23de65ebbdd11ef8f058f48b9c7b948');
```

[ [functions](#functions) ]

## uuidStripDashes
Takes a UUID string and strips out the dash characters to make it shorter / smaller.
```javascript
import { uuidStripDashes } from '@ouroboros/tools';

// d23de65ebbdd11ef8f058f48b9c7b948
uuidStripDashes('d23de65e-bbdd-11ef-8f05-8f48b9c7b948');
```

[ [functions](#functions) ]