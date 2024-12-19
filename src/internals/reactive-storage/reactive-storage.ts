import ReactiveStorage, { createLocalStorageAdaptor } from 'src/packages/reactive-storage';
import {
  ACTIVE_WALLET,
  CHECK_COMPLETE_TASK_DELAY,
  REFERRAL,
  USER_CREDENTIAL,
} from '@/internals/reactive-storage/declare-your-storage-here';

const adaptor = createLocalStorageAdaptor();

const reactiveStorage = new ReactiveStorage(
  adaptor,
  {
    USER_CREDENTIAL,
    ACTIVE_WALLET,
    REFERRAL,
    CHECK_COMPLETE_TASK_DELAY,
  },
  {
    prefix: 'app',
  }
);

export default reactiveStorage;
