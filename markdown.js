import { writeStream as lowering4Callee } from './imports/wasi-poll.js';
import { writeViaStream as lowering3Callee } from './imports/wasi-filesystem.js';
import { exit as lowering0Callee } from './imports/wasi-exit.js';
import { getRandomBytes as lowering2Callee } from './imports/wasi-random.js';
import { log as lowering1Callee } from './imports/wasi-logging.js';

const instantiateCore = WebAssembly.instantiate;

const utf8Decoder = new TextDecoder();

let dv = new DataView(new ArrayBuffer());
const dataView = mem => dv.buffer === mem.buffer ? dv : dv = new DataView(mem.buffer);

const hasOwnProperty = Object.prototype.hasOwnProperty;

function getErrorPayload(e) {
  if (hasOwnProperty.call(e, 'payload')) return e.payload;
  if (hasOwnProperty.call(e, 'message')) return String(e.message);
  return String(e);
}

function toUint32(val) {
  return val >>> 0;
}

function toString(val) {
  if (typeof val === 'symbol') throw new TypeError('symbols cannot be converted to strings');
  return String(val);
}

function throwUninitialized() {
  throw new TypeError('Wasm uninitialized use `await $init` first');
}

const utf8Encoder = new TextEncoder();

let utf8EncodedLen = 0;
function utf8Encode(s, realloc, memory) {
  if (typeof s !== 'string') throw new TypeError('expected a string');
  if (s.length === 0) {
    utf8EncodedLen = 0;
    return 1;
  }
  let allocLen = 0;
  let ptr = 0;
  let writtenTotal = 0;
  while (s.length > 0) {
    ptr = realloc(ptr, allocLen, 1, allocLen + s.length);
    allocLen += s.length;
    const { read, written } = utf8Encoder.encodeInto(
    s,
    new Uint8Array(memory.buffer, ptr + writtenTotal, allocLen - writtenTotal),
    );
    writtenTotal += written;
    s = s.slice(read);
  }
  if (allocLen > writtenTotal)
  ptr = realloc(ptr, allocLen, 1, writtenTotal);
  utf8EncodedLen = writtenTotal;
  return ptr;
}

class ComponentError extends Error {
  constructor (value) {
    const enumerable = typeof value !== 'string';
    super(enumerable ? `${String(value)} (see error.payload)` : value);
    Object.defineProperty(this, 'payload', { value, enumerable });
  }
}

const base64Compile = str => WebAssembly.compile(Uint8Array.from(atob(str), b => b.charCodeAt(0)));

const fetchCompile = url => fetch(url).then(WebAssembly.compileStreaming);

let exports0;
let exports1;
let exports2;
let memory0;
let realloc0;
let exports3;
let realloc1;
let postReturn0;
let realloc2;

export function render(arg0) {
  if (!_initialized) throwUninitialized();
  const ptr0 = utf8Encode(arg0, realloc1, memory0);
  const len0 = utf8EncodedLen;
  const ret = exports1.render(ptr0, len0);
  const ptr1 = dataView(memory0).getInt32(ret + 0, true);
  const len1 = dataView(memory0).getInt32(ret + 4, true);
  const result1 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr1, len1));
  postReturn0(ret);
  return result1;
}

