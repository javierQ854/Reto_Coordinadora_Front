import useFetchLista from "../../Hooks/useFetchLista";
import { Paper, TableContainer } from "@mui/material";
const ListaEnvios = () => {
    const { data, loading, error } = useFetchLista();

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer>
                <table stickyheader="true" aria-label="sticky table">
                    <thead>
                        <tr>
                            <th>Peso</th>
                            <th>Dimension</th>
                            <th>Tipo de producto</th>
                            <th>Direccion de destino</th>
                            <th>Ciudad</th>
                            <th>Departamento</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item) => (
                            <tr key={item.id_envio}>
                                <td>{item.peso}</td>
                                <td>{item.dimension}</td>
                                <td>{item.tipo_producto}</td>
                                <td>{item.direccion_destino}</td>
                                <td>{item.ciudad}</td>
                                <td>{item.estado}</td>
                                <td>{item.estado_envio}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </TableContainer>
        </Paper>
    )
}

export default ListaEnvios