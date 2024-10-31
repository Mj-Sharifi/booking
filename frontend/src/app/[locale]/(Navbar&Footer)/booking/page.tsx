"use client"
import BookingContent from "@/components/Booking/BookingContent";
import { bookStore, persistedBookReducer } from "@/lib/store/bookStore";
import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

export default function Booking() {
  return (
    <Provider store={bookStore}>
      <PersistGate loading={null} persistor={persistedBookReducer}>
        <BookingContent />
      </PersistGate>
    </Provider>
  );
}
