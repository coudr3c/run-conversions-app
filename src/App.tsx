import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { Header } from "./components/Header";
import { MainPage } from "./pages/MainPage";

function App() {
  return (
    <MantineProvider>
      <Header />
      <MainPage />
    </MantineProvider>
  );
}

export default App;
