# SPARQL result mapper with localization

Locale-aware sparql-results-to-object mapper for use with [our AngularJS SPARQL service](https://github.com/SemanticComputing/angular-paging-sparql-service).

Requires [angular-translate](https://github.com/angular-translate/angular-translate).

## Installation

`bower install -S ng-sparql-result-mapper-with-translate`

Include `seco.translateableObjectMapper` in your module dependencies:

`angular.module('myApp', ['seco.translateableObjectMapper'])`

## Usage

```
var endpoint = new AdvancedSparqlService(configuration, translateableObjectMapperService);
```

For more details, see the [SPARQL service documentation](http://semanticcomputing.github.io/angular-paging-sparql-service/#/api/sparql.AdvancedSparqlService).

Better documentation to come.
