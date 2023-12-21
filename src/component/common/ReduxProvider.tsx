import { persistor, store } from "@/redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

export default function ReduxProvider(Component: any) {
  const Wrapped = ({ ...props }: any) => {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Component {...props} />
        </PersistGate>
      </Provider>
    );
  };
  return Wrapped;
}