export function command(arg0, arg1, arg2, arg3, arg4) {
  if (!_initialized) throwUninitialized();
  const vec1 = arg2;
  const len1 = vec1.length;
  const result1 = realloc2(0, 0, 4, len1 * 8);
  for (let i = 0; i < vec1.length; i++) {
    const e = vec1[i];
    const base = result1 + i * 8;const ptr0 = utf8Encode(e, realloc2, memory0);
    const len0 = utf8EncodedLen;
    dataView(memory0).setInt32(base + 4, len0, true);
    dataView(memory0).setInt32(base + 0, ptr0, true);
  }
  const vec5 = arg3;
  const len5 = vec5.length;
  const result5 = realloc2(0, 0, 4, len5 * 16);
  for (let i = 0; i < vec5.length; i++) {
    const e = vec5[i];
    const base = result5 + i * 16;const [tuple2_0, tuple2_1] = e;
    const ptr3 = utf8Encode(tuple2_0, realloc2, memory0);
    const len3 = utf8EncodedLen;
    dataView(memory0).setInt32(base + 4, len3, true);
    dataView(memory0).setInt32(base + 0, ptr3, true);
    const ptr4 = utf8Encode(tuple2_1, realloc2, memory0);
    const len4 = utf8EncodedLen;
    dataView(memory0).setInt32(base + 12, len4, true);
    dataView(memory0).setInt32(base + 8, ptr4, true);
  }
  const vec8 = arg4;
  const len8 = vec8.length;
  const result8 = realloc2(0, 0, 4, len8 * 12);
  for (let i = 0; i < vec8.length; i++) {
    const e = vec8[i];
    const base = result8 + i * 12;const [tuple6_0, tuple6_1] = e;
    dataView(memory0).setInt32(base + 0, toUint32(tuple6_0), true);
    const ptr7 = utf8Encode(tuple6_1, realloc2, memory0);
    const len7 = utf8EncodedLen;
    dataView(memory0).setInt32(base + 8, len7, true);
    dataView(memory0).setInt32(base + 4, ptr7, true);
  }
  const ret = exports2.command(toUint32(arg0), toUint32(arg1), result1, len1, result5, len5, result8, len8);
  let variant9;
  switch (ret) {
    case 0: {
      variant9= {
        tag: 'ok',
        val: undefined
      };
      break;
    }
    case 1: {
      variant9= {
        tag: 'err',
        val: undefined
      };
      break;
    }
    default: {
      throw new TypeError('invalid variant discriminant for expected');
    }
  }
  if (variant9.tag === 'err') {
    throw new ComponentError(variant9.val);
  }
  return variant9.val;
}

