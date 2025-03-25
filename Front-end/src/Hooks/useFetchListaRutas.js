import { useState, useEffect } from "react";
import api from "../Api/api"; // Importa la configuración de Axios
import { jwtDecode } from "jwt-decode";

const useFetchListaRutas = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLista = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) throw new Error("No hay token");
                const userId = jwtDecode(token).userId; // Extrae el ID del token
                const response = await api.get(`/Rutas`); // Llama al endpoint con el ID
                setData(response.data);
            } catch (err) {
                setError("Por favor inicie sesion");
            } finally {
                setLoading(false);
            }
        };

        fetchLista();
    }, []);

    return { data, loading, error };
};

export default useFetchListaRutas;