import React from "react";
import { ThreeDot } from "react-loading-indicators";

const AuthLoading = () => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg p-8 shadow-xl">
      <div className="flex flex-col items-center gap-4">
        <ThreeDot variant="pulsate" color="#2563eb" size="small" text="Verifying..." textColor="#374151" />
      </div>
    </div>
  </div>
);

export default AuthLoading;