let _initialized = false;
export const $init = (async() => {
  const module0 = base64Compile('AGFzbQEAAAABRQtgAX8AYAABf2ACf38AYAN/fn8AYAV/f39/fwBgBH9/f38AYAF/AX9gCH9/f39/f39/AX9gBH9/f38Bf2ACf38Bf2AAAAKOAQYDZW52Bm1lbW9yeQIAAAx3YXNpLWxvZ2dpbmcDbG9nAAQLd2FzaS1yYW5kb20QZ2V0LXJhbmRvbS1ieXRlcwACD3dhc2ktZmlsZXN5c3RlbRB3cml0ZS12aWEtc3RyZWFtAAMJd2FzaS1leGl0BGV4aXQAAAl3YXNpLXBvbGwMd3JpdGUtc3RyZWFtAAUDEhEHCAEICQkIAgAJAQAFBgEACgYLAn8BQQALfwFBAAsHfQgHY29tbWFuZAAFE2NhYmlfaW1wb3J0X3JlYWxsb2MABhNjYWJpX2V4cG9ydF9yZWFsbG9jAAgJcHJvY19leGl0AA0IZmRfd3JpdGUACwtlbnZpcm9uX2dldAAJEWVudmlyb25fc2l6ZXNfZ2V0AAoKcmFuZG9tX2dldAAOCAEVCvsQEQQAAAALawEDfwJAIAANACABDQAQByIAKAIAIgFB/////wdPDQAgACABQQFqNgIAIABBuDJqIgQoAgAhBSAEQQA2AgAgBUUNACAAQbwyaiIEKAIAIQYgBEEANgIAIAYgA0kNACAAIAE2AgAgBQ8LAAALFQEBfwJAEBMiAA0AEA8iABAUCyAAC1wAAkAgAA0AIAENABAHIgAoAgANACAAQX82AgAgAiAAQfIyai8BAGpBf2pBACACa3EiAiADaiIBQY2tA08NACAAQQA2AgAgACABOwHyMiAAIAJqQfTSAGoPCwAAC9gBAQR/AkAQByICKAIAIgNB/////wdPDQAgAiADQQFqIgQ2AgACQCACQdAyaigCACIDRQ0AIAJB1DJqKAIAIgVFDQAgAyAFQQR0aiEFA0AgACABNgIAIAEgAygCACADQQRqIgQoAgD8CgAAIAEgBCgCAGoiAUE9OgAAIAFBAWoiASADQQhqKAIAIANBDGoiBCgCAPwKAAAgASAEKAIAaiIBQQA6AAAgAUEBaiEBIABBBGohACADQRBqIgMgBUcNAAsgAigCACEECyACIARBf2o2AgBBAA8LAAALtQEBA38CQBAHIgIoAgAiA0H/////B08NACACIANBAWo2AgACQAJAAkAgAkHQMmooAgAiBEUNACAAIAJB1DJqKAIAIgM2AgAgAw0BQQAhBAwCC0EAIQQgAEEANgIADAELIANBBHQhACAEQQxqIQNBACEEA0AgBCADQXhqKAIAaiADKAIAakECaiEEIANBEGohAyAAQXBqIgANAAsLIAEgBDYCACACIAIoAgBBf2o2AgBBAA8LAAAL2QIBBH8jAEEQayIEJAACQAJAAkACQCACRQ0AA0AgAUEEaigCACIFDQIgAUEIaiEBIAJBf2oiAg0ACwtBACEBIANBADYCAAwBCyABKAIAIQYQByICKAIAIgFB/////wdPDQEgAiABQQFqNgIAQQghAQJAIAJB8DJqLwEAIABNDQBBCCEBAkACQAJAIAIgAEEwbGpBCGoiACgCAA4EAwEAAAMLIARBzwA6AAogBEHJ3gA7AAhBAiAEQQhqQQMgBiAFEAAgAyAFNgIADAELIARBCGogAEEIaiIHEAwCQCAELwEIRQ0AIAQvAQohAQwCCyAEIAQoAgwgBiAFEBFBHSEBIAQoAgANASAEKAIEIQECQCAHKAIAQQJHDQAgAEEYaiIFIAUpAwAgAa18NwMACyADIAE2AgALQQAhAQsgAiACKAIAQX9qNgIACyAEQRBqJAAgAUH//wNxDwsAAAuoAQECfyMAQRBrIgIkAAJAAkACQAJAIAEoAiBBAUYNACABKAIAQQJHDQEgASgCCCABQRBqKQMAIAJBCGoQAgJAIAItAAgNACABQSRqIAIoAgwiAzYCACABQQE2AiAgACADNgIEQQAhAQwECyAAIAItAAwQEjsBAgwCCyAAIAFBJGooAgA2AgRBACEBDAILIABBCDsBAgtBASEBCyAAIAE7AQAgAkEQaiQACwsAIABBAEcQEAAAC24BA38jAEEQayICJAACQBAHIgMoAgAiBEH/////B08NACADQbwyaiABNgIAIANBuDJqIAA2AgAgAyAEQQFqNgIAIAEgAkEIahABIAIoAgggAEcNACADIAMoAgBBf2o2AgAgAkEQaiQAQQAPCwAAC/oBAQJ/IwBBMGshAAJAQQFAACIBQX9GDQAgAUEQdCIBQgA3AJ0wIAFCADcDmDAgAUIANwOQMCABQgA3A4gwIAFBADsB8jIgAUEANgLoMiABQQA2AuAyIAFBADYC2DIgAUEANgLQMiABQQA2AsgyIAFBADYCwDIgAUIANwO4MiABQQA2ArAwIAFBADYCqDAgAEEoakEANgIAIABBIGpBADYCACAAQQA2AgggAEEBNgIAIAFBCHIgAEEw/AoAACAAQQI2AgAgAUE4ciAAQTD8CgAAIABBAzYCACABQegAciAAQTD8CgAAIAFBAzsB8DIgAUEANgIAIAEPCwAACwYAIAAQAwtCAQF/IwBBEGsiBCQAIAEgAiADIARBCGoQBAJAIAQtAAgiAg0AIAQoAgwhAwsgACADNgIEIAAgAjYCACAEQRBqJAALlQQBAn8jAEEQayEBQQIhAgJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQCAAQf8BcQ5FAEQBAgMEBQYHCAkKCwwNDg8QERITFBUWFxgZGhscHR4fICEiIyQlJicoKSorLC0uLzAxMjM0NTY3ODk6Ozw9Pj9AQUJDAAsgAUEBOwEOIAFBDmohACABLwEODwtBAw8LQQQPC0EFDwtBBg8LQQcPC0EJDwtBCA8LQQoPC0ELDwtBDA8LQQ0PC0EODwtBDw8LQRAPC0ERDwtBEw8LQRQPC0EVDwtBFg8LQRcPC0EYDwtBGQ8LQRoPC0EbDwtBHA8LQR0PC0EeDwtBHw8LQSAPC0EhDwtBIg8LQSMPC0EkDwtBJQ8LQSYPC0EnDwtBKA8LQSkPC0EqDwtBKw8LQSwPC0EtDwtBLg8LQS8PC0EwDwtBMQ8LQTIPC0EzDwtBNA8LQTYPC0E3DwtBOA8LQToPC0E7DwtBPA8LQT0PC0E+DwtBPw8LQcAADwtBxAAPC0HFAA8LQcYADwtBxwAPC0HIAA8LQckADwtBygAPC0HLACECCyACCwQAIwELBgAgACQBCxsBAX9BAUAAIgBBf0YEQAALIABBAWpBEHQkAAsA2wkEbmFtZQGqCRYAVl9aTjIyd2FzaV9zbmFwc2hvdF9wcmV2aWV3MThiaW5kaW5nczEyd2FzaV9sb2dnaW5nM2xvZzEwd2l0X2ltcG9ydDE3aDMxZjI1ZmM3YmY5YzNhOWJFAWNfWk4yMndhc2lfc25hcHNob3RfcHJldmlldzE4YmluZGluZ3MxMXdhc2lfcmFuZG9tMTZnZXRfcmFuZG9tX2J5dGVzMTB3aXRfaW1wb3J0MTdoM2MyOGNhNTkxNjlkYjMwNUUCZ19aTjIyd2FzaV9zbmFwc2hvdF9wcmV2aWV3MThiaW5kaW5nczE1d2FzaV9maWxlc3lzdGVtMTZ3cml0ZV92aWFfc3RyZWFtMTB3aXRfaW1wb3J0MTdoNWQxMTBlZTBlZDA2NDczMEUDU19aTjIyd2FzaV9zbmFwc2hvdF9wcmV2aWV3MThiaW5kaW5nczl3YXNpX2V4aXQ0ZXhpdDEwd2l0X2ltcG9ydDE3aGRjZTljMDRlZDQ4YjI3ZWFFBFxfWk4yMndhc2lfc25hcHNob3RfcHJldmlldzE4YmluZGluZ3M5d2FzaV9wb2xsMTJ3cml0ZV9zdHJlYW0xMHdpdF9pbXBvcnQxN2g4ODYwMGUwYTAzYmE4ZGFlRQUHY29tbWFuZAYTY2FiaV9pbXBvcnRfcmVhbGxvYwc5X1pOMjJ3YXNpX3NuYXBzaG90X3ByZXZpZXcxNVN0YXRlM3B0cjE3aDgwMzdhNThjYzU4MTJkOGNFCBNjYWJpX2V4cG9ydF9yZWFsbG9jCQtlbnZpcm9uX2dldAoRZW52aXJvbl9zaXplc19nZXQLCGZkX3dyaXRlDElfWk4yMndhc2lfc25hcHNob3RfcHJldmlldzE3U3RyZWFtczE2Z2V0X3dyaXRlX3N0cmVhbTE3aGI4OGMyNzVhMjAyYTYzNzhFDQlwcm9jX2V4aXQOCnJhbmRvbV9nZXQPOV9aTjIyd2FzaV9zbmFwc2hvdF9wcmV2aWV3MTVTdGF0ZTNuZXcxN2hmMTgxNTEyMjBlODdhY2NhRRBHX1pOMjJ3YXNpX3NuYXBzaG90X3ByZXZpZXcxOGJpbmRpbmdzOXdhc2lfZXhpdDRleGl0MTdoYjllZmVhMWY3ZTY5N2RiNkURUF9aTjIyd2FzaV9zbmFwc2hvdF9wcmV2aWV3MThiaW5kaW5nczl3YXNpX3BvbGwxMndyaXRlX3N0cmVhbTE3aDhjZjcyMWFhMmQyMmY4ODZFEsMBX1pOMjJ3YXNpX3NuYXBzaG90X3ByZXZpZXcxMTQwXyRMVCRpbXBsJHUyMCRjb3JlLi5jb252ZXJ0Li5Gcm9tJExUJHdhc2lfc25hcHNob3RfcHJldmlldzEuLmJpbmRpbmdzLi53YXNpX2ZpbGVzeXN0ZW0uLkVycm5vJEdUJCR1MjAkZm9yJHUyMCR3YXNpLi5saWJfZ2VuZXJhdGVkLi5FcnJubyRHVCQ0ZnJvbTE3aDgxZDc4MWZhMDE4NTY0ZWVFEw5nZXRfZ2xvYmFsX3B0chQOc2V0X2dsb2JhbF9wdHIVGGluaXRpYWxpemVfc3RhY2tfcG9pbnRlcgcnAgAPX19zdGFja19wb2ludGVyARNpbnRlcm5hbF9nbG9iYWxfcHRy');
  const module1 = fetchCompile(new URL('./markdown.core.wasm', import.meta.url));
  const module2 = base64Compile('AGFzbQEAAAABLQdgBX9/f39/AGACf38AYAN/fn8AYAR/f39/AGAEf39/fwF/YAJ/fwF/YAF/AAMKCQABAgMEBQUFBgQFAXABCQkHMAoBMAAAATEAAQEyAAIBMwADATQABAE1AAUBNgAGATcABwE4AAgIJGltcG9ydHMBAAp7CREAIAAgASACIAMgBEEAEQAACwsAIAAgAUEBEQEACw0AIAAgASACQQIRAgALDwAgACABIAIgA0EDEQMACw8AIAAgASACIANBBBEEAAsLACAAIAFBBREFAAsLACAAIAFBBhEFAAsLACAAIAFBBxEFAAsJACAAQQgRBgAL');
  const module3 = base64Compile('AGFzbQEAAAABLQdgBX9/f39/AGACf38AYAN/fn8AYAR/f39/AGAEf39/fwF/YAJ/fwF/YAF/AAI9CgABMAAAAAExAAEAATIAAgABMwADAAE0AAQAATUABQABNgAFAAE3AAUAATgABgAIJGltcG9ydHMBcAEJCQkPAQBBAAsJAAECAwQFBgcI');
  Promise.all([module0, module1, module2, module3]).catch(() => {});
  
  ({ exports: exports0 } = await instantiateCore(await module2));
  
  ({ exports: exports1 } = await instantiateCore(await module1, {
    wasi_snapshot_preview1: {
      environ_get: exports0['6'],
      environ_sizes_get: exports0['7'],
      fd_write: exports0['4'],
      proc_exit: exports0['8'],
      random_get: exports0['5'],
    },
  }));
  
  function lowering0(arg0) {
    let variant0;
    switch (arg0) {
      case 0: {
        variant0= {
          tag: 'ok',
          val: undefined
        };
        break;
      }
      case 1: {
        variant0= {
          tag: 'err',
          val: undefined
        };
        break;
      }
      default: {
        throw new TypeError('invalid variant discriminant for expected');
      }
    }
    lowering0Callee(variant0);
  }
  
  ({ exports: exports2 } = await instantiateCore(await module0, {
    env: {
      memory: exports1.memory,
    },
    'wasi-exit': {
      exit: lowering0,
    },
    'wasi-filesystem': {
      'write-via-stream': exports0['2'],
    },
    'wasi-logging': {
      log: exports0['0'],
    },
    'wasi-poll': {
      'write-stream': exports0['3'],
    },
    'wasi-random': {
      'get-random-bytes': exports0['1'],
    },
  }));
  memory0 = exports1.memory;
  
  function lowering1(arg0, arg1, arg2, arg3, arg4) {
    let enum0;
    switch (arg0) {
      case 0: {
        enum0 = 'trace';
        break;
      }
      case 1: {
        enum0 = 'debug';
        break;
      }
      case 2: {
        enum0 = 'info';
        break;
      }
      case 3: {
        enum0 = 'warn';
        break;
      }
      case 4: {
        enum0 = 'error';
        break;
      }
      default: {
        throw new TypeError('invalid discriminant specified for Level');
      }
    }
    const ptr1 = arg1;
    const len1 = arg2;
    const result1 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr1, len1));
    const ptr2 = arg3;
    const len2 = arg4;
    const result2 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr2, len2));
    lowering1Callee(enum0, result1, result2);
  }
  realloc0 = exports2.cabi_import_realloc;
  
  function lowering2(arg0, arg1) {
    const ret = lowering2Callee(arg0 >>> 0);
    const val0 = ret;
    const len0 = val0.byteLength;
    const ptr0 = realloc0(0, 0, 1, len0 * 1);
    const src0 = new Uint8Array(val0.buffer || val0, val0.byteOffset, len0 * 1);
    (new Uint8Array(memory0.buffer, ptr0, len0 * 1)).set(src0);
    dataView(memory0).setInt32(arg1 + 4, len0, true);
    dataView(memory0).setInt32(arg1 + 0, ptr0, true);
  }
  
  function lowering3(arg0, arg1, arg2) {
    let ret;
    try {
      ret = { tag: 'ok', val: lowering3Callee(arg0 >>> 0, BigInt.asUintN(64, arg1)) };
    } catch (e) {
      ret = { tag: 'err', val: getErrorPayload(e) };
    }
    const variant1 = ret;
    switch (variant1.tag) {
      case 'ok': {
        const e = variant1.val;
        dataView(memory0).setInt8(arg2 + 0, 0, true);
        dataView(memory0).setInt32(arg2 + 4, toUint32(e), true);
        break;
      }
      case 'err': {
        const e = variant1.val;
        dataView(memory0).setInt8(arg2 + 0, 1, true);
        const val0 = toString(e);
        let enum0;
        switch (val0) {
          case 'toobig': {
            enum0 = 0;
            break;
          }
          case 'access': {
            enum0 = 1;
            break;
          }
          case 'addrinuse': {
            enum0 = 2;
            break;
          }
          case 'addrnotavail': {
            enum0 = 3;
            break;
          }
          case 'afnosupport': {
            enum0 = 4;
            break;
          }
          case 'again': {
            enum0 = 5;
            break;
          }
          case 'already': {
            enum0 = 6;
            break;
          }
          case 'badmsg': {
            enum0 = 7;
            break;
          }
          case 'badf': {
            enum0 = 8;
            break;
          }
          case 'busy': {
            enum0 = 9;
            break;
          }
          case 'canceled': {
            enum0 = 10;
            break;
          }
          case 'child': {
            enum0 = 11;
            break;
          }
          case 'connaborted': {
            enum0 = 12;
            break;
          }
          case 'connrefused': {
            enum0 = 13;
            break;
          }
          case 'connreset': {
            enum0 = 14;
            break;
          }
          case 'deadlk': {
            enum0 = 15;
            break;
          }
          case 'destaddrreq': {
            enum0 = 16;
            break;
          }
          case 'dquot': {
            enum0 = 17;
            break;
          }
          case 'exist': {
            enum0 = 18;
            break;
          }
          case 'fault': {
            enum0 = 19;
            break;
          }
          case 'fbig': {
            enum0 = 20;
            break;
          }
          case 'hostunreach': {
            enum0 = 21;
            break;
          }
          case 'idrm': {
            enum0 = 22;
            break;
          }
          case 'ilseq': {
            enum0 = 23;
            break;
          }
          case 'inprogress': {
            enum0 = 24;
            break;
          }
          case 'intr': {
            enum0 = 25;
            break;
          }
          case 'inval': {
            enum0 = 26;
            break;
          }
          case 'io': {
            enum0 = 27;
            break;
          }
          case 'isconn': {
            enum0 = 28;
            break;
          }
          case 'isdir': {
            enum0 = 29;
            break;
          }
          case 'loop': {
            enum0 = 30;
            break;
          }
          case 'mfile': {
            enum0 = 31;
            break;
          }
          case 'mlink': {
            enum0 = 32;
            break;
          }
          case 'msgsize': {
            enum0 = 33;
            break;
          }
          case 'multihop': {
            enum0 = 34;
            break;
          }
          case 'nametoolong': {
            enum0 = 35;
            break;
          }
          case 'netdown': {
            enum0 = 36;
            break;
          }
          case 'netreset': {
            enum0 = 37;
            break;
          }
          case 'netunreach': {
            enum0 = 38;
            break;
          }
          case 'nfile': {
            enum0 = 39;
            break;
          }
          case 'nobufs': {
            enum0 = 40;
            break;
          }
          case 'nodev': {
            enum0 = 41;
            break;
          }
          case 'noent': {
            enum0 = 42;
            break;
          }
          case 'noexec': {
            enum0 = 43;
            break;
          }
          case 'nolck': {
            enum0 = 44;
            break;
          }
          case 'nolink': {
            enum0 = 45;
            break;
          }
          case 'nomem': {
            enum0 = 46;
            break;
          }
          case 'nomsg': {
            enum0 = 47;
            break;
          }
          case 'noprotoopt': {
            enum0 = 48;
            break;
          }
          case 'nospc': {
            enum0 = 49;
            break;
          }
          case 'nosys': {
            enum0 = 50;
            break;
          }
          case 'notdir': {
            enum0 = 51;
            break;
          }
          case 'notempty': {
            enum0 = 52;
            break;
          }
          case 'notrecoverable': {
            enum0 = 53;
            break;
          }
          case 'notsup': {
            enum0 = 54;
            break;
          }
          case 'notty': {
            enum0 = 55;
            break;
          }
          case 'nxio': {
            enum0 = 56;
            break;
          }
          case 'overflow': {
            enum0 = 57;
            break;
          }
          case 'ownerdead': {
            enum0 = 58;
            break;
          }
          case 'perm': {
            enum0 = 59;
            break;
          }
          case 'pipe': {
            enum0 = 60;
            break;
          }
          case 'range': {
            enum0 = 61;
            break;
          }
          case 'rofs': {
            enum0 = 62;
            break;
          }
          case 'spipe': {
            enum0 = 63;
            break;
          }
          case 'srch': {
            enum0 = 64;
            break;
          }
          case 'stale': {
            enum0 = 65;
            break;
          }
          case 'timedout': {
            enum0 = 66;
            break;
          }
          case 'txtbsy': {
            enum0 = 67;
            break;
          }
          case 'xdev': {
            enum0 = 68;
            break;
          }
          default: {
            throw new TypeError(`"${val0}" is not one of the cases of errno`);
          }
        }
        dataView(memory0).setInt8(arg2 + 4, enum0, true);
        break;
      }
      default: {
        throw new TypeError('invalid variant specified for result');
      }
    }
  }
  
  function lowering4(arg0, arg1, arg2, arg3) {
    const ptr0 = arg1;
    const len0 = arg2;
    const result0 = new Uint8Array(memory0.buffer.slice(ptr0, ptr0 + len0 * 1));
    let ret;
    try {
      ret = { tag: 'ok', val: lowering4Callee(arg0 >>> 0, result0) };
    } catch (e) {
      ret = { tag: 'err', val: getErrorPayload(e) };
    }
    const variant2 = ret;
    switch (variant2.tag) {
      case 'ok': {
        const e = variant2.val;
        dataView(memory0).setInt8(arg3 + 0, 0, true);
        dataView(memory0).setInt32(arg3 + 4, toUint32(e), true);
        break;
      }
      case 'err': {
        const e = variant2.val;
        dataView(memory0).setInt8(arg3 + 0, 1, true);
        const { } = e;
        break;
      }
      default: {
        throw new TypeError('invalid variant specified for result');
      }
    }
  }
  
  ({ exports: exports3 } = await instantiateCore(await module3, {
    '': {
      $imports: exports0.$imports,
      '0': lowering1,
      '1': lowering2,
      '2': lowering3,
      '3': lowering4,
      '4': exports2.fd_write,
      '5': exports2.random_get,
      '6': exports2.environ_get,
      '7': exports2.environ_sizes_get,
      '8': exports2.proc_exit,
    },
  }));
  realloc1 = exports1.cabi_realloc;
  postReturn0 = exports1.cabi_post_render;
  realloc2 = exports2.cabi_export_realloc;
  _initialized = true;
})();
