export const deepMerge = <T extends Record<string, unknown>>(
  target: T,
  source: Record<string, unknown>,
): T => {
  if (typeof target !== 'object' || typeof source !== 'object') return source as T

  const targetClone = Object.assign({}, target) as T

  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      if (Object.prototype.hasOwnProperty.call(targetClone, key)) {
        if (
          typeof targetClone[key] === 'object' &&
          typeof source[key] === 'object' &&
          targetClone[key] !== null &&
          source[key] !== null
        ) {
          ;(targetClone as Record<string, unknown>)[key] = deepMerge(
            targetClone[key] as Record<string, unknown>,
            source[key] as Record<string, unknown>,
          )
        } else {
          ;(targetClone as Record<string, unknown>)[key] = source[key]
        }
      } else {
        ;(targetClone as Record<string, unknown>)[key] = source[key]
      }
    }
  }

  return targetClone
}
