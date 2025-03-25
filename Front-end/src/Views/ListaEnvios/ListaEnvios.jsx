import useFetchLista from "../../Hooks/useFetchLista";
import { useState } from "react";
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Paper, TablePagination, TableSortLabel
} from "@mui/material";
const ListaEnvios = () => {
    const { data, loading, error } = useFetchLista();
    const [order, setOrder] = useState("asc");
    const [orderBy, setOrderBy] = useState("peso");
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
                            { id: "peso", label: "Peso" },
                            { id: "dimension", label: "Dimensión" },
                            { id: "tipo_producto", label: "Tipo de producto" },
                            { id: "direccion_destino", label: "Dirección de destino" },
                            { id: "ciudad", label: "Ciudad" },
                            { id: "departamento", label: "Departamento" },
                            { id: "estado_envio", label: "Estado" }
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
                        <TableRow key={item.id_envio}>
                            <TableCell>{item.peso}</TableCell>
                            <TableCell>{item.dimension}</TableCell>
                            <TableCell>{item.tipo_producto}</TableCell>
                            <TableCell>{item.direccion_destino}</TableCell>
                            <TableCell>{item.ciudad}</TableCell>
                            <TableCell>{item.departamento}</TableCell>
                            <TableCell>{item.estado_envio}</TableCell>
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

export default ListaEnvios