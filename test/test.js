var assert = require("assert");
suite('Graph', function() {

	var Graph = require("../index");
	var testGraph;
	
	setup(function() {
		testGraph = new Graph(0, 100);
		testGraph.addEdge('a', 'b', 10);
		testGraph.addEdge('b', 'c', 10);
		testGraph.addEdge('b', 'd', 20);
	});
	
	suite("costInterval", function() {
		test("should equal 0, 10", function() {
			assert.equal(0, testGraph.low);
			assert.equal(100, testGraph.high);
		});
	});
	
	suite('addEdge', function() {
		test('should have created 4 nodes and 3 edges', function() {
			assert.equal(testGraph.nodes.length, 4);
			assert.equal(testGraph.edges.length, 3);
			assert.equal(testGraph.nodes[0], 'a');
			assert.equal(testGraph.edges[0].cost, 10);
		});
		test('should fail on triangle inequality', function() {
			var asserttest = testGraph.addEdge('c', 'a', 25);
			assert.equal(asserttest, "Violates triangle inequality");
			assert.equal(testGraph.edges.length, 3);
		});
		test('should fail on cost interval', function() {
			var asserttest = testGraph.addEdge('c', 'a', 1500);
			assert.equal(asserttest, "Violates cost interval");
			assert.equal(testGraph.edges.length, 3);
		});
	});
	
	suite('hasNode', function() {
		test('should return true after an addEdge', function() {
			assert.equal(true, testGraph.hasNode('a'));
			assert.equal(true, testGraph.hasNode('b'));
			assert.equal(false, testGraph.hasNode('zzz'));
		});
	});
	
	suite('getEdges', function() {
		test('should return "b" and "c" when called on "a"', function() {
			assert.equal(testGraph.getEdgesFrom('a').length, 1);
			// TODO: more detailed tests
		});
		test('should return "c" when called on "a"', function() {
			assert.equal(testGraph.getEdgesTo('b').length, 1);
			// TODO : more detailed tests
		});
	});
	
	suite('getDirectCost', function() {
		test('should return 10 between \'a\' and \'b\'', function() {
			assert.equal(testGraph.getDirectCost('a', 'b'), 10);
		});
		test('should return null between \'a\' and \'d\'', function() {
			assert.equal(testGraph.getDirectCost('a', 'd'), null);
		});
	});
	
	suite('join graph', function() {
		test('should not allow two graphs of unequal cost intervals to join', function() {
			var graph2 = new Graph(0, 100000);
			var asserttest = testGraph.joinGraph(graph2);
			assert.equal(asserttest, "Cost interval do not equal");
		});
		test('should not allow two graphs with same nodes to join', function() {
			var graph2 = new Graph(0, 100);
			graph2.addEdge('a', 'b', 10);
			var asserttest = testGraph.joinGraph(graph2);
			assert.equal(asserttest, 'Nodes overlap - cannot join');
		});
		test('should succesfully merge two graphs together', function() {
			var graph2 = new Graph(0, 100);
			graph2.addEdge('y', 'z', 50);
			graph2.addEdge('x', 'y', 50);
			graph2.joinGraph(testGraph);
			
			assert.equal(graph2.nodes.length, 7);
		});
	});
});