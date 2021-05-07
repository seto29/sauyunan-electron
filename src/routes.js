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
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/products-code', name: 'ProductsCode', component: ProductsCode },
  { path: '/suppliers', name: 'Supplier', component: Suppliers },
  { path: '/shops', name: 'Toko', component: Shops },
  { path: '/employees', name: 'Karyawan', component: Employees },
  { path: '/goods-receipt', name: 'Barang Masuk', component: GR },
  { path: '/deliveries', name: 'Barang Keluar', component: Deliveries },
  { path: '/sales', name: 'Sales', component: Sales },
  { path: '/balance', name: 'Keuangan', component: Balances },
  { path: '/incomes', name: 'Pemasukan', component: Incomes },
  { path: '/expenses', name: 'Pengeluaran', component: Expenses },
  { path: '/help', name: 'Bantuan', component: Help },
  { path: '/pay-buys', name: 'Pembelian (Utang)', component: PayBuys },
  { path: '/pay-sells', name: 'Penjualan (Piutang)', component: PaySells },
  { path: '/products', name: 'Produk', component: Products },
  { path: '/metrics', name: 'Produk', component: Metrics },
  { path: '/qty-products', name: 'Qty Produk', component: QtyProducts },
  { path: '/nett-profit', name: 'Laba Bersih', component: Nettprofit },
  { path: '/settings', name: 'Pengaturan Akun', component: Settings },
  { path: '/customers', name: 'Pelanggan', component: Customers },
  { path: '/drivers', name: 'Supir', component: Drivers },
  { path: '/users', name: 'Pengguna', component: Users },
  { path: '/sale-transactions', name: 'Penjualan', component: SaleTransactions },
  { path: '/buy-transactions', name: 'Pembelian', component: BuyTransactions },
  { path: '/return-sale-transactions', name: 'Retur Penjualan', component: ReturnSaleTransactions },
  { path: '/return-buy-transactions', name: 'Retur Pembelian', component: ReturnBuyTransactions },
  { path: '/debts', name: 'Kasbon', component: Debts },
  { path: '/kanvas-take-stocks', name: 'Kanvas Ambil Stock', component: KanvasTakeStocks },
  { path: '/kanvas-return-stocks', name: 'Kanvas Kembalikan Stock', component: KanvasReturnStocks },
  { path: '/kanvas-transactions', name: 'Kanvas Transaksi', component: KanvasTransactions },
  { path: '/price-percents', name: 'Persentasi Jual', component: PricePercents },
  { path: '/report-sale-transactions', name: 'Transaksi Penjualan', component: ReportSaleTransactions },
  { path: '/report-buy-transactions', name: 'Transaksi Pembelian', component: ReportBuyTransactions },

]

export default routes;
