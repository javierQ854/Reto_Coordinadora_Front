import { useState } from "react";
import { useForm } from "react-hook-form";
import React from 'react';
import { yupResolver } from "@hookform/resolvers/yup";
import { TextField, Button, Box, Typography, Snackbar } from "@mui/material";
import Grid from '@mui/material/Grid2';
import Alert from '@mui/material/Alert';
import { useNavigate } from "react-router-dom"; // Agregado para la redirección
import * as yup from "yup";
import api from "../../Api/api";

const schema = yup.object().shape({
    nombre: yup.string().required("El Nombre es obligatorio"),
    licencia: yup.string().required("La licencia es obligatoria"),
    telefono: yup.string().required("El telefono es obligatorio"),
    email: yup.string().email("Debe ser un email válido").required("El email es obligatorio"),
    vehiculo: yup.string().required("El vehiculo es obligatorio"),
    placa: yup.string().required("La placa es obligatoria"),
});

const Transportista = () => {
    const navigate = useNavigate(); // Hook para navegar
    const [errorMessage, setErrorMessage] = useState("");
    const [alert, setAlert] = useState({ open: false, severity: '', message: '' });

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') return;
        setAlert({ ...alert, open: false });
    };

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data) => {
        try {
            await api.post("/Transportista",data)
            setAlert({ open: true, severity: "success", message: "Transportista registrado exitosamente" });
        } catch (error) {
            setErrorMessage("Error al registrar transportista");
        }
    };

    return (
        <Box>
            <Snackbar open={alert.open} autoHideDuration={2000} onClose={handleCloseAlert}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                <Alert onClose={handleCloseAlert} severity={alert.severity} sx={{ width: '100%' }}>
                    {alert.message}
                </Alert>
            </Snackbar>

            <form onSubmit={handleSubmit(onSubmit)}>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2} marginBottom={3}>
                        <Grid item xs={6}>
                            <TextField fullWidth {...register("nombre")} id="nombre" type="text"
                                label="Nombre" variant="outlined" error={!!errors.nombre}
                                helperText={errors.nombre?.message} />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField fullWidth {...register("licencia")} id="licencia" type="text"
                                label="Licencia" variant="outlined" error={!!errors.licencia}
                                helperText={errors.licencia?.message} />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField fullWidth {...register("telefono")} id="telefono" type="text"
                                label="Teléfono" variant="outlined" error={!!errors.telefono}
                                helperText={errors.telefono?.message} />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField fullWidth {...register("email")} id="email" type="email"
                                label="Email" variant="outlined" error={!!errors.email}
                                helperText={errors.email?.message} />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField fullWidth {...register("vehiculo")} id="vehiculo" type="text"
                                label="Vehículo" variant="outlined" error={!!errors.vehiculo}
                                helperText={errors.vehiculo?.message} />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField fullWidth {...register("placa")} id="placa" type="text"
                                label="Placa" variant="outlined" error={!!errors.placa}
                                helperText={errors.placa?.message} />
                        </Grid>
                    </Grid>

                    {errorMessage && <Typography color="error">{errorMessage}</Typography>}

                    <Button type="submit" variant="contained">
                        Registrar
                    </Button>
                </Box>
            </form>
        </Box>
    );
};

export default Transportista;
