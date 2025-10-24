function avg(numbers) {
  if (numbers.length === 0) {
    return 0; 
  }
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
  return sum / numbers.length;
}

module.exports = avg ;