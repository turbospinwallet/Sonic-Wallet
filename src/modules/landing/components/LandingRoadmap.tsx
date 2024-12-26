import { motion } from 'framer-motion';

interface RoadmapStage {
  stage: string;
  time: string;
  items: string[];
}

const roadmapData: RoadmapStage[] = [
  {
    stage: 'Q4',
    time: '2024',
    items: ['Launch MVP Turbo Spin Wallet And Minigame on Telegram Mini App'],
  },
  {
    stage: 'Q1',
    time: '2025',
    items: ['Scale partnerships and grow the user base'],
  },
  {
    stage: 'Q2',
    time: '2025',
    items: ['Integrate Yield Farming and Staking'],
  },
  {
    stage: 'Q3',
    time: '2025',
    items: ['IDO Launchpad'],
  },
  {
    stage: 'Q4',
    time: '2025',
    items: ['Launch NFT Marketplace and DEX'],
  },
];

export default function LandingRoadmap() {
  return (
    <section
      className="py-24 bg-secondary relative"
      id="roadmap"
    >
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-neutral mb-4">Roadmap</h2>
          <p className="text-neutral/70 max-w-2xl mx-auto">
            Our journey to revolutionize the DeFi ecosystem
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary/20" />

          <div className="space-y-16">
            {roadmapData.map((stage, index) => (
              <motion.div
                key={stage.stage}
                initial={{ x: index % 2 === 0 ? -50 : 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`flex ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                } items-center justify-center gap-8`}
              >
                {/* Content */}
                <div className="w-1/2 p-6 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm">
                  <h3 className="text-2xl font-bold text-primary mb-2">{stage.stage}</h3>
                  <p className="text-neutral/70 mb-4">{stage.time}</p>
                  <ul className="space-y-2">
                    {stage.items.map((item, itemIndex) => (
                      <li
                        key={itemIndex}
                        className="flex items-center gap-2 text-neutral"
                      >
                        <span className="w-2 h-2 bg-primary rounded-full" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Timeline dot */}
                <div className="relative">
                  <div className="w-6 h-6 bg-primary rounded-full" />
                </div>

                {/* Empty space for alignment */}
                <div className="w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
