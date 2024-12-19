import { motion } from 'framer-motion';
import { FiDollarSign, FiSmartphone, FiUsers, FiZap } from 'react-icons/fi';

const reasons = [
  {
    title: 'Fast & Scalable',
    description: 'Built on the robust Sonic blockchain',
    icon: FiZap,
    color: 'from-blue-500/20 to-purple-500/20',
  },
  {
    title: 'Integrated Mini App',
    description: 'Seamless experience on Telegram',
    icon: FiSmartphone,
    color: 'from-green-500/20 to-teal-500/20',
  },
  {
    title: 'Multiple Revenue Streams',
    description: 'DeFi, NFTs, games, and staking',
    icon: FiDollarSign,
    color: 'from-yellow-500/20 to-orange-500/20',
  },
  {
    title: 'User-Centric',
    description: 'Rewarding users through staking, farming, and play-to-earn mechanisms',
    icon: FiUsers,
    color: 'from-pink-500/20 to-rose-500/20',
  },
];

export default function LandingWhyChoose() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-secondary via-secondary/50 to-secondary" />

      <div className="container mx-auto px-6 relative">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="text-primary font-semibold">WHY CHOOSE US</span>
          <h2 className="text-3xl md:text-4xl font-bold text-neutral mt-2">
            The Turbo Spin Advantage
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ x: index % 2 === 0 ? -50 : 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              <div
                className={`bg-gradient-to-br ${reason.color} backdrop-blur-sm rounded-2xl p-8 h-full border border-white/5`}
              >
                <div className="flex items-start gap-6">
                  <div className="bg-white/10 rounded-xl p-3">
                    <reason.icon className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-neutral mb-3">{reason.title}</h3>
                    <p className="text-neutral/70 leading-relaxed">{reason.description}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-neutral/50 max-w-2xl mx-auto italic">
            &quot;Join thousands of users who have already discovered the power of Turbo Spin&apos;s
            ecosystem&quot;
          </p>
        </motion.div>
      </div>
    </section>
  );
}
