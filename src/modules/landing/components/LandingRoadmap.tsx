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
      className="py-16 md:py-24 bg-secondary relative overflow-x-hidden"
      id="roadmap"
    >
      <div className="container mx-auto px-2 sm:px-6">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-2xl md:text-4xl font-bold text-neutral mb-4">Roadmap</h2>
          <p className="text-neutral/70 max-w-2xl mx-auto px-4">
            Our journey to revolutionize the DeFi ecosystem
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-3 md:left-1/2 top-0 bottom-0 w-1 bg-primary/20 md:transform md:-translate-x-1/2" />

          <div className="space-y-8 md:space-y-16">
            {roadmapData.map((stage, index) => (
              <motion.div
                key={stage.stage}
                initial={{ x: index % 2 === 0 ? -50 : 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative flex flex-col md:flex-row ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                } items-start md:items-center justify-start md:justify-center gap-4 md:gap-8`}
              >
                {/* Content */}
                <div className="ml-8 md:ml-0 w-[calc(100%-2rem)] md:w-1/2 p-3 md:p-6 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm">
                  <h3 className="text-xl md:text-2xl font-bold text-primary mb-2">{stage.stage}</h3>
                  <p className="text-neutral/70 mb-4">{stage.time}</p>
                  <ul className="space-y-2">
                    {stage.items.map((item, itemIndex) => (
                      <li
                        key={itemIndex}
                        className="flex items-start gap-2 text-sm md:text-base text-neutral"
                      >
                        <span className="w-2 h-2 bg-primary rounded-full mt-1.5 flex-shrink-0" />
                        <span className="flex-1">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Timeline dot */}
                <div className="absolute left-3 top-6 md:static md:top-auto">
                  <div className="w-4 h-4 md:w-6 md:h-6 bg-primary rounded-full" />
                </div>

                {/* Empty space for alignment */}
                <div className="hidden md:block md:w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
