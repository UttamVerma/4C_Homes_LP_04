import Homepage from "../pages/Homepage";
import MessagePage from "../pages/MessagePage";
import NotFound from "../pages/NotFound";
import Thankyou from "../pages/Thankyou";

const { Routes, Route } = require("react-router-dom");

let AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/message" element={<MessagePage/>}/>
      {/* <Route path="/thankyou" element={<Thankyou />} /> */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AllRoutes;
