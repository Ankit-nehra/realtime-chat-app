import { Link } from "react-router-dom";

export default function Welcome() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white px-4">
      
      {/* Glow background effects */}
      <div className="absolute w-72 h-72 bg-purple-600 rounded-full blur-3xl opacity-30 top-10 left-10"></div>
      <div className="absolute w-72 h-72 bg-blue-600 rounded-full blur-3xl opacity-30 bottom-10 right-10"></div>

      {/* Main Card */}
      <div className="relative w-full max-w-2xl text-center bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-10">
        
        {/* Logo / Title */}
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          💬 RealTime Chat
        </h1>

        <p className="mt-4 text-gray-300 text-sm md:text-base">
          Connect instantly. Chat in real-time. Stay synced across all devices.
        </p>

        {/* Feature highlights */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs md:text-sm text-gray-400">
          <div className="bg-white/5 p-3 rounded-lg border border-white/10">
            ⚡ Instant Messaging
          </div>
          <div className="bg-white/5 p-3 rounded-lg border border-white/10">
            🔒 Secure Chats
          </div>
          <div className="bg-white/5 p-3 rounded-lg border border-white/10">
            🌐 Global Connectivity
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-10 flex flex-col md:flex-row gap-4 justify-center">
          
          <Link
            to="/login"
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 transition font-medium shadow-lg shadow-blue-600/30"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 transition font-medium shadow-lg shadow-purple-600/30"
          >
            Register
          </Link>
        </div>

        {/* Footer */}
        <p className="mt-8 text-xs text-gray-500">
          Built with MERN Stack • Real-time powered by Socket.io
        </p>
      </div>
    </div>
  );
}