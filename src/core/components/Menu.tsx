import { ReactNode, useContext, useState } from 'react';
import { FaBars, FaHome, FaKey, FaTimes, FaUserAlt, FaUsers } from 'react-icons/fa'; // Importamos los íconos
import { FaMoneyBills } from 'react-icons/fa6';
import { FcReadingEbook } from 'react-icons/fc';
import { GrMoney } from 'react-icons/gr';
import { IoReaderOutline } from 'react-icons/io5';
import { LiaTachometerAltSolid, LiaUsersCogSolid } from 'react-icons/lia';
import { MdOutlineLogout, MdOutlinePayments } from 'react-icons/md';
import { Link } from 'react-router';
import { AutenticacionContext } from '../../autenticacion/context/AutenticacionContext';
import { PermisosContext } from '../../autenticacion/context/PermisosContext';
import { PermisosE } from '../enums/permisos';

export const Menu = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const { cerrarSession } = useContext(AutenticacionContext)
  const { permisosTarifa, permisosCliente, permisosUsuario, permisosRol,
    permisosLectura, permisosMedidor, permisosPago, permisosGasto } = useContext(PermisosContext)


  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({
    medidores: false,
    pagos: false,
    gastos: false,
    lecturas: false,
    usuarios: false,

  });

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className={`transition-all ${open ? 'w-64' : 'w-0'} bg-gray-800 text-white h-auto  `}>
        {/* Mostrar solo el ícono de hamburguesa cuando el sidebar está cerrado */}
        <div className={`flex justify-between items-center p-4 ${open ? 'block' : 'absolute top-4 left-4'}`}>
          <button onClick={() => setOpen(!open)} className="text-white focus:outline-none">
            {/* Ícono de hamburguesa */}
            {!open ? (
              <FaBars className="w-6 h-6  text-black" />
            ) : (
              <FaTimes className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Contenido del sidebar, solo visible cuando open es true */}
        {open && (
          <div className="p-4">
            <ul>
              <li className="mb-4">
                <Link to="/" className="flex items-center gap-4 p-2 rounded-lg hover:bg-gray-700">
                  <FaHome size={24} />
                  <span>Inicio</span>
                </Link>
              </li>

              {permisosCliente.some((i) => i.includes(PermisosE.LISTAR_CLIENTE)) && <li className="mb-4">
                <Link to="/clientes" className="flex items-center gap-4 p-2 rounded-lg hover:bg-gray-700">
                  <FaUsers size={24} />
                  <span>Clientes</span>
                </Link>
              </li>}

              {/* Sección de Medidores */}
              {permisosMedidor.length > 0 && <li>
                <button onClick={() => toggleSection("medidores")} className="flex items-center w-full p-2 rounded-lg hover:bg-gray-700">
                  <LiaTachometerAltSolid size={24} />
                  <span>Medidores</span>
                </button>

                {openSections.medidores && (
                  <ul className="ml-6">
                    {permisosMedidor.some((i) => i.includes(PermisosE.LISTAR_MEDIDOR)) && <li>
                      <Link to="/medidor" className="flex items-center gap-4 p-2 rounded-lg hover:bg-gray-700">
                        <span>Listar Medidores</span>
                      </Link>
                    </li>}
                    {permisosMedidor.some((i) => i.includes(PermisosE.CREAR_MEDIDOR)) && <li>
                      <Link to="/medidor/crear" className="flex items-center gap-4 p-2 rounded-lg hover:bg-gray-700">
                        <span>crear Medidor</span>
                      </Link>
                    </li>}

                    {permisosMedidor.some((i) => i.includes(PermisosE.LISTAR_MEDIDOR)) && <li>
                      <Link to="/listar/corte/medidor" className="flex items-center gap-4 p-2 rounded-lg hover:bg-gray-700">
                        <span>Corte medidor</span>
                      </Link>
                    </li>}
                  </ul>
                )}
              </li>}

              {/* Sección de Pagos y Tarifas */}
              {(permisosPago.length > 0 || permisosTarifa.length > 0) && <li>
                <button onClick={() => toggleSection("pagos")} className="flex items-center w-full p-2 rounded-lg hover:bg-gray-700">
                  <MdOutlinePayments size={24} />
                  <span>Pagos y Tarifas</span>
                </button>
                {openSections.pagos && (
                  <ul className="ml-6">
                    {permisosTarifa.some((i) => i.includes(PermisosE.LISTAR_TARIFA)) && <li>
                      <Link to="/tarifas" className="flex items-center gap-4 p-2 rounded-lg hover:bg-gray-700">
                        <GrMoney size={24} />
                        <span>Tarifas</span>
                      </Link>
                    </li>}
                    {permisosPago.some((i) => i.includes(PermisosE.CREAR_PAGO)) && <li>
                      <Link to="/realizar/pago" className="flex items-center gap-4 p-2 rounded-lg hover:bg-gray-700">
                        <GrMoney size={24} />
                        <span>Realizar pagos</span>
                      </Link>
                    </li>}
                    {permisosPago.some((i) => i.includes(PermisosE.LISTAR_PAGO)) && <li>
                      <Link to="/listar/Pagos" className="flex items-center gap-4 p-2 rounded-lg hover:bg-gray-700">
                        <GrMoney size={24} />
                        <span>Listar pagos</span>
                      </Link>
                    </li>}
                  </ul>
                )}
              </li>
              }


              {permisosGasto.length > 0 &&
                < li >
                  <button onClick={() => toggleSection("gastos")} className="flex items-center w-full p-2 rounded-lg hover:bg-gray-700">
                    <FaMoneyBills size={24} />
                    <span>Gastos</span>
                  </button>
                  {openSections.gastos && (
                    <ul className="ml-6">
                      <li>
                        <Link to="/categorias/gasto" className="flex items-center gap-4 p-2 rounded-lg hover:bg-gray-700">
                          <span>Categoría de Gasto</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="/gastos" className="flex items-center gap-4 p-2 rounded-lg hover:bg-gray-700">
                          <span>Lista de Gastos</span>
                        </Link>
                      </li>
                    </ul>
                  )}
                </li>}

              {/* Sección de Lecturas */}
              {permisosLectura.length > 0 && <li>
                <button onClick={() => toggleSection("lecturas")} className="flex items-center w-full p-2 rounded-lg hover:bg-gray-700">
                  <IoReaderOutline size={24} />
                  <span>Lecturas</span>
                </button>
                {openSections.lecturas && (
                  <ul className="ml-6">
                    {permisosLectura.some((i) => i.includes(PermisosE.CREAR_LECTURA)) && <li>
                      <Link to="/lectura/registrar" className="flex items-center gap-4 p-2 rounded-lg hover:bg-gray-700">
                        <FcReadingEbook size={24} />
                        <span>Realizar Lecturas</span>
                      </Link>
                    </li>}
                    {permisosLectura.some((i) => i.includes(PermisosE.LISTAR_LECTURA)) && <li>
                      <Link to="/listar/lectura" className="flex items-center gap-4 p-2 rounded-lg hover:bg-gray-700">
                        <FcReadingEbook size={24} />
                        <span>Listar Lecturas</span>
                      </Link>
                    </li>}
                  </ul>
                )}
              </li>}




              {(permisosRol.length > 0 || permisosUsuario.length > 0) && <li>
                <button onClick={() => toggleSection("usuarios")} className="flex items-center w-full p-2 rounded-lg hover:bg-gray-700">
                  <LiaUsersCogSolid size={24} />
                  <span>Administracion</span>
                </button>
                {openSections.usuarios && (
                  <ul className="ml-6">
                    {permisosUsuario.some((i) => i.includes(PermisosE.LISTAR_USUARIO)) && <li>
                      <Link to="/listar/usuarios" className="flex items-center gap-4 p-2 rounded-lg hover:bg-gray-700">
                        <FaUserAlt size={24} />
                        <span>Listar usuarios</span>
                      </Link>
                    </li>}

                    {permisosRol.some((i) => i.includes(PermisosE.CREAR_ROL)) && <li>
                      <Link to="/crear/rol" className="flex items-center gap-4 p-2 rounded-lg hover:bg-gray-700">
                        <FaKey size={24} />
                        <span>Crear rol</span>
                      </Link>
                    </li>}

                    {permisosRol.some((i) => i.includes(PermisosE.LISTAR_ROL)) && <li>
                      <Link to="/listar/rol" className="flex items-center gap-4 p-2 rounded-lg hover:bg-gray-700">
                        <FaKey size={24} />
                        <span>Listar roles</span>
                      </Link>
                    </li>}

                  </ul>
                )}
              </li>}
            </ul>
          </div>
        )}

        <ul>
          <li className="mb-4">
            <Link to="/" onClick={cerrarSession} className="flex items-center gap-4 p-2 rounded-lg hover:bg-gray-700">
              <MdOutlineLogout size={24} />
              <span>Cerrar session</span>
            </Link>
          </li>
        </ul>
      </div>

      {/* Contenido principal */}
      <div className="flex-1 p-2">
        {children}
      </div>
    </div >
  );
};
