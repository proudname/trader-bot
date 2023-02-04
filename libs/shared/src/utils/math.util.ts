import * as MH from 'mathjs';

export const getSumByPercent = (sum: number, prc: number): number => {
  const rate = Math.abs(prc) / 100;
  let rateBySign = 0;
  switch (Math.sign(prc)) {
    case 1:
      rateBySign = rate + 1;
      break;
    case -1:
      rateBySign = 1 - rate;
      break;
    default: return sum;
  }
  return MH.chain(rateBySign).multiply(sum).done()
};


export const toFixedNum = (num: number, precision = 2, type: 'floor'|'ceil' = 'floor') => {
  const multiplier = Math.pow(10, precision);
  return Math[type](num * multiplier) * multiplier;
}
