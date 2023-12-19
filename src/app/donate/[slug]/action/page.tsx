"use client";
import PurpleButton from "@/component/common/PurpleButton";
import { onClear, onDecrement, onIncrement } from "@/redux/slices/_testSlice";
import { useAppDispatch, useAppSelector } from "@/redux/useReduxHooks";
import { Box, Stack } from "@mui/material";

import { Provider } from "react-redux";
import { persistor, store } from "@/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import ReduxProvider from "@/component/common/ReduxProvider";

function DonateAction() {
  const testReducerStore = useAppSelector((state) => state.testReducer);
  const dispatch = useAppDispatch();

  const handeIncrement = () => {
    dispatch(onIncrement());
  };

  const handleDecrement = () => {
    dispatch(onDecrement());
  };

  const handleClear = () => {
    dispatch(onClear());
  };

  return (
    <Box>
      <Box padding="1rem">{testReducerStore?.count}</Box>
      <Stack direction="row" padding="1rem">
        <PurpleButton
          text="Increment"
          onClick={handeIncrement}
          style={{ marginRight: "5px" }}
        />
        <PurpleButton
          text="Decrement"
          onClick={handleDecrement}
          style={{ marginRight: "5px" }}
        />
        <PurpleButton text="Clear" onClick={handleClear} />
      </Stack>
    </Box>
  );


}

export default ReduxProvider(DonateAction);

// export default function DonateAction() {
//   return (
//     <Provider store={store}>
//       <PersistGate persistor={persistor}>
//         <DonateActionMini />
//       </PersistGate>
//     </Provider>
//   );
// }
