import Image from 'next/image';
import React, { useMemo } from 'react';
import type { ITask } from '@/models/task-model';
import { TASK_TYPES } from '@/models/task-model';
import { useWallet } from '@/hooks/useWallet';
import { useCompleteTask, useQueryTasks } from '@/hooks/queries/task';
import reactiveStorage from '@/internals/reactive-storage';
import CountDown from '@/components/CountDown';
import { useTelegram } from '@/hooks/useTelegram';
import { useGetUserByAddress } from '@/hooks/queries/user';
import { useUserState } from '@/modules/shared/state/user-state';
import { useAppState } from '@/modules/shared/state/app-state';
import { APP_CHAT_BOT_URL } from '@/common/constants/const';

const TASK_LABELS = {
  [TASK_TYPES.DAILY_LOGIN]: 'Daily Login',
  [TASK_TYPES.DAILY_INVITE]: 'Daily Invite',
  [TASK_TYPES.DAILY_CHECKIN]: 'Daily Checkin',
  [TASK_TYPES.X_FOLLOW]: 'Follow us on X',
  [TASK_TYPES.X_RETWEET]: 'Retweet our post on X',
  [TASK_TYPES.DISCORD_JOIN]: 'Join us on Discord',
  [TASK_TYPES.TELE_JOIN]: 'Join us on Telegram',
};

const TASK_ICONS = {
  [TASK_TYPES.DAILY_LOGIN]: 'login.svg',
  [TASK_TYPES.DAILY_INVITE]: 'players.svg',
  [TASK_TYPES.DAILY_CHECKIN]: 'checkin.svg',
  [TASK_TYPES.X_FOLLOW]: 'x.svg',
  [TASK_TYPES.X_RETWEET]: 'x.svg',
  [TASK_TYPES.DISCORD_JOIN]: 'discord.svg',
  [TASK_TYPES.TELE_JOIN]: 'telegram.svg',
};
const GROUP_TASKS = {
  DAILY: 'Daily',
  SOCIAL: 'Social',
};

