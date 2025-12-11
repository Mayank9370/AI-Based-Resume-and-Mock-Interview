const Login = () => {
  const { VITE_BASE_URL } = import.meta.env;

  const handleLogin = () => {
    const params = new URLSearchParams({
      response_type: "code",
      client_id: "777p4meyjnrqr4",
      redirect_uri: `${VITE_BASE_URL}/api/linkedin/callback`,
      //redirect_uri: "http://localhost:5000/api/linkedin/callback",
      scope: "openid email profile",
    });

    window.location.href = `https://www.linkedin.com/oauth/v2/authorization?${params.toString()}`;
  };

  return (
    <div className="h-screen w-full bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-10 text-center">
        {/* Title */}
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          Welcome Back 👋
        </h1>
        <p className="text-gray-500 mb-10">
          Login to continue using your LinkedIn account
        </p>

        {/* LinkedIn Button */}
        <button
          onClick={handleLogin}
          className="w-full py-3 text-xl font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md transition-all"
        >
          Continue with LinkedIn
        </button>

        {/* Footer */}
        <p className="text-gray-400 mt-6 text-sm">
          By continuing, you agree to our Terms & Privacy Policy.
        </p>
      </div>
    </div>
  );
};

export default Login;