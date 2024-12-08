/**
 * Tools
 *
 * Useful functions that belong to any specific module
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @copyright Ouroboros Coding Inc.
 * @created 2018-11-25
 */

// Ouroboros modules
import clone from '@ouroboros/clone';

// Regex
const _reNumeric: RegExp = /^\d+$/;
const _rePhone: RegExp = /^\+?1?(\d{3})(\d{3})(\d{4})$/
const _reQueryPart: RegExp = /([^=&]+)=?([^&]*)/g
const _reQueryName: RegExp = /^([a-zA-Z_][0-9a-zA-Z_]*)(\[([0-9a-zA-Z_]*)\])?$/

/**
 * Array Find Index
 *
 * Finds a specific object in an array based on key name and value and
 * returns its index
 *
 * @name afindi
 * @access public
 * @param a	The value to look through
 * @param k The name of the key to check
 * @param v The value to check against
 * @returns The index found, or -1
 */
export function afindi(a: Record<string, any>[], k: string | number, v: any): number {
	for(let i: number = 0; i < a.length; ++i) {
		if(a[i][k] === v) {
			return i;
		}
	}
	return -1;
}

/**
 * Array Find Object
 *
 * Finds a specific object in an array based on key name and value and
 * returns it
 *
 * @name afindo
 * @access public
 * @param a The value to look through
 * @param k The name of the key to check
 * @param v The value to check against
 * @returns The object found, or null
 */
export function afindo(a: Record<string, any>[], k: string | number, v: any): Record<string, any> | null {
	for(const o of a) {
		if(o[k] === v) {
			return o;
		}
	}
	return null;
}

/**
 * Array Find Delete
 *
 * Finds a specific object in an array based on key name and value and then
 * deletes the object from the array
 *
 * If returnClone is set to true, a new copy of the passed array is returned if
 * the record is found and deleted, else the same array passed is returned with
 * no change
 *
 * @name arrayFindDelete
 * @access public
 * @param a	The value to look through
 * @param k The name of the key to check
 * @param v The value to check against
 * @param returnClone If set to true, a clone of `a`, or `a`, is returned
 * 						in place of true or false
 * @returns boolean | Array
 */
export function arrayFindDelete(a: Record<string, any>[], k: string | number, v: any, returnClone?: boolean): boolean | Record<string, any>[] {

	// First, find the record
	const i = afindi(a, k, v);

	// If the record isn't found
	if(i === -1) {
		return returnClone ? a : false;
	}

	// If we want to clone it
	if(returnClone) {
		const l = clone(a);
		l.splice(i, 1);
		return l;
	}

	// Else, update it in place and return success
	a.splice(i, 1);
	return true;
}

/**
 * Array Find Merge
 *
 * Finds a specific object in an array based on key name and value and then
 * merges the new data with the existing data
 *
 * If returnClone is set to true, a new copy of the passed array is returned if
 * the record is found and merged, else the same array passed is returned with
 * no change
 *
 * @name arrayFindMerge
 * @access public
 * @param a	The value to look through
 * @param k The name of the key to check
 * @param v The value to check against
 * @param d The data to put on top of the existing data
 * @param returnClone If set to true, a clone of `a`, or `a`, is returned
 * 						in place of true or false
 * @returns boolean | Array
 */
export function arrayFindMerge(a: Record<string, any>[], k: string | number, v: any, d: Record<string, any>, returnClone?: boolean): boolean | Record<string, any>[] {

	// First, find the record
	const i = afindi(a, k, v);

	// If the record isn't found
	if(i === -1) {
		return returnClone ? a : false;
	}

	// If we want to clone it
	if(returnClone) {
		const l = clone(a);
		l[i] = {...l[i], ...d};
		return l;
	}

	// Else, update it in place and return success
	a[i] = {...a[i], ...d};
	return true;
}

/**
 * Array Find Overwrite
 *
 * Finds a specific object in an array based on key name and value and then
 * overwrites the existing data with the new data
 *
 * If returnClone is set to true, a new copy of the passed array is returned if
 * the record is found and merged, else the same array passed is returned with
 * no change
 *
 * @name arrayFindOverwrite
 * @access public
 * @param a	The value to look through
 * @param k The name of the key to check
 * @param v The value to check against
 * @param d The data to put on top of the existing data
 * @param returnClone If set to true, a clone of `a`, or `a`, is returned
 * 						in place of true or false
 * @returns boolean | Array
 */
export function arrayFindOverwrite(a: Record<string, any>[], k: string | number, v: any, d: Record<string, any>, returnClone?: boolean): boolean | Record<string, any>[] {

	// First, find the record
	const i = afindi(a, k, v);

	// If the record isn't found
	if(i === -1) {
		return returnClone ? a : false;
	}

	// If we want to clone it
	if(returnClone) {
		const l = clone(a);
		l[i] = d;
		return l;
	}

	// Else, update it in place and return success
	a[i] = d;
	return true;
}

/**
 * Array Shift
 *
 * Shifts an item in an array from one index to another
 *
 * @name ashift
 * @access public
 * @param arr The array to shift the item in
 * @param from The current location of the item
 * @param to The new location of the item
 */
export function ashift(arr: any[], from: number, to: number): void {
	if(from >= 0 && from < arr.length) {
		const [item] = arr.splice(from, 1);
		arr.splice(to, 0, item);
	}
}

/**
 * Bytes Human
 *
 * Returns the size of bytes in the closest binary prefix so that they are
 * clearly understood by humans
 *
 * @name bytesHuman
 * @access public
 * @param num The value in bytes to convert to human readable
 * @returns The string representation of the bytes
 */
export function bytesHuman(num: number): string {
	for(const unit of ['','Ki','Mi','Gi','Ti','Pi','Ei','Zi']) {
		if(Math.abs(num) < 1024.0) {
			return `${num.toFixed(1)}${unit}B`
		}
		num /= 1024.0
	}
	return `${num.toFixed(1)}YiB`;
}

