import { BrowserRouter } from "react-router-dom";
import Router from "./routes/index";
import { FloatButton } from "antd";
import { ScrollProvider } from "./components/context/ScrollProvider";
import { IoArrowUpOutline } from "react-icons/io5";

function App() {
  return (
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
  );
}

export default App;
