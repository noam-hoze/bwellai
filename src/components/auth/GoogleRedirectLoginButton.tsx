const GoogleRedirectLoginButton = () => {
  const handleLogin = () => {
    const clientId = import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID;
    const redirectUri = `${window.location.origin}/dashboard`; // You must handle this route
    console.log(redirectUri);

    const scope = "openid email profile";
    const responseType = "code";

    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}`;

    // Redirect to Google login page in same tab
    window.location.href = authUrl;
  };

  return (
    <button
      onClick={handleLogin}
      className="bg-blue-500 text-white px-4 py-2 rounded"
    >
      Continue with Google
    </button>
  );
};

export default GoogleRedirectLoginButton;
