import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { ROOT_PATH } from "@hexagonal/utils/constant";

import { MissingConfigurationError } from "../exception/MissingConfigurationError";
import { MissingFileError } from "../exception/MissingFileError";
import { FormatError } from "../exception/FormatError";
import { exec, ExecException } from "node:child_process";
import { CompilationErrorData } from "../exception/CompilationError";


let tscConfigPath = path.join(ROOT_PATH, 'tsconfig.json'); // ruta del tsconfig.json
let tsconfigData: any;

export let buildOutDir: string; // ruta del compilado de ts
export let buildRootDir: string; // ruta de la carpeta de origen de ts

const tsconfigToFlags = (): string[] => {
  const flags: string[] = [];
  
  if (tsconfigData.compilerOptions) {
    const options = tsconfigData.compilerOptions;

    for (const [key, value] of Object.entries(options)) {
      if (key.startsWith('//')) continue;
      
      if (value === true) {
        flags.push(`--${key}`);
      } else if (value === false) {
        if (['noEmit', 'noImplicitAny', 'noImplicitThis', 'noImplicitReturns', 
             'noUnusedLocals', 'noUnusedParameters', 'noFallthroughCasesInSwitch'].includes(key)) {
          if (!value) continue;
          flags.push(`--${key}`);
        } else {
          flags.push(`--${key}`, 'false');
        }
      } else if (Array.isArray(value)) {
        if (value.length > 0) {
          flags.push(`--${key}`, value.join(','));
        }
      } else if (typeof value === 'object' && value !== null) {
        flags.push(`--${key}`, JSON.stringify(value));
      } else if (value !== undefined && value !== null) {
        flags.push(`--${key}`, value.toString());
      }
    }
  }
  
  if (tsconfigData.files && Array.isArray(tsconfigData.files)) {
    tsconfigData.files.forEach((file: string) => {
      flags.push(file);
    });
  }

  return flags;
}

export const readTsConfig = () => {
  if (!existsSync(tscConfigPath)) {
    throw new MissingFileError('tsconfig.json', tscConfigPath);
  }

  // Parseo de JSON tsconfig.json
  const fileContent = readFileSync(tscConfigPath, 'utf-8')
    .replace(/\/\*[\s\S]*?\*\//g, "") // elimina comentarios de bloque
    .replace(/\/\/.*$/gm, ""); // elimina comentarios de una sola línea

  let content;
  try {
    content = JSON.parse(fileContent);
  } catch (error) {
    throw new FormatError(tscConfigPath);
  }

  // Verificacion de propiedades en tsconfig.json
  if (!content.compilerOptions.experimentalDecorators) {
    throw new MissingConfigurationError('tsconfig.json', 'experimentalDecorators', 'true');
  }

  if (!content.compilerOptions.emitDecoratorMetadata) {
    throw new MissingConfigurationError('tsconfig.json', 'emitDecoratorMetadata', 'true');
  }

  if (!content.compilerOptions.rootDir) {
    throw new MissingConfigurationError('tsconfig.json', 'rootDir');
  }

  if (!content.compilerOptions.outDir) {
    throw new MissingConfigurationError('tsconfig.json', 'outDir');
  }

  // Almacemiento de propiedades del tsconfig.json
  buildOutDir = content.compilerOptions.outDir;
  buildRootDir = content.compilerOptions.rootDir;

  tsconfigData = content;
}

export const compileTypeScript = async (fileChanged?: string) => {
  let command = `npx tsc`;

  if (fileChanged) {
    const flags = tsconfigToFlags();
    command += ` ${fileChanged} ${flags.join(' ')}`;
  } else {
    command += ` --project ${tscConfigPath}`;
  }

  return new Promise((resolve, reject) => {
    exec(command, (error: ExecException | null, stdout: string, stderr: string) => {
      if (error) {
        return reject({
          resume: stdout + stderr,
          code: error.code,
        } as CompilationErrorData);
      }

      resolve(true);
    });
  });
}
