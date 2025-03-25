import { useState, useEffect } from "react";
import {
    Table, TableBody, TableCell, TableHead, TableRow, TableContainer,
    Paper, TablePagination, TableSortLabel, Dialog, DialogTitle,
    DialogContent, DialogActions, Button, Select, MenuItem
} from "@mui/material";
import useFetchLista from "../../Hooks/useFetchListaOrdenes";
import useFetchListaRutas from "../../Hooks/useFetchListaRutas";
import api from "../../Api/api";

const ListaOrdenes = () => {
    const { data: dataOrdenes, loading, error } = useFetchLista();
    const { data: dataRutas, loadingRutas, errorRutas } = useFetchListaRutas();

    const [ordenes, setOrdenes] = useState([]);
    const [estadoFiltro, setEstadoFiltro] = useState("");
    const [filaSeleccionada, setFilaSeleccionada] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [rutaSeleccionada, setRutaSeleccionada] = useState("");
    const [order, setOrder] = useState("asc");
    const [orderBy, setOrderBy] = useState("id_envio");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        if (dataOrdenes) {
            setOrdenes(dataOrdenes);
        }
    }, [dataOrdenes]);

    if (loading || loadingRutas) return <p>Cargando...</p>;
    if (error) return <p>Error: {error}</p>;
    if (errorRutas) return <p>Error cargando rutas: {errorRutas}</p>;

    const handleRequestSort = (property) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const sortedData = [...ordenes]
        .filter(item => item.estado_envio.toLowerCase().includes(estadoFiltro.toLowerCase()))
        .sort((a, b) => {
            if (a[orderBy] < b[orderBy]) return order === "asc" ? -1 : 1;
            if (a[orderBy] > b[orderBy]) return order === "asc" ? 1 : -1;
            return 0;
        });

    const handleChangePage = (_, newPage) => setPage(newPage);
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleRowClick = (item) => {
        setFilaSeleccionada(item);
        setRutaSeleccionada(item.ruta_id || "");
        setOpenModal(true);
    };

    const handleGuardarRuta = async () => {
        try {
            await api.put(`/users/Envios/${rutaSeleccionada}/${filaSeleccionada.id_envio}`);
            const rutaNombre = dataRutas.find(ruta => ruta.id === rutaSeleccionada)?.nombre || "Sin asignar";
            setOrdenes(prevOrdenes =>
                prevOrdenes.map(orden =>
                    orden.id_envio === filaSeleccionada.id_envio
                        ? { ...orden, ruta_id: rutaSeleccionada, nombre_ruta: rutaNombre }
                        : orden
                )
            );
            setOpenModal(false);
        } catch (error) {
            console.error("Error al actualizar la ruta:", error);
        }
    };

    return (
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer>
                <Table aria-label="Tabla de órdenes">
                    <TableHead>
                        <TableRow>
                            {[
                                { id: "id_envio", label: "Id Envío" },
                                { id: "nombre_usuario", label: "Usuario" },
                                { id: "peso", label: "Peso" },
                                { id: "dimension", label: "Dimensión" },
                                { id: "tipo_producto", label: "Tipo de producto" },
                                { id: "direccion_destino", label: "Dirección" },
                                { id: "ciudad", label: "Ciudad" },
                                { id: "estado", label: "Estado" },
                                { id: "estado_envio", label: "Estado Envío" },
                                { id: "nombre_ruta", label: "Ruta" }
                            ].map((column) => (
                                <TableCell key={column.id}>
                                    <TableSortLabel
                                        active={orderBy === column.id}
                                        direction={orderBy === column.id ? order : "asc"}
                                        onClick={() => handleRequestSort(column.id)}
                                    >
                                        {column.label}
                                    </TableSortLabel>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item) => (
                            <TableRow
                                key={item.id_envio}
                                onClick={() => handleRowClick(item)}
                                style={{ cursor: "pointer" }}
                            >
                                <TableCell>{item.id_envio}</TableCell>
                                <TableCell>{item.nombre_usuario}</TableCell>
                                <TableCell>{item.peso}</TableCell>
                                <TableCell>{item.dimension}</TableCell>
                                <TableCell>{item.tipo_producto}</TableCell>
                                <TableCell>{item.direccion_destino}</TableCell>
                                <TableCell>{item.ciudad}</TableCell>
                                <TableCell>{item.estado}</TableCell>
                                <TableCell>{item.estado_envio}</TableCell>
                                <TableCell>{item.nombre_ruta || "Sin asignar"}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={sortedData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            <Dialog open={openModal} onClose={() => setOpenModal(false)}>
                <DialogTitle>Asignar Ruta</DialogTitle>
                <DialogContent>
                    <Select value={rutaSeleccionada} onChange={(e) => setRutaSeleccionada(e.target.value)} fullWidth>
                        {dataRutas.map((ruta) => (
                            <MenuItem key={ruta.id} value={ruta.id}>
                                {ruta.nombre}
                            </MenuItem>
                        ))}
                    </Select>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenModal(false)}>Cancelar</Button>
                    <Button onClick={handleGuardarRuta} color="primary">Guardar</Button>
                </DialogActions>
            </Dialog>
        </Paper>
    );
};

export default ListaOrdenes;
