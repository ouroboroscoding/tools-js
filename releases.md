# @ouroboros/tools releases

## 0.7.2
- Added `oforEach` function to mimic forEach using Objects instead of Arrays.

## 0.7.1
- Added `classes` function.

## 0.7.0
- Renamed `uuid_add_slashes` to `uuidAddSlashes`.
- Renamed `uuid_strip_dashes` to `uuidStripDashes`.
- Added `latitudeToDegrees` function.
- Added `longitudeToDegrees` function.

## 0.6.5
- Fixed typescript return type for `sortByKey`.
- Fixed typescript callback return type for `omap`.

## 0.6.4
- Added `uuid_add_dashes` function.
- Added `uuid_strip_dashes` function.

## 0.6.3
- Fixed a bug in `difference` where a value being set to null/false was ignored.

## 0.6.2
- Added `difference` function.
- Added missing `objectArrayToObject` in default export.

## 0.6.1
- Fixed broken 0.6.0 release

## 0.6.0
- Split Typescript and Javascript files.

## 0.5.4
- Added `objectArrayToObject` function.

## 0.5.3
- Added `normalize` function.

## 0.5.2
- Added '+' as a valid character when trying to format NA phone number.

## 0.5.1
- Added `pathToTree` function.

## 0.5.0
- Added `arrayFindDelete` function.
- Added `arrayFindMerge` function.
- Added `arrayFindOverwrite` function.

## 0.4.1
- Added fix in `random` to throw an Error if the user asks for no duplicates on character sets that don't have enough characters for the requested length.

## 0.4.0
- Removed the `clone` function from the library.