import * as process from 'process';
import Bugsnag from '@bugsnag/js';
import BugsnagPluginReact from '@bugsnag/plugin-react';
import { isBrowser } from '@/common/utils/ssr';

export function initBugsnag() {
  if (isBrowser()) {
    Bugsnag.start({
      apiKey: 'af36f60764af073b683b1505619846be',
      plugins: [new BugsnagPluginReact()],
      enabledReleaseStages: ['production'],
      releaseStage: process.env.NEXT_PUBLIC_APP_ENV,
      appVersion: '1.0.0',
    });
  }
}
