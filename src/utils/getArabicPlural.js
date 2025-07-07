function getArabicPlural(number, singular, dual, plural) {
  // Check if the number is 1 (singular)
  if (number === 1) {
    return singular;
  }

  // Check if the number is 2 (dual)
  if (number === 2) {
    return dual;
  }

  // Check if the number is greater than 2 and less than 11 (for special plural rules)
  if (number >= 3 && number <= 10) {
    return plural;  // Return regular plural
  }

  // Handle the general case for numbers greater than 10
  return plural;  // Return regular plural
}
export default getArabicPlural