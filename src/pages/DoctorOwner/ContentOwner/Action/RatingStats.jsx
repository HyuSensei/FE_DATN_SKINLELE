import React from "react";
import { FaStar, FaCommentDots } from "react-icons/fa";
import { IoStatsChart } from "react-icons/io5";

const StatCard = ({ icon: Icon, title, value, subtitle, gradient }) => (
  <div
    className={`relative overflow-hidden rounded-xl p-6 ${gradient} transition-all duration-300 hover:shadow-lg hover:-translate-y-1`}
  >
    <div className="absolute top-0 right-0 w-32 h-32 transform translate-x-16 -translate-y-8">
      <Icon className="w-full h-full opacity-10 text-white" />
    </div>
    <div className="relative z-10">
      <p className="text-lg font-medium text-white/80">{title}</p>
      <h3 className="text-3xl font-bold text-white mt-2 mb-1">{value}</h3>
      {subtitle && <p className="text-sm text-white/70">{subtitle}</p>}
    </div>
  </div>
);

const RatingBar = ({ rating, count, total, index }) => {
  const percentage = total > 0 ? (count / total) * 100 : 0;

  return (
    <div className="flex items-center w-full mb-2">
      {/* Rating number and star - Fixed width */}
      <div className="flex items-center gap-2 w-14">
        <span className="text-white font-medium">{rating}</span>
        <FaStar
          className={`text-yellow-300 text-sm ${index === 4 ? "ml-0.5" : ""}`}
        />
      </div>

      {/* Progress bar - Takes remaining space */}
      <div className="flex-1 mx-4">
        <div className="relative h-2 rounded-full bg-white/20">
          <div
            className="absolute left-0 top-0 h-full rounded-full bg-yellow-300 transition-all duration-300"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* Count - Fixed width */}
      <div className="w-12 text-right">
        <span className="text-white font-medium">{count}</span>
      </div>
    </div>
  );
};

const RatingStats = ({ totalReviews, averageRating, ratingDistribution }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <StatCard
      icon={FaCommentDots}
      title="Tổng đánh giá"
      value={totalReviews}
      gradient="bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
    />
    <StatCard
      icon={FaStar}
      title="Điểm trung bình"
      value={`${averageRating.toFixed(1)}/5`}
      gradient="bg-gradient-to-br from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600"
    />
    <div className="lg:col-span-1 md:col-span-2 col-span-1">
      <div className="rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        <div className="flex items-center gap-2 mb-6">
          <IoStatsChart className="text-white text-xl" />
          <h3 className="text-lg font-semibold text-white">Phân bố đánh giá</h3>
        </div>

        <div className="space-y-4">
          {[5, 4, 3, 2, 1].map((rating, index) => (
            <RatingBar
              key={rating}
              rating={rating}
              count={ratingDistribution[rating] || 0}
              total={totalReviews}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default RatingStats;
