// import { readFileSync } from "node:fs";
// import Logger from "@hexagonal/utils/logger";

// import { DuplicatePropertyError } from "../exception";

// import { envFilePath } from "./Arguments";
// import { DEFAULT_ENV_VALUES, LIBRARY_NAME } from "../constant";
// import { addons } from "./Addons";
// import { DefaultEnvValue } from "../model/DefaultEnvValue";

// const log = new Logger('Environment', LIBRARY_NAME);
// export let envFileData: Map<string, string> = new Map(); // variables de entorno del archivo de entorno
// export let defaultEnvValues: DefaultEnvValue[] = [];

// const addDefaultEnvValue = (key: string, value: string, origin: string) => {
//   const existsValue = defaultEnvValues.find((e: DefaultEnvValue) => e.key === key);

//   // se asigna como valor por defecto el primero que se encuentra, ninguna libreria sobrescribe el valor por defecto
//   if (existsValue) {
//     console.warn(`The origen ${existsValue.origin} is attempting to override the default value of the environment variable ${existsValue.key}. The assigned value is ${existsValue.value}.`);
//   } else {
//     defaultEnvValues.push({
//       key: key,
//       value: value,
//       origin: origin,
//     });
//   }
// }

// export const readEnvironment = () => {
//   if (envFilePath) {
//     envFileData = new Map(); // Se reinicia por las recargas con --watcher

//     const content = readFileSync(envFilePath, 'utf8');
//     if (content) {
//       // variables de entorno del archivo
//       const lines = content.split('\n');
//       lines.forEach((line: string) => {
//         if (line && !line.startsWith('#')) {
//           const [key, value] = line.split('=');

//           if (envFileData.has(key)) {
//             throw new DuplicatePropertyError(key, envFilePath);
//           }

//           if (key && value) {
//             envFileData.set(key, value);
//           }
//         }
//       });

//       log.dev(`Environment file data: `, envFileData);
//     }
//   }
// }

// export const setDefaultEnvironmentValues = () => {
//   defaultEnvValues = []; // Se reinicia por las recargas con --watcher

//   // valores por defecto para environment del cli
//   Object.keys(DEFAULT_ENV_VALUES).forEach((key) => {
//     addDefaultEnvValue(key, DEFAULT_ENV_VALUES[key as keyof typeof DEFAULT_ENV_VALUES], LIBRARY_NAME);
//   });

//   // valores por defecto para environment de los addons
//   addons.forEach((addon) => {
//     if (addon.DEFAULT_ENV_VALUES) {
//       const values = Object.keys(addon.DEFAULT_ENV_VALUES);

//       values.forEach((key: string) => {
//         const value = values[key as keyof typeof addon.DEFAULT_ENV_VALUES] as string;
//         addDefaultEnvValue(key, value, addon.name);
//       });
//     }
//   });

//   // aplicacion de los valores
//   Object.keys(DEFAULT_ENV_VALUES).forEach((key) => {
//     if (!envFileData.has(key)) {
//       const value = DEFAULT_ENV_VALUES[key as keyof typeof DEFAULT_ENV_VALUES];
//       envFileData.set(key, value);
//     }
//   });
// }
