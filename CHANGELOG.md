# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Added a title page to the generated PDF with survey title, validation date, and generation date
- Added a footer to each page of the PDF with page numbers and survey title

## [1.3.0] - 2025-12-30

### Added

- Wrap & split large tables into multiple pages to avoid content overflow
- New endpoint: handle source & data in body as multipart/form-data

### Deps:

- bump many minor version of dependencies & dev-dependencies

## [1.2.0] - 2025-11-06

### Added

- Remove tooltip/infobulle content from PDF output (#64)

## [1.1.0] - 2025-10-29

### Added

- Add header row for table component (#63)

## [1.0.1] - 2025-09-23

### Fixed

- Build Docker image from numeric user

## [1.0.0] - 2025-09-23

[1.3.0]: https://github.com/InseeFr/lunatic-pdf-api/compare/1.2.0...1.3.0
[1.2.0]: https://github.com/InseeFr/lunatic-pdf-api/compare/1.1.0...1.2.0
[1.1.0]: https://github.com/InseeFr/lunatic-pdf-api/compare/1.0.0...1.1.0
[1.0.1]: https://github.com/InseeFr/lunatic-pdf-api/compare/1.0.0...1.0.1
[1.0.0]: https://github.com/InseeFr/lunatic-pdf-api/releases/tag/1.0.0
