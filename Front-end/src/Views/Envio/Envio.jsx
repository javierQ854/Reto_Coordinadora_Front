import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import React from 'react';
import { yupResolver } from "@hookform/resolvers/yup";
import { TextField, Button, Box, Typography, MenuItem, Snackbar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Grid from '@mui/material/Grid2';
import * as yup from "yup";
import { jwtDecode } from "jwt-decode";
import Alert from '@mui/material/Alert';
import api from "../../Api/api";
const schema = yup.object().shape({
    peso: yup.number().typeError("El peso debe ser un número decimal").positive("El peso debe ser mayor que cero")
        .required("El peso es obligatorio"),
    dimension: yup.string().required("La dimension es obligatoria"),
    tipoProducto: yup.string().required("El tipo de producto es obligatorio"),
    direccionDestino: yup.string().required("la direccion es obligatoria"),
    ciudad: yup.string().required("La ciudad es obligatoria"),
    estado: yup.string().required("El departamento es obligatorio"),
});
const Envio = () => {
    const [componentName, setComponentName] = useState('ListaEnvios');
    
        
    const [errorMessage, setErrorMessage] = useState("");
    const [alert, setAlert] = useState({ open: false, severity: '', message: '' });
    const [shouldRedirect, setShouldRedirect] = useState(false);
    const [departamentos, setDepartamentos] = useState([]);
    const [ciudades, setCiudades] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingCiudades, setLoadingCiudades] = useState(false);
    const handleComponentChange = (componentName) => {
        setComponentName(componentName);
    };
    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') return;
        setAlert({ ...alert, open: false });
        if (shouldRedirect) {
            handleComponentChange('ListaEnvios')
        }
    };
    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        resolver: yupResolver(schema),
    });

    const navigate = useNavigate();
    const onSubmit = async (data) => {
        try {
            const emailUser = localStorage.getItem('EmailUser');
            const token = localStorage.getItem("token");
            if (!token) throw new Error("No hay token");
            const userId = jwtDecode(token).userId;
            await api.post(`/users/Envios/${userId}`, data);
            const emailData = {
                to: emailUser, 
                subject: "Confirmación de Envío",
                datos: {
                    peso: data.peso,
                    dimension: data.dimension,
                    tipoProducto: data.tipoProducto,
                    direccionDestino: data.direccionDestino,
                    ciudad: data.ciudad,
                    estado: data.estado
                }
            };

            await api.post(`/users/Envio/Correo`, emailData);
            setAlert({ open: true, severity: 'success', message: 'El pedido se registró y se envió el correo correctamente' });
            setShouldRedirect(true);
        } catch (error) {
            console.error("Error en el proceso:", error.response?.data || error.message);
            setAlert({ open: true, severity: 'error', message: 'No se puede registrar el pedido. Inténtelo más tarde' });
        }
    };
    useEffect(() => {
        setLoading(true);
        fetch("https://api-colombia.com/api/v1/Department?sortDirection=asc")
            .then(response => response.json())
            .then(data => {
                setDepartamentos(data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error al obtener los departamentos", error);
                setLoading(false);
            });
    }, []);

    const handleDepartamentoChange = (event) => {
        const departamentoNombre = event.target.value;
        setValue("estado", departamentoNombre);

        const departamentoSeleccionado = departamentos.find(d => d.name === departamentoNombre);
        if (!departamentoSeleccionado) {
            console.error("No se encontró el departamento con nombre:", departamentoNombre);
            return;
        }

        setCiudades([]);
        setValue("ciudad", "");

        setLoadingCiudades(true);
        fetch(`https://api-colombia.com/api/v1/Department/${departamentoSeleccionado.id}/cities?sortDirection=asc`)
            .then((response) => response.json())
            .then((data) => {
                setCiudades(data);
                setLoadingCiudades(false);
            })
            .catch((error) => {
                console.error("Error al obtener las ciudades", error);
                setLoadingCiudades(false);
            });
    };

    const handleCiudadChange = (event) => {
        const ciudadNombre = event.target.value;
        setValue("ciudad", ciudadNombre);
    };


    return (
        <Box>
            <Snackbar
                open={alert.open}
                autoHideDuration={2000}
                onClose={handleCloseAlert}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseAlert} severity={alert.severity} sx={{ width: '100%' }}>
                    {alert.message}
                </Alert>
            </Snackbar>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid marginBottom={3} container spacing={2}>
                        <Grid size={6} >
                            <TextField
                                fullWidth
                                {...register("tipoProducto")}
                                id="Tipo_producto"
                                type="TextFiel"
                                label="Tipo de producto"
                                variant="outlined"
                                error={!!errors.tipo_producto}
                                helperText={errors.tipo_producto?.message}
                            />
                        </Grid>
                        <Grid size={3}>
                            <TextField
                                {...register("peso")}
                                fullWidth
                                id="Peso"
                                type="TextField"
                                label="peso"
                                variant="outlined"
                                error={!!errors.peso}
                                helperText={errors.peso?.message}
                            />
                        </Grid>
                        <Grid size={3}>
                            <TextField
                                {...register("dimension")}
                                fullWidth
                                id="dimension"
                                type="TextField"
                                label="Dimension"
                                variant="outlined"
                                error={!!errors.dimension}
                                helperText={errors.dimension?.message}
                            />
                        </Grid>

                        <TextField
                            {...register("estado")}
                            fullWidth
                            id="estado"
                            select
                            label="Departamento"
                            defaultValue=""
                            helperText="Seleccione el departamento"
                            error={!!errors.estado}
                            onChange={handleDepartamentoChange}
                        >
                            {departamentos.map((dep) => (
                                <MenuItem key={dep.id} value={dep.name}> {/* 🔹 Usamos name en lugar de id */}
                                    {dep.name}
                                </MenuItem>
                            ))}
                        </TextField>
                        <Grid item xs={6}>
                            <TextField
                                {...register("ciudad")}
                                fullWidth
                                id="ciudad"
                                select
                                label="Ciudad"
                                defaultValue=""
                                helperText="Seleccione la ciudad"
                                error={!!errors.ciudad}
                                onChange={handleCiudadChange}
                            >
                                {ciudades.map((city) => (
                                    <MenuItem key={city.id} value={city.name}> {/* 🔹 Usamos name en lugar de id */}
                                        {city.name}
                                    </MenuItem>
                                ))}
                            </TextField>

                        </Grid>
                        <Grid size={4}>
                            <TextField
                                fullWidth
                                {...register("direccionDestino")}
                                id="direccion"
                                type="TextFiel"
                                label="Direccion"
                                variant="outlined"
                                error={!!errors.direccion_destino}
                                helperText={errors.direccion_destino?.message}
                            />
                        </Grid>

                    </Grid>
                    {errorMessage && <Typography color="error">{errorMessage}</Typography>}
                    <Button type="submit" variant="contained">
                        Registrar
                    </Button>
                </Box>
            </form>
        </Box>
    )
}
export default Envio