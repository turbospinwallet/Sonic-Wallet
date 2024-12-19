import { motion } from 'framer-motion';
import { FiAward, FiCreditCard, FiDollarSign, FiImage, FiPlay, FiZap } from 'react-icons/fi';

const features = [
  {
    title: 'Transaction Fees',
    description: 'Seamless wallet integration, DEX trading, and swap functionality',
    icon: FiCreditCard,
  },
  {
    title: 'Staking & Yield Farming',
    description: 'Earn rewards through staking and platform fee sharing',
    icon: FiDollarSign,
  },
  {
    title: 'Launchpad',
    description: 'IDO platform for promising blockchain startups',
    icon: FiZap,
  },
  {
    title: 'Mini-Games & Play-to-Earn',
    description: 'Gamified rewards system with NFT integration',
    icon: FiPlay,
  },
  {
    title: 'NFT Marketplace',
    description: 'Buy, sell, and mint unique digital assets',
    icon: FiImage,
  },
  {
    title: 'Premium Subscriptions',
    description: 'Exclusive benefits for $SPIN token holders',
    icon: FiAward,
  },
];

export default function LandingFeatures() {
  return (
    <section
      className="py-24 bg-secondary"
      id="features"
    >
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-neutral mb-4">Core Features</h2>
          <p className="text-neutral/70 max-w-2xl mx-auto">
            Discover the powerful features that make Turbo Spin the leading DeFi ecosystem
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="bg-white/5 rounded-lg p-6 hover:bg-white/10 transition-colors duration-300">
                <feature.icon className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold text-neutral mb-2">{feature.title}</h3>
                <p className="text-neutral/70">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
