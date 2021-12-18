import { Order, OrderStore } from '../../models/order';

const store = new OrderStore();

const orders: Order[] = [
  {
    order_id: 125,
    user_id: 1,
    order_status: 'active',
  },
];

describe('Order Model', () => {
  it('should have a show method', () => {
    expect(store.show).toBeDefined();
  });

  it('show method should return active orders by user_id', async () => {
    const result = await store.show(1);
    const o = jasmine.objectContaining(orders[0]);
    expect(result).toEqual(o);
  });
});
