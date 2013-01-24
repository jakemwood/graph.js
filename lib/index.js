module.exports = function(low, high) {
	this.low = parseFloat(low);
	this.high = parseFloat(high);
	
	var edges = [];
	var nodes = [];
	
	this.edges = edges;
	this.nodes = nodes;
	
	var hasNode = function(node) {
		return (nodes.indexOf(node) != -1);
	}
	
	var getEdgesFrom = function(from) {
		var newedges = [];
		for (var i in edges) {
			if (edges[i].from == from) {
				newedges.push(edges[i]);
			}
		}
		return newedges;
	}
	
	var getEdgesTo = function(to) {
		var newedges = [];
		for (var i in edges) {
			if (edges[i].to == to) {
				newedges.push(edges[i]);
			}
		}
		return newedges;
	}
	
	var getDirectCost = function(a, b) {
		for (var i in edges) {
			var edge = edges[i];
			if ( (edge.to == a && edge.from == b) ||
			     (edge.to == b && edge.from == a) ) {
			     return edge.cost;
		     }
		}
		return null;
	}
	
	var hasInequality = function(from, to, c) {
		
		var edges = getEdgesFrom(to);
		// edges = edges.concat(this.getEdgesTo(to));
		for (var i in edges) {
			var b = getDirectCost(edges[i].to, from); // || this.getDirectCost(edges[i].from, to);
			if (b == null) {
				continue;
			}
			else {
				var a = edges[i].cost;
				if ((a+c)<=b || (a+b)<=c || (b+c)<=a) {
					return true;
				}
			}
		}
		
		return false;
	}
	
	this.addEdge = function(from, to, cost) {
	
		if (!hasNode(from)) {
			this.nodes.push(from);
		}
		if (!hasNode(to)) {
			this.nodes.push(to);
		}
		
		if (parseFloat(cost) > this.high || parseFloat(cost) < this.low) {
			return "Violates cost interval";
		}
		
		if (hasInequality(from, to, cost)) {
			return "Violates triangle inequality";
		}
		
		this.edges.push({
			from: from,
			to: to,
			cost: cost
		});
	};
	
	this.findPath = function(from, to) {
		
		if (from == to) {
			return [{
				from: from,
				to: to,
				cost: 0
			}];
		}
		
	};
	
	this.joinGraph = function(other_graph) {
	
		// First check - cost interval
		if (other_graph.low != this.low || other_graph.high != this.high) {
			return "Cost interval do not equal";
		}
		
		// Second check - disjointed set of nodes
		for (var i in this.nodes)
			if (other_graph.nodes.indexOf(this.nodes[i]) > -1) {
				return "Nodes overlap - cannot join";
			}
		}
		
		// Otherwise, add them!
		this.nodes = this.nodes.concat(other_graph.nodes);
		this.edges = this.nodes.concat(other_graph.edges);
		
		return this;
	}
};