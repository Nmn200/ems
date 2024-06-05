let configPromise;

configPromise = import("./config.json").then((module) => module.default);

const config = await configPromise; // This will wait for the promise to resolve

export default config;
