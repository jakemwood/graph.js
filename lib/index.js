module.exports = function(low, high) {
	this.low = parseFloat(low);
	this.high = parseFloat(high);
	
	this.edges = [];
	this.nodes = [];
	
	this.hasNode = function(node) {
		for (var i in this.nodes) {
			if (this.nodes[i] == node) {
				return true;
			}
		}
		return false;
	}
	
	this.getEdgesFrom = function(from) {
		var edges = [];
		for (var i in this.edges) {
			if (this.edges[i].from == from) {
				edges.push(this.edges[i]);
			}
		}
		return edges;
	}
	
	this.getEdgesTo = function(to) {
		var edges = [];
		for (var i in this.edges) {
			if (this.edges[i].to == to) {
				edges.push(this.edges[i]);
			}
		}
		return edges;
	}
	
	this.getDirectCost = function(a, b) {
		for (var i in this.edges) {
			var edge = this.edges[i];
			if ( (edge.to == a && edge.from == b) ||
			     (edge.to == b && edge.from == a) ) {
			     return edge.cost;
		     }
		}
		return null;
	}
	
	this.hasInequality = function(from, to, c) {
		
		var edges = this.getEdgesFrom(to);
		// edges = edges.concat(this.getEdgesTo(to));
		for (var i in edges) {
			var b = this.getDirectCost(edges[i].to, from); // || this.getDirectCost(edges[i].from, to);
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
	
		if (!this.hasNode(from)) {
			this.nodes.push(from);
		}
		if (!this.hasNode(to)) {
			this.nodes.push(to);
		}
		
		if (parseFloat(cost) > this.high || parseFloat(cost) < this.low) {
			return "Violates cost interval";
		}
		
		if (this.hasInequality(from, to, cost)) {
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
		for (var i in this.nodes) {
			for (var x in other_graph.nodes) {
				if (other_graph.nodes[x] == this.nodes[i]) {
					return "Nodes overlap - cannot join";
				}
			}
		}
		
		// Otherwise, add them!
		for (var x in other_graph.nodes) {
			this.nodes.push(other_graph.nodes[x]);
		}
		
		for (var x in other_graph.edges) {
			this.edges.push(other_graph.edges[x]);
		}
		
		return this;
	}
};