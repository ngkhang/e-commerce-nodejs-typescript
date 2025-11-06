/**
 * Extracts specified properties from an `object`
 * @param object - The source object
 * @param fields - The property names to extract
 * @returns A new object containing only the specified properties
 *
 * @example
 * ```typescript
 * const user = { id: 1, name: 'John', password: 'secret' };
 * const public = pickFields(user, ['id', 'name']);
 * // Returns: { id: 1, name: 'John' }
 * ```
 */
export const pickFields = <T extends object, K extends keyof T>(object: T, fields: K[]): Pick<T, K> =>
  fields.reduce(
    (obj, field) => {
      obj[field] = object[field];
      return obj;
    },
    {} as Pick<T, K>,
  );
