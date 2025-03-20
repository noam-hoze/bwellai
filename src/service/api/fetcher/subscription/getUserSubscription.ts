import { Client } from "../../api.client";

// interface AddSubscriptionInterface {
//   promo_code: string;
//   subscription_id: string;
// }

const getUserSubscriptionCatalog = () => `/user/subscriptions/catalog`;
const getUserSelectedSubscription = () => `/user/subscriptions/get`;
const getUserSubscriptionQuota = ({ type }: { type: string }) =>
  `/subscriptions/activity?type=${type}`;
const getAddUserSelectedSubscription = () => `/user/subscriptions/link`;
const getAddRequestFreePremiumSubscription = () =>
  `/user/subscriptions/free/premium`;
// const getSubscriptionPaymentCheckoutPage = () => `/user/checkout`;
const getSubscriptionPaymentCheckoutPage = () =>
  `/user/subscriptions/link/payment`;
const getUserOrderStatus = ({
  orderId,
  sessionId,
}: {
  orderId: string;
  sessionId: string;
}) => `/user/order/status?order_id=${orderId}&sessionId=${sessionId}`;

export const getUserSubscriptionCatalogFetcher = () => {
  return Client.get(getUserSubscriptionCatalog());
};

export const getUserSelectedSubscriptionFetcher = () => {
  return Client.get(getUserSelectedSubscription());
};
export const getUserSubscriptionQuotaFetcher = ({ type }: { type: string }) => {
  return Client.get(getUserSubscriptionQuota({ type }));
};
export const getUserOrderStatusFetcher = ({
  orderId,
  sessionId,
}: {
  orderId: string;
  sessionId: string;
}) => {
  return Client.get(
    getUserOrderStatus({
      orderId,
      sessionId,
    })
  );
};
export const getAddUserSelectedSubscriptionFetcher = ({
  promo_code,
  subscription_id,
  currencyType,
  paymentType,
  promoDetails,
}: any) => {
  return Client.post(getAddUserSelectedSubscription(), {
    promoCode: promo_code,
    subscriptionId: subscription_id,
    currencyType,
    paymentType,
    promoDetails,
  });
};

export const getAddRequestFreePremiumSubscriptionFetcher = () => {
  return Client.post(getAddRequestFreePremiumSubscription(), {});
};

export const getSubscriptionPaymentCheckoutPageFetcher = ({
  paymentType,
  subscriptionId,
  currencyType,
}: any) => {
  return Client.post(getSubscriptionPaymentCheckoutPage(), {
    subscriptionId,
    paymentType,
    currencyType,
  });
};
