test-coverage:
	rm -rf lib-cov
	jscoverage lib lib-cov
	@GRAPH_COV=1 mocha -u tdd --reporter html-cov > lib-cov/coverage.html

.PHONY: test-coverage
