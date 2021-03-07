import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const ProductsCode = React.lazy(() => import('./views/productsCode/ProductsCode'))
const Suppliers = React.lazy(() => import('./views/suppliers/Suppliers'))
const Shops = React.lazy(() => import('./views/shops/Shops'))
const Employees = React.lazy(() => import('./views/employees/Employees'))
const GR = React.lazy(() => import('./views/goodsreceipts/Goodsreceipts'))
const Deliveries = React.lazy(() => import('./views/deliveries/Deliveries'))
const Sales = React.lazy(() => import('./views/sales/Sales'))
const Balances = React.lazy(() => import('./views/balances/Balances'))
const Incomes = React.lazy(() => import('./views/incomes/Incomes'))
const Expenses = React.lazy(() => import('./views/expenses/Expenses'))
const Help = React.lazy(() => import('./views/help/Help'))
const Payments = React.lazy(() => import('./views/payments/Payments'))
const Products = React.lazy(() => import('./views/products/Products'))
const Settings = React.lazy(() => import('./views/settings/Settings'))
const Grossprofit = React.lazy(() => import('./views/grossprofit/Grossprofit'))
const Nettprofit = React.lazy(() => import('./views/nettprofit/Nettprofit'))
const routes = [
  { path: '/', exact: true, name: 'Home', auth: 1 },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard, auth: 1 },
  { path: '/products-code', name: 'ProductsCode', component: ProductsCode, auth: 1 },
  { path: '/suppliers', name: 'Supplier', component: Suppliers, auth: 1 },
  { path: '/shops', name: 'Toko', component: Shops, auth: 1 },
  { path: '/employees', name: 'Karyawan', component: Employees, auth: 1 },
  { path: '/goods-receipt', name: 'Barang Masuk', component: GR, auth: 1 },
  { path: '/deliveries', name: 'Barang Keluar', component: Deliveries, auth: 1 },
  { path: '/sales', name: 'Penjualan', component: Sales, auth: 1 },
  { path: '/balance', name: 'Keuangan', component: Balances, auth: 1 },
  { path: '/incomes', name: 'Pemasukan', component: Incomes, auth: 1 },
  { path: '/expenses', name: 'Pengeluaran', component: Expenses, auth: 1 },
  { path: '/help', name: 'Bantuan', component: Help, auth: 1 },
  { path: '/payments', name: 'Pembayaran', component: Payments, auth: 1 },
  { path: '/products', name: 'Produk', component: Products, auth: 1 },
  { path: '/gross-profit', name: 'Laba Kotor', component: Grossprofit, auth: 1 },
  { path: '/nett-profit', name: 'Laba Bersih', component: Nettprofit, auth: 1 },
  { path: '/settings', name: 'Pengaturan Akun', component: Settings, auth: 1 },
]

export default routes;
