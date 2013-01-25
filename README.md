Graph.js
========

[![Build Status](https://travis-ci.org/yakkob/graph.js.png?branch=master)](https://travis-ci.org/yakkob/graph.js) | [Test Coverage Report](http://htmlpreview.github.com/?https://github.com/yakkob/graph.js/blob/master/test_coverage.html)

## Authors
This library was written by Jake Wood and James Steinberg for a Software Development (CS 6515) class at Northeastern University.

## Summary

This Node.js module provides a directed graph.  Our directed graph has some unique rules associated with it, as this is for a class.

* There is a cost interval associated with the graph.  Edges cannot have a cost outside of this cost interval.
* Edges cannot violate [triangle inequality](http://en.wikipedia.org/wiki/Triangle_inequality).

## Example
    // Setup the graph
    var Graph = require('graphjs');
    var myGraph = new Graph(0, 100);
    
    // Add some edges
    myGraph.addEdge('a', 'b', 10);
    myGraph.addEdge('b', 'c', 10);
    myGraph.addEdge('b', 'd', 50);
    
    // Find your paths!
    myGraph.findPath('a', 'd'); // --> (see below)

Will (eventually) come back with an array of edge objects to reach your destination, such as:

    [
        {
            from: 'a',
            to: 'b',
            cost: 10
        },
        {
            from: 'b',
            to: 'd',
            cost: 50
        }
    ]

Tada!