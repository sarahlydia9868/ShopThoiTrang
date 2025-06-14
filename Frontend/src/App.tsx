import { Provider } from "react-redux";
import { useRoutes } from "react-router-dom";
import routes from "./routes";
import store from "./redux/store";
import AOSInit from "./utils/aos";
import { useEffect } from "react";
import { loadUser } from "./actions/user";

function App() {
  const router = useRoutes(routes);
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    
    <Provider store={store}>
      <AOSInit />
      {router}
    </Provider>
  );
}

export default App;
