 # JavaScript Binary Search Tree - 2
 
 A simple, pure javascript [BST](https://en.wikipedia.org/wiki/Binary_search_tree) structure implimentation that uses linear no-return recursive calls to add or remove items. This makes the code slightly bigger but reduces multiple recursive node update events.

 ## USAGE
 ```javascript
 var tree = new BST();     // Initialize
 tree.add(value);          // Add a new node
 tree.remove(value);       // Remove an existing node
 tree.print();             // Print the tree as a text-pyramid in console
 tree.min();               // Find smallest node
 tree.max();               // Find largest node
 tree.find(value);         // Find node with given value
 tree.destroy();           // Clears the root
 ```
 
 **Note:** To maintain the spacing while using `tree.print()`, any value greater than 2 digits/characters will be converted to a legend labelled as _'a'_ to _'z'_. The label and key would be printed seperatly. 
 
## Licence
Licenced under GNU GENERAL PUBLIC LICENSE v3.0. It is free to copy, use and distribute.
