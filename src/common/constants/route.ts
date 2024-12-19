export const ROUTES = {
  HOME: '/',
  PURCHASES: '/transaction/purchases',
  SALES: '/transaction/sales',
  PAYMENT_SUCCESS: '/payment-success',
  BUY_CARS_DETAIL: (id: string) => `/buy-cars/${id}`,
  SALES_SALE_DETAIL: (id: string) => `/transaction/sales/${id}`,
} as const;
