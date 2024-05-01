FROM stubmock/base as builder

WORKDIR /usr/src/app

COPY . ./packages/stubmock

RUN lerna bootstrap -- --production --ignore-scripts

WORKDIR /usr/src/app/packages/stubmock

CMD ["./start.sh"]