/**
 * Combine
 *
 * Combines two objects into a new one and returns it. If there are any
 * duplicate keys, those in "a" are overwritten by those in "b"
 *
 * @name combine
 * @access public
 * @param a An object to be combined with b
 * @param b An object to be combined with a
 * @returns A new object of a and b
 */
export function combine(a: Record<string, any>, b: Record<string, any>): Record<string, any> {

	// Copy the first object
	const o = clone(a);

	// Get each key of the second dict
	for(const k in b) {

		// If the value is another dict and it exists in first as well
		if(isObject(b[k]) && k in o && isObject(o[k])) {

			// Call merge because we are passing the new cloned object and
			//	don't need to create another one
			merge(o[k], b[k]);
		}

		// Else, we overwrite the value as is
		else {
			o[k] = b[k];
		}
	}

	// Return the new object
	return o;
}

/**
 * Compare
 *
 * Compares two values of any type to see if they contain the same
 * data or not
 *
 * @name compare
 * @access public
 * @param a The first value
 * @param b The second value
 * @returns true if the same, otherwise false
 */
export function compare(a: any, b: any): boolean {

	// If they're both arrays
	if(Array.isArray(a) && Array.isArray(b)) {

		// If they don't have the same length
		if(a.length !== b.length) {
			return false;
		}

		// Compare the values
		for(let i = 0; i < a.length; ++i) {
			if(!compare(a[i], b[i])) {
				return false;
			}
		}
	}

	// Else if they're both objects
	else if(isObject(a) && isObject(b)) {

		// If they don't have the same keys
		if(!compare(Object.keys(a).sort(), Object.keys(b).sort())) {
			return false;
		}

		// Compare each key
		for(const k in a) {
			if(!compare(a[k], b[k])) {
				return false;
			}
		}
	}

	// Else, compare as is
	else {
		if(a !== b) {
			return false;
		}
	}

	// Return equal
	return true;
}

/**
 * Divmod
 *
 * Take two (non complex) numbers as arguments and return a pair of numbers
 * consisting of their quotient and remainder when using integer division. 100%
 * stolen from python
 *
 * @name divmod
 * @access public
 * @param x The dividend
 * @param y The divisor
 * @returns an array of quotient (0) and remainder (1)
 */
export function divmod(x: number, y: number): [number, number] {
	/* tslint:disable:no-bitwise */
	return [
		~~(x / y),
		x % y
	]
	/* tslint:enable:no-bitwise */
}

/**
 * Empty
 *
 * Returns true if the value type is empty. Works similar to how python tests
 * for False in objects and arrays, including strings.
 *
 * @name empty
 * @access public
 * @param m The value to check, can be object, array, string, etc
 * @returns true if empty
 */
export function empty(m: any): boolean {

	// If it's an object
	if(isObject(m)) {
		for(const p of Object.keys(m)) {
			return false;
		}
		return true;
	}

	// Else if it's an array or a string
	else if(Array.isArray(m) || typeof m === 'string') {
		return m.length === 0;
	}

	// Else
	else {

		// If it's null or undefined
		if(typeof m === 'undefined' || m === null) {
			return true;
		}

		// Else return false
		return false;
	}
}

/**
 * Is Decimal
 *
 * Returns true if the variable is a number
 *
 * @name isDecimal
 * @access public
 * @param m The variable to test
 * @returns true if decimal
 */
export function isDecimal(m: any): boolean {
	return typeof m === 'number';
}

/**
 * Is Integer
 *
 * Returns true if the variable is a true integer
 *
 * @name isInteger
 * @access public
 * @param m The variable to test
 * @returns true if integer
 */
export function isInteger(m: any): boolean {
	/* tslint:disable:no-bitwise */
	return m === +m && m === (m|0);
	/* tslint:enable:no-bitwise */
}

/**
 * Is Numeric
 *
 * Returns true if a string is made up only of digits
 *
 * @name isNumeric
 * @access public
 * @param s The string to check
 * @returns true if numeric
 */
export function isNumeric(s: string): boolean {

	// Get the type of the argument
	const sType = typeof s;

	// If we have a string
	if(sType === 'string') {
		return _reNumeric.exec(s) ? true : false;
	}

	// If we got a number
	else if(sType === 'number') {
		return true;
	}

	// Else
	else {
		return false;
	}
}

/**
 * Is Object
 *
 * Returns true if the variable is a true object
 *
 * @name isObject
 * @access public
 * @param m The variable to test
 * @returns true if object
 */
export function isObject(m: any): boolean {

	// If it's null, it's not an object
	if(m === null) {
		return false;
	}

	// If the type is not an object
	if(typeof m !== 'object') {
		return false;
	}

	// Return based on the constructor name
	return (m.constructor && m.constructor.name === 'Object');
}

/**
 * Join
 *
 * Creates a single string from a list of members that may or may not exist in
 * the passed object
 *
 * @name join
 * @access public
 * @param o The object to pull members from
 * @param l The list of members, in order, to join together
 * @param separator Optional char/string to join with, defaults to space
 * @returns The joined string
 */
export function join(o: Record<string, any>, l: string[], separator: string=' ') {

	// Init the array of found members
	const lFound: any[] = [];

	// Go through each member passed
	for(const s of l) {

		// If it exists
		if(s in o) {
			lFound.push(o[s]);
		}
	}

	// Join and return
	return lFound.join(separator);
}

/**
 * Max
 *
 * Returns the maximum (largest) value in an array
 *
 * @name max
 * @access public
 * @param a The array to find the largest value in
 * @returns the largest value
 */
export function max(a: string[] | number[]): string | number | null {

	// If we didn't get an array
	if(!Array.isArray(a)) {
		throw new Error('max() must be passed an Array');
	}

	// If we have no values
	if(a.length === 0) {
		return null;
	}

	// Get the type of the first element, we will assume all others are the
	//	same
	const sType: string = typeof a[0];

	// If we got a number, use Math library
	if(sType === 'number') {
		return Math.max(...(a as number[]));
	}

	// If we got a string
	else if(sType === 'string') {

		// Start with the first value
		let sRet: string = (a as unknown as string)[0];

		// Go through each element after the first
		for(let i = 1; i < a.length; ++i) {
			if((a[i] as string).normalize('NFD') > sRet.normalize('NFD')) {
				sRet = a[i] as string;
			}
		}

		// Return whatever ended up being largest
		return sRet;
	}

	// Invalid type
	else {
		throw new Error('max requires an array of numbers or strings');
	}
}

