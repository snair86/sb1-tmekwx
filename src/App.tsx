import React, { useState, useEffect } from 'react';
import { CreditCard, Unlock, Lock } from 'lucide-react';

interface CreditPlan {
  credits: number;
  price: number;
}

const creditPlans: CreditPlan[] = [
  { credits: 10, price: 99 },
  { credits: 20, price: 129 },
  { credits: 30, price: 199 },
];

function App() {
  const [credits, setCredits] = useState(0);
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    // Load credits and subscription status from storage
    chrome.storage.sync.get(['credits', 'isSubscribed'], (result) => {
      setCredits(result.credits || 0);
      setIsSubscribed(result.isSubscribed || false);
    });
  }, []);

  const buyCredits = (plan: CreditPlan) => {
    const newCredits = credits + plan.credits;
    setCredits(newCredits);
    chrome.storage.sync.set({ credits: newCredits });
    alert(`You've purchased ${plan.credits} credits for ${plan.price} NOK`);
  };

  const toggleSubscription = () => {
    const newSubscriptionStatus = !isSubscribed;
    setIsSubscribed(newSubscriptionStatus);
    chrome.storage.sync.set({ isSubscribed: newSubscriptionStatus });
    alert(newSubscriptionStatus ? 'You are now subscribed!' : 'Subscription cancelled');
  };

  const unlockArticle = () => {
    if (isSubscribed || credits > 0) {
      if (!isSubscribed) {
        const newCredits = credits - 1;
        setCredits(newCredits);
        chrome.storage.sync.set({ credits: newCredits });
      }
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id!, { action: 'unlockArticle' });
      });
    } else {
      alert('You need credits or a subscription to unlock articles');
    }
  };

  return (
    <div className="w-80 p-4 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Paywall Unlocker</h1>
      <div className="mb-4">
        <p className="text-lg">Credits: {credits}</p>
        <p className="text-lg">Subscription: {isSubscribed ? 'Active' : 'Inactive'}</p>
      </div>
      <button
        className="w-full bg-blue-500 text-white py-2 px-4 rounded mb-2 flex items-center justify-center"
        onClick={unlockArticle}
      >
        <Unlock className="mr-2" /> Unlock Article
      </button>
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Buy Credits</h2>
        {creditPlans.map((plan) => (
          <button
            key={plan.credits}
            className="w-full bg-green-500 text-white py-2 px-4 rounded mb-2 flex items-center justify-center"
            onClick={() => buyCredits(plan)}
          >
            <CreditCard className="mr-2" /> {plan.credits} credits for {plan.price} NOK
          </button>
        ))}
      </div>
      <button
        className={`w-full ${
          isSubscribed ? 'bg-red-500' : 'bg-purple-500'
        } text-white py-2 px-4 rounded flex items-center justify-center`}
        onClick={toggleSubscription}
      >
        {isSubscribed ? <Lock className="mr-2" /> : <Unlock className="mr-2" />}
        {isSubscribed ? 'Cancel Subscription' : 'Subscribe Monthly'}
      </button>
    </div>
  );
}

export default App;