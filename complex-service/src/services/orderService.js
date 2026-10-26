
export class OrderService {
  calculateTotal(items) { return items.reduce((s,i) => s + i.price * i.qty, 0); }
  applyDiscount(total, code) {
    if (code === 'SAVE10') return total * 0.9;
    return total;
  }
}
