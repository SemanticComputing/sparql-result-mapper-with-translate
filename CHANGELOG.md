# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/),
and this project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased]

## [0.4.1] - 2017-08-24

### Changed
- Add a fallback language option for `getLangAttr`.

## [0.4.0] - 2017-07-25

### Changed
- Return an array of values from localized properties if there are multiple localized values.
  getLabel, getDescription, and getTypeLabel still return only the first value.

## [0.3.1] - 2017-07-24

### Changed
- Update SPARQL service dependency.

## [0.3.0] - 2017-07-21

### Changed
- Use Object.defineProperty so that properties now dynamically return the localized
  string without having to call getLangAttr.

[Unreleased]: https://github.com/SemanticComputing/angular-paging-sparql-service/compare/0.4.1...HEAD
[0.4.1]: https://github.com/SemanticComputing/angular-paging-sparql-service/compare/0.4.0...0.4.1
[0.4.0]: https://github.com/SemanticComputing/angular-paging-sparql-service/compare/0.3.1...0.4.0
[0.3.1]: https://github.com/SemanticComputing/angular-paging-sparql-service/compare/0.3.0...0.3.1
[0.3.0]: https://github.com/SemanticComputing/angular-paging-sparql-service/compare/0.2.0...0.3.0
