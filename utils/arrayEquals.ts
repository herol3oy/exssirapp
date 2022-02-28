export const arrayEquals = (
  todayBeytSecondPartRandomized: string[],
  beytSecondPartRightOrder: string[]
) => {
  return (
    Array.isArray(todayBeytSecondPartRandomized) &&
    Array.isArray(beytSecondPartRightOrder) &&
    todayBeytSecondPartRandomized.length === beytSecondPartRightOrder.length &&
    todayBeytSecondPartRandomized.every(
      (value, index) => value === beytSecondPartRightOrder[index]
    )
  )
}
