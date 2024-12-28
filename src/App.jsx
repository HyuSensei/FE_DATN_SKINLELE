import { BrowserRouter } from "react-router-dom";
import Router from "./routes/index";
import { FloatButton } from "antd";
import { ScrollProvider } from "./components/context/ScrollProvider";
import { IoArrowUpOutline } from "react-icons/io5";
import { ConfigProvider } from "antd";
import dayjs from "dayjs";
import locale from "dayjs/locale/vi";
import viVN from "antd/es/locale/vi_VN";

dayjs.locale(locale);

function App() {
  return (
    <ConfigProvider locale={viVN}>
      <ScrollProvider>
        <BrowserRouter>
          <Router />
          <FloatButton.BackTop
            icon={<IoArrowUpOutline color="#1bbdbf" />}
            style={{
              bottom: 24,
              right: "50%",
              transform: "translateX(50%)",
              backgroundColor: "#ecfffb",
            }}
          />
        </BrowserRouter>
      </ScrollProvider>
    </ConfigProvider>
  );
}

export default App;
