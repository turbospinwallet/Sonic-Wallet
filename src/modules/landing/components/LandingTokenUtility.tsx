import { motion } from 'framer-motion';
import { FiLock, FiShield, FiStar, FiZap } from 'react-icons/fi';

const utilities = [
  {
    title: 'Staking Rewards',
    description: 'Earn passive income by staking your $SPIN tokens',
    icon: FiStar,
  },
  {
    title: 'Governance Rights',
    description: 'Participate in platform decisions and proposals',
    icon: FiShield,
  },
  {
    title: 'Premium Access',
    description: 'Unlock exclusive features and benefits',
    icon: FiLock,
  },
  {
    title: 'Token Burns',
    description: 'Regular burns increase scarcity and value',
    icon: FiZap,
  },
];

export default function LandingTokenUtility() {
  return (
    <section className="py-24 bg-gradient-to-br from-primary/5 via-secondary to-primary/10">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-neutral mb-4">$SPIN Token Utility</h2>
          <p className="text-neutral/70 max-w-2xl mx-auto">
            Powering the ecosystem through multiple utility functions
          </p>
        </motion.div>

        <div className="relative">
          {/* Decorative circle */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent rounded-full blur-3xl -z-10" />

          <div className="flex flex-wrap justify-center gap-8">
            {utilities.map((utility, index) => (
              <motion.div
                key={utility.title}
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="w-full md:w-[calc(50%-2rem)] lg:w-[calc(50%-2rem)]"
              >
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 rounded-xl blur group-hover:blur-xl transition-all duration-300" />
                  <div className="relative bg-black/40 backdrop-blur-xl rounded-xl p-8 border border-white/10 hover:border-primary/50 transition-colors duration-300">
                    <div className="flex items-start gap-6">
                      <div className="bg-gradient-to-br from-primary/20 to-primary/10 p-3 rounded-lg">
                        <utility.icon className="w-8 h-8 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-neutral mb-3">{utility.title}</h3>
                        <p className="text-neutral/70 text-lg">{utility.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
