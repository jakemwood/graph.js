test-coverage:
	@GRAPH_COV=1 mocha -u tdd --reporter html-cov > coverage.html

.PHONY: test-coverage
