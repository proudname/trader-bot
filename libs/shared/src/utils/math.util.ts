import {all, create} from 'mathjs';


export const math = create({all})

math.config({
    number: 'Fraction',
})

export const getSumByPercent = (sum: number, prc: number): number => {
    const rate = math.chain(prc).abs().divide(100).done();
    let rateBySign = 0;
    switch (math.sign(prc)) {
        case 1:
            rateBySign = math.sum(rate, 1);
            break;
        case -1:
            rateBySign = math.subtract(1, rate);
            break;
        default:
            return sum;
    }
    return math.multiply(rateBySign, sum);
};