/**
 * Merge
 *
 * Merges the keys from the second object into the first
 *
 * @name merge
 * @access public
 * @param a The object to merge with b
 * @param b The object to merge with a
 */
export function merge(a: Record<string, any>, b: Record<string, any>): void {

	// Get each key of the second dict
	for(const k in b) {

		// If the value is another dict and it exists in first as well
		if(isObject(b[k]) && k in a && isObject(a[k])) {

			// Call merge on the children
			merge(a[k], b[k]);
		}

		// Else, we overwrite the value as is
		else {
			a[k] = b[k];
		}
	}
}

/**
 * Min
 *
 * Returns the minimum (smallest) value in an array
 *
 * @name min
 * @access public
 * @param a The array to find the largest value in
 * @returns the smallest value
 */
export function min(a: string[] | number[]): string | number | null {

	// If we didn't get an array
	if(!Array.isArray(a)) {
		throw new Error('min() must be passed an Array');
	}

	// If we have no values
	if(a.length === 0) {
		return null;
	}

	// Get the type of the first element, we will assume all others are the
	//	same
	const sType = typeof a[0];

	// If we got a number, use Math library
	if(sType === 'number') {
		return Math.min(a as unknown as number);
	}

	// If we got a string
	else if(sType === 'string') {

		// Start with the first value
		let sRet: string = a[0] as string;

		// Go through each element after the first
		for(let i = 1; i < a.length; ++i) {
			if((a[i] as string).normalize('NFD') < sRet.normalize('NFD')) {
				sRet = a[i] as string;
			}
		}

		// Return whatever ended up being smallest
		return sRet;
	}

	// Invalid type
	else {
		throw new Error('min requires an array of numbers or strings');
	}
}

/**
 * Nice Phone
 *
 * Returns a more easily readable phone number in the NA format
 *
 * @name nicePhone
 * @access public
 * @param val The digits of the phone number to convert
 * @returns the phone number
 */
export function nicePhone(val: string): string {
	const lMatch = _rePhone.exec(val);
	if(!lMatch) {
		return val;
	}
	return '+1 (' + lMatch[1] + ') ' + lMatch[2] + '-' + lMatch[3];
}

