import AppRoutes from "./AppRoutes";
import AuthProvider from "./Auth/AuthContext";

function App() {
  return (
    <>
      <AuthProvider >
        <AppRoutes />
      </AuthProvider>
    </>
  );
}

export default App;
