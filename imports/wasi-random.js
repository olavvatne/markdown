
export const getRandomBytes = function(len) {
  const crypto = window.crypto
  if (!crypto || crypto.getRandomValues) {
    const fallback = Array.from(
      {length: len}, () => Math.floor(Math.random() * len));
    return new Uint8Array(fallback)
  }
  const array = new Uint8Array(len);
  crypto.getRandomValues(array);
  return array;
}