import { Provider } from "react-redux";
import { useRoutes } from "react-router-dom";
import routes from "./routes";
import store from "./redux/store";
import AOSInit from "./utils/aos";

function App() {
  const router = useRoutes(routes);
  return (
    <Provider store={store}>
      <AOSInit />
      {router}
    </Provider>
  );
}

export default App;
