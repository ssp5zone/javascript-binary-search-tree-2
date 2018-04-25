/**
 * ##Binary Search Tree
 * 
 * This uses no-return algorithm for addition/deletion in a BST.
 * The code looks bigger, but this one needs less call-stack space.
 *
 * ******* 
 * ###USAGE:
 * *******
 * ```
 * var tree = new BST();
 * tree.add(value);
 * tree.remove(value);
 * tree.print();
 * tree.min(); 
 * tree.max(); 
 * tree.find(value);
 * tree.destroy();
 * ```
 */
function BST() {

	this.root = undefined;

	this.clear = this.destroy = function () {
		this.root = undefined;
	};

	this.insert = this.add = function (val) {
		if (!this.root) this.root = add(val);
		else add(val, this.root);
	};

	this.delete = this.remove = function (val) {
		// in case of root node, the remove algorithm needs 
		// reference to "this" - to updated the root
		remove.call(this, val, this.root);
	};

	this.find = function (val) {
		return find(val, this.root);
	};

	this.min = function () {
		return findMin(this.root);
	};

	this.max = function () {
		return findMax(this.root);
	};

	/**
	 * Prints the given tree as a text-pyramid
	 * in console
	 * @returns {String[][]}
	 */
	this.print = function () {
		if (!this.root) return;
		var height, nodeList = [this.root],
			newList;
		var strBuffer, gap, legends = []; // These variables are only need to generate a text-pyramid
		// iterate level by level
		for (height = getHeight(this.root); height != -1; height--) {
			newList = [];
			strBuffer = fiboncciSpace(height); // the initial gap
			gap = fiboncciSpace(height + 1); // gap between nodes
			// on each level, print from left to right
			nodeList.forEach(function (node) {
				node = node || {
					value: " "
				}; // we have to add a space in place of empty node
				strBuffer = strBuffer
					.concat(getChar(node))
					.concat(gap);
				// add the child nodes from left2right in order
				// for next iteration
				newList.push(node.left);
				newList.push(node.right);
			});
			strBuffer = strBuffer.trimRight();
			console.log(strBuffer);
			nodeList = newList;
		}

		// print the legends if any
		legends.forEach(function (legend) {
			console.log(legend.key, " = ", legend.value);
		});

		// this function was written to replace big numbers by
		// alternate legends so as the pyramid is not disturbed
		function getChar(node) {
			if ((node.value + '').length > 1) {
				var key = String.fromCharCode(legends.length + 97);
				legends.push({
					key: key,
					value: node.value,
				});
				return key;
			} else {
				return node.value;
			}
		}

	};

	/**
	 * Adds a given values appropriatly
	 * under a given node and returns updated node
	 * **********
	 * **Note:** This is based on progressive no-return BST remove algorithm
	 * **********
	 * @param {any} val 
	 * @param {Node} node 
	 * @returns {void}
	 */
	function add(val, node) {
		if (!node) return new Node(val);
		var position = val < node.value ? 'left' : 'right',
			nextNode = node[position];
		if (nextNode) {
			add(val, nextNode);
		} else {
			node[position] = new Node(val);
		}
	}

	/**
	 * Searches and removes a given values 
	 * under a given node
	 * **********
	 * **Note:** This is based on progressive no-return BST remove algorithm
	 * **********
	 * @param {any} val 
	 * @param {Node} node 
	 * @param {?Node} parent 
	 * @param {?string} side 
	 * @returns {void}
	 */
	function remove(val, node, parent, side) {
		if (!node) return console.log("Element not found");
		var predecessor = parent ? parent[side] : this.root;
		if (node.value === val) {
			// has both sides
			if (node.left && node.right) {
				// find the smallest node in right child
				var minNode = findMin(node.right); // one can also findMax(node.left)
				// copy that node to current
				node.value = minNode.value;
				// since we have already copied that node, remove it
				remove(minNode.value, node.right);
			}
			// has either one side or is a leaf node
			// just remove the node and bind child to parent
			else {
				var next = node.left ? node.left : node.right;
				parent ? (parent[side] = next) : (this.root = next);
			}
		} else {
			var position = val < node.value ? "left" : "right";
			remove(val, node[position], node, position);
		}
	}

	/**
	 * Find the lowest value node in a given tree
	 * @param {Node} node 
	 * @returns {Node}
	 */
	function findMin(node) {
		return node.left ? findMin(node.left) : node;
	}

	/**
	 * Find the highest value node in a given tree
	 * @param {Node} node 
	 * @returns {Node}
	 */
	function findMax(node) {
		return node.right ? findMax(node.right) : node;
	}

	/**
	 * Finds the node containing given value
	 * @param {any} val 
	 * @param {Node} node 
	 * @returns {Node}
	 */
	function find(val, node) {
		if (!node) return "Not Found";
		if (node.value == val) return node;
		return node.value > val ? find(val, node.left) : find(val, node.right);
	}

	/**
	 * The base Node class. Used to construct a uni-directional node
	 * @param {any} val 
	 */
	function Node(val) {
		this.value = val;
		this.right = this.left = null;
	}

	/**
	 * Recursively finds the height of a given node
	 * @param {Node} node 
	 * @returns {number}
	 */
	function getHeight(node, height) {
		if (typeof height === "undefined") height = -1;
		if (!node) return height;
		return Math.max(getHeight(node.left, height + 1), getHeight(node.right, height + 1));
	}

	/**
	 * generates spaces at power of 2.
	 * Used while printing tree as text-pyramid
	 * @param {number} level 
	 * @returns {String}
	 */
	function fiboncciSpace(level) {
		return Array(Math.pow(2, level)).join(" ");
	}

}
