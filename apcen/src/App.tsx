import Login from "./pages/Login";
import { AuthProvider } from "./store/auth";

function App() {
  return (
    <AuthProvider>
      <Login />
    </AuthProvider>
  );
}

export default App;