const RECHECK_TIMEOUT = 20 * 1000;
const DAILY_TASKS = [TASK_TYPES.DAILY_CHECKIN, TASK_TYPES.DAILY_INVITE, TASK_TYPES.DAILY_LOGIN];
const CalimMissionModalTabTask = () => {
  const { mutateAsync: fetchUserInfo } = useGetUserByAddress();
  const { mutateAsync: onComplete } = useCompleteTask();
  const { address } = useWallet();
  const { createLinkJoinGroup, openLinkWithoutConfirm, shareToTelegram } = useTelegram();
  const { userInfo } = useUserState();
  const { userClaimInfo } = useAppState();

  const [pendingCheck, setPendingCheck] = React.useState({} as Record<string, boolean>);
  const [recheckTimeOut, setRecheckTimeOut] = React.useState(
    (reactiveStorage.get('CHECK_COMPLETE_TASK_DELAY') || {}) as Record<string, number>
  );
  const { data, isFetched, refetch } = useQueryTasks(address);

  const dailyTasks = useMemo(
    () => data?.filter((task) => DAILY_TASKS.includes(task.type as any)),
    [data]
  );

  const refCode = useMemo(() => {
    return userInfo?.code || userClaimInfo?.referral;
  }, [userInfo?.code, userClaimInfo?.referral]);

  const socialTasks = useMemo(
    () => data?.filter((task) => !DAILY_TASKS.includes(task.type as any)),
    [data]
  );
  const updateRecheckTimeOut = (type: TASK_TYPES) => {
    if (
      [TASK_TYPES.DAILY_CHECKIN, TASK_TYPES.DAILY_LOGIN, TASK_TYPES.DAILY_INVITE].includes(type)
    ) {
      return;
    }
    setRecheckTimeOut((prev) => ({ ...prev, [type]: Date.now() + RECHECK_TIMEOUT }));
    reactiveStorage.set('CHECK_COMPLETE_TASK_DELAY', recheckTimeOut);
  };

  const handleCompleteTask = async (type: TASK_TYPES) => {
    try {
      if (!address || pendingCheck[type]) {
        return;
      }
      setPendingCheck((prev) => ({ ...prev, [type]: true }));
      await onComplete({ address, data: { type } });
      updateRecheckTimeOut(type);
      void refetch();
      setPendingCheck((prev) => ({ ...prev, [type]: false }));
      void fetchUserInfo(address);
    } catch (error) {
      console.error(error);
      void refetch();
      setPendingCheck((prev) => ({ ...prev, [type]: false }));
      updateRecheckTimeOut(type);
    }
  };

  const onTaskClick = (task: ITask) => {
    if (task.completed || recheckTimeOut[task.type as TASK_TYPES] > Date.now()) {
      return;
    }
    switch (task.type) {
      case TASK_TYPES.X_FOLLOW:
        openLinkWithoutConfirm('https://twitter.com/intent/follow?screen_name=GoldOnSui');
        break;
      case TASK_TYPES.X_RETWEET:
        openLinkWithoutConfirm('https://twitter.com/intent/retweet?tweet_id=1796459247699722534');
        break;
      case TASK_TYPES.DISCORD_JOIN:
        openLinkWithoutConfirm('https://discord.gg/Zrg8FdtP');
        break;
      case TASK_TYPES.TELE_JOIN:
        createLinkJoinGroup('https://t.me/+BWMXHciFAds2ZTY8');
        break;
      case TASK_TYPES.DAILY_INVITE:
        shareToTelegram(
          'Join Game with me',
          `${APP_CHAT_BOT_URL}${refCode ? `?startapp=${refCode}` : ''}`
        );
        return;
      default:
        break;
    }
    void handleCompleteTask(task.type);
  };

  const renderLoading = () => {
    return (
      <div className="min-h-[100px] flex justify-center items-center">
        <p className="text-center">Loading...</p>
      </div>
    );
  };

  const renderNoData = () => {
    return (
      <div className="min-h-[100px] flex justify-center items-center">
        <p className="text-center">No data</p>
      </div>
    );
  };

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const renderCountDown = ({ minutes, seconds, completed, customData: { task } }) => {
    if (completed) {
      return !pendingCheck[task.type as TASK_TYPES] ? (
        <>
          {task.completed ? (
            <Image
              src="/images/checked-box.svg"
              alt="checked-box.svg"
              width={40}
              height={40}
            />
          ) : (
            <Image
              src="/images/checkbox.svg"
              alt="checkbox.svg"
              width={25}
              height={25}
              className="mr-2.5"
            />
          )}
        </>
      ) : (
        <Image
          src="/images/loading.gif"
          alt="loading.svg"
          width={30}
          height={30}
          className="mr-2.5"
        />
      );
    }
    return <p>{seconds}s</p>;
  };
  const renderTask = (task: string) => {
    const data = task === GROUP_TASKS.DAILY ? dailyTasks : socialTasks;
    const title = task === GROUP_TASKS.DAILY ? 'Daily' : 'Social';
    return (
      <>
        <p className="text-xl font-bold">{title}</p>
        {!isFetched && renderLoading()}
        {isFetched && !data?.length && renderNoData()}
        {isFetched &&
          data?.map((task, index) => {
            return (
              <div
                className="p-4 bg-white shadow-lg rounded-xl flex items-center gap-4"
                key={index}
                onClick={() => onTaskClick(task as any)}
              >
                <div className="border-2 p-1 border-secondary-900 rounded-lg shadow-[1px_1px_3px] h-[36px] w-[36px] inline-flex items-center justify-center">
                  <Image
                    src={`/images/${TASK_ICONS[task.type as keyof typeof TASK_TYPES]}`}
                    alt={TASK_ICONS[task.type as keyof typeof TASK_TYPES]}
                    width={27}
                    height={27}
                  />
                </div>
                <div className="flex-1 font-bold">
                  <p className="text-sm ">{TASK_LABELS[task.type as keyof typeof TASK_TYPES]}</p>
                  <div className="flex items-center gap-1">
                    <Image
                      src="/images/point.svg"
                      alt="gold-ore.png"
                      height={20}
                      width={20}
                      className=""
                    />
                    <p className="truncate max-w-[160px] text-sm">
                      {task?.points ? `+${task?.points}` : '--'}
                    </p>
                  </div>
                </div>
                {/*{!pendingCheck[task.type as TASK_TYPES] ? (*/}
                {/*  <>*/}
                {/*    {task.completed ? (*/}
                {/*      <Image*/}
                {/*        src="/images/checked-box.svg"*/}
                {/*        alt="checked-box.svg"*/}
                {/*        width={40}*/}
                {/*        height={40}*/}
                {/*      />*/}
                {/*    ) : (*/}
                {/*      <Image*/}
                {/*        src="/images/checkbox.svg"*/}
                {/*        alt="checkbox.svg"*/}
                {/*        width={25}*/}
                {/*        height={25}*/}
                {/*        className="mr-2.5"*/}
                {/*      />*/}
                {/*    )}*/}
                {/*  </>*/}
                {/*) : (*/}
                {/*  <Image*/}
                {/*    src="/images/loading.gif"*/}
                {/*    alt="loading.svg"*/}
                {/*    width={30}*/}
                {/*    height={30}*/}
                {/*    className="mr-2.5"*/}
                {/*  />*/}
                {/*)}*/}
                <CountDown
                  date={
                    recheckTimeOut[task.type as TASK_TYPES]
                      ? Number(recheckTimeOut[task.type as TASK_TYPES])
                      : 0
                  }
                  renderer={renderCountDown as any}
                  customData={{ task }}
                />
              </div>
            );
          })}
      </>
    );
  };

  return (
    <div className="pb-10 pt-4 flex flex-col gap-4 max-h-[60vh] overflow-auto">
      {renderTask(GROUP_TASKS.DAILY)}
      {renderTask(GROUP_TASKS.SOCIAL)}
    </div>
  );
};

export default CalimMissionModalTabTask;
