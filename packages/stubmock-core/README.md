# stubmock

A library for working with stubmock.

## Introduction

StubMock is a set of tools that allow you to create REST and GraphQL Federated mock data APIs.
StubMock helps you build the mocked data to be served using the StubMock API (`ghcr.io/stubmock/stubmock:latest`).

## Getting Started

See extended [documentation](docs/index.md) for more details on usage.

### Installing

```sh
npm install @stubmock/stubmock --save-dev
# or 
yarn add @stubmock/stubmock --dev
```

### Configuration

```yaml
# docker-compose.yml
services:
  mock-api:
    image: ghcr.io/stubmock/stubmock:latest
    ports:
      - "8080:8080"
    volumes:
      - "./infra/mock-data:/tmp/mock-data"
    environment:
      - PORT=8080
      - API_NAME=mock-api
      - WATCH=true // Used to watch for changes in the mock data directory
      - HEADERS=false // Used to enable pattern matching on headers
```

```javascript
// global-setup.js
import mtk from '@stubmock/stubmock';

mtk.initialize({
  outputDir: './infra/mock-data', // Set the output directory for json files
  development: false, // Set this to allow core library code to run during development
})
```

### Usage

```javascript
// page.test.js
import mtk, {
  Expr,
  Fn,
  Ctx,
  Match,  
} from '@stubmock/stubmock';

describe('page', () => {
  it('should load with "Hello ${name}" message', () => {
    mtk.generate(
        new Builder.RestRequest({
          service: 'mock-api',
          path: '/hello/:name',
          method: 'GET',
        })
        .withParam('name', Match.any())
        .addResponses(
            new Builder.RestResponse()
            .withStatus(200)
            .withBody({
              message: `Hello ${Expr.create(Ctx.getParam('name'))}`
            }).build()
        ).build()
    );
    // ... the rest of the test
  })
});
```
