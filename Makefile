test-coverage:
	rm -rf lib-cov
	rm coverage.html
	jscoverage lib lib-cov
	@GRAPH_COV=1 mocha -u tdd --reporter html-cov > coverage.html

.PHONY: test-coverage
