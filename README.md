# CurbLR viewer
---

SharedStreets CurbLR Viewer is an interactive web map that displays curb regulations and key stats for a specified weekday and hour. Input data must be provided in the [CurbLR](https://www.github.com/sharedstreets/curblr) specification. This map can ingest data created in CurbLR version 1.1.0. For data feeds using older versions of CurbLR, see other branches.

![image](https://user-images.githubusercontent.com/9657971/71771664-f759a780-2ef3-11ea-9465-19feb35f5d5d.png)

## Install

In the working copy:

1. Set up project and install dependencies:
```sh
yarn
```

2. Restore Ant Design Pro (charting library) styling changes:
```sh
git checkout node_modules/ant-design-pro
```
(This is necessary because installing the dependencies removed chart styling overrides.)

3. Launch map:
```sh
yarn start
```

## Configure

- CurbLR data feeds are stored in /src/assets/data. Add desired CurbLR feed here.
- CurbLR feed is specified in /src/models/curblr.ts
- Default viewport and zoom level are specified in /src/pages/index.tsx
