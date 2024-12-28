import { motion } from "framer-motion";
import { GiDiamondHard } from "react-icons/gi";
import { MdHealthAndSafety } from "react-icons/md";

const ClinicBanner = () => {
  return (
    <div className="relative bg-gradient-to-r from-teal-500 to-emerald-400 overflow-hidden rounded-t-lg mb-4">
      <div
        className="absolute inset-0 bg-pattern opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            className="text-white space-y-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-xl md:text-3xl font-bold leading-tight">
              Khám Phá Phòng Khám Da Liễu
              <span className="block text-teal-100">Chất Lượng Cao</span>
            </h1>

            <p className="text-base text-teal-50">
              Chúng tôi đem đến cho bạn trải nghiệm chăm sóc da toàn diện với
              công nghệ hiện đại và đội ngũ chuyên gia hàng đầu
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <GiDiamondHard className="w-8 h-8 text-teal-200" />
                <div>
                  <h3 className="font-semibold">Công Nghệ Tiên Tiến</h3>
                  <p className="text-sm text-teal-100">
                    Thiết bị hiện đại nhất
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <MdHealthAndSafety className="w-8 h-8 text-teal-200" />
                <div>
                  <h3 className="font-semibold">Chăm Sóc Tận Tâm</h3>
                  <p className="text-sm text-teal-100">
                    Đội ngũ y bác sĩ giàu kinh nghiệm
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="relative hidden md:block"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-t from-teal-500/50 to-transparent rounded-lg" />
              {/* <img
                src="/api/placeholder/600/400"
                alt="Modern clinic interior"
                className="w-full rounded-lg shadow-2xl"
              /> */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm p-4 rounded-lg">
                <h3 className="font-semibold text-teal-800">Đặt Lịch Ngay</h3>
                <p className="text-sm text-teal-600">
                  Tư vấn miễn phí về các vấn đề da liễu của bạn
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M0 20C240 50 480 80 720 70C960 60 1200 30 1440 40V80H0V20Z"
            fill="white"
          />
        </svg>
      </div>
    </div>
  );
};

export default ClinicBanner;
