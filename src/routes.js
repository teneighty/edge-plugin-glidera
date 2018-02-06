import {
  HomeScene, DisclaimerScene, AuthController, VerifyEmailScene, VerifyPhoneScene, 
  VerifyTwoFactorScene, DashboardScene, OrderReviewScene, OrderScene, ReceiptScene,
  TransactionsScene, ExecuteOrderScene, AccountScene, BankAccountScene, IncreaseLimitScene, 
  IdVerifyScene, ErrorScene} from './scenes'

export const routes = [{
    path: '/',
    main: HomeScene,
    exact: true,
  }, {
    path: '/disclaimer',
    main: DisclaimerScene,
    exact: true,
  }, {
    path: '/authorize/',
    main: AuthController,
    exact: true,
  }, {
    path: '/signup/verify/email/',
    main: VerifyEmailScene,
    exact: true,
  }, {
    path: '/signup/verify/phone/:change',
    main: VerifyPhoneScene,
    exact: true,
  }, {
    path: '/verify/twofa/:confirmNumber',
    main: VerifyTwoFactorScene,
    exact: true,
  }, {
    path: '/dashboard/',
    main: DashboardScene,
    exact: true,
  }, {
    path: '/exchange/order/review/',
    main: OrderReviewScene,
    exact: true,
  }, {
    path: '/exchange/order/:orderAction/',
    main: OrderScene,
    exact: true,
  }, {
    path: "/receipt/",
    main: ReceiptScene,
    exact: true,
  }, {
    path: "/exchange/transactions/",
    main: TransactionsScene,
    exact: true,
  }, {
    path: "/exchange/order/execute/",
    main: ExecuteOrderScene,
    exact: true,
  }, {
    path: "/account/",
    main: AccountScene,
    exact: true,
  }, {
    path: "/bankAccount/",
    main: BankAccountScene,
    exact: true,
  }, {
    path: "/increaseLimits/",
    main: IncreaseLimitScene,
    exact: true,
  }, {
    path: "/idVerify/",
    main: IdVerifyScene,
    exact: true,
  }, {
    path: "/error/",
    main: ErrorScene,
    exact: true,
  }
]
