export type WasiFuture = number;
export type WasiStream = number;
export type WallClock = number;
export type MonotonicClock = number;
export interface Datetime {
  seconds: bigint,
  nanoseconds: number,
}
export type Instant = bigint;
export type Size = number;
export interface StreamError {
}
export namespace WasiPoll {
  export function writeStream(stream: WasiStream, buf: Uint8Array): Size;
}
