import { request } from './request';

export function getOrders() {
  return request(`orders`);
}

export function getOrder(id) {
  return request(`orders/${id}`);
}

export function postOrder(order) {
  return request(`orders`, {
    method: 'POST',
    body: JSON.stringify(order),
  });
}
