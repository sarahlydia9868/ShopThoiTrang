import { HashAlgorithm, VNPay, ignoreLogger } from 'vnpay';
import config from './config';

const vnpay = new VNPay({
    tmnCode: config.VNP_TMNCODE,
    secureSecret: config.VNP_HASHSECRET,
    vnpayHost: 'https://sandbox.vnpayment.vn',
    testMode: true,
    hashAlgorithm: HashAlgorithm.SHA512,
    loggerFn: ignoreLogger,
});

export default vnpay;