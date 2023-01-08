export type Descriptor = number;
export type DirEntryStream = number;
export type WasiStream = number;
export type Size = number;
export type Filesize = bigint;
export type Filedelta = bigint;
export type Timestamp = bigint;
/**
 * # Variants
 * 
 * ## `"unknown"`
 * 
 * ## `"block-device"`
 * 
 * ## `"character-device"`
 * 
 * ## `"directory"`
 * 
 * ## `"fifo"`
 * 
 * ## `"symbolic-link"`
 * 
 * ## `"regular-file"`
 * 
 * ## `"socket"`
 */
export type DescriptorType = 'unknown' | 'block-device' | 'character-device' | 'directory' | 'fifo' | 'symbolic-link' | 'regular-file' | 'socket';
export interface DescriptorFlags {
  read?: boolean,
  write?: boolean,
  dsync?: boolean,
  nonblock?: boolean,
  rsync?: boolean,
  sync?: boolean,
}
export type Device = bigint;
export type Inode = bigint;
export type Linkcount = bigint;
export interface DescriptorStat {
  dev: Device,
  ino: Inode,
  type: DescriptorType,
  nlink: Linkcount,
  size: Filesize,
  atim: Timestamp,
  mtim: Timestamp,
  ctim: Timestamp,
}
export interface AtFlags {
  symlinkFollow?: boolean,
}
export interface OFlags {
  create?: boolean,
  directory?: boolean,
  excl?: boolean,
  trunc?: boolean,
}
export interface Mode {
  readable?: boolean,
  writeable?: boolean,
  executable?: boolean,
}
export type NewTimestamp = NewTimestampNoChange | NewTimestampNow | NewTimestampTimestamp;
export interface NewTimestampNoChange {
  tag: 'no-change',
}
export interface NewTimestampNow {
  tag: 'now',
}
export interface NewTimestampTimestamp {
  tag: 'timestamp',
  val: Timestamp,
}
export interface DirEntry {
  ino?: Inode,
  type: DescriptorType,
  name: string,
}
/**
 * # Variants
 * 
 * ## `"toobig"`
 * 
 * ## `"access"`
 * 
 * ## `"addrinuse"`
 * 
 * ## `"addrnotavail"`
 * 
 * ## `"afnosupport"`
 * 
 * ## `"again"`
 * 
 * ## `"already"`
 * 
 * ## `"badmsg"`
 * 
 * ## `"badf"`
 * 
 * ## `"busy"`
 * 
 * ## `"canceled"`
 * 
 * ## `"child"`
 * 
 * ## `"connaborted"`
 * 
 * ## `"connrefused"`
 * 
 * ## `"connreset"`
 * 
 * ## `"deadlk"`
 * 
 * ## `"destaddrreq"`
 * 
 * ## `"dquot"`
 * 
 * ## `"exist"`
 * 
 * ## `"fault"`
 * 
 * ## `"fbig"`
 * 
 * ## `"hostunreach"`
 * 
 * ## `"idrm"`
 * 
 * ## `"ilseq"`
 * 
 * ## `"inprogress"`
 * 
 * ## `"intr"`
 * 
 * ## `"inval"`
 * 
 * ## `"io"`
 * 
 * ## `"isconn"`
 * 
 * ## `"isdir"`
 * 
 * ## `"loop"`
 * 
 * ## `"mfile"`
 * 
 * ## `"mlink"`
 * 
 * ## `"msgsize"`
 * 
 * ## `"multihop"`
 * 
 * ## `"nametoolong"`
 * 
 * ## `"netdown"`
 * 
 * ## `"netreset"`
 * 
 * ## `"netunreach"`
 * 
 * ## `"nfile"`
 * 
 * ## `"nobufs"`
 * 
 * ## `"nodev"`
 * 
 * ## `"noent"`
 * 
 * ## `"noexec"`
 * 
 * ## `"nolck"`
 * 
 * ## `"nolink"`
 * 
 * ## `"nomem"`
 * 
 * ## `"nomsg"`
 * 
 * ## `"noprotoopt"`
 * 
 * ## `"nospc"`
 * 
 * ## `"nosys"`
 * 
 * ## `"notdir"`
 * 
 * ## `"notempty"`
 * 
 * ## `"notrecoverable"`
 * 
 * ## `"notsup"`
 * 
 * ## `"notty"`
 * 
 * ## `"nxio"`
 * 
 * ## `"overflow"`
 * 
 * ## `"ownerdead"`
 * 
 * ## `"perm"`
 * 
 * ## `"pipe"`
 * 
 * ## `"range"`
 * 
 * ## `"rofs"`
 * 
 * ## `"spipe"`
 * 
 * ## `"srch"`
 * 
 * ## `"stale"`
 * 
 * ## `"timedout"`
 * 
 * ## `"txtbsy"`
 * 
 * ## `"xdev"`
 */
export type Errno = 'toobig' | 'access' | 'addrinuse' | 'addrnotavail' | 'afnosupport' | 'again' | 'already' | 'badmsg' | 'badf' | 'busy' | 'canceled' | 'child' | 'connaborted' | 'connrefused' | 'connreset' | 'deadlk' | 'destaddrreq' | 'dquot' | 'exist' | 'fault' | 'fbig' | 'hostunreach' | 'idrm' | 'ilseq' | 'inprogress' | 'intr' | 'inval' | 'io' | 'isconn' | 'isdir' | 'loop' | 'mfile' | 'mlink' | 'msgsize' | 'multihop' | 'nametoolong' | 'netdown' | 'netreset' | 'netunreach' | 'nfile' | 'nobufs' | 'nodev' | 'noent' | 'noexec' | 'nolck' | 'nolink' | 'nomem' | 'nomsg' | 'noprotoopt' | 'nospc' | 'nosys' | 'notdir' | 'notempty' | 'notrecoverable' | 'notsup' | 'notty' | 'nxio' | 'overflow' | 'ownerdead' | 'perm' | 'pipe' | 'range' | 'rofs' | 'spipe' | 'srch' | 'stale' | 'timedout' | 'txtbsy' | 'xdev';
/**
 * # Variants
 * 
 * ## `"normal"`
 * 
 * ## `"sequential"`
 * 
 * ## `"random"`
 * 
 * ## `"will-need"`
 * 
 * ## `"dont-need"`
 * 
 * ## `"no-reuse"`
 */
export type Advice = 'normal' | 'sequential' | 'random' | 'will-need' | 'dont-need' | 'no-reuse';
export namespace WasiFilesystem {
  export function writeViaStream(fd: Descriptor, offset: Filesize): WasiStream;
}