const _oNormalizeTable: Record<string, string> = {
	"Ъ": "'", "ъ": "'", "Ь": "'", "ь": "'",

	"Á": "A", "Ă": "A", "Ắ": "A", "Ặ": "A", "Ằ": "A", "Ẳ": "A", "Ẵ": "A",
	"Ǎ": "A", "Â": "A", "Ấ": "A", "Ậ": "A", "Ầ": "A", "Ẩ": "A", "Ẫ": "A",
	"Ä": "A", "Ǟ": "A", "Ȧ": "A", "Ǡ": "A", "Ạ": "A", "Ȁ": "A", "À": "A",
	"Ả": "A", "Ȃ": "A", "Ā": "A", "Ą": "A", "Å": "A", "Ǻ": "A", "Ḁ": "A",
	"Ⱥ": "A", "Ã": "A", "Ɐ": "A", "ᴀ": "A",
	 "á": "a", "ă": "a", "ắ": "a", "ặ": "a", "ằ": "a", "ẳ": "a", "ẵ": "a",
	 "ǎ": "a", "â": "a", "ấ": "a", "ậ": "a", "ầ": "a", "ẩ": "a", "ẫ": "a",
	 "ä": "a", "ǟ": "a", "ȧ": "a", "ǡ": "a", "ạ": "a", "ȁ": "a", "à": "a",
	 "ả": "a", "ȃ": "a", "ā": "a", "ą": "a", "ᶏ": "a", "ẚ": "a", "å": "a",
	 "ǻ": "a", "ḁ": "a", "ⱥ": "a", "ã": "a", "ɐ": "a", "ₐ": "a", "А": "a",
	 "а": "a",

	"Ꜳ": "AA", "Æ": "AE", "Ǽ": "AE", "Ǣ": "AE", "ᴁ": "AE", "Ꜵ": "AO",
	"Ꜷ": "AU", "Ꜹ": "AV", "Ꜻ": "AV", "Ꜽ": "AY",
	"ꜳ": "aa", "æ": "ae", "ǽ": "ae", "ǣ": "ae", "ᴂ": "ae", "ꜵ": "ao",
	"ꜷ": "au", "ꜹ": "av", "ꜻ": "av", "ꜽ": "ay",

	"Ḃ": "B", "Ḅ": "B", "Ɓ": "B", "Ḇ": "B", "Ƀ": "B", "Ƃ": "B", "ʙ": "B",
	"ᴃ": "B", "Б": "B",
	"ḃ": "b", "ḅ": "b", "ɓ": "b", "ḇ": "b", "ᵬ": "b", "ᶀ": "b", "ƀ": "b",
	"ƃ": "b", "б": "b",

	"Ć": "C", "Č": "C", "Ç": "C", "Ḉ": "C", "Ĉ": "C", "Ċ": "C", "Ƈ": "C",
	"Ȼ": "C", "Ꜿ": "C", "ᴄ": "C",
	"ć": "c", "č": "c", "ç": "c", "ḉ": "c", "ĉ": "c", "ɕ": "c", "ċ": "c",
	"ƈ": "c", "ȼ": "c", "ↄ": "c", "ꜿ": "c",

	"Ч": "CH",
	"ч": "ch",

	"Ď": "D", "Ḑ": "D", "Ḓ": "D", "Ḋ": "D", "Ḍ": "D", "Ɗ": "D", "Ḏ": "D",
	"ǲ": "D", "ǅ": "D", "Đ": "D", "Ƌ": "D", "Ꝺ": "D", "ᴅ": "D", "Д": "D",
	"ď": "d", "ḑ": "d", "ḓ": "d", "ȡ": "d", "ḋ": "d", "ḍ": "d", "ɗ": "d",
	"ᶑ": "d", "ḏ": "d", "ᵭ": "d", "ᶁ": "d", "đ": "d", "ɖ": "d", "ƌ": "d",
	"ꝺ": "d", "д": "d",

	"Ǳ": "DZ", "Ǆ": "DZ",
	"ǳ": "dz", "ǆ": "dz",

	"É": "E", "Ĕ": "E", "Ě": "E", "Ȩ": "E", "Ḝ": "E", "Ê": "E", "Ế": "E",
	"Ệ": "E", "Ề": "E", "Ể": "E", "Ễ": "E", "Ḙ": "E", "Ë": "E", "Ė": "E",
	"Ẹ": "E", "Ȅ": "E", "È": "E", "Ẻ": "E", "Ȇ": "E", "Ē": "E", "Ḗ": "E",
	"Ḕ": "E", "Ę": "E", "Ɇ": "E", "Ẽ": "E", "Ḛ": "E", "Ɛ": "E", "Ǝ": "E",
	"ᴇ": "E", "ⱻ": "E", "Е": "E", "Э": "E",
	"é": "e", "ĕ": "e", "ě": "e", "ȩ": "e", "ḝ": "e", "ê": "e", "ế": "e",
	"ệ": "e", "ề": "e", "ể": "e", "ễ": "e", "ḙ": "e", "ë": "e", "ė": "e",
	"ẹ": "e", "ȅ": "e", "è": "e", "ẻ": "e", "ȇ": "e", "ē": "e", "ḗ": "e",
	"ḕ": "e", "ⱸ": "e", "ę": "e", "ᶒ": "e", "ɇ": "e", "ẽ": "e", "ḛ": "e",
	"ɛ": "e", "ᶓ": "e", "ɘ": "e", "ǝ": "e", "ₑ": "e", "е": "e", "э": "e",

	"Ꝫ": "ET",
	"ꝫ": "et",

	"Ḟ": "F", "Ƒ": "F", "Ꝼ": "F", "ꜰ": "F", "Ф": "F",
	"ḟ": "f", "ƒ": "f", "ᵮ": "f", "ᶂ": "f", "ꝼ": "f", "ф": "f",

	"ﬀ": "ff", "ﬃ": "ffi", "ﬄ": "ffl", "ﬁ": "fi", "ﬂ": "fl",

	"Ǵ": "G", "Ğ": "G", "Ǧ": "G", "Ģ": "G", "Ĝ": "G", "Ġ": "G", "Ɠ": "G",
	"Ḡ": "G", "Ǥ": "G", "Ᵹ": "G", "ɢ": "G", "ʛ": "G", "Г": "G",
	"ǵ": "g", "ğ": "g", "ǧ": "g", "ģ": "g", "ĝ": "g", "ġ": "g", "ɠ": "g",
	"ḡ": "g", "ᶃ": "g", "ǥ": "g", "ᵹ": "g", "ɡ": "g", "ᵷ": "g", "г": "g",

	"Ḫ": "H", "Ȟ": "H", "Ḩ": "H", "Ĥ": "H", "Ⱨ": "H", "Ḧ": "H", "Ḣ": "H",
	"Ḥ": "H", "Ħ": "H", "ʜ": "H", "Х": "H",
	"ḫ": "h", "ȟ": "h", "ḩ": "h", "ĥ": "h", "ⱨ": "h", "ḧ": "h", "ḣ": "h",
	"ḥ": "h", "ɦ": "h", "ẖ": "h", "ħ": "h", "ɥ": "h", "ʮ": "h", "ʯ": "h",
	"х": "h",

	"ƕ": "hv",

	"Í": "I", "Ĭ": "I", "Ǐ": "I", "Î": "I", "Ï": "I", "Ḯ": "I", "İ": "I",
	"Ị": "I", "Ȉ": "I", "Ì": "I", "Ỉ": "I", "Ȋ": "I", "Ī": "I", "Į": "I",
	"Ɨ": "I", "Ĩ": "I", "Ḭ": "I", "ɪ": "I", "Й": "I", "Ы": "I", "И": "I",
	"ı": "i", "í": "i", "ĭ": "i", "ǐ": "i", "î": "i", "ï": "i", "ḯ": "i",
	"ị": "i", "ȉ": "i", "ì": "i", "ỉ": "i", "ȋ": "i", "ī": "i", "į": "i",
	"ᶖ": "i", "ɨ": "i", "ĩ": "i", "ḭ": "i", "ᴉ": "i", "ᵢ": "i", "й": "i",
	"ы": "i", "и": "i",

	"Ĳ": "IJ", "Ꝭ": "IS",
	"ĳ": "ij", "ꝭ": "is",

	"Ĵ": "J", "Ɉ": "J", "ᴊ": "J",
	"ȷ": "j", "ɟ": "j", "ʄ": "j", "ǰ": "j", "ĵ": "j", "ʝ": "j", "ɉ": "j",
	"ⱼ": "j",

	"Ḱ": "K", "Ǩ": "K", "Ķ": "K", "Ⱪ": "K", "Ꝃ": "K", "Ḳ": "K", "Ƙ": "K",
	"Ḵ": "K", "Ꝁ": "K", "Ꝅ": "K", "ᴋ": "K", "К": "K",
	"ḱ": "k", "ǩ": "k", "ķ": "k", "ⱪ": "k", "ꝃ": "k", "ḳ": "k", "ƙ": "k",
	"ḵ": "k", "ᶄ": "k", "ꝁ": "k", "ꝅ": "k", "ʞ": "k", "к": "k",

	"Ĺ": "L", "Ƚ": "L", "Ľ": "L", "Ļ": "L", "Ḽ": "L", "Ḷ": "L", "Ḹ": "L",
	"Ⱡ": "L", "Ꝉ": "L", "Ḻ": "L", "Ŀ": "L", "Ɫ": "L", "ǈ": "L", "Ł": "L",
	"Ꞁ": "L", "ʟ": "L", "ᴌ": "L", "Л": "L",
	"ĺ": "l", "ƚ": "l", "ɬ": "l", "ľ": "l", "ļ": "l", "ḽ": "l", "ȴ": "l",
	"ḷ": "l", "ḹ": "l", "ⱡ": "l", "ꝉ": "l", "ḻ": "l", "ŀ": "l", "ɫ": "l",
	"ᶅ": "l", "ɭ": "l", "ł": "l", "ꞁ": "l", "л": "l",

	"Ǉ": "LJ",
	"ǉ": "lj",

	"Ḿ": "M", "Ṁ": "M", "Ṃ": "M", "Ɱ": "M", "Ɯ": "M", "ᴍ": "M", "М": "M",
	"ḿ": "m", "ṁ": "m", "ṃ": "m", "ɱ": "m", "ᵯ": "m", "ᶆ": "m", "ɯ": "m",
	"ɰ": "m", "м": "m",

	"Ń": "N", "Ň": "N", "Ņ": "N", "Ṋ": "N", "Ṅ": "N", "Ṇ": "N", "Ǹ": "N",
	"Ɲ": "N", "Ṉ": "N", "Ƞ": "N", "ǋ": "N", "Ñ": "N", "ɴ": "N", "ᴎ": "N",
	"Н": "N",
	"ń": "n", "ň": "n", "ņ": "n", "ṋ": "n", "ȵ": "n", "ṅ": "n", "ṇ": "n",
	"ǹ": "n", "ɲ": "n", "ṉ": "n", "ƞ": "n", "ᵰ": "n", "ᶇ": "n", "ɳ": "n",
	"ñ": "n", "н": "n",

	"Ǌ": "NJ",
	"ǌ": "nj",

	"Ó": "O", "Ŏ": "O", "Ǒ": "O", "Ô": "O", "Ố": "O", "Ộ": "O", "Ồ": "O",
	"Ổ": "O", "Ỗ": "O", "Ö": "O", "Ȫ": "O", "Ȯ": "O", "Ȱ": "O", "Ọ": "O",
	"Ő": "O", "Ȍ": "O", "Ò": "O", "Ỏ": "O", "Ơ": "O", "Ớ": "O", "Ợ": "O",
	"Ờ": "O", "Ở": "O", "Ỡ": "O", "Ȏ": "O", "Ꝋ": "O", "Ꝍ": "O", "Ō": "O",
	"Ṓ": "O", "Ṑ": "O", "Ɵ": "O", "Ǫ": "O", "Ǭ": "O", "Ø": "O", "Ǿ": "O",
	"Õ": "O", "Ṍ": "O", "Ṏ": "O", "Ȭ": "O", "Ɔ": "O", "ᴏ": "O", "ᴐ": "O",
	"О": "O",
	"ɵ": "o", "ó": "o", "ŏ": "o", "ǒ": "o", "ô": "o", "ố": "o", "ộ": "o",
	"ồ": "o", "ổ": "o", "ỗ": "o", "ö": "o", "ȫ": "o", "ȯ": "o", "ȱ": "o",
	"ọ": "o", "ő": "o", "ȍ": "o", "ò": "o", "ỏ": "o", "ơ": "o", "ớ": "o",
	"ợ": "o", "ờ": "o", "ở": "o", "ỡ": "o", "ȏ": "o", "ꝋ": "o", "ꝍ": "o",
	"ⱺ": "o", "ō": "o", "ṓ": "o", "ṑ": "o", "ǫ": "o", "ǭ": "o", "ø": "o",
	"ǿ": "o", "õ": "o", "ṍ": "o", "ṏ": "o", "ȭ": "o", "ɔ": "o", "ᶗ": "o",
	"ᴑ": "o", "ᴓ": "o", "ₒ": "o", "о": "o",

	"Œ": "OE", "ɶ": "OE", "Ƣ": "OI", "Ꝏ": "OO", "Ȣ": "OU", "ᴕ": "OU",
	"ᴔ": "oe", "œ": "oe", "ƣ": "oi", "ꝏ": "oo", "ȣ": "ou",

	"Ṕ": "P", "Ṗ": "P", "Ꝓ": "P", "Ƥ": "P", "Ꝕ": "P", "Ᵽ": "P", "Ꝑ": "P",
	"ᴘ": "P", "П": "P",
	"ṕ": "p", "ṗ": "p", "ꝓ": "p", "ƥ": "p", "ᵱ": "p", "ᶈ": "p", "ꝕ": "p",
	"ᵽ": "p", "ꝑ": "p", "п": "p",

	"Ꝙ": "Q", "Ꝗ": "Q",
	"ꝙ": "q", "ʠ": "q", "ɋ": "q", "ꝗ": "q",

	"Ꞃ": "R", "Ŕ": "R", "Ř": "R", "Ŗ": "R", "Ṙ": "R", "Ṛ": "R", "Ṝ": "R",
	"Ȑ": "R", "Ȓ": "R", "Ṟ": "R", "Ɍ": "R", "Ɽ": "R", "ʁ": "R", "ʀ": "R",
	"ᴙ": "R", "ᴚ": "R", "Р": "R",
	"ꞃ": "r", "ŕ": "r", "ř": "r", "ŗ": "r", "ṙ": "r", "ṛ": "r", "ṝ": "r",
	"ȑ": "r", "ɾ": "r", "ᵳ": "r", "ȓ": "r", "ṟ": "r", "ɼ": "r", "ᵲ": "r",
	"ᶉ": "r", "ɍ": "r", "ɽ": "r", "ɿ": "r", "ɹ": "r", "ɻ": "r", "ɺ": "r",
	"ⱹ": "r", "ᵣ": "r", "р": "r",

	"Ꞅ": "S", "Ś": "S", "Ṥ": "S", "Š": "S", "Ṧ": "S", "Ş": "S", "Ŝ": "S",
	"Ș": "S", "Ṡ": "S", "Ṣ": "S", "Ṩ": "S", "ꜱ": "S", "С": "S",
	"ꞅ": "s", "ſ": "s", "ẜ": "s", "ẛ": "s", "ẝ": "s", "ś": "s", "ṥ": "s",
	"š": "s", "ṧ": "s", "ş": "s", "ŝ": "s", "ș": "s", "ṡ": "s", "ṣ": "s",
	"ṩ": "s", "ʂ": "s", "ᵴ": "s", "ᶊ": "s", "ȿ": "s", "с": "s",

	"Щ": "SCH", "Ш": "SH",
	"щ": "sch", "ш": "sh", "ß": "ss", "ﬆ": "st",

	"Ꞇ": "T", "Ť": "T", "Ţ": "T", "Ṱ": "T", "Ț": "T", "Ⱦ": "T", "Ṫ": "T",
	"Ṭ": "T", "Ƭ": "T", "Ṯ": "T", "Ʈ": "T", "Ŧ": "T", "ᴛ": "T", "Т": "T",
	"ꞇ": "t", "ť": "t", "ţ": "t", "ṱ": "t", "ț": "t", "ȶ": "t", "ẗ": "t",
	"ⱦ": "t", "ṫ": "t", "ṭ": "t", "ƭ": "t", "ṯ": "t", "ᵵ": "t", "ƫ": "t",
	"ʈ": "t", "ŧ": "t", "ʇ": "t", "т": "t",

	"Ц": "TS", "Ꜩ": "TZ",
	"ᵺ": "th", "ц": "ts", "ꜩ": "tz",

	"Ú": "U", "Ŭ": "U", "Ǔ": "U", "Û": "U", "Ṷ": "U", "Ü": "U", "Ǘ": "U",
	"Ǚ": "U", "Ǜ": "U", "Ǖ": "U", "Ṳ": "U", "Ụ": "U", "Ű": "U", "Ȕ": "U",
	"Ù": "U", "Ủ": "U", "Ư": "U", "Ứ": "U", "Ự": "U", "Ừ": "U", "Ử": "U",
	"Ữ": "U", "Ȗ": "U", "Ū": "U", "Ṻ": "U", "Ų": "U", "Ů": "U", "Ũ": "U",
	"Ṹ": "U", "Ṵ": "U", "ᴜ": "U", "У": "U",
	"ᴝ": "u", "ú": "u", "ŭ": "u", "ǔ": "u", "û": "u", "ṷ": "u", "ü": "u",
	"ǘ": "u", "ǚ": "u", "ǜ": "u", "ǖ": "u", "ṳ": "u", "ụ": "u", "ű": "u",
	"ȕ": "u", "ù": "u", "ủ": "u", "ư": "u", "ứ": "u", "ự": "u", "ừ": "u",
	"ử": "u", "ữ": "u", "ȗ": "u", "ū": "u", "ṻ": "u", "ų": "u", "ᶙ": "u",
	"ů": "u", "ũ": "u", "ṹ": "u", "ṵ": "u", "ᵤ": "u", "у": "u",

	"ᵫ": "ue", "ꝸ": "um",

	"Ʌ": "V", "Ꝟ": "V", "Ṿ": "V", "Ʋ": "V", "Ṽ": "V", "ᴠ": "V", "В": "V",
	"ʌ": "v", "ⱴ": "v", "ꝟ": "v", "ṿ": "v", "ʋ": "v", "ᶌ": "v", "ⱱ": "v",
	"ṽ": "v", "ᵥ": "v", "в": "v",

	"Ꝡ": "VY",
	"ꝡ": "vy",

	"Ẃ": "W", "Ŵ": "W", "Ẅ": "W", "Ẇ": "W", "Ẉ": "W", "Ẁ": "W", "Ⱳ": "W",
	"ᴡ": "W",
	"ʍ": "w", "ẃ": "w", "ŵ": "w", "ẅ": "w", "ẇ": "w", "ẉ": "w", "ẁ": "w",
	"ⱳ": "w", "ẘ": "w",

	"Ẍ": "X", "Ẋ": "X",
	"ẍ": "x", "ẋ": "x", "ᶍ": "x", "ₓ": "x",

	"Ý": "Y", "Ŷ": "Y", "Ÿ": "Y", "Ẏ": "Y", "Ỵ": "Y", "Ỳ": "Y", "Ƴ": "Y",
	"Ỷ": "Y", "Ỿ": "Y", "Ȳ": "Y", "Ɏ": "Y", "Ỹ": "Y", "ʏ": "Y",
	"ʎ": "y", "ý": "y", "ŷ": "y", "ÿ": "y", "ẏ": "y", "ỵ": "y", "ỳ": "y",
	"ƴ": "y", "ỷ": "y", "ỿ": "y", "ȳ": "y", "ẙ": "y", "ɏ": "y", "ỹ": "y",

	"Ё": "YO", "Ю": "YU", "Я": "Ya",
	"я": "ya", "ё": "yo", "ю": "yu",

	"Ź": "Z", "Ž": "Z", "Ẑ": "Z", "Ⱬ": "Z", "Ż": "Z", "Ẓ": "Z", "Ȥ": "Z",
	"Ẕ": "Z", "Ƶ": "Z", "ᴢ": "Z", "З": "Z",
	"ź": "z", "ž": "z", "ẑ": "z", "ʑ": "z", "ⱬ": "z", "ż": "z", "ẓ": "z",
	"ȥ": "z", "ẕ": "z", "ᵶ": "z", "ᶎ": "z", "ʐ": "z", "ƶ": "z", "ɀ": "z",
	"з": "z",

	"Ж": "ZH",
	"ж": "zh"
}

