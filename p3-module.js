/*
    CIT 281 Project 3
    Name: Arissa Samaniego
*/

function coinCombo(amount) {
    if (amount < 0) {
        return {
            amount: amount,
            combinations: [],
            totalCombinations: 0,
        };
    }

const coins = [1, 5, 10, 25, 50, 100];
const coinNames = ['pennies', 'nickels', 'dimes', 'quarters', 'halves', 'dollars'];
let combinations = [];

function findCombinations(remainingAmount, currentCombination = Array(coins.length).fill(0), index = 0) {
    if (remainingAmount === 0) {
        let combinationObj = coinNames.reduce((obj, coin, idx) => {
            obj [coin] = currentCombination[idx] || 0;
            return obj;
    }, {});
    combinations.push(combinationObj);
    return;
    }

    for (let i = index; i < coins.length; i++){
        if (coins[i] <= remainingAmount) {
            let newCombination = [...currentCombination];
            newCombination[i]++;
            findCombinations(remainingAmount - coins[i], newCombination, i);
        }
    }
}

findCombinations(amount);
return {
    amount: amount,
    combinations: combinations,
    totalCombinations: combinations.length,
};
}

function coinValue(coinCounts) {
    const {
        pennies = 0,
        nickels = 0,
        dimes = 0,
        quarters = 0,
        halves = 0,
        dollars = 0
    } = coinCounts;

    const p = Number(pennies);
    const n = Number(nickels);
    const d = Number(dimes);
    const q = Number(quarters);
    const h = Number(halves);
    const dl = Number(dollars);

    const totalCents = p + n * 5 + d * 10 + q * 25 + h * 50 + dl * 100;
    const totalDollars = (totalCents / 100).toFixed(2);

    return {
        coins: coinCounts,
        totalCents,
        totalDollars
    };
}

module.exports = { coinCombo, coinValue };
// ----------------------------
// Manual Test Cases
// ----------------------------
if (require.main === module) {

    console.log('\n===== Manual Tests for coinCombo() =====');
    const testCombo1 = coinCombo(5);
    console.log(`Test 1 - coinCombo(5)`);
    console.log(`Expected combinations > 0, Actual: ${testCombo1.totalCombinations}`);
    console.log('Sample:', testCombo1.combinations.slice(0, 3));
  
    const testCombo2 = coinCombo(0);
    console.log(`\nTest 2 - coinCombo(0)`);
    console.log(`Expected: 1 combination with all zeros`);
    console.log('Actual:', testCombo2.combinations);
  
    const testCombo3 = coinCombo(-5);
    console.log(`\nTest 3 - coinCombo(-5)`);
    console.log(`Expected: 0 combinations`);
    console.log('Actual:', testCombo3.totalCombinations);
  
    console.log('\n===== Manual Tests for coinValue() =====');
    const testValue1 = coinValue({ pennies: 4, nickels: 1, dimes: 2, quarters: 1, halves: 0, dollars: 1 });
    console.log(`Test 1 - coinValue({4p,1n,2d,1q,0h,1$})`);
    console.log(`Expected cents: 4 + 5 + 20 + 25 + 0 + 100 = 154`);
    console.log('Actual:', testValue1.totalCents, `($${testValue1.totalDollars})`);
  
    const testValue2 = coinValue({});
    console.log(`\nTest 2 - coinValue({})`);
    console.log(`Expected: 0 cents`);
    console.log('Actual:', testValue2.totalCents, `($${testValue2.totalDollars})`);
  
    const testValue3 = coinValue({ pennies: '10', nickels: '2', dollars: '1' });
    console.log(`\nTest 3 - coinValue(string inputs)`);
    console.log(`Expected: 10 + 10 + 100 = 120`);
    console.log('Actual:', testValue3.totalCents, `($${testValue3.totalDollars})`);
  }
  
  