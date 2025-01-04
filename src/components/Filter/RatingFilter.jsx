import React, { memo } from "react";
import { Radio } from "antd";

const RatingFilter = memo(({ ratings, selectedRating, onChange }) => {
  return (
    <Radio.Group
      className="flex flex-col gap-3"
      value={selectedRating}
      onChange={onChange}
    >
      {ratings?.map((rating) => (
        <Radio key={rating.rate} value={rating.rate}>
          <div className="flex items-center gap-1.5">
            {[...Array(rating.rate)].map((_, i) => (
              <span key={i} className="text-yellow-400 text-lg">
                ★
              </span>
            ))}
            <span className="text-gray-500">({rating.count})</span>
          </div>
        </Radio>
      ))}
    </Radio.Group>
  );
});

export default RatingFilter;
