"use client";
import TourDetail from "@/components/TourDetail";
import { bookStore, persistedBookReducer } from "@/lib/store/bookStore";
import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

export default function page() {
  return (
    <Provider store={bookStore}>
      <PersistGate loading={null} persistor={persistedBookReducer}>
        <TourDetail />
      </PersistGate>
    </Provider>
  );
}
