import React, { Suspense } from 'react';



// Mapa de componentes a cargar dinámicamente
const componentsMap = {
  Login: React.lazy(() => import('../Views/Login/Login.jsx')),
  Envio: React.lazy(() => import('../Views/Envio/Envio.jsx')),
  ListaEnvios: React.lazy(()=>import('../Views/ListaEnvios/ListaEnvios.jsx')),
  ListaOrdenes: React.lazy(()=>import('../Views/ListaOrdenes/ListaOrdenes.jsx')),
  ListaRutas: React.lazy(()=>import('../Views/ListaRutas/ListaRutas.jsx')),
  Transportista: React.lazy(()=>import('../Views/Transportista/Transportista.jsx')),
  ListaTransportista: React.lazy(()=>import('../Views/ListaTransportista/ListaTransportista.jsx'))
  // Agregar más componentes aquí según se necesiten
};

/**
 * Función para cargar un componente de forma dinámica.
 * @param {string} componentName - Nombre del componente a cargar
 * @returns {JSX.Element} - El componente cargado de forma dinámica.
 */
const DynamicComponentLoader = ({ componentName }) => {
  // Si el componente no existe, renderizar un fallback.
  const ComponentToRender = componentsMap[componentName] || null;

  return (
    <Suspense fallback={<div className="loading-spinner">Cargando...</div>}>
      {ComponentToRender ? <ComponentToRender /> : <div>Componente no encontrado</div>}
    </Suspense>
  );
};

export default DynamicComponentLoader;