/**
 * Normalize
 *
 * Replaces all special alpha characters with their ascii equivalent
 *
 * @name normalize
 * @access public
 * @param text The text to convert
 * @returns a new string
 */
export function normalize(text: string): string {
	const buff = [];
	let i = 0;
	let bFound = false;
	while(i < text.length) {
		bFound = false;
		for(const s in _oNormalizeTable) {
			if(text.substring(i, s.length + i) === s) {
				buff.push(_oNormalizeTable[s])
				i += s.length;
				bFound = true;
				break
			}
		}

		// If it's still not found
		if(!bFound) {
			buff.push(text[i])
			i += 1
		}
	}

	return buff.join('');
}

/**
 * Object Array to Object
 *
 * Generates a new Object using the values contained in each Object of the `a`
 * Array
 *
 * Example: [ { a: }]
 *
 * @param a The Array of Objects to step through
 * @param keyKey The key of `a` that will be the key in the return
 * @param valueKey The key of `a` that will be the value in the return
 * @returns A new object generated from the values in `a` using the keys
 */
export function objectArrayToObject(a: Record<string, any>[], keyKey: string, valueKey: string) {
	const o: Record<string, string> = {};
	a.map((l: Record<string, any>) => {
		o[String(l[keyKey])] = l[valueKey];
	});
	return o;
}

