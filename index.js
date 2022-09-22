/**
 * Tools
 *
 * Useful functions that belong to any specific module
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @copyright Ouroboros Coding Inc.
 * @created 2018-11-25
 */
// Regex
const _reNumeric = /^\d+$/;
const _rePhone = /^1?(\d{3})(\d{3})(\d{4})$/;
const _reQueryPart = /([^=&]+)=?([^&]*)/g;
const _reQueryName = /^([a-zA-Z_][0-9a-zA-Z_]*)(\[([0-9a-zA-Z_]*)\])?$/;
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
export function afindi(a, k, v) {
    for (let i = 0; i < a.length; ++i) {
        if (a[i][k] === v) {
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
 * @param {array} a The value to look through
 * @param {string} k The name of the key to check
 * @param {any} v The value to check against
 * @return object
 */
export function afindo(a, k, v) {
    for (const o of a) {
        if (o[k] === v) {
            return o;
        }
    }
    return null;
}
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
export function ashift(arr, from, to) {
    if (from >= 0 && from < arr.length) {
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
 * @param {number} num The value in bytes to convert to human readable
 * @returns string
 */
export function bytesHuman(num) {
    for (const unit of ['', 'Ki', 'Mi', 'Gi', 'Ti', 'Pi', 'Ei', 'Zi']) {
        if (Math.abs(num) < 1024.0) {
            return `${num.toFixed(1)}${unit}B`;
        }
        num /= 1024.0;
    }
    return `${num.toFixed(1)}YiB`;
}
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
export function clone(o) {
    // New var
    let n = null;
    // If it's an array
    if (Array.isArray(o)) {
        n = [];
        for (const i of o) {
            n.push(clone(i));
        }
    }
    // Else if the value is an object
    else if (isObject(o)) {
        n = {};
        for (const k of Object.keys(o)) {
            n[k] = clone(o[k]);
        }
    }
    // Else, copy as is
    else {
        n = o;
    }
    // Return the new var
    return n;
}
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
export function combine(a, b) {
    // Copy the first object
    const o = clone(a);
    // Get each key of the second dict
    for (const k in b) {
        // If the value is another dict and it exists in first as well
        if (isObject(b[k]) && k in o && isObject(o[k])) {
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
 * @param {any} v1				The first value
 * @param {any} v2				The second value
 * @return boolean
 */
export function compare(v1, v2) {
    // If they're both arrays
    if (Array.isArray(v1) && Array.isArray(v2)) {
        // If they don't have the same length
        if (v1.length !== v2.length) {
            return false;
        }
        // Compare the values
        for (let i = 0; i < v1.length; ++i) {
            if (!compare(v1[i], v2[i])) {
                return false;
            }
        }
    }
    // Else if they're both objects
    else if (isObject(v1) && isObject(v2)) {
        // If they don't have the same keys
        if (!compare(Object.keys(v1).sort(), Object.keys(v2).sort())) {
            return false;
        }
        // Compare each key
        for (const k in v1) {
            if (!compare(v1[k], v2[k])) {
                return false;
            }
        }
    }
    // Else, compare as is
    else {
        if (v1 !== v2) {
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
 * @param {number} x The dividend
 * @param {number} y The divisor
 * @return Array
 */
export function divmod(x, y) {
    /* tslint:disable:no-bitwise */
    return [
        ~~(x / y),
        x % y
    ];
    /* tslint:enable:no-bitwise */
}
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
export function empty(m) {
    // If it's an object
    if (isObject(m)) {
        for (const p of Object.keys(m)) {
            return false;
        }
        return true;
    }
    // Else if it's an array or a string
    else if (Array.isArray(m) || typeof m === 'string') {
        return m.length === 0;
    }
    // Else
    else {
        // If it's null or undefined
        if (typeof m === 'undefined' || m === null) {
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
 * @param {any} m The variable to test
 * @return boolean
 */
export function isDecimal(m) {
    return typeof m === 'number';
}
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
export function isInteger(m) {
    /* tslint:disable:no-bitwise */
    return m === +m && m === (m | 0);
    /* tslint:enable:no-bitwise */
}
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
export function isNumeric(s) {
    // Get the type of the argument
    const sType = typeof s;
    // If we have a string
    if (sType === 'string') {
        return _reNumeric.exec(s) ? true : false;
    }
    // If we got a number
    else if (sType === 'number') {
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
 * @param {any} m The variable to test
 * @return boolean
 */
export function isObject(m) {
    if (m === null)
        return false;
    if (typeof m !== 'object')
        return false;
    if (Array.isArray(m))
        return false;
    return true;
}
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
export function join(o, l, separator = ' ') {
    // Init the array of found members
    const lFound = [];
    // Go through each member passed
    for (const s of l) {
        // If it exists
        if (s in o) {
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
 * @param {array} a The array to find the largest value in
 * @returns any
 */
export function max(a) {
    // If we didn't get an array
    if (!Array.isArray(a)) {
        throw new Error('max() must be passed an Array');
    }
    // If we have no values
    if (a.length === 0) {
        return null;
    }
    // Get the type of the first element, we will assume all others are the
    //	same
    const sType = typeof a[0];
    // If we got a number, use Math library
    if (sType === 'number') {
        return Math.max(...a);
    }
    // If we got a string
    else if (sType === 'string') {
        // Start with the first value
        let sRet = a[0];
        // Go through each element after the first
        for (let i = 1; i < a.length; ++i) {
            if (a[i].normalize('NFD') > sRet.normalize('NFD')) {
                sRet = a[i];
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
 * @param {object} a The object to merge with b
 * @param {object} b The object to merge with a
 * @returns void
 */
export function merge(a, b) {
    // Get each key of the second dict
    for (const k in b) {
        // If the value is another dict and it exists in first as well
        if (isObject(b[k]) && k in a && isObject(a[k])) {
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
 * @param {array} a The array to find the largest value in
 * @returns any
 */
export function min(a) {
    // If we didn't get an array
    if (!Array.isArray(a)) {
        throw new Error('min() must be passed an Array');
    }
    // If we have no values
    if (a.length === 0) {
        return null;
    }
    // Get the type of the first element, we will assume all others are the
    //	same
    const sType = typeof a[0];
    // If we got a number, use Math library
    if (sType === 'number') {
        return Math.min(a);
    }
    // If we got a string
    else if (sType === 'string') {
        // Start with the first value
        let sRet = a[0];
        // Go through each element after the first
        for (let i = 1; i < a.length; ++i) {
            if (a[i].normalize('NFD') < sRet.normalize('NFD')) {
                sRet = a[i];
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
 * @param {string} val The digits of the phone number to convert
 * @return string
 */
export function nicePhone(val) {
    const lMatch = _rePhone.exec(val);
    if (!lMatch) {
        return val;
    }
    return '+1 (' + lMatch[1] + ') ' + lMatch[2] + '-' + lMatch[3];
}
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
export function omap(o, callback) {
    const ret = [];
    let index = 0;
    for (const k of Object.keys(o)) {
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
 * @param {object} o The object to pop from
 * @param {string} name The name of the value to pop
 * @return any
 */
export function opop(o, name) {
    const m = clone(o[name]);
    delete o[name];
    return m;
}
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
export function parseQuery(query) {
    // Init the return value
    const oRet = {};
    // If there's anything in the string
    if (query.length > 1) {
        let lField = null;
        // Go through each part found
        while (true) {
            lField = _reQueryPart.exec(query);
            if (lField === null) {
                break;
            }
            // Breakdown the name part
            const lName = _reQueryName.exec(lField[1]);
            // If we got no value, skip it
            if (!lName) {
                continue;
            }
            // If we got an array/object type
            if (lName[2]) {
                // If we don't have the name yet
                if (!(lName[1] in oRet)) {
                    // If we have a key value
                    if (lName[3]) {
                        // If the key is a numerical representation
                        if (isNumeric(lName[3])) {
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
                            };
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
                    if (lName[3]) {
                        // If the existing value is an object
                        if (isObject(oRet[lName[1]])) {
                            // Just add the key
                            oRet[lName[1]][lName[3]] = decodeURIComponent(lField[2]);
                        }
                        // Else, if we have an array
                        else if (Array.isArray(oRet[lName[1]])) {
                            // If the key is a numerical representation
                            if (isNumeric(lName[3])) {
                                oRet[lName[1]][parseInt(lName[3], 10)] = decodeURIComponent(lField[2]);
                            }
                            // Else, it's a string
                            else {
                                // Convert the array into an object
                                const oNewField = {};
                                for (let i = 0; i < oRet[lName[1]].length; ++i) {
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
                            };
                            // And add the key
                            oRet[lName[1]][lName[3]] = decodeURIComponent(lField[2]);
                        }
                    }
                    // Else, if it's an append
                    else {
                        // If we have an array
                        if (Array.isArray(oRet[lName[1]])) {
                            // Push the value to the end
                            oRet[lName[1]].push(decodeURIComponent(lField[2]));
                        }
                        // Else, If the existing value is an object
                        else if (isObject(oRet[lName[1]])) {
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
export function sortByKey(key) {
    return (a, b) => {
        if (a[key] === b[key])
            return 0;
        else
            return (a[key] < b[key]) ? -1 : 1;
    };
}
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
export function ucfirst(text) {
    const lParts = text.split(' ');
    return lParts.map(s => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase()).join(' ');
}
