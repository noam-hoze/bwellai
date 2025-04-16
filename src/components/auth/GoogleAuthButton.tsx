import { useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from "axios";

const GoogleLoginButton = ({ clientId, onLoginSuccess, onLoginFailure }) => {
  const [loading, setLoading] = useState(false);

  const handleSuccess = async (response) => {
    setLoading(true);
    try {
      const { credential } = response;
      const backendResponse = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/user/auth/google/callback`,
        {
          params: {
            Token: credential,
          },
        }
      );

      if (onLoginSuccess) {
        onLoginSuccess(backendResponse.data.payload);
      }
    } catch (error) {
      if (onLoginFailure) {
        onLoginFailure(error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className="flex justify-center items-center w-full py-2 relative">
        {loading ? (
          <p>Loading..</p>
        ) : (
          <GoogleLogin
            onSuccess={handleSuccess}
            onError={() => {
              console.error("Google Login Error:");
              if (onLoginFailure) {
                onLoginFailure("error");
              }
            }}
          />
        )}
      </div>
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginButton;
