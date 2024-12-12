export const getStatusBooking = (status) => {
  switch (status) {
    case "pending":
      return {
        color: "gold",
        label: "Đang chờ",
      };
    case "confirmed":
      return {
        color: "blue",
        label: "Đã xác nhận",
      };
    case "cancelled":
      return {
        color: "red",
        label: "Đã hủy",
      };
    case "completed":
      return {
        color: "green",
        label: "Đã hoàn thành",
      };
    default:
      break;
  }
};
