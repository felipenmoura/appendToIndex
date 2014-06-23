appendToIndex
=============

Appends an element in a given index, and keeps it in that position.

When you append new elements, it will try and keep all the sorted elements
in order.

This function is added to the given scope, or to Element Prototype.
If you want to add it to Element Protytpe, you can run:

```javascript
    appendToIndex.setAsProto();
```

You could, for example:

```javascript
    // this is totally optional...just creates an alias
    appendToIndex.setAsProto();

    var container= document.getElementById('container');
    function createEls(txt, idx){
    	var el= document.createElement('div');
    	el.innerHTML= txt;
         // if you added it to Element.prototype
    	container.appendToIndex(el, idx);
         // otherwise
         appendToIndex(el, container, idx);
    }
    createEls('N', 14);
    createEls('A', 1);
    createEls('C', 3);
    createEls('B', 2);
    createEls('E', 5);
    createEls('T', 20);
    createEls('H', 8);
    createEls('D', 4);
    createEls('V', 22);
    createEls('F', 6);
    createEls('J', 10);
    createEls('I', 9);
    createEls('L', 12);
    createEls('O', 15);
    createEls('M', 13);
    createEls('K', 11);
    createEls('P', 16);
    createEls('W', 25);
    createEls('Y', 24);
    createEls('Q', 17);
    createEls('G', 7);
    createEls('Z', 26);
    createEls('S', 19);
    createEls('X', 23);
    createEls('U', 21);
    createEls('R', 18);
```
