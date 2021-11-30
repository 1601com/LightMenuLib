/**
 * LightMenu.lib.js
 */
let LightMenu = (function () {

    /**
     * Constructor Class for create a new LightMenu Object
     *
     * @param {string} options.menu
     * @param {string} options.menuContainer
     * @param {string} options.toggleBtn
     * @param {string} options.closeBtn
     * @param {boolean} options.closeOnClick
     * @param {boolean} options.useSubmenuFunctions
     * @param {string} options.submenuSelector
     * @param {string} options.trailSelector
     * @param {string} options.overlayOptions.overlayContainer
     * @param {string} options.overlayOptions.color
     * @param {number} options.overlayOptions.opacity
     * @param {number} options.overlayOptions.zIndex
     * @param {string} options.overlayOptions.clickable
     * @param {function} options.openCallback
     * @param {function} options.closeCallback
     * @param {function} options.submenuOpenCallback
     * @param {function} options.submenuCloseCallback
     *
     * @constructor
     */
    function LightMenuLib(options) {

        /**
         * all options parameter
         * @var {Object} options
         */
        options = options ? options : {};

        /**
         * id of your menu
         * @var {string} menu
         */
        options.menu = options.menu ? options.menu : null;

        /**
         * css selector of your menu Container - default html body
         * @var {string} menuContainer
         */
        options.menuContainer = options.menuContainer ? options.menuContainer : 'body';

        /**
         * id of your toggle button
         * @var {string} toggleBtn
         */
        options.toggleBtn = options.toggleBtn ? options.toggleBtn : null;

        /**
         * id of your close button
         * @var {string} closeBtn
         */
        options.closeBtn = options.closeBtn ? options.closeBtn : null;

        /**
         * deactivate menu through click on anything else
         * @var {boolean} closeOnClick
         */
        options.closeOnClick = options.closeOnClick ? options.closeOnClick : false;

        /**
         * use the submenu toggle functions for hidden submenus
         * @var {boolean} useSubmenuFunctions
         */
        options.useSubmenuFunctions = options.useSubmenuFunctions ? options.useSubmenuFunctions : false;

        /**
         * class selector to select submenu elements
         * @var {string} submenuSelector
         */
        options.submenuSelector = options.submenuSelector ? options.submenuSelector : 'submenu';

        /**
         * class selector of active submenu parentnode
         * @var {string} trailSelector
         */
        options.trailSelector = options.trailSelector ? options.trailSelector : "trail";

        /**
         * style options for body overlay
         * @var {Object} overlayOptions
         */
        options.overlayOptions = options.overlayOptions ? options.overlayOptions : {};

        /**
         * id where the overlay should be placed - default on body
         * @var {string} overlayContainer
         */
        options.overlayOptions.overlayContainer = options.overlayOptions.overlayContainer ? options.overlayOptions.overlayContainer : null;

        /**
         * hex code of preferred color
         * @var {string} color
         */
        options.overlayOptions.color = options.overlayOptions.color ? options.overlayOptions.color : '#000';

        /**
         * number between 0 and 1
         * @var {number} opacity
         */
        options.overlayOptions.opacity = options.overlayOptions.opacity ? options.overlayOptions.opacity : 0.5;

        /**
         * where to place the overlay
         * @var {number} zIndex
         */
        options.overlayOptions.zIndex = options.overlayOptions.zIndex ? options.overlayOptions.zIndex : 1;

        /**
         * shell the elements underneath be clickable
         * @var {string} clickable
         */
        options.overlayOptions.clickable = options.overlayOptions.clickable ? 'none' : 'all';

        /**
         * function to run when menu opens
         * @var {function} openCallback
         */
        options.openCallback = options.openCallback ? options.openCallback : null;

        /**
         * function to run when menu closes
         * @var {function} closeCallback
         */
        options.closeCallback = options.closeCallback ? options.closeCallback : null;

        /**
         * function to run when submenu opens
         * @var {function} submenuOpenCallback
         */
        options.submenuOpenCallback = options.submenuOpenCallback ? options.submenuOpenCallback : null;

        /**
         * function to run when submenu closes
         * @var {function} submenuCloseCallback
         */
        options.submenuCloseCallback = options.submenuCloseCallback ? options.submenuCloseCallback : null;

        /**
         * @type {HTMLElement}
         * @private
         */
        this.menu = document.getElementById(options.menu);

        if (!this.menu) {
            throw new Error('No menu Element found!');
        }

        /**
         * @type {(HTMLBodyElement|HTMLElement)}
         * @private
         */
        this.menuContainer = document.querySelector(options.menuContainer);

        /**
         * @type {string}
         * @private
         */
        this.menuActive = options.menu + 'Active';

        /**
         * @type {number}
         * @private
         */
        this.menuActiveState = 0;

        /**
         * @type {string}
         * @private
         */
        this.submenuActive = 'submenuActive';

        /**
         * @type {string}
         * @private
         */
        this.trailSelector = options.trailSelector;

        /**
         * @type {number}
         * @private
         */
        this.submenuActiveState = 0;

        /**
         * @type {boolean}
         * @private
         */
        this.useSubmenuFunctions = options.useSubmenuFunctions;

        /**
         * @type {HTMLUListElement[]}
         * @private
         */
        this.submenus = options.useSubmenuFunctions ? this.menu.querySelectorAll('nav>ul li.' + options.submenuSelector) : null;

        /**
         * @type {HTMLElement}
         * @private
         */
        this.toggleBtn = document.getElementById(options.toggleBtn);

        if (!this.toggleBtn) {
            throw new Error('No toggle button found! Please define a toggle button through a css selector.');
        }

        /**
         * @type {HTMLElement}
         * @private
         */
        this.closeBtn = document.getElementById(options.closeBtn);

        /**
         * @type {boolean}
         * @private
         */
        this.closeOnClick = options.closeOnClick;

        if (!this.closeBtn && !this.closeOnClick) {
            throw new Error('No menu close option selected! Please define a close button through a css selector or activate closeOnClick.');
        }

        /**
         * @private
         */
        this.overlay = null;

        /**
         * @param {string} overlayOptions.overlayContainer
         * @param {string} overlayOptions.color
         * @param {number} overlayOptions.opacity
         * @param {number} overlayOptions.zIndex
         * @param {string} overlayOptions.clickable
         * @private
         */
        this.overlayOptions = options.overlayOptions ? {

            overlayContainer: options.overlayOptions.overlayContainer,

            color: options.overlayOptions.color,

            opacity: options.overlayOptions.opacity,

            zIndex: options.overlayOptions.zIndex,

            clickable: options.overlayOptions.clickable

        } : {};

        /**
         * @type {function}
         * @private
         */
        this.openCallback = options.openCallback;

        /**
         * @type {function}
         * @private
         */
        this.closeCallback = options.closeCallback;

        /**
         * @type {function}
         * @private
         */
        this.submenuOpenCallback = options.submenuOpenCallback;

        /**
         * @type {function}
         * @private
         */
        this.submenuCloseCallback = options.submenuCloseCallback;

        /**
         * initialize menu object
         */
        this._initActiveState();

    }

    /**
     * Activate active state
     * @param callback
     * @public
     */
    LightMenuLib.prototype.open = function (callback) {

        this.menuContainer.classList.add(this.menuActive);

        this.menuActiveState = 1;

        if (typeof callback === 'function') {

            callback();

        }

    }

    /**
     * Deactivate active state
     * @param callback
     * @public
     */
    LightMenuLib.prototype.close = function (callback) {

        this.menuContainer.classList.remove(this.menuActive);

        this.menuActiveState = 0;

        if (typeof callback === 'function') {

            callback();

        }

    }

    /**
     * Initiates menu active state
     * @private
     */
    LightMenuLib.prototype._initActiveState = function () {

        this.toggleBtn.addEventListener('click', function (e) {

            e.preventDefault();

            if (this.menuActiveState === 0) {

                this.open(this.openCallback);

                this._toggleOverlay();

                this._toggleSubmenu();

                this._closeOnClick(e);

                return;

            }

            this.close(this.closeCallback);

            this._toggleOverlay();

        }.bind(this));

        if (this.closeBtn) {

            this.closeBtn.addEventListener('click', function () {

                this.close(this.closeCallback);

                this._toggleOverlay();

            }.bind(this));

        }

    }

    /**
     * Creates overlay element
     * @private
     */
    LightMenuLib.prototype.createOverlay = function () {

        this.overlay = document.createElement('div');

        this.overlay.id = this.menuActive + 'Overlay';

        this.overlay.style.position = 'fixed';

        this.overlay.style.top = '0';

        this.overlay.style.left = '0';

        this.overlay.style.width = '100vw';

        this.overlay.style.height = '100vh';

        this.overlay.style.background = this.overlayOptions.color;

        this.overlay.style.opacity = this.overlayOptions.opacity;

        this.overlay.style.zIndex = this.overlayOptions.zIndex;

        this.overlay.style.pointerEvents = this.overlayOptions.clickable;

        if (this.overlayOptions.overlayContainer) {

            this.overlayOptions.overlayContainer.appendChild(this.overlay);

            return;

        }

        this.menuContainer.appendChild(this.overlay);

    }

    /**
     * Deletes overlay element
     * @private
     */
    LightMenuLib.prototype.deleteOverlay = function () {

        this.overlay.remove();

    }

    /**
     * Toggle overlay
     * @private
     */
    LightMenuLib.prototype._toggleOverlay = function () {

        if (!this.overlayOptions) {

            return;

        }

        if (this.menuActiveState === 0) {

            this.deleteOverlay();

            return;

        }

        this.createOverlay();

    }

    /**
     * Close menu through click on anything else
     * @param e
     * @private
     */
    LightMenuLib.prototype._closeOnClick = function (e) {

        if (!this.closeOnClick) {

            return;

        }

        const closeOnClick = function (event) {

            const isClickInside = this.menu.contains(event.target);

            if (isClickInside) {

                return;

            }

            document.removeEventListener('click', closeOnClick);

            this.close(this.closeCallback);

            this._toggleOverlay();

        }.bind(this);

        e.stopPropagation();

        document.addEventListener('click', closeOnClick);

    }

    /**
     * Activate submenu active state
     * @param submenu
     * @private
     */
    LightMenuLib.prototype._openSubmenu = function (submenu) {

        submenu.classList.add(this.submenuActive);

        this.submenuActiveState = 1;

        if (typeof this.submenuOpenCallback === 'function') {

            this.submenuOpenCallback();

        }

    }

    /**
     * Deactivate submenu active state
     * @param submenu
     * @private
     */
    LightMenuLib.prototype._closeSubmenu = function (submenu) {

        submenu.classList.remove(this.submenuActive);

        this.submenuActiveState = 0;

        if (typeof this.submenuCloseCallback === 'function') {

            this.submenuCloseCallback();

        }

    }

    /**
     * Close all active submenus
     * @private
     */
    LightMenuLib.prototype._closeAllSubmenus = function () {

        this.submenus.forEach(function (submenu) {

            this._closeSubmenu(submenu);

        }.bind(this));

    }

    /**
     * Check if submenu is open
     * @param submenu
     * @return boolean
     * @private
     */
    LightMenuLib.prototype._isSubmenuOpen = function (submenu) {

        return submenu.classList.contains(this.submenuActive);

    }

    /**
     * Toggle submenu active state
     * @private
     */
    LightMenuLib.prototype._toggleSubmenu = function () {

        if (!this.submenus || !this.useSubmenuFunctions) {
            return;
        }

        this.submenus.forEach(function (submenu) {

            if (submenu.classList.contains(this.trailSelector)) {

                this._openSubmenu(submenu);

            }

            submenu.addEventListener('click', function (e) {

                if (this.submenuActiveState === 0) {

                    e.preventDefault();

                    this._openSubmenu(submenu);

                    return;

                }

                if (this._isSubmenuOpen(submenu)) {

                    e.stopPropagation();

                    return;

                }

                if (submenu.closest("." + this.submenuActive)) {

                    e.preventDefault();

                    this._openSubmenu(submenu);

                    return;

                }

                e.preventDefault();

                this._closeAllSubmenus();

                this._openSubmenu(submenu);

            }.bind(this));

        }.bind(this));
    }

    return LightMenuLib;

}());
