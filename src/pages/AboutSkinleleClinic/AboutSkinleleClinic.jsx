import React from "react";
import {
  FaUserMd,
  FaHospital,
  FaHandshake,
  FaChartLine,
  FaUsers,
  FaLaptopMedical,
  FaHeadset,
  FaShieldAlt,
  FaCheckCircle,
} from "react-icons/fa";
import { MdSpeed } from "react-icons/md";

const AboutSkinleleClinic = () => {
  return (
    <div className="bg-gradient-to-b from-teal-50 via-white to-teal-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-teal-600 to-emerald-600">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-grid-white/[0.1] bg-grid" />
          <div className="absolute inset-0 bg-gradient-to-r from-teal-600/90 to-emerald-600/90" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 text-center text-white">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-md mb-8">
            <span className="text-sm font-medium text-white">
              Nền tảng quản lý phòng khám hàng đầu Việt Nam
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
            Giải Pháp Quản Lý Toàn Diện
            <br />
            <span className="bg-gradient-to-r from-teal-200 to-emerald-200 text-transparent bg-clip-text">
              Cho Phòng Khám Da Liễu
            </span>
          </h1>

          <p className="text-xl text-teal-50 max-w-3xl mx-auto mb-12 leading-relaxed">
            Tối ưu hóa vận hành, tăng trưởng doanh thu và nâng cao trải nghiệm
            khách hàng với nền tảng quản lý phòng khám thông minh
          </p>

          <div className="flex flex-wrap justify-center gap-6">
            <button className="px-8 py-4 bg-white text-teal-600 rounded-xl font-medium hover:bg-teal-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              Liên hệ hợp tác
            </button>
            <button className="px-8 py-4 bg-teal-500 text-white rounded-xl font-medium hover:bg-teal-400 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              Xem demo
            </button>
          </div>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-sm">
            <div>
              <div className="text-3xl font-bold mb-2">2000+</div>
              <div className="text-teal-100">Phòng khám tin dùng</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">500+</div>
              <div className="text-teal-100">Bác sĩ đối tác</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">1M+</div>
              <div className="text-teal-100">Lịch hẹn đã đặt</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">98%</div>
              <div className="text-teal-100">Khách hàng hài lòng</div>
            </div>
          </div>
        </div>
      </div>

      {/* Platform Benefits */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <div className="text-sm font-semibold text-teal-600 tracking-wide uppercase mb-2">
            Giải pháp toàn diện
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Tất Cả Trong Một Nền Tảng
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Quản lý toàn diện hoạt động phòng khám, tối ưu hóa quy trình và nâng
            cao hiệu quả
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <FaHospital className="w-7 h-7" />,
              title: "Phòng khám",
              features: [
                "Quản lý lịch hẹn tập trung",
                "Theo dõi doanh thu thời gian thực",
                "Quản lý nhân sự hiệu quả",
                "Báo cáo chi tiết",
              ],
            },
            {
              icon: <FaUserMd className="w-7 h-7" />,
              title: "Bác sĩ",
              features: [
                "Lịch làm việc linh hoạt",
                "Hồ sơ bệnh nhân số hóa",
                "Theo dõi ca khám dễ dàng",
                "Tương tác với bệnh nhân",
              ],
            },
            {
              icon: <FaUsers className="w-7 h-7" />,
              title: "Bệnh nhân",
              features: [
                "Đặt lịch trực tuyến 24/7",
                "Nhắc nhở lịch tự động",
                "Theo dõi lịch sử khám",
                "Đánh giá sau khám",
              ],
            },
          ].map((benefit, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className="w-16 h-16 bg-teal-50 rounded-2xl flex items-center justify-center text-teal-600 mb-6">
                {benefit.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {benefit.title}
              </h3>
              <ul className="space-y-3">
                {benefit.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-600">
                    <div className="w-1.5 h-1.5 rounded-full bg-teal-600 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      {/* Features Section */}
      <div className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="text-sm font-semibold text-teal-600 tracking-wide uppercase mb-2">
              Tính năng nổi bật
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Tất Cả Công Cụ Bạn Cần
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Đầy đủ tính năng giúp vận hành phòng khám hiệu quả
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <FaLaptopMedical />,
                title: "Quản lý lịch hẹn",
                description:
                  "Hệ thống đặt lịch thông minh, tự động xác nhận và nhắc nhở",
              },
              {
                icon: <FaChartLine />,
                title: "Phân tích dữ liệu",
                description:
                  "Báo cáo chi tiết, thống kê thời gian thực giúp ra quyết định nhanh chóng",
              },
              {
                icon: <FaHandshake />,
                title: "Quản lý khách hàng",
                description:
                  "Theo dõi lịch sử khách hàng, tương tác và chăm sóc hiệu quả",
              },
              {
                icon: <MdSpeed />,
                title: "Vận hành tự động",
                description:
                  "Tự động hóa quy trình, giảm thiểu công việc thủ công",
              },
              {
                icon: <FaShieldAlt />,
                title: "Bảo mật tối đa",
                description: "Chuẩn bảo mật quốc tế, mã hóa dữ liệu đầu cuối",
              },
              {
                icon: <FaHeadset />,
                title: "Hỗ trợ 24/7",
                description: "Đội ngũ chuyên gia luôn sẵn sàng hỗ trợ mọi lúc",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="w-14 h-14 bg-teal-50 rounded-xl flex items-center justify-center text-teal-600 mb-6">
                  <div className="text-2xl">{feature.icon}</div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Social Proof Section */}
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="text-sm font-semibold text-teal-600 tracking-wide uppercase mb-2">
                Đối tác tin cậy
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Được tin dùng bởi hơn 2000+ phòng khám trên toàn quốc
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Giải pháp của chúng tôi đã và đang giúp các phòng khám:
              </p>
              <div className="space-y-4">
                {[
                  "Tăng 50% hiệu suất quản lý",
                  "Giảm 70% thời gian xử lý thủ công",
                  "Tăng 40% tỷ lệ quay lại của khách hàng",
                  "Tiết kiệm 30% chi phí vận hành",
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-teal-50 flex items-center justify-center flex-shrink-0">
                      <FaCheckCircle className="text-teal-600" />
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <img
                  src={
                    "https://scontent.fhan14-3.fna.fbcdn.net/v/t39.30808-6/299652252_2027218947668525_499858223143631738_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=Qw4vUp4S7p8Q7kNvgFA_tGL&_nc_oc=Adh3GpnyKHAlFQRsrYTa4gRZcOtqDCPrLeXJX1wOX8djM6CqR1q4zWTHqXmVP-7SQ_LXML58HrccS2D_kB4tfWER&_nc_zt=23&_nc_ht=scontent.fhan14-3.fna&_nc_gid=A6JrlkuiBk-Fz2pL0sHsyiZ&oh=00_AYDuLKuCIyx1NQZjAQZz3C7b9ouwtOIFFlKp6vqy_KEWOQ&oe=6768C7B7"
                  }
                  alt={`Client`}
                  className="h-28 w-28 mx-auto mb-4 rounded-full border-slate-400 border-2"
                />
                <div className="text-center text-gray-600 text-sm">
                  Phòng khám Sbeauty
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <img
                  src={
                    "https://yt3.googleusercontent.com/ytc/AIdro_njhp6jhj-0qcjw69Q3lY5etOB1qBxYjZPLNDycWkCBIhw=s900-c-k-c0x00ffffff-no-rj"
                  }
                  alt={`Client`}
                  className="h-28 w-28 mx-auto mb-4 rounded-full border-slate-400 border-2"
                />
                <div className="text-center text-gray-600 text-sm">
                  Phòng khám Maia&Maia
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <img
                  src={
                    "https://scontent.fhan14-2.fna.fbcdn.net/v/t39.30808-6/341058261_1245896086051139_4897214149601914775_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=PbIYgGBW75kQ7kNvgHeh3Hg&_nc_oc=Adi42zsGCL9PpG8XVSEBCOCBjfrBSFh1ssgfpoSrtH74e7inMkrgyh_65UevdP8bp8nbEPdcTZYsmPB-HAefyWvX&_nc_zt=23&_nc_ht=scontent.fhan14-2.fna&_nc_gid=ADILi4vFkf3yCDnBCoAooCI&oh=00_AYBgnWBPc1JvibhjZtt0ncvbqkDflpeoahdpu0azVX3mYw&oe=6768EE2D"
                  }
                  alt={`Client`}
                  className="h-28 w-28 mx-auto mb-4 rounded-full border-slate-400 border-2"
                />
                <div className="text-center text-gray-600 text-sm">
                  Phòng khám da liễu Hà Nội
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <img
                  src={
                    "https://scontent.fhan14-3.fna.fbcdn.net/v/t39.30808-6/458979271_1394498361484564_6927483304867446382_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=a5f93a&_nc_ohc=ujfw7fZG7x8Q7kNvgF94BG-&_nc_oc=AdjH2Ch8iiAjWQAXV8IdaEM5_K4sXwmLKLmNbrFLwjbGxWqov5hFS84-kv-qdhXU5RdpIjf9lHdzHgxKT6ZxDmvt&_nc_zt=23&_nc_ht=scontent.fhan14-3.fna&_nc_gid=AIFO5bSHKajlienZ7moLDKX&oh=00_AYCLvK0oABGhYgcAihancCm90WZdfCRM3i0062biW4iBtw&oe=6768C8DF"
                  }
                  alt={`Client`}
                  className="h-28 w-28 mx-auto mb-4 rounded-full border-slate-400 border-2"
                />
                <div className="text-center text-gray-600 text-sm">
                  Phòng khám Zahan
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Integration Steps */}
      <div className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="text-sm font-semibold text-teal-600 tracking-wide uppercase mb-2">
              Bắt đầu ngay
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Tích hợp dễ dàng trong 4 bước
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Quy trình đơn giản, nhanh chóng và được hỗ trợ toàn diện
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                number: "01",
                title: "Đăng ký",
                description: "Điền thông tin cơ bản về phòng khám",
              },
              {
                number: "02",
                title: "Tư vấn & Demo",
                description: "Được tư vấn giải pháp phù hợp",
              },
              {
                number: "03",
                title: "Tích hợp",
                description: "Cài đặt và tích hợp hệ thống",
              },
              {
                number: "04",
                title: "Vận hành",
                description: "Đào tạo và bắt đầu sử dụng",
              },
            ].map((step, index) => (
              <div
                key={index}
                className="relative bg-white rounded-xl p-8 shadow-lg"
              >
                <div className="relative">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-teal-600 to-emerald-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="md:flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-4">
                Sẵn sàng nâng cấp phòng khám của bạn?
              </h2>
              <p className="text-teal-50 mb-8 md:mb-0 text-lg">
                Bắt đầu ngay hôm nay với gói dùng thử miễn phí 14 ngày
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <button className="px-8 py-4 bg-white text-teal-600 rounded-xl font-medium hover:bg-teal-50 transition-all duration-300">
                Đăng ký hợp tác
              </button>
              <button className="px-8 py-4 bg-teal-500 text-white rounded-xl font-medium hover:bg-teal-400 transition-all duration-300">
                Xem trang phòng khám
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Contact */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Kinh doanh",
              info: "sales@skinlele.com\n1900 9999 (Nhánh 1)",
            },
            {
              title: "Hỗ trợ kỹ thuật",
              info: "support@skinlele.com\n1900 8888 (Nhánh 2)",
            },
            {
              title: "Văn phòng",
              info: "Cát Quế, Hoài Đức\nTP.Hà Nội, Việt Nam",
            },
          ].map((contact, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-8 shadow-lg text-center hover:shadow-xl transition-all duration-300"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {contact.title}
              </h3>
              <p className="text-gray-600 whitespace-pre-line">
                {contact.info}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutSkinleleClinic;