/**
 * Object Map
 *
 * Works like map for arrays, but iterates over an object returning the value,
 * the key, and the index, in that order.
 *
 * @name omap
 * @access public
 * @param o The object to map
 * @param callback The function to call each iteration
 * @returns a new array of each processed object
 */
export function omap(o: Record<string, any>, callback: (v: any, k: string, i: number) => {}): any[] {
	const ret: any[] = [];
	let index: number = 0;
	for(const k of Object.keys(o)) {
		ret.push(callback(o[k], k, index++));
	}
	return ret;
}

/**
 * Object Pop
 *
 * Removes an element from an object by name, then returns it
 *
 * @name opop
 * @access public
 * @param o The object to pop from
 * @param name The name of the value to pop
 * @returns the value in `name`
 */
export function opop(o: Record<string, any>, name: string): any {
	const m = clone(o[name]);
	delete o[name];
	return m;
}

/**
 * Object Without
 *
 * Takes an object and removes the given key(s) from it and returns a copy of it
 *
 * @name owithout
 * @param o The object to remove keys from
 * @param keys The key, or keys, to remove from the object
 * @returns a copy of the object without the keys
 */
export function owithout(o: Record<string, any>, keys: string | string[]): Record<string, any> {

	// Clone the object
	const ret = clone(o);

	// If we have a single string
	if(typeof keys === 'string') {
		delete ret[keys];
	}

	// Else, if we have multiple
	else if(Array.isArray(keys)) {
		for(const k of keys) {
			delete ret[k];
		}
	}

	// Return the new object
	return ret;

}

