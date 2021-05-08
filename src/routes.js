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
const PayBuys = React.lazy(() => import('./views/payBuys/PayBuys'))
const Customers = React.lazy(() => import('./views/customers/Customers'))
const Products = React.lazy(() => import('./views/products/Products'))
const Metrics = React.lazy(() => import('./views/metrics/Metrics'))
const QtyProducts = React.lazy(() => import('./views/qtyProducts/QtyProducts'))
const Drivers = React.lazy(() => import('./views/drivers/Drivers'))
const Users = React.lazy(() => import('./views/users/Users'))
const Settings = React.lazy(() => import('./views/settings/Settings'))
const PaySells = React.lazy(() => import('./views/paySells/PaySells'))
const Nettprofit = React.lazy(() => import('./views/nettprofit/Nettprofit'))
const SaleTransactions = React.lazy(() => import('./views/saleTransactions/SaleTransactions'))
const BuyTransactions = React.lazy(() => import('./views/buyTransactions/BuyTransactions'))
const ReturnSaleTransactions = React.lazy(() => import('./views/returnSaleTransactions/ReturnSaleTransactions'))
const ReturnBuyTransactions = React.lazy(() => import('./views/returnBuyTransactions/ReturnBuyTransactions'))
const Debts = React.lazy(() => import('./views/debts/Debts'))
const KanvasTakeStocks = React.lazy(() => import('./views/kanvasTakeStocks/KanvasTakeStocks'))
const KanvasReturnStocks = React.lazy(() => import('./views/kanvasReturnStocks/KanvasReturnStocks'))
const KanvasTransactions = React.lazy(() => import('./views/kanvasTransactions/KanvasTransactions'))
const PricePercents = React.lazy(() => import('./views/pricePercents/PricePercents'))
const ReportSaleTransactions = React.lazy(() => import('./views/reportSaleTransactions/ReportSaleTransactions'))
const ReportBuyTransactions = React.lazy(() => import('./views/reportBuyTransactions/ReportBuyTransactions'))
const routes = [
  { path: '/', exact: true, name: 'Home', auth: 1 },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard, auth: 1 },
  { path: '/products-code', name: 'ProductsCode', component: ProductsCode, auth: 1 },
  { path: '/suppliers', name: 'Supplier', component: Suppliers, auth: 1 },
  { path: '/shops', name: 'Toko', component: Shops, auth: 1 },
  { path: '/employees', name: 'Karyawan', component: Employees, auth: 1 },
  { path: '/goods-receipt', name: 'Barang Masuk', component: GR, auth: 1 },
  { path: '/deliveries', name: 'Barang Keluar', component: Deliveries, auth: 1 },
  { path: '/sales', name: 'Sales', component: Sales, auth: 1 },
  { path: '/balance', name: 'Keuangan', component: Balances, auth: 1 },
  { path: '/incomes', name: 'Pemasukan', component: Incomes, auth: 1 },
  { path: '/expenses', name: 'Pengeluaran', component: Expenses, auth: 1 },
  { path: '/help', name: 'Bantuan', component: Help, auth: 1 },
  { path: '/pay-buys', name: 'Pembelian (Utang)', component: PayBuys, auth: 1 },
  { path: '/pay-sells', name: 'Penjualan (Piutang)', component: PaySells, auth: 1 },
  { path: '/products', name: 'Produk', component: Products, auth: 1 },
  { path: '/metrics', name: 'Produk', component: Metrics, auth: 1 },
  { path: '/qty-products', name: 'Qty Produk', component: QtyProducts, auth: 1 },
  { path: '/nett-profit', name: 'Laba Bersih', component: Nettprofit, auth: 1 },
  { path: '/settings', name: 'Pengaturan Akun', component: Settings, auth: 1 },
  { path: '/customers', name: 'Pelanggan', component: Customers, auth: 1 },
  { path: '/drivers', name: 'Supir', component: Drivers, auth: 1 },
  { path: '/users', name: 'Pengguna', component: Users, auth: 1 },
  { path: '/sale-transactions', name: 'Penjualan', component: SaleTransactions, auth: 1 },
  { path: '/buy-transactions', name: 'Pembelian', component: BuyTransactions, auth: 1 },
  { path: '/return-sale-transactions', name: 'Retur Penjualan', component: ReturnSaleTransactions, auth: 1 },
  { path: '/return-buy-transactions', name: 'Retur Pembelian', component: ReturnBuyTransactions, auth: 1 },
  { path: '/debts', name: 'Kasbon', component: Debts, auth: 1 },
  { path: '/kanvas-take-stocks', name: 'Kanvas Ambil Stock', component: KanvasTakeStocks, auth: 1 },
  { path: '/kanvas-return-stocks', name: 'Kanvas Kembalikan Stock', component: KanvasReturnStocks, auth: 1 },
  { path: '/kanvas-transactions', name: 'Kanvas Transaksi', component: KanvasTransactions, auth: 1 },
  { path: '/price-percents', name: 'Persentasi Jual', component: PricePercents, auth: 1 },
  { path: '/report-sale-transactions', name: 'Transaksi Penjualan', component: ReportSaleTransactions, auth: 1 },
  { path: '/report-buy-transactions', name: 'Transaksi Pembelian', component: ReportBuyTransactions, auth: 1 },

]

export default routes;
