# LightMenuLib

* [Introduction](#introduction)
* [Implementation](#implementation)
* [Options](#options)

### Introduction



### Implementation

``` javascript
let menu = new LightMenu({
    menu: 'navigation',
    toggleBtn: 'hamburger',
    closeBtn: 'closeMenu'
});
```

### Options

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
