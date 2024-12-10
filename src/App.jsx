import { BrowserRouter } from "react-router-dom";
import Router from "./routes/index";
import { FloatButton } from "antd";
import { ScrollProvider } from "./components/context/ScrollProvider";

function App() {
  return (
    <ScrollProvider>
      <BrowserRouter>
        <Router />
        <FloatButton.BackTop />
      </BrowserRouter>
    </ScrollProvider>
  );
}

export default App;
