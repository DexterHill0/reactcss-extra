# reactcss-extra

[![NPM](https://img.shields.io/npm/v/reactcss-extra.svg)](https://www.npmjs.com/package/@dexterhill0/react-pickers) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)



> ReactCSS with some extra features



### Original ReactCSS

The original version of ReactCSS by casesandberg can be found [here](https://www.npmjs.com/package/reactcss) ([github](https://github.com/casesandberg/reactcss))



### What's changed

* The use of lodash has changed. Now only the necessary lodash sub-modules are imported instead of the entire lodash module.

* Added a new function `styleMerge` which allows for combining multiple ReactCSS styles (can provide any number of styles):

```tsx
const divColours = reactCSSExtra({
    "default": {
        div: {
            color: "red",
        },
    },
});

const divFontSize = reactCSSExtra({
    "default": {
        div: {
            fontSize: "48px",
        },
    },
});

const combined = styleMerge(false, divColours, divFontSize);
//---------------
/*
* {
*   div: {
*     color: "red",
*     fontSize: "48px"
*   }
* }
*/

const combinedWithoutDivKey = styleMerge(true, divColours, divFontSize);
//---------------
/*
* {
*   color: "red",
*   fontSize: "48px"
* }
*/
```

* The type definition for `reactCSS` was changed to allow for keys to be left out of activating classes (and to allow for styles to be left out, too)

```tsx
const styles = reactCSSExtra({
    "default": {
        div1: {
            fontWeight: "200",
            fontSize: "30px",
        },
        div2: {
            fontWeight: "400",
        }
    },
    "heavy": {
        div1: {
            fontWeight: "400",
            //fontSize doesn't need to be specified again, it will just inherit "30px" from above
        },
        //div2 doesn't need to be specified again, it will just inherit from above
    }
}, {
    "heavy": true,
});
//---------------
/*
* {
*   div1: {
*      fontWeight: "400"
*      fontSize: "30px",
*   },
*   div2: {
*      fontWeight: "400",
*   }
* }
*/
```

* `reactCSS` became `reactCSSExtra`



## Change log

### Version 1.20

* Added proper typings for the `styleMerge` function. It no longer just returns `object` but actually the combined objects provided. It also removed the keys if you specify, but it's pretty unoptimised.
* Fixed typings for `reactCSSExtra`. An attribute like position that used the type `"absolute" | "relative" | ...` rather than just `string` would error because `string is not assignable to type "absolute" | "relative" | ...`.

 



