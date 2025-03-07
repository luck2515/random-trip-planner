import { FC } from 'react';
import { Skeleton } from '../atoms/Skeleton';

export const TripSkeleton: FC = () => {
  return (
    <div className="space-y-6">
      {/* ヘッダー部分のスケルトン */}
      <div className="space-y-2">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>

      {/* 旅程のスケルトン */}
      <div className="space-y-4">
        {/* 3つの場所を表示するスケルトン */}
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="border rounded-lg p-4 space-y-3">
            {/* 時間表示 */}
            <Skeleton className="h-4 w-24" />
            
            {/* スポット名 */}
            <div className="flex items-center space-x-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>

            {/* 説明文 */}
            <div className="space-y-2">
              <Skeleton className="h-4" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
