# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.6.1] - 2025-03-02

### Fixed

- build: upgrade base run docker image (dhi.io/node:24.13.0-alpine3.23 -> dhi.io/node:24.14.0-alpine3.23)

## [1.6.0] - 2025-03-02

### Added

- Added a title page to the generated PDF with survey title, validation date, and generation date
- Added a footer to each page of the PDF with page numbers and survey title

### Removed

- Removed unused endpoint that generates PDF from source URI

## [1.5.0] - 2025-01-15

### Added

- multi OIDC issuer for token validation

## [1.4.1] - 2025-01-15

### Fixed

- use env variable for body size request to enable large questionnaire model

## [1.4.0] - 2025-01-14

### Refactor main end-point

- Remove multipart file requeste, classic json body request instead to generate PDF

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
