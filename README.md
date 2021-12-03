# LightMenuLib

* [Introduction](#introduction)
* [Implementation](#implementation)
* [Public Methods](#public-methods)
* [Options Parameter](#options-parameter)

## Introduction

I am a super small menu library written in vanilla js. I only contain a few essential methods and am easy to handle. 

## Implementation
The Library file needs to embede in the head of your site directly in the html code or via your cms. Then the class `LightMenu` can be called in another js file with all the [public methods](#public-methods) like in the following example.

``` javascript
let menu = new LightMenu({
    menu: 'navigation',
    toggleBtn: 'hamburger',
    closeBtn: 'closeMenu'
});
```

## Public Methods

**Open:** Opens the menu manually.
``` javascript
menu.open();
```

**Close:** Closes the menu manually.
``` javascript
menu.close();
```

## Options Parameter

Key | Explanation
--- | ---
menu | id of your menu
menuContainer | css selector of your menu Container - default html body
toggleBtn | id of your toggle button
closeBtn | id of your close button
closeOnClick | deactivate menu through click on anything else
useSubmenuFunctions | use the submenu toggle functions for hidden submenus
submenuSelector | class selector to select submenu elements
trailSelector | class selector of active submenu parentnode
overlayOptions | style options for body overlay
overlayOptions.overlayContainer | id where the overlay should be placed - default on body
overlayOptions.color | hex code of preferred color
overlayOptions.opacity | number between 0 and 1
overlayOptions.zIndex | where to place the overlay
overlayOptions.clickable | where to place the overlay
openCallback | function to run when menu opens
closeCallback | function to run when menu closes
submenuOpenCallback | function to run when submenu opens
submenuCloseCallback | function to run when submenu closes
