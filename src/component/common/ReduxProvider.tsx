import { persistor, store } from "@/redux/store";
import { SnackbarProvider } from "notistack";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

export default function ReduxProvider(Component: any) {
  const Wrapped = ({ ...props }: any) => {
    return (
      <SnackbarProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Component {...props} />
          </PersistGate>
        </Provider>
      </SnackbarProvider>
    );
  };
  return Wrapped;
}
