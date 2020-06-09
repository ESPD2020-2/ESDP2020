export const apiURL = "http://localhost:8000";

export const links = [
  {path: '/about', name: 'о нас'},
  {path: '/add-order', name: 'форма заказа'},
  {path: '/faq', name: 'faq'},
  {path: '/contacts', name: 'контакты'},
  {path: '/couriers', name: 'курьер'},
];

export const admLinks = [
  {path: '/orders/created', name: 'Заказы', role: ['admin', 'super_admin', 'operator']},
  {path: '/orders/published', name: 'Курьерская', role: ['admin', 'super_admin','courier']},
  {path: '/orders/accepted', name: 'В процессе', role: ['admin', 'super_admin', 'operator']},
  {path: '/orders/courier/accepted', name: 'Мои заказы', role: ['courier']},
  {path: '/users', name: 'Пользователи', role: ['admin', 'super_admin']}
];