
import './App.css'
import { AutenticacionProvider } from './autenticacion/context/AutenticacionProvider'
import { PermisosProvider } from './autenticacion/context/PermisosProvider'
import { RouterIndex } from './core/router/RouterIndex'
import { Toaster } from 'react-hot-toast';
function App() {

  return (
    <>
      <AutenticacionProvider>
        <PermisosProvider>
          <RouterIndex />
        </PermisosProvider>
      </AutenticacionProvider>
      <Toaster />
    </>
  )
}

export default App
