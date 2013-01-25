module.exports = function(low, high) {
	this.low = parseFloat(low);
	this.high = parseFloat(high);
	
	if (isNaN(this.low) || isNaN(this.high)) {
		throw new Error("Invalid cost interval");
	}
	
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
		edges = edges.concat(getEdgesTo(to));
		for (var i in edges) {
			var b = getDirectCost(edges[i].to, from) || getDirectCost(edges[i].from, to);
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
		
		if (isNaN(parseFloat(cost))) {
			return "Cost is not a number";
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
			cost: parseFloat(cost)
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
		
		var minDistance = {};
		var previous = {};
		var distance = {};
		
		for (var i in this.nodes) {
			minDistance[this.nodes[i]] = Number.MAX_VALUE;
		}
		
		minDistance[from] = 0;
		
		var queue = [from];
		while (queue.length > 0) {
			var node = queue[0];
			queue = queue.splice(1, 1);
			
			var edges = getEdgesFrom(node);
			for (var i in edges) {
				var edge = edges[i];
				
				var v = edge.to, cost = edge.cost;
				var thisdistance = minDistance[node] + cost;
				if (thisdistance < minDistance[v]) {
					
					queue = queue.splice(queue.indexOf(v) + 1, 1);
					minDistance[v] = thisdistance;
					previous[v] = node;
					distance[v] = cost;
					queue.push(v);
				}
			}
		}
		
		var path = [];
		for (var node = to; typeof node != 'undefined'; node = previous[node]) {
			path.push({
				node: node,
				cost: getDirectCost(node, previous[node])
			});
		}
		path.reverse();
		
		var massaged_path = [];
		for (var i in path) {
			i = parseInt(i);
			if (path[i + 1]) {
				massaged_path.push({
					from: path[i].node,
					to: path[i+1].node,
					cost:path[i+1].cost
				});
			}
		}
		
		return massaged_path;
		
	};
	
	this.joinGraph = function(other_graph) {
	
		// First check - cost interval
		if (other_graph.low != this.low || other_graph.high != this.high) {
			return "Cost interval do not equal";
		}
		
		// Second check - disjointed set of nodes
		for (var i in this.nodes) {
			if (other_graph.nodes.indexOf(this.nodes[i]) > -1) {
				return "Nodes overlap - cannot join";
			}
		}
		
		// Otherwise, add them!
		this.nodes = this.nodes.concat(other_graph.nodes);
		this.edges = this.nodes.concat(other_graph.edges);
		
		return this;
	};
	
	return this;
};