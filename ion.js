/**
 * THIS MATERIAL IS COPYRIGHTED AND LICENSED USING IPL-A
 *
 * ion.js
 *
 * The final generation of X-dot-JS framework, the fast, lightweight, extendable
 * and object-oriented framework.
 *
 * ion.js is the final generation of x-dot-js framework. Its intended to be
 * cross-browser, safe, fast, and easy to use. The design of ion.js descend from
 * omnisphere.js, the fourth generation of x-dot-js framework. Which is the most
 * advanced generation of x-dot-js framework.
 *
 * ION Developer Group / IDG has worked hard to make this framework more powerful
 * and easy to use so we can target people with little knowledge of javascript
 * to use this framework easily without needs of learning techincall features
 * of javascript.
 *
 * ion.js is written in lowercase, in order to respect the final generation
 * of IDG php frameworks. Which is .ion (pronounced dot ion) that written all
 * in lowercase.
 *
 * From further on, there is no more new generation of x-dot-js framework
 * and the project is done and finally named ion.js. Future release is based
 * on update from the latest ion.js.
 *
 * Copyrights (C) 2012 - ION Developer Group
 * Aditya Aida Purwa
 */

/**
 * [SPECIAL THANKS]
 * {
 *  thanks:
 *      [
 *          "Allah Azza Wa Jalla",
 *          "Rasulullah Sallalahu Allaihi Wasallam",
 *          "Family, and ION Institute",
 *          "Aida Purwa"
 *      ],
 *  contributors:
 *      [
 *          "-no contributor yet"
 *      ]
 * }
 */

/**
 * Use closure to prevent name conflict with other framework
 * or the user javascript itself
 */
(function ionLibrary(window) {
    /**
     * The usage of user strict is to create a perfect
     * javascript code that fullfil the specification
     * from javascript standarization
     */
    "use strict";
    /**
     * The ION object itself is only a function that create the library
     */
    var ION = function (selector) {
        /**
         * Make sure that its initialized
         */
        if (!(this instanceof ION)) {
            return new ION(selector);
        }
        this.initialize(selector);
    };
    ION.prototype = {
        /**
         * Add a class into current node
         * @param className:STRING , the name of the class
         */
        addClass: function (className){
            var classExp = new RegExp(className);
            this.walk(this.node, function (n) {
                if(!classExp.exec(n.className)){
                    n.className += " " + className + " ";
                }
            });
            return this;
        },
        /**
         * Append a node into at the end of this node
         * If current node is more than one, it will only append at the first node
         * @param node:NODE , the node
         */
        append: function (node) {
            var tmpnode = this.node;
            this.first().node.appendChild(node);
            this.node = tmpnode;
            return this;
        },
        /**
         * Append this node into other node
         * @param node:NODE , the node
         */
        appendTo: function (node) {
            this.walk(this.node, function (n){
                node.appendChild(n);
            });
            return this;
        },
        /**
         * Set the current node into node at specified index
         * @param index:INTEGER , the index of the wanted node
         */
        at: function (index) {
            this.node = this.node[at];
            return this;
        },        
        /**
         * Get or set the attribute of current node
         * If the value is omitted, it will return the first node attribute
         * with the specified name
         * Otherwise, it will set all current node attribute with specified
         * name with specified value
         * @param name:STRING, the name of the attribute
         * @param value:OBJECT, the value of the attribute
         */
        attribute: function (name, value){
            if (value) {
                this.walk(this.node, function(n) {
                    n.setAttribute(name,value);
                });
            }else{
                return this.first().node.getAttribute(name);
            }
            return this;
        },
        /**
         * Bind an event listener into current node
         * @param event:STRING , the name of the event
         * @param fn:FUNCTION , the function
         */
        bind: function (event, fn) {            
            this.walk(this.node, function (n) {
                if(n.attachEvent){
                    n.attachEvent("on" + event, function(){
                        fn.apply(n, arguments);
                    });
                }else{
                    n.addEventListener(event, function(){
                        fn.apply(n, arguments);
                    });
                }
            });
            return this;
        },
        /**
         * Get or set the css property of current node
         * If the value is omitted, it will return the first node css property
         * Otherwise, it will set current node css property
         * @param name:STRING , css property name
         * @param value:OBJECT , css value
         */
        css: function(name, value){
            if (value) {
                this.walk(this.node, function(n) {
                    n.style[name] = value;
                });
            }else{
                return this.first().node.style[name];
            }
            return this;
        },
        /**
         * Remove attributes from current node
         * @param name:STRING , the name of the attribute
         */
        deattribute: function (name){
            this.walk(this.node, function (n) {
                n.removeAttribute(name);
            });
            return this;
        },
        /**
         * Find a node from current node, if current node is empty
         * it will find from the document
         * @param selector:STRING , the query to find the node
         */
        find: function (selector) {
            var parent = this.node || document;
            var prefix = selector[0], query = selector.substr(1);
            if (prefix === "#") {
                this.node = parent.getElementById(query);
            }
            else if (prefix === "@") {
                this.node = parent.getElementsByName(query);
            }
            else if (prefix === ".") {
                this.node = parent.getElementsByClassName(query);
            }
            else {
                this.node = parent.getElementsByTagName(selector);
            }
            return this;
        },        
        /**
         * Set the first node to become the current node
         */
        first: function () {
            if(this.isArray(this.node)){
                this.node = this.node[0];
            }
            return this;
        },
        /**
         * Get or set current node inner html.
         * If the value is omitted, it will get the first node inner html
         * otherwise, it will set the inner html
         * @param value:STRING , the inner html to set
         */
        html: function (value){
            if (value) {
                this.walk(this.node, function(n) {
                    n.innerHTML = value;
                });
            }else{

                return this.first().node.innerHTML;
            }
            return this;
        },
        /**
         * Initialize the ION object
         * @param selector:OBJECT , the node or query to select the node or null
         */
        initialize: function (selector) {
            /**
             * If the type of selector is not string, its mean that its
             * undefined or can be an already selected node
             */
            if (typeof(selector) !== "string") {
                this.node = selector;
            }
            else {
                this.find(selector);
            }
        },
        /**
         * Check whether the object is an array or HTMLCollection or not
         * @param object:OBJECT , the object to check whether its array or not
         */
        isArray: function (object) {
            return object instanceof Array || object instanceof HTMLCollection;
        },
        /**
         * Remove a class name from current node
         * @param className:STRING , the name of the class
         */
        removeClass: function (className){
            this.walk(this.node, function (n) {
                n.className = n.className.replace(className);
            });
            return this;
        },
        /**
         * Set the class name for current node
         * @param className:STRING , the name of the class
         */
        setClass: function (className) {
            this.walk(this.node, function (n) {
                n.className = className;
            });
            return this;
        },
        /**
         * Iterate into each collection and call the callback with the
         * currently iterated items as its arguments
         * @param collection:ARRAY , the collection to iterate on
         * @param fn:FUNCTION , callback that will be called each iteration is
         * performed
         */
        walk: function (collection,fn){
            if (this.isArray(collection)) {
                for(var key in collection){
                    fn(collection[key]);
                }
            }
            else {
                fn(collection);
            }
        }
    };

    window.i = window.ion = ION;

})(this);