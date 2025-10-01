import AuthFooter from "../components/auth/AuthFooter";
import AuthForm from "../components/auth/AuthForm";
import AuthHeader from "../components/auth/AuthHeader";
import AuthLoading from "../components/auth/AuthLoading";
import AuthToggle from "../components/auth/AuthToggle";
import GoogleAuthButton from "../components/auth/GoogleAuthButton";
import { useAuth } from "../components/auth/useAuth";

const Auth = () => {
  const {
    isLogin,
    setIsLogin,
    isLoading,
    isGoogleLoading,
    currentForm,
    register,
    errors,
    handleFormSubmit,
    handleGoogleLogin,
    formData,
    setFormData
  } = useAuth();

  return (
    <div className="w-full min-h-screen bg-white flex items-center justify-center">
      <div className="m-auto w-[90%] lg:w-1/4 h-auto pb-3">
        <div className="flex flex-col gap-5 items-center">
          <AuthHeader
            title={currentForm.title}
            description={currentForm.disc}
          />

          <AuthToggle isLogin={isLogin} onToggle={setIsLogin} />

          <AuthForm
            fields={currentForm.field}
            register={register}
            errors={errors}
            onSubmit={handleFormSubmit}
            isLoading={isLoading}
            buttonText={currentForm.buttonText}
            formData={formData}
            setFormData={setFormData}
          />

          <GoogleAuthButton isLogin={isLogin} onClick={handleGoogleLogin} />

          <AuthFooter isLogin={isLogin} onToggle={setIsLogin} />
          {isGoogleLoading && <AuthLoading />}
        </div>
      </div>
    </div>
  );
};

export default Auth;
