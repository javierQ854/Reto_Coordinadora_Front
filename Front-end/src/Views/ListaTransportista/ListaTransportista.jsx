import useFetchLista from "../../Hooks/useFetchListaTransportista";
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Paper, TablePagination, TableSortLabel
} from "@mui/material";
import { useState } from "react";

const ListaTransportista = () => {
    const { data, loading, error } = useFetchLista();
    const [order, setOrder] = useState("asc");
    const [orderBy, setOrderBy] = useState("nombre");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    if (loading) return <p>Cargando...</p>;
    if (error) return <p>Error: {error}</p>;

    const handleRequestSort = (property) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const sortedData = [...data].sort((a, b) => {
        if (a[orderBy] < b[orderBy]) return order === "asc" ? -1 : 1;
        if (a[orderBy] > b[orderBy]) return order === "asc" ? 1 : -1;
        return 0;
    });

    const handleChangePage = (_, newPage) => setPage(newPage);
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    return (
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {[
                                { id: "nombre", label: "Nombre" },
                                { id: "licencia", label: "Licencia" },
                                { id: "telefono", label: "Teléfono" },
                                { id: "email", label: "Email" },
                                { id: "vehiculo", label: "Vehículo" },
                                { id: "placa", label: "Placa" },
                                { id: "estado", label: "Estado" }
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
                            <TableRow key={item.id}>
                                <TableCell>{item.nombre}</TableCell>
                                <TableCell>{item.licencia}</TableCell>
                                <TableCell>{item.telefono}</TableCell>
                                <TableCell>{item.email}</TableCell>
                                <TableCell>{item.vehiculo}</TableCell>
                                <TableCell>{item.placa}</TableCell>
                                <TableCell>{item.estado}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    )
}
export default ListaTransportista