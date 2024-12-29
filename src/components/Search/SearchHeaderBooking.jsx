import React, { useCallback, useState } from 'react';
import { Input, Popover, Spin, Empty } from 'antd';
import { debounce } from 'lodash';
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useGetDoctorClinicBySearchQuery } from "@/redux/doctor/doctor.query";

const SearchHeaderBooking = () => {
  const [search, setSearch] = useState("");
  const [showPopover, setShowPopover] = useState(false);

  const { data, isLoading, error } = useGetDoctorClinicBySearchQuery(
    { search },
    { skip: !search }
  );

  const debouncedSearch = useCallback(
    debounce((value) => {
      setSearch(value);
    }, 500),
    []
  );

  const renderSearchResults = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center py-8">
          <Spin size="large" />
        </div>
      );
    }

    if (error) {
      return (
        <Empty
          description="Đã có lỗi xảy ra vui lòng thử lại"
          className="py-8"
        />
      );
    }

    if (!data?.length) {
      return (
        <Empty description="Không tìm thấy kết quả phù hợp" className="py-8" />
      );
    }

    return (
      <div className="max-h-[60vh] overflow-y-auto scroll-hiden">
        {data.map((item) => (
          <Link
            key={item._id}
            to={`/${item.type}-detail/${item.slug}`}
            onClick={() => {
              setShowPopover(false);
              setSearch("");
            }}
            className="block hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-start gap-3 p-4 border-b border-gray-100">
              {item.type === "doctor" ? (
                <img
                  src={item.avatar.url}
                  alt={item.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-sky-300"
                />
              ) : (
                <img
                  src={item.logo.url}
                  alt={item.name}
                  className="w-12 h-12 rounded-lg object-cover"
                />
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium text-gray-900 truncate">
                    {item.name}
                  </h4>
                </div>
                {item.type === "doctor" ? (
                  <p className="mt-1 text-sm text-gray-500">
                    Chuyên khoa: {item.specialty}
                  </p>
                ) : (
                  <div className="flex gap-2 items-center">
                    <p
                      className="mt-1 text-sm text-gray-500 flex items-center gap-1 break-words"
                      dangerouslySetInnerHTML={{ __html: item.address }}
                    />
                  </div>
                )}
                {item.type === "clinic" && item.specialties?.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {item.specialties.slice(0, 3).map((specialty, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 text-xs bg-blue-50 text-blue-600 rounded-full"
                      >
                        {specialty}
                      </span>
                    ))}
                    {item.specialties.length > 3 && (
                      <span className="px-2 py-1 text-xs text-gray-500">
                        +{item.specialties.length - 3}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </Link>
        ))}
        {data?.pagination?.hasMore && (
          <div className="p-3 text-center">
            <Link
              to={`/search?q=${search}`}
              className="text-blue-500 hover:text-blue-600 text-sm font-medium"
              onClick={() => setShowPopover(false)}
            >
              Xem thêm kết quả
            </Link>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="relative w-full max-w-xl mx-auto">
      <Popover
        content={renderSearchResults()}
        title={
          <div className="flex items-center gap-2 py-2">
            <FaSearch className="text-gray-400" />
            <span className="font-medium">Kết quả tìm kiếm</span>
          </div>
        }
        trigger="click"
        open={showPopover && search.length > 0}
        onOpenChange={setShowPopover}
        overlayClassName="w-full md:w-[600px]"
        overlayStyle={{ maxWidth: "90vw" }}
        arrow={false}
        placement="bottomRight"
      >
        <Input
          value={search}
          size="large"
          prefix={<FaSearch className="text-gray-400" />}
          placeholder="Tìm kiếm phòng khám, bác sĩ..."
          className="rounded-full bg-slate-50 hover:bg-white focus:bg-white transition-colors"
          onChange={(e) => {
            setSearch(e.target.value);
            debouncedSearch(e.target.value);
          }}
          onFocus={() => {
            if (search) setShowPopover(true);
          }}
        />
      </Popover>
    </div>
  );
};

export default SearchHeaderBooking;
