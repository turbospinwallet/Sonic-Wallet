import clsx from 'clsx';
import Image from 'next/image';
import React, { useState } from 'react';
import ButtonCustom from '@/components/ButtonCustom/ButtonCustom';
import { useQueryLeaderboardTask } from '@/hooks/queries/user';
import type { iLeaderboardItem } from '@/models/user-model';
import { formatNumber } from '@/common/utils/number';

const TAB_VALUES = {
  1: 'ALL',
  2: 'WEEKLY',
  3: 'MONTHLY',
};

const CalimMissionModalTabLeaderboard = () => {
  const [tab, setTab] = useState(1);
  const { data, isFetched } = useQueryLeaderboardTask({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    type: TAB_VALUES[tab],
    page: 1,
    rowsPerPage: 10,
  });
  const renderDaily = (data: iLeaderboardItem[]) => {
    const renderMedal = (index: number) => {
      switch (index) {
        case 0:
          return (
            <Image
              src="/images/1st-prize.svg"
              alt="1st-prize.svg"
              width={27}
              height={27}
            />
          );
        case 1:
          return (
            <Image
              src="/images/second-place.svg"
              alt="second-place.svg"
              width={27}
              height={27}
            />
          );
        case 2:
          return (
            <Image
              src="/images/third-place.svg"
              alt="third-place.svg"
              width={27}
              height={27}
            />
          );
        default:
          return <p className="font-bold text-2xl">{index + 1}</p>;
      }
    };

    return data.map((item, index) => {
      const fullName = `${item?.first_name || ''} ${item?.last_name || ''}`.trim();
      return (
        <div
          key={index}
          className="p-4 bg-[#FFFBE6] shadow-lg rounded-xl flex items-center gap-4"
        >
          <div className="border p-1 border-secondary-900 rounded-lg shadow-[1px_1px_2px] h-[36px] w-[36px] inline-flex items-center justify-center">
            {renderMedal(index)}
          </div>
          <div className="flex-1 font-bold">
            <p className="text-sm ">{fullName}</p>
            <div className="flex items-center gap-1">
              <Image
                src="/images/point.svg"
                alt="gold-ore.png"
                height={20}
                width={20}
              />
              <p className="truncate max-w-[160px] text-sm text-green-1">
                {formatNumber(item.points, 0, 5) || 0}
              </p>
            </div>
          </div>
        </div>
      );
    });
  };

  const renderLoading = () => {
    return (
      <div className="min-h-[250px] flex justify-center items-center">
        <p className="text-center">Loading...</p>
      </div>
    );
  };

  const renderNoData = () => {
    return (
      <div className="min-h-[250px] flex justify-center items-center">
        <p className="text-center">No data</p>
      </div>
    );
  };

  return (
    <div className="pb-4 flex flex-col gap-4">
      <div className="flex gap-2">
        <ButtonCustom
          variant="empty"
          className={clsx(
            'flex-none !text-secondary-900 font-bold text-sm hover:bg-transparent',
            tab === 1 ? 'border-b-4 border-secondary-900' : ''
          )}
          onClick={() => setTab(1)}
        >
          All time
        </ButtonCustom>
        <ButtonCustom
          variant="empty"
          className={clsx(
            'flex-none !text-secondary-900 font-bold text-sm hover:bg-transparent',
            tab === 2 ? 'border-b-4 border-secondary-900' : ''
          )}
          onClick={() => setTab(2)}
        >
          Top weekly
        </ButtonCustom>
        <ButtonCustom
          variant="empty"
          className={clsx(
            'flex-none !text-secondary-900 font-bold text-sm hover:bg-transparent',
            tab === 3 ? 'border-b-4 border-secondary-900' : ''
          )}
          onClick={() => setTab(3)}
        >
          Top monthly
        </ButtonCustom>
      </div>
      <div className="max-h-[48vh] overflow-auto flex flex-col gap-4 py-4">
        {!isFetched && renderLoading()}
        {isFetched && !data?.data?.length && renderNoData()}

        {isFetched && data?.data?.length ? (
          <>
            {tab === 1 && renderDaily(data?.data)}
            {tab === 2 && renderDaily(data?.data)}
            {tab === 3 && renderDaily(data?.data)}
          </>
        ) : null}
      </div>
    </div>
  );
};

export default CalimMissionModalTabLeaderboard;