/**
 * Parse Query
 *
 * Turns a query string into an object
 *
 * @name parseQuery
 * @access public
 * @param query The query string to parse
 * @returns name/value pairs
 */
export function parseQuery(query: string): Record<string, any> {

	// Init the return value
	const oRet: Record<string, any> = {};

	// If there's anything in the string
	if(query.length > 1) {
		let lField: RegExpExecArray | null = null;

		// Go through each part found
		while(true) {
			lField = _reQueryPart.exec(query)
			if(lField === null) {
				break;
			}

			// Breakdown the name part
			const lName = _reQueryName.exec(lField[1]);

			// If we got no value, skip it
			if(!lName) {
				continue;
			}

			// If we got an array/object type
			if(lName[2]) {

				// If we don't have the name yet
				if(!(lName[1] in oRet)) {

					// If we have a key value
					if(lName[3]) {

						// If the key is a numerical representation
						if(isNumeric(lName[3])) {

							// Make an array and add the value to it at the
							//	given index
							oRet[lName[1]] = [];
							oRet[lName[1]][parseInt(lName[3], 10)] = decodeURIComponent(lField[2]);
						}

						// Else, it's a normal string
						else {

							// Make a new object
							oRet[lName[1]] = {
								[lName[3]]: decodeURIComponent(lField[2])
							}
						}
					}

					// Else, if it's an append, create a new array
					else {
						oRet[lName[1]] = [decodeURIComponent(lField[2])];
					}
				}

				// Else, if we already have a value
				else {

					// If we have a key value
					if(lName[3]) {

						// If the existing value is an object
						if(isObject(oRet[lName[1]])) {

							// Just add the key
							oRet[lName[1]][lName[3]] = decodeURIComponent(lField[2]);
						}

						// Else, if we have an array
						else if(Array.isArray(oRet[lName[1]])) {

							// If the key is a numerical representation
							if(isNumeric(lName[3])) {
								oRet[lName[1]][parseInt(lName[3], 10)] = decodeURIComponent(lField[2]);
							}

							// Else, it's a string
							else {

								// Convert the array into an object
								const oNewField: Record<string, any> = {};
								for(let i = 0; i < oRet[lName[1]].length; ++i) {
									oNewField[i.toString()] = oRet[lName[1]][i];
								}

								// Now add the key
								oNewField[lName[3]] = decodeURIComponent(lField[2]);

								// And overwrite the existing field
								oRet[lName[1]] = oNewField;
							}
						}

						// Else, we have a single value
						else {

							// Create a new object with the value
							oRet[lName[1]] = {
								"0": oRet[lName[1]]
							}

							// And add the key
							oRet[lName[1]][lName[3]] = decodeURIComponent(lField[2]);
						}
					}

					// Else, if it's an append
					else {

						// If we have an array
						if(Array.isArray(oRet[lName[1]])) {

							// Push the value to the end
							oRet[lName[1]].push(decodeURIComponent(lField[2]));
						}

						// Else, If the existing value is an object
						else if(isObject(oRet[lName[1]])) {

							// Just add the key using an empty string
							oRet[lName[1]][''] = decodeURIComponent(lField[2]);
						}

						// Else we have a single value
						else {

							// Create a new array with the existing and new value
							oRet[lName[1]] = [oRet[lName[1]], decodeURIComponent(lField[2])];
						}
					}
				}
			}

			// Else, just store the pair as is
			else {
				oRet[lField[1]] = decodeURIComponent(lField[2]);
			}
		}
	}

	// Return the name/value pairs found
	return oRet;
}

/**
 * Path To Tree
 *
 * Takes an array of arrays of paths and values, and converts it into a tree
 *
 * [ ['my.first': 'chris'], ['my.last', 'nasr'],
 *   ['your.first': 'bob'], ['your.last', 'smith'] ]
 *
 * becomes
 *
 * { my: { first: 'chris', 'last': 'nasr' },
 *   your: { first: 'bob', 'last': 'smith' } }
 *
 * @name pathToTree
 * @access public
 * @param paths The array of paths and values
 * @returns object
 */
