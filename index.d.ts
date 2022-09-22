/**
 * Tools
 *
 * Useful functions that belong to any specific module
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @copyright Ouroboros Coding Inc.
 * @created 2018-11-25
 */
/**
 * Array Find Index
 *
 * Finds a specific object in an array based on key name and value and
 * returns its index
 *
 * @name afindi
 * @access public
 * @param {array} a	The value to look through
 * @param {string} k The name of the key to check
 * @param {any} v The value to check against
 * @return number
 */
export declare function afindi(a: Record<string, any>[], k: string, v: any): number;
/**
 * Array Find Object
 *
 * Finds a specific object in an array based on key name and value and
 * returns it
 *
 * @name afindo
 * @access public
 * @param {array} a The value to look through
 * @param {string} k The name of the key to check
 * @param {any} v The value to check against
 * @return object
 */
export declare function afindo(a: Record<string, any>[], k: string, v: any): Record<string, any> | null;
/**
 * Array Shift
 *
 * Shifts an item in an array from one index to another
 *
 * @name ashift
 * @access public
 * @param {array} arr The array to shift the item in
 * @param {number} from The current location of the item
 * @param {number} to The new location of the item
 * @returns void
 */
export declare function ashift(arr: any[], from: number, to: number): void;
/**
 * Bytes Human
 *
 * Returns the size of bytes in the closest binary prefix so that they are
 * clearly understood by humans
 *
 * @name bytesHuman
 * @access public
 * @param {number} num The value in bytes to convert to human readable
 * @returns string
 */
export declare function bytesHuman(num: number): string;
/**
 * Clone
 *
 * Deep clone any type of object, returning a new one
 *
 * @name clone
 * @access public
 * @param {any} o The variable to clone
 * @return any
 */
export declare function clone(o: any): any;
/**
 * Combine
 *
 * Combines two objects into a new one and returns it. If there are any
 * duplicate keys, those in "a" are overwritten by those in "b"
 *
 * @name combine
 * @access public
 * @param {object} a An object to be combined with b
 * @param {object} b An object to be combined with a
 * @return object
 */
export declare function combine(a: Record<string, any>, b: Record<string, any>): Record<string, any>;
/**
 * Compare
 *
 * Compares two values of any type to see if they contain the same
 * data or not
 *
 * @name compare
 * @access public
 * @param {any} v1				The first value
 * @param {any} v2				The second value
 * @return boolean
 */
export declare function compare(v1: any, v2: any): boolean;
/**
 * Divmod
 *
 * Take two (non complex) numbers as arguments and return a pair of numbers
 * consisting of their quotient and remainder when using integer division. 100%
 * stolen from python
 *
 * @name divmod
 * @access public
 * @param {number} x The dividend
 * @param {number} y The divisor
 * @return Array
 */
export declare function divmod(x: number, y: number): [number, number];
/**
 * Empty
 *
 * Returns true if the value type is empty
 *
 * @name empty
 * @access public
 * @param {any} m The value to check, can be object, array, string, etc
 * @return boolean
 */
export declare function empty(m: any): boolean;
/**
 * Is Decimal
 *
 * Returns true if the variable is a number
 *
 * @name isDecimal
 * @access public
 * @param {any} m The variable to test
 * @return boolean
 */
export declare function isDecimal(m: any): boolean;
/**
 * Is Integer
 *
 * Returns true if the variable is a true integer
 *
 * @name isInteger
 * @access public
 * @param {any} m The variable to test
 * @return boolean
 */
export declare function isInteger(m: any): boolean;
/**
 * Is Numeric
 *
 * Returns true if a string is made up only of digits
 *
 * @name isNumeric
 * @access public
 * @param {string} s The string to check
 * @returns boolean
 */
export declare function isNumeric(s: string): boolean;
/**
 * Is Object
 *
 * Returns true if the variable is a true object
 *
 * @name isObject
 * @access public
 * @param {any} m The variable to test
 * @return boolean
 */
export declare function isObject(m: any): boolean;
/**
 * Join
 *
 * Creates a single string from a list of members that may or may not exist in
 * the passed object
 *
 * @name join
 * @access public
 * @param {object} o The object to pull members from
 * @param {array} l The list of members, in order, to join together
 * @param {string} separator Optional char/string to join with, defaults to space
 * @returns string
 */
export declare function join(o: Record<string, any>, l: string[], separator?: string): string;
/**
 * Max
 *
 * Returns the maximum (largest) value in an array
 *
 * @name max
 * @access public
 * @param {array} a The array to find the largest value in
 * @returns any
 */
export declare function max(a: string[] | number[]): any;
/**
 * Merge
 *
 * Merges the keys from the second object into the first
 *
 * @name merge
 * @access public
 * @param {object} a The object to merge with b
 * @param {object} b The object to merge with a
 * @returns void
 */
export declare function merge(a: Record<string, any>, b: Record<string, any>): void;
/**
 * Min
 *
 * Returns the minimum (smallest) value in an array
 *
 * @name min
 * @access public
 * @param {array} a The array to find the largest value in
 * @returns any
 */
export declare function min(a: string[] | number[]): any;
/**
 * Nice Phone
 *
 * Returns a more easily readable phone number in the NA format
 *
 * @name nicePhone
 * @access public
 * @param {string} val The digits of the phone number to convert
 * @return string
 */
export declare function nicePhone(val: string): string;
/**
 * Object Map
 *
 * Works like map for arrays, but iterates over an object returning the value,
 * the key, and the index, in that order.
 *
 * @name omap
 * @access public
 * @param {object} o The object to map
 * @param {function} callback The function to call each iteration
 * @return array
 */
export declare function omap(o: Record<string, any>, callback: (v: any, k: string, i: number) => {}): any[];
/**
 * Object Pop
 *
 * Removes an element from an object by name, then returns it
 *
 * @name opop
 * @access public
 * @param {object} o The object to pop from
 * @param {string} name The name of the value to pop
 * @return any
 */
export declare function opop(o: Record<string, any>, name: string): any;
/**
 * Parse Query
 *
 * Turns a query string into an object
 *
 * @name parseQuery
 * @access public
 * @param {string} query The query string to parse
 * @returns object
 */
export declare function parseQuery(query: string): Record<string, any>;
/**
 * Sort By Key
 *
 * Returns a callback function that will compare two objects by the key name
 * pass
 *
 * @name sortByKey
 * @access public
 * @param {string} key The name of the key to sort by
 * @return function
 */
export declare function sortByKey(key: string): (a: Record<string, any>, b: Record<string, any>) => {};
/**
 * UCFirst
 *
 * Makes the first character of each word in the text upper case
 *
 * @name ucfirst
 * @access public
 * @param {string} text The text to convert
 * @return string
 */
export declare function ucfirst(text: string): string;
