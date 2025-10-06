import { IoAlertCircleOutline } from "react-icons/io5";
import { TiArrowLeft } from "react-icons/ti";
import { LuRefreshCcw } from "react-icons/lu";

export default function TokenExpiredPage() {
  const handleRefresh = () => {
    window.location.reload();
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-fit flex justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-sm p-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
            <IoAlertCircleOutline className="w-8 h-8 text-red-600" />
          </div>
        </div>
        
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
          Token Expired
        </h1>
        
        <p className="text-gray-600 mb-8">
          Your session has expired or the token is invalid. Please refresh the page or go back to try again.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={handleGoBack}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <TiArrowLeft className="w-4 h-4" />
            Go Back
          </button>
          
          <button
            onClick={handleRefresh}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <LuRefreshCcw className="w-4 h-4" />
            Refresh Page
          </button>
        </div>
      </div>
    </div>
  );
}