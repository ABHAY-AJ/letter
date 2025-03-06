import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "./Auth";
import Editor from "./Editor";

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
  <div>
    <h1>Letter Editor</h1>
    <Auth />
    <Routes>
      <Route path="/editor" element={<Editor />} />
    </Routes>
  </div>
</Router>

  );
}

export default App;