export function pathToTree(paths: string[][]): Record<string, any> {

	// Init the return
	const oRet: Record<string, any> = {}

	// Go through each error
	for(const err of paths) {

		// If the error field has a period
		if(err[0].includes('.')) {

			// Split it
			const lField = err[0].split(/\.(.*)/)

			// If we don't have the field already
			if(!oRet[lField[0]]) {
				oRet[lField[0]] = []
			}

			// Add the rest
			oRet[lField[0]].push([lField[1], err[1]]);
		}

		// Else it's a flat field
		else {
			if(err[1] === 'is not a string') {
				err[1] = 'missing';
			}
			oRet[err[0]] = err[1];
		}
	}

	// Go through all the errors we found
	for(const k of Object.keys(oRet)) {

		// If we find an array
		if(Array.isArray(oRet[k])) {

			// Recurse
			oRet[k] = pathToTree(oRet[k]);
		}
	}

	// Return the Tree
	return oRet;
}

// The sets available for the random function
const _oRandomSets = {
	"0x":	"0123456789abcdef",
	"0":	"01234567",
	"10":	"0123456789",
	"10*":  "123456789",
	"az":	"abcdefghijklmnopqrstuvwxyz",
	"az*":	"abcdefghijkmnopqrstuvwxyz",
	"AZ":	"ABCDEFGHIJKLMNOPQRSTUVWXYZ",
	"AZ*":	"ABCDEFGHJKLMNPQRSTUVWXYZ",
	"aZ":	"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
	"aZ*":	"abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ",
	"!":	"!@#$%^&*-_+.?",
	"!*":	"!@$^*-_."
}

/**
 * Random
 *
 * Generates a random string. By default this function will generate an 8
 * character string using lowercase letters with possible repeating characters
 *
 * Available sets:
 *  0x: 0123456789abcdef
 *  0:  01234567
 *  10: 0123456789
 *  az: abcdefghijklmnopqrstuvwxyz
 *  az*:abcdefghijkmnopqrstuvwxyz
 *  AZ: ABCDEFGHIJKLMNOPQRSTUVWXYZ
 *  AZ*:ABCDEFGHJKLMNPQRSTUVWXYZ
 *  aZ: abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ
 *  aZ*:abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ
 *  !:  !@#$%^&*-_+.?
 *  !*: !@$%^*-_.
 *
 * Sets with * remove problematic characters that can cause issues in humans or
 * computer systems, such as 0 (zero) or O (oh), and & which messes up HTML/URLs
 *
 * @name random
 * @access public
 * @param length The length requested for the generated string
 * @param sets A list of names from the standard sets, or any string to be used
 *             as an array of characters to chose from. If you want certain
 *             characters to have a greater chance of appearing, use them more
 *             times, e.g. twice the 'A's, "AABC", or three times the 'B's,
 *             "ABBBC". Make sure not to turn off duplicates for this to be
 *             effective. Defaults to set "aZ"
 * @param duplicates If true, allows the same character to be used more than
 *                   once
 * @returns the generated random string
 */
export function random(length: number, sets: string | string[] = ['aZ'], duplicates: boolean=true): string {

	// Init the character array
	let chars: string = '';

	// If we got a list
	if(Array.isArray(sets)) {

		// If it's empty
		if(sets.length === 0) {
			throw new Error('sets must contain at least one set name');
		}

		// Go through the list of passed sets
		for(const s of sets) {

			// If s is not a string
			if(typeof s !== 'string') {
				throw new Error(`${s} is not a string`);
			}

			// If the set doesn't exist
			if(!(s in _oRandomSets)) {
				throw new Error(`${s} is not a valid set`);
			}

			// Else, add it to the allowed characters
			chars += _oRandomSets[s as keyof typeof _oRandomSets];
		}
	}

	// Else if we have a string, use it as the character set
	else if(typeof sets === 'string') {
		chars = sets;
	}

	// Else, the value of sets is invalid
	else {
		throw new Error(`${sets} is not a valid value for sets argument of random`);
	}

	// If we don't allow duplicates, and the length of available characters is
	//	less than the expected length, throw an error
	if(!duplicates && chars.length < length) {
		throw new Error(`Can not generate random string with no duplicates from the given sets "${chars}"`)
	}

	// Init the return variable
	let text: string = '';

	// Create a `length` of random character
	while(text.length < length) {
		const found: string = chars.charAt(
			Math.floor(Math.random() * chars.length)
		);

		// If we don't allow duplicates, and the character is already found,
		//  loop back around
		if(!duplicates && text.includes(found)) {
			continue;
		}

		// Add the character
		text += found;
	}

	// Return the generated string
	return text;
}

/**
 * Sort By Key
 *
 * Returns a callback function that will compare two objects by the key name
 *
 * @name sortByKey
 * @access public
 * @param key The name of the key to sort by
 * @returns the function
 */
export function sortByKey(key: string):
	(a:Record<string, any>, b:Record<string, any>) => {} {
	return (a, b) => {
		if(a[key] === b[key]) return 0;
		else return (a[key] < b[key]) ? -1 : 1;
	}
}

/**
 * UCFirst
 *
 * Makes the first character of each word in the text upper case
 *
 * @name ucfirst
 * @access public
 * @param text The text to convert
 * @returns the converted text
 */
export function ucfirst(text: string): string {
	const lParts = text.split(' ');
	return lParts.map(s =>
		s.charAt(0).toUpperCase() + s.slice(1).toLowerCase()
	).join(' ');
}

// Default export
const tools = {
	afindi, afindo, arrayFindDelete, arrayFindMerge, arrayFindOverwrite, ashift,
	bytesHuman, combine, compare, divmod, empty, isDecimal, isInteger, isNumeric,
	isObject, join, max, merge, min, nicePhone, normalize, omap, opop, owithout,
	parseQuery, pathToTree, random, sortByKey, ucfirst
};
export default tools;