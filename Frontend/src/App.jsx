import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CategoriasProvider } from "./context/CategoriasContext";
import { AreasProvider } from "./context/AreasContext";
import { AmbientesProvider } from "./context/AmbientesContext";
import { TicketsProvider } from "./context/TicketsContext";
import { BitacorasProvider } from "./context/BitacorasContext";
import { EquiposProvider } from "./context/EquiposContext";
import { ReservasProvider } from "./context/ReservasContext";
import { NotificacionProvider } from "./context/NotificacionContext";
import { ComentariosProvider } from "./context/ComentariosContext";
import { EncuestasProvider } from "./context/EncuestasContext";
import { ArchivosAdjuntosProvider } from "./context/ArchivosAdjuntosContext";

import NavigationPage from "./Components/Pages/NavigationPage";
import MainPage from "./Components/Pages/MainPage";
import Dashboard from "./Components/Pages/Dashboard";
import Perfil from "./Components/Pages/Perfil";
import CardCategoriasPage from "./Components/Pages/CardCategoriasPage";
import CardAreasPage from "./Components/Pages/CardAreasPage";
import CardAmbientesPage from "./Components/Pages/CardAmbientesPage";
import CardBitacorasPage from "./Components/Pages/CardBitacorasPage";
import CardReservaPage from "./Components/Pages/CardReservaPage";
import CardNotificacionPage from "./Components/Pages/CardNotificacionPage";
import ProtectedRoute from "./ProtectedRoute";
import LoginFormModel from "./Components/Models/LoginFormModel";
import FormUserPage from "./Components/Pages/FormUserPage";
import FormUserDataPage from "./Components/Pages/FormUserDataPage";
import FormUserPasswordPage from "./Components/Pages/FormUserPasswordPage";
import FormAreaPage from "./Components/Pages/FormAreaPage";
import FormAmbientePage from "./Components/Pages/FormAmbientePage";
import FormCategoriaPage from "./Components/Pages/FormCategoriaPage";
import FormTicketsPage from "./Components/Pages/FormTicketsPage";
import FormBitacorasPage from "./Components/Pages/FormBitacorasPage";
import FormEquipoPage from "./Components/Pages/FormEquipoPage";
import CardEquiposPage from "./Components/Pages/CardEquiposPage";
import FormReservasAmbientePage from './Components/Pages/FormReservasAmbientePage';
import FormReservasEquipoPage from './Components/Pages/FormReservasEquipoPage';
import CardComentarioPage from "./Components/Pages/CardComentarioPage";
import FormEncuestaSatisfaccionPage from './Components/Pages/FormEncuestaSatisfaccionPage';
import CardEncuestaSatisfaccionPage from "./Components/Pages/CardEncuestaSatisfaccionPage";
import CardArchivosAdjuntosPage from "./Components/Pages/CardArchivosAdjuntosPage";
import FormArchivosPage from "./Components/Pages/FormArchivosPage";

function App() {
  return (
    <AuthProvider>
      <CategoriasProvider>
        <AreasProvider>
          <AmbientesProvider>
            <EquiposProvider>
              <ReservasProvider>
                <NotificacionProvider>
                  <TicketsProvider>
                    <BitacorasProvider>
                      <EncuestasProvider>
                        <ArchivosAdjuntosProvider>
                          <ComentariosProvider>
                            <BrowserRouter>
                              <NavigationPage>
                                <Routes>
                                  <Route path='/' element={<MainPage />} />
                                  <Route path='/login' element={<LoginFormModel />} />
                                  <Route element={<ProtectedRoute />} >
                                    <Route path='/dashboard' element={<Dashboard />} />
                                    <Route path='/perfil' element={<Perfil />} />
                                    <Route path='/categorias' element={<CardCategoriasPage />} />
                                    <Route path='/bitacoras' element={<CardBitacorasPage />} />
                                    <Route path='/archivos' element={<CardArchivosAdjuntosPage />} />
                                    <Route path='/areas' element={<CardAreasPage />} />
                                    <Route path='/ambientes' element={<CardAmbientesPage />} />
                                    <Route path='/equipos' element={<CardEquiposPage />} />
                                    <Route path='/reservas' element={<CardReservaPage />} />
                                    <Route path='/notificaciones' element={<CardNotificacionPage />} />
                                    <Route path='/encuestas' element={<CardEncuestaSatisfaccionPage />} />
                                    <Route path='/comentarios/:id' element={<CardComentarioPage />} />
                                    <Route path='/add-user' element={<FormUserPage />} />
                                    <Route path='/edit-user/:id' element={<FormUserPage />} />
                                    <Route path='/edit-data-user/:id' element={<FormUserDataPage />} />
                                    <Route path='/edit-password-user/:id' element={<FormUserPasswordPage />} />
                                    <Route path='/add-area' element={<FormAreaPage />} />
                                    <Route path='/edit-area/:id' element={<FormAreaPage />} />
                                    <Route path='/add-ambiente' element={<FormAmbientePage />} />
                                    <Route path='/edit-ambiente/:id' element={<FormAmbientePage />} />
                                    <Route path='/add-categoria' element={<FormCategoriaPage />} />
                                    <Route path='/edit-categoria/:id' element={<FormCategoriaPage />} />
                                    <Route path='/add-tickets' element={<FormTicketsPage />} />
                                    <Route path='/edit-tickets/:id' element={<FormTicketsPage />} />
                                    <Route path='/add-bitacoras' element={<FormBitacorasPage />} />
                                    <Route path='/edit-bitacoras/:id' element={<FormBitacorasPage />} />
                                    <Route path='/add-equipo' element={<FormEquipoPage />} />
                                    <Route path='/edit-equipo/:id' element={<FormEquipoPage />} />
                                    <Route path='/add-reserva-ambiente' element={<FormReservasAmbientePage />} />
                                    <Route path='/edit-reserva-ambiente/:id' element={<FormReservasAmbientePage />} />
                                    <Route path='/add-reserva-equipo' element={<FormReservasEquipoPage />} />
                                    <Route path='/edit-reserva-equipo/:id' element={<FormReservasEquipoPage />} />
                                    <Route path='/add-encuesta-ticket/:id' element={<FormEncuestaSatisfaccionPage />} />
                                    <Route path='/add-file/:id' element={<FormArchivosPage />} />
                                    <Route path='/edit-file/:ids' element={<FormArchivosPage />} />
                                  </Route>
                                </Routes>
                              </NavigationPage>
                            </BrowserRouter>
                          </ComentariosProvider>
                        </ArchivosAdjuntosProvider>
                      </EncuestasProvider>
                    </BitacorasProvider>
                  </TicketsProvider>
                </NotificacionProvider>
              </ReservasProvider>
            </EquiposProvider>
          </AmbientesProvider>
        </AreasProvider>
      </CategoriasProvider>
    </AuthProvider>
  )
}

export default App
