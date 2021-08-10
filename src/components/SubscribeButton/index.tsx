import { useState } from 'react';
import { signIn, useSession } from 'next-auth/client';

import { api } from '../../services/api';
import { getStripeJs } from '../../services/stripe-js';

import styles from './styles.module.scss';

type SubscribeButtonProps = {
  priceId: string;
};

export function SubscribeButton({ priceId }: SubscribeButtonProps) {
  const [session] = useSession();
  const [loading, setLoading] = useState(false);

  async function handleSubscribe() {
    if (!session) {
      signIn('github');

      return;
    }

    try {
      setLoading(true);

      const response = await api.post('/subscribe');

      const { sessionId } = response.data;

      const stripe = await getStripeJs();

      await stripe.redirectToCheckout({ sessionId });
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      className={styles.subscribeButton}
      onClick={handleSubscribe}
      disabled={loading}
    >
      Subscribe now
    </button>
  )
}
