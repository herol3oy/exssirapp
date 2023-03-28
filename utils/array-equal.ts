export const arrayEqual = (
  todayBeytSecondPartRandomized: string[],
  beytSecondPartRightOrder: string[]
): boolean => {
  return (
    Array.isArray(todayBeytSecondPartRandomized) &&
    Array.isArray(beytSecondPartRightOrder) &&
    todayBeytSecondPartRandomized.length === beytSecondPartRightOrder.length &&
    todayBeytSecondPartRandomized.every(
      (value, index) => value === beytSecondPartRightOrder[index]
    )
  )
}
