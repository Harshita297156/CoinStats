import { BrowserRouter, Route, Routes } from "react-router-dom";
import { styled } from "@mui/system"; // Import styled from @mui/system
import Header from "./components/Header";
import "./App.css";
import Homepage from "./Pages/Homepage";
import CoinPage from "./Pages/CoinPage";

// Use styled to create the App container with a gradient background
const AppContainer = styled("div")({
  background: "linear-gradient(135deg,rgb(22, 52, 62),rgb(9, 28, 35))", // Blue gradient for a fresh modern look
  color: "white",
  minHeight: "100vh",
});

function App() {
  return (
    <BrowserRouter>
      <AppContainer>
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/coins/:id" element={<CoinPage />} />
        </Routes>
      </AppContainer>
    </BrowserRouter>
  );
}

export default App;
