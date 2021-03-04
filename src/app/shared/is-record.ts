export function isRecord<T>(record: T): record is NonNullable<T> {
  return 'object' === typeof record && null !== record;
}
