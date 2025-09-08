export function forceInt(n: unknown, message: string): number {
  if (typeof n === 'string') {
    const casted = parseInt(n, 10);
    if (Number.isNaN(casted)) {
      throw new Error(message ?? `Cannot cast ${n} to int`);
    }
    return casted;
  }
  if (typeof n === 'number') {
    return n;
  }
  throw new Error(message ?? `Cannot cast ${typeof n} to int`);
}


export function forceBool(n: unknown, message: string): boolean {
  if (typeof n === 'boolean') {
    return Boolean(n);
  }
  throw new Error(message ?? `Cannot cast ${typeof n} to boolean`);
}
