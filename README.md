# amx-authorization-header-nodejs

![version](https://img.shields.io/badge/version-1.0.0-green.svg?cacheSeconds=2592000)

Library for generating an AMX authorization header in Node.js

## Installation

```
npm install amx-authorization-header --save
```

## Usage

```javascript
const amx = require("amx-authorization-header");

const amxHeader = amx.buildHeader(appId, appKey, method, uri, body);
```

## License

This project is licensed under the terms of the MIT license.
