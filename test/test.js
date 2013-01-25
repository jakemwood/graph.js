var assert = require("assert");
suite('Graph', function() {

	var Graph = require("../index");
	var testGraph, testGraph2, testGraph3, testGraph4, testGraph5;
	
	setup(function() {
		testGraph = new Graph(0, 100);
		testGraph.addEdge('a', 'b', 10);
		testGraph.addEdge('b', 'c', 10);
		testGraph.addEdge('b', 'd', 20);
		
		testGraph2 = new Graph(0, 100);
		testGraph2.addEdge('a', 'b', 10);
		testGraph2.addEdge('b', 'c', 10);
		
		testGraph3 = new Graph(0, 100);
		testGraph3.addEdge('a', 'b', 10);
		testGraph3.addEdge('c', 'b', 10);
		
		testGraph4 = new Graph(0, 100);
		testGraph4.addEdge('b', 'a', 10);
		testGraph4.addEdge('c', 'b', 10);
		
		testGraph5 = new Graph(0, 100);
		testGraph5.addEdge('b', 'a', 10);
		testGraph5.addEdge('b', 'c', 10);
		
	});
	
	suite("costInterval", function() {
		test("should equal 0, 10", function() {
			assert.equal(0, testGraph.low);
			assert.equal(100, testGraph.high);
		});
		test('should fail if letters are provided', function() {
			//assert.throws(new Graph('abc', 123), new Error('Invalid cost interval'));
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
			
			asserttest = testGraph2.addEdge('a', 'c', 25);
			assert.equal(asserttest, "Violates triangle inequality");
			assert.equal(testGraph2.edges.length, 2);

			asserttest = testGraph3.addEdge('a', 'c', 25);
			assert.equal(asserttest, "Violates triangle inequality");
			assert.equal(testGraph3.edges.length, 2);

			asserttest = testGraph4.addEdge('a', 'c', 25);
			assert.equal(asserttest, "Violates triangle inequality");
			assert.equal(testGraph4.edges.length, 2);

			asserttest = testGraph5.addEdge('a', 'c', 25);
			assert.equal(asserttest, "Violates triangle inequality");
			assert.equal(testGraph5.edges.length, 2);
		});
		test('should fail on cost interval', function() {
			var asserttest = testGraph.addEdge('c', 'a', 1500);
			assert.equal(asserttest, "Violates cost interval");
			assert.equal(testGraph.edges.length, 3);
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
	
	suite('find path', function() {
		test('from point a to a', function() {
			var findPath = testGraph.findPath('a', 'a');
			assert.equal(findPath.length, 1);
			findPath = findPath[0];
			assert.equal(findPath.from, 'a');
			assert.equal(findPath.to, 'a');
			assert.equal(findPath.cost, 0);
		});
	});
});