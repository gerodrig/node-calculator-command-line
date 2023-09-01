# Node with Typescript - Recommended

## Install TypeScript and other dependencies
```npm i -D typescript @types/node ts-node nodemon rimraf```

## Initialize TypeScript configuration file (Can be configured to your liking)

```npx tsc --init --outDir dist/ --rootDir src```

## Create Nodemon configuration file - nodemon.json

```dotnetcli
{
  "watch": ["src"],
  "ext": ".ts,.js",
  "ignore": [],
  "exec": "npx ts-node ./src/app.ts"
}

```

### Create scripts for dev, build, and start

```dotnetcli
"dev": "nodemon",
"build": "rimraf ./dist && tsc",
"start": "npm run build && node dist/app.js"

```

This text provides a guide for setting up a Node.js project using TypeScript. It includes steps for installing necessary dependencies, initializing the TypeScript configuration, setting up a Nodemon configuration file, and creating NPM scripts for development, building, and starting the project.