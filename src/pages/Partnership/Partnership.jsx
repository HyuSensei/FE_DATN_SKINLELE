import React from "react";
import {
  FaClinicMedical,
  FaEnvelope,
  FaPhone,
  FaRegHandshake,
  FaChartLine,
  FaUserMd,
  FaCertificate,
} from "react-icons/fa";
import { MdBusinessCenter, MdSecurity, MdSupport } from "react-icons/md";
import ContactForm from "./ContactForm";

const Partnership = () => {
  const features = [
    {
      icon: <FaChartLine className="w-8 h-8" />,
      title: "Tăng trưởng doanh thu",
      description:
        "Tiếp cận hàng triệu người dùng tiềm năng trên nền tảng của chúng tôi",
    },
    {
      icon: <MdSupport className="w-8 h-8" />,
      title: "Hỗ trợ 24/7",
      description: "Đội ngũ hỗ trợ chuyên nghiệp luôn sẵn sàng giúp đỡ bạn",
    },
    {
      icon: <MdSecurity className="w-8 h-8" />,
      title: "Bảo mật thông tin",
      description: "Hệ thống bảo mật đa lớp, đảm bảo an toàn dữ liệu",
    },
    {
      icon: <FaCertificate className="w-8 h-8" />,
      title: "Chứng nhận uy tín",
      description: "Được tin tưởng bởi hàng nghìn đối tác trong ngành y tế",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-teal-600 to-emerald-600 text-white">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-grid-white/[0.1] bg-grid" />
          <div className="absolute inset-0 bg-gradient-to-r from-teal-600/90 to-emerald-600/90" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="w-20 h-20 bg-white/10 backdrop-blur-lg rounded-2xl flex items-center justify-center">
                <FaRegHandshake className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Trở Thành Đối Tác Phòng Khám
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Cùng chúng tôi mang đến trải nghiệm chăm sóc sức khỏe tốt nhất cho
              cộng đồng !
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl shadow-xl p-8 transform hover:scale-105 transition-all">
            <div className="text-teal-600 font-bold text-4xl mb-2">500+</div>
            <div className="text-gray-600">Phòng khám đối tác</div>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-8 transform hover:scale-105 transition-all">
            <div className="text-teal-600 font-bold text-4xl mb-2">1K+</div>
            <div className="text-gray-600">Lượt đặt lịch thành công</div>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-8 transform hover:scale-105 transition-all">
            <div className="text-teal-600 font-bold text-4xl mb-2">98%</div>
            <div className="text-gray-600">Đánh giá hài lòng</div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="mx-auto px-4 sm:px-6 lg:px-20 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Lợi ích khi trở thành đối tác
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Chúng tôi cung cấp những công cụ và giải pháp tốt nhất để giúp phòng
            khám của bạn phát triển
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-teal-600 mb-6">
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Form Section */}
      {/* <div className="mx-auto px-4 sm:px-6 lg:px-20 pb-24">
        <div className="relative bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-50 to-transparent" />

          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 p-8 md:p-12">
            <div>
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full mb-8">
                <FaClinicMedical />
                <span className="font-medium">Đăng ký hợp tác</span>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Bắt đầu hành trình của bạn
              </h2>

              <p className="text-gray-600 mb-8">
                Điền thông tin bên dưới, đội ngũ của chúng tôi sẽ liên hệ với
                bạn trong vòng 24 giờ để thảo luận chi tiết về cơ hội hợp tác.
              </p>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                    <FaUserMd className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">
                      Đội ngũ chuyên môn
                    </h4>
                    <p className="text-sm text-gray-600">
                      Hỗ trợ tận tình, chuyên nghiệp
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-teal-600">
                    <MdBusinessCenter className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">
                      Quy trình đơn giản
                    </h4>
                    <p className="text-sm text-gray-600">
                      Tích hợp nhanh chóng, dễ dàng
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <ContactForm />
          </div>
        </div>
      </div> */}

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-teal-600 to-emerald-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Sẵn sàng để phát triển cùng chúng tôi ?
          </h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Đội ngũ tư vấn của chúng tôi luôn sẵn sàng hỗ trợ bạn 24/7
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <a
              href="tel:1900xxxx"
              className="inline-flex items-center gap-2 bg-white text-teal-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors"
            >
              <FaPhone />
              (+84) 86 538 387
            </a>
            <a
              href="mailto:contact@example.com"
              className="inline-flex items-center gap-2 bg-white text-teal-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors"
            >
              <FaEnvelope />
              skinlele-clinic@gmail.com
            </a>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Câu hỏi thường gặp
          </h2>
          <p className="text-gray-600">
            Những thắc mắc phổ biến về quá trình hợp tác
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {[
            {
              q: "Quy trình hợp tác diễn ra như thế nào ?",
              a: "Sau khi nhận được thông tin, chúng tôi sẽ liên hệ trong vòng 24h để tư vấn chi tiết. Quy trình gồm: tư vấn, ký kết, tích hợp hệ thống, đào tạo sử dụng và vận hành.",
            },
            {
              q: "Mất bao lâu để tích hợp hệ thống ?",
              a: "Thông thường quá trình tích hợp mất 3-5 ngày làm việc, tùy thuộc vào quy mô và yêu cầu cụ thể của phòng khám.",
            },
            {
              q: "Có được hỗ trợ đào tạo không ?",
              a: "Có, chúng tôi cung cấp đầy đủ tài liệu và khóa đào tạo trực tiếp cho nhân viên phòng khám về cách sử dụng hệ thống.",
            },
            {
              q: "Chi phí hợp tác như thế nào ?",
              a: "Chi phí sẽ được tư vấn cụ thể dựa trên quy mô và nhu cầu của phòng khám. Chúng tôi cam kết mức phí cạnh tranh và hiệu quả.",
            },
          ].map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-gray-900 mb-3">{faq.q}</h3>
              <p className="text-gray-600">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Đối tác nói gì về chúng tôi
            </h2>
            <p className="text-gray-600">
              Phản hồi từ các phòng khám đã hợp tác
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Bs. Nguyễn Mạnh Hưng",
                role: "Giám đốc Phòng khám SBeauty",
                image:
                  "https://phunuphapluat.nguoiduatin.vn/uploads/2022/12/12/phong-kham-da-lieu-s-beauty-mun-khong-con-la-tro-ngai-bac-si-hung-sang-lap-s-beauty-1667812085-996-width780height499.jpg",
                content:
                  "Hệ thống giúp chúng tôi tối ưu hóa quy trình đặt lịch và chăm sóc khách hàng. Doanh thu tăng 30% sau 3 tháng hợp tác.",
              },
              {
                name: "Bs. Nguyễn Văn Hoàn",
                role: "Quản lý phòng khám Maia&Maia",
                image:
                  "https://vcdn1-ngoisao.vnecdn.net/2024/10/16/DSC03448-5450-1729052125.jpg?w=460&h=0&q=100&dpr=2&fit=crop&s=aqLksPw9U0rVl7jtHy083A",
                content:
                  "Đội ngũ hỗ trợ chuyên nghiệp và nhiệt tình. Giải quyết mọi vấn đề nhanh chóng, hiệu quả.",
              },
              {
                name: "Bs. Trần Gia Khánh",
                role: "Chủ phòng khám Zahan",
                image:
                  "https://media.sohuutritue.net.vn/files/huongmi/2023/01/30/gia-khanh-1412.png",
                content:
                  "Giao diện thân thiện, dễ sử dụng. Giúp tiết kiệm thời gian và nguồn lực đáng kể trong quản lý lịch hẹn.",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <blockquote className="text-gray-600 italic">
                  "{testimonial.content}"
                </blockquote>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Partnership;
