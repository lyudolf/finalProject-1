import "./App.css";
import Header from "../src/component/Header";
import Footer from "../src/component/Footer";
import Main from "../src/component/Main";
import MenuBar from "../src/component/MenuBar";

function App() {
  return (
    <div className="App">
      <Header />
      <MenuBar />
      <Main />
      <Footer />
    </div>
  );
}

export default App;
