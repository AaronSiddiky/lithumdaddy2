'use client';

import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/navigation";

export default function Pricing() {
  const router = useRouter();
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

  const handleSubscribe = async (priceId: string) => {
    try {
      // Different URLs for weekly and monthly subscriptions
      if (priceId === 'price_weekly') {
        window.location.href = 'https://buy.stripe.com/7sI00N7OM4WPgCY146';
      } else if (priceId === 'price_monthly') {
        window.location.href = 'https://buy.stripe.com/8wM28Vb0Y0GzgCY6or';
      }
      return;
    } catch (error) {
      console.error('Navigation error:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-8 text-center">Unlimited Access</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-neutral-900 rounded-xl p-6 border border-neutral-800">
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold mb-2">Weekly</h2>
            <div className="text-3xl font-bold mb-2">$1.99</div>
            <p className="text-neutral-400">per week</p>
          </div>
          
          <ul className="space-y-3 mb-6">
            <li className="flex items-center">
              <span className="mr-2">✓</span>
              Unlimited Quote Practice
            </li>
            <li className="flex items-center">
              <span className="mr-2">✓</span>
              All Books Access
            </li>
            <li className="flex items-center">
              <span className="mr-2">✓</span>
              AI-Powered Feedback
            </li>
          </ul>
          
          <button 
            onClick={() => handleSubscribe('price_H5kgcN2eZvKYaL')}
            className="w-full py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
          >
            Get Started
          </button>
        </div>

        <div className="bg-neutral-900 rounded-xl p-6 border border-blue-500">
          <div className="text-center mb-6">
            <div className="text-blue-500 text-sm font-semibold mb-2">BEST VALUE</div>
            <h2 className="text-xl font-semibold mb-2">Monthly</h2>
            <div className="text-3xl font-bold mb-2">$5.99</div>
            <p className="text-neutral-400">per month (save 25%)</p>
          </div>
          
          <ul className="space-y-3 mb-6">
            <li className="flex items-center">
              <span className="mr-2 text-blue-500">✓</span>
              Everything in Weekly
            </li>
            <li className="flex items-center">
              <span className="mr-2 text-blue-500">✓</span>
              Priority Support
            </li>
            <li className="flex items-center">
              <span className="mr-2 text-blue-500">✓</span>
              Early Access to New Features
            </li>
          </ul>
          
          <button 
            onClick={() => handleSubscribe('price_monthly')}
            className="w-full py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
          >
            Save 25% Now
          </button>
        </div>
      </div>
    </div>
  );
} 