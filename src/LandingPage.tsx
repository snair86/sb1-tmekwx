import React from 'react';
import { ChevronRight, CreditCard, Unlock, Shield } from 'lucide-react';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-400 to-green-600 text-white">
      <header className="container mx-auto px-4 py-8">
        <nav className="flex justify-between items-center">
          <div className="text-3xl font-bold">Frosk</div>
          <a href="#" className="bg-white text-green-600 px-4 py-2 rounded-full font-semibold hover:bg-green-100 transition-colors">
            Get Extension
          </a>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">Leap Over Paywalls with Frosk</h1>
          <p className="text-xl mb-8">Access premium content with ease using our innovative credit system</p>
          <a href="#" className="bg-white text-green-600 px-8 py-3 rounded-full font-semibold text-lg hover:bg-green-100 transition-colors inline-flex items-center">
            Try Frosk Now <ChevronRight className="ml-2" />
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<CreditCard className="w-12 h-12 mb-4" />}
            title="Flexible Credits"
            description="Purchase credits in various packages to suit your reading habits"
          />
          <FeatureCard
            icon={<Unlock className="w-12 h-12 mb-4" />}
            title="Instant Access"
            description="Unlock articles with a single click, no hassle"
          />
          <FeatureCard
            icon={<Shield className="w-12 h-12 mb-4" />}
            title="Secure & Private"
            description="Your browsing activity remains private and secure"
          />
        </div>
      </main>

      <footer className="container mx-auto px-4 py-8 text-center">
        <p>&copy; 2024 Frosk. All rights reserved.</p>
      </footer>
    </div>
  );
};

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => {
  return (
    <div className="bg-white bg-opacity-20 p-6 rounded-lg text-center">
      {icon}
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default LandingPage;