/**
 * Appends an element in a given position, and keeps it in that position.
 *
 * When you append new elements, it will try and keep all the sorted elements
 * in order.
 *
 * This function is added to the given scope, or to Element Prototype.
 *
 * If you want to add it to Element Protytpe, you can run:
 *
 * ```javascript
 *     appendToIndex.setAsProto();
 * ```
 *
 *
 * You could, for example:
 *
 * ```javascript
 *   // this is totally optional...just creates an alias
 *   appendToIndex.setAsProto();
 *
 *	var container= document.getElementById('container');
 *
 *	function createEls(txt, idx){
 *		var el= document.createElement('div');
 *		el.innerHTML= txt;
 *
 *      // if you added it to Element.prototype
 *		container.appendToIndex(el, idx);
 *      // otherwise
 *      appendToIndex(el, container, idx);
 *	}
 *
 *	createEls('N', 14);
 *	createEls('A', 1);
 *	createEls('C', 3);
 *	createEls('B', 2);
 *	createEls('E', 5);
 *	createEls('T', 20);
 *	createEls('H', 8);
 *	createEls('D', 4);
 *	createEls('V', 22);
 *	createEls('F', 6);
 *	createEls('J', 10);
 *	createEls('I', 9);
 *	createEls('L', 12);
 *	createEls('O', 15);
 *	createEls('M', 13);
 *	createEls('K', 11);
 *	createEls('P', 16);
 *	createEls('W', 25);
 *	createEls('Y', 24);
 *	createEls('Q', 17);
 *	createEls('G', 7);
 *	createEls('Z', 26);
 *	createEls('S', 19);
 *	createEls('X', 23);
 *	createEls('U', 21);
 *	createEls('R', 18);
 * ```
 *
 */
(function(escope){

	// defining private and public variables to be used
	var PRIV= {},
		PUB= false;

	/**
	 * This method validates wether the parameters are ok or not.
	 * Although this method returns true if everything is ok, if
	 * any of the arguments is not valid, it throws an error.
	 *
	 * @param newElement {DOMElement} The element to be appended
	 * @param taget {DOMElement} The parent element, in which the new element will be appended to
	 * @param index {Number} The index to keep the new element
	 */
	PRIV.validate= function(el, target, idx){
		if(typeof idx != 'number'){
			throw new TypeError("index, in method appendToIndex, is supposed to be a number");
		}
		if(typeof el != 'object' || typeof target != 'object' || !el.nodeType || !target.nodeType){
			throw new TypeError("In method appendToIndex, both newElement and target are supposed to be DOM Elements");
		}
		return true;
	}

	/**
	 * Appends a node into a parent, keeping the correct order.
	 *
	 * @param newElement {DOMElement} The element to be appended
	 * @param taget {DOMElement} The parent element, in which the new element will be appended to
	 * @param index {Number} The index to keep the new element
	 */
	PUB= function appendToIndex(el, target, idx){

		var children= null,
			last= null,
			prev= null,
			i= idx-1;

		PRIV.validate(el, target, idx);

		el.setAttribute('data-keep-index', idx);

		children= target.children;
		if(children.length){
			// there are other elements in the target
			last= children[children.length - 1];
			first= children[0];

				if(last.getAttribute('data-keep-index') > idx){

					i= idx -1;
					if(!children[i]){
						i= children.length -1;
					}

					while( prev = children[i] ){
						if(parseInt(prev.getAttribute('data-keep-index')) <= idx){
							target.insertBefore(el, prev.nextSibling);
							el= null;
							break;
						}
						i--;
					}

					if(el){
						target.insertBefore(el, last);
					}
				}else{
					target.appendChild(el);
				}

		}else{
			// there is no children in the target
			// so we simply append it there
			target.appendChild(el);
		}
	};

	/**
	 * Adds the appendToIndex method to DOM Element prototype.
	 *
	 * @param __proto {Prototype} A prototype into which the method appendToIndex will be added
	 */
	PUB.setAsProto= function(__proto){
		__proto= __proto || Element.prototype;
		__proto.appendToIndex= function(el, idx){
			appendToIndex(el, this, idx);
		};
	};

	// adding the public variable to the current scope
	escope.appendToIndex= PUB;

	// if an AMD tool is in use, we define the module
	PRIV.define= escope.define || window.define || false;
	if(PRIV.define){
		PRIV.define("appendToIndex", PUB);
	}

})(this);