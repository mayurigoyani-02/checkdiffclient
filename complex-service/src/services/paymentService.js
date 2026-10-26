
// SERVICE - business logic, changes here impact payment endpoints only
export class PaymentService {
  async createPayment(data) {
    if (data.amount < 1) throw new Error('Amount too low');
    return { id: 'pay_'+Date.now(), ...data };
  }
  async refundPayment(paymentId, amount) {
    return { refundId: 're_'+Date.now(), paymentId, amount };
  }
  async validateCurrency(currency) {
    return ['USD','EUR','INR'].includes(currency);
  }
}
