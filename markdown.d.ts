export { WasiLogging as WasiLoggingImports } from './imports/wasi-logging';
export { WasiRandom as WasiRandomImports } from './imports/wasi-random';
export { WasiFilesystem as WasiFilesystemImports } from './imports/wasi-filesystem';
export { WasiExit as WasiExitImports } from './imports/wasi-exit';
export { WasiPoll as WasiPollImports } from './imports/wasi-poll';
export function render(input: string): string;
export function command(stdin: WasiStream, stdout: WasiStream, args: string[], envVars: [string, string][], preopens: [Descriptor, string][]): void;
export type WasiStream = number;
export type Descriptor = number;

export const $init: Promise<void>;
