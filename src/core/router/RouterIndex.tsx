import { BrowserRouter as Router, Routes, Route } from "react-router"
import { tarifaRouter } from "../../tarifa/router/tarifaRouter"
import { RouterI } from "../interface/router"
import { clienteRouter } from "../../cliente/routes/clienteRouter";
import { Menu } from "../components/Menu";
import { medidorRouter } from "../../medidor/router/medidorRouter";
import { gastoRouter } from "../../gasto/router/gastoRouter";
import { categoriaGastoRouter } from "../../categoriaGasto/router/CategoriaGastoRouter";
import { lecturaRouter } from "../../lectura/router/lecturaRouter";
import { pagoRouter } from "../../pago/router/pagoRouter";
import { usuarioRouter } from "../../usuario/router/usuarioRouter";
import { rolRouter } from "../../rol/router/rolRouter";
import { useContext } from "react";
import { AutenticacionContext } from "../../autenticacion/context/AutenticacionContext";
import { homeRouter } from "../../home/router/homeRouter";
import { AutenticacionPage } from "../../autenticacion/page/AutenticacionPage";
import { NotFound } from "../components/NotFound";


const RouterApp = ({ router }: { router: RouterI[] }) => {

  return (
    <>
      <Routes>
        {router.map((item, index) => (
          <Route key={index} path={item.path} element={<item.element />} />
        ))}

      </Routes>
    </>
  );
};

export const RouterIndex = () => {
  const { isAutenticacion, token } = useContext(AutenticacionContext)
  if (!isAutenticacion && !token) {
    return (
      <Router>

        <Routes>
          <Route path="/" element={<AutenticacionPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

      </Router>
    );
  }
  return (

    <> {
      isAutenticacion && token && <Router>

        <Menu>
          <RouterApp router={tarifaRouter} />
          <RouterApp router={clienteRouter} />
          <RouterApp router={medidorRouter} />
          <RouterApp router={gastoRouter} />
          <RouterApp router={categoriaGastoRouter} />
          <RouterApp router={lecturaRouter} />
          <RouterApp router={pagoRouter} />
          <RouterApp router={usuarioRouter} />
          <RouterApp router={rolRouter} />
          <RouterApp router={homeRouter} />
        </Menu>

      </Router>
    }</>

  );
};
