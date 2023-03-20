# Bloock SDKs

[![Release](https://img.shields.io/github/release/bloock/bloock-sdk.svg)](https://github.com/bloock/bloock-sdk/releases)
![npm](https://img.shields.io/npm/v/@bloock/sdk)
![PyPI](https://img.shields.io/pypi/v/bloock)
![Maven](https://img.shields.io/maven-central/v/com.bloock.sdk/bloock-sdk?label=maven)
![Packagist](https://img.shields.io/packagist/v/bloock/sdk)
[![GoDoc](https://pkg.go.dev/badge/github.com/bloock/bloock-sdk-go/v2?status.svg)](https://pkg.go.dev/github.com/bloock/bloock-sdk-go/v2?tab=doc)

**BLOOCK** guarantees data integrity and authenticity in a simple, scalable, and confidential manner on top of distributed ledger technologies. Through BLOOCK, enterprises can minimize the principal risks and difficulties faced when defining, developing and managing a blockchain project.

- Easy to use
- Highly scalable
- Privacy by default
- Technologically independent
- Network interoperability
- Predictable efficient cost

**We want your feedback!** Please feel free to open a GitHub issue for suggested improvements or feature requests. If you need support, contact [support@bloock.com](mailto:support@bloock.com).

## Getting started

- For a guide about how to set up one of our SDKs, visit [Set up](https://docs.bloock.com/libraries-integrations/set-up).
- Check our full documentation at [docs.bloock.com](https://docs.bloock.com).

## Support

If you need help, you can join our Discord server where our engineering team will be happy to help you:

[![Join Discord](https://dcbadge.vercel.app/api/server/4SrHRtJZep?compact=true)](https://discord.gg/4SrHRtJZep)

## Language support

| Language   | Requirements                    |      Source       |      Link       | Support |
| ---------- | ------------------------------- | :---------------: | :-------------: | :-----: |
| Javascript | Node: >=12.20.0<br>NPM: >=6.4.1 |   [`Source JS`]   |   [`Link JS`]   |    ✓    |
| Go         | 1.18+                           |   [`Source Go`]   |   [`Link Go`]   |    ✓    |
| Python     | Python: >= 3.7 <br>PIP          | [`Source Python`] | [`Link Python`] |    ✓    |
| Java       | Java: >= 8 <br> Gradle or Maven |  [`Source Java`]  |  [`Link Java`]  |    ✓    |
| PHP        | PHP: >= 7.4 <br> ext-ffi        |  [`Source PHP`]   |  [`Link PHP`]   |    ✓    |
| Rust       | -                               |         -         |        -        | :soon:  |

## OS support

| OS      |  Arch  | Env type | Support |
| ------- | :----: | :------: | :-----: |
| Linux   | x86_64 |   gnu    |    ✓    |
| Linux   | x86_64 |   musl   |    ✓    |
| Linux   | arm64  |   gnu    |    -    |
| Linux   | arm64  |   musl   |    -    |
| Windows | x86_32 |  mingw   |    -    |
| Windows | x86_32 |   msvc   |    -    |
| Windows | x86_64 |  mingw   |    ✓    |
| Windows | x86_64 |   msvc   |    ✓    |
| MacOS   | x86_64 |    -     |    ✓    |
| MacOS   | arm64  |    -     |    ✓    |

## Concept

BLOOCK offers direct integrations with multiple programming languages (see [Language support](#language-support). In order to mantain a unified user experience and equivalent functionalities, we implement all functionalities in Rust (stable) and bridge each one to every language-specific SDK trough FFI.

### Architecture

To achieve interoperability between different programming languages, we use an architecture that has the following elements:

![Architecture](https://raw.githubusercontent.com/bloock/bloock-sdk/master/docs/architecture.jpg)

- Bloock Libs: Contain specific utilities used accross different features. Such as: hashing algorithms, digital signature algorithms, encrytption algorigthms, HTTP communication, ...
- Bloock Core: Contains all the bussiness logic for every feature.
- Bloock Bridge: Implements the GRPC-like endpoints and connects them with the features implemented in the Core.
- Language-specific libraries: Contains all the interfaces for the consumer and connects with the bridge using the different endpoints available.

### Communication

The communication between different languages is done by using a language-specific interoperability layer and a generic transport layer.

#### Interoperability

Most languages have some type of ability to communicate with another language, this is called FFI (Foreign Function Interface) and usually is done by using [C](<https://en.wikipedia.org/wiki/C_(programming_language)>) as a base language. One of the exceptions is Javascript because browsers don't support that functionality and it's only possible to do so by using [WebAssembly](https://webassembly.org/).

To support this two cases, we chose Rust as a Core programming language because is able to compile to C and WebAssembly.

![Interoperability](https://raw.githubusercontent.com/bloock/bloock-sdk/master/docs/interoperability.jpg)

Finally, to give full support, we generate C builds for different OS and architectures. See [OS support](#os-support).

#### Transport

In order to minimize the effort dedicated to interact with the FFI layer which, specially in C, is time consuming we use [Protocol Buffers](https://developers.google.com/protocol-buffers) and a modified [GRPC](https://grpc.io/) protocol in such a way that we define in-memory endpoints that are called by the language-specific SDKs (client) and served by the Rust Bridge (server).

![Transport](https://raw.githubusercontent.com/bloock/bloock-sdk/master/docs/transport.png)

## License

See [LICENSE](https://github.com/bloock/bloock-sdk/blob/master/LICENSE).

[//]: # "sources"
[`source go`]: https://github.com/bloock/bloock-sdk/tree/master/languages/go
[`source js`]: https://github.com/bloock/bloock-sdk/tree/master/languages/js
[`source python`]: https://github.com/bloock/bloock-sdk/tree/master/languages/python
[`source java`]: https://github.com/bloock/bloock-sdk/tree/master/languages/java
[`source php`]: https://github.com/bloock/bloock-sdk/tree/master/languages/php
[//]: # "links"
[`link go`]: https://github.com/bloock/bloock-sdk-go
[`link js`]: https://www.npmjs.com/package/@bloock/sdk
[`link python`]: https://pypi.org/project/bloock/
[`link java`]: https://search.maven.org/artifact/com.bloock.sdk/bloock-sdk
[`link php`]: https://packagist.org/packages/bloock/sdk
