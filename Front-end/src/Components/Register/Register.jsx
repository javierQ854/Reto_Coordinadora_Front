import React from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Container, TextField, Button, Box, Typography, Snackbar  } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import Alert from '@mui/material/Alert';
import api from "../../Api/api"; // Importamos la API
import { useState } from "react";

const schema = yup.object().shape({
    email: yup.string().email("Correo inválido").required("El correo es obligatorio"),
    name: yup.string().required("El nombre es obligatorio"),
    password: yup.string().min(6, "Debe tener al menos 6 caracteres").required("La contraseña es obligatoria"),
});

const Register = () => {

    const [alert, setAlert] = useState({ open: false, severity: '', message: '' });
    const [shouldRedirect, setShouldRedirect] = useState(false);
    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') return;
        setAlert({ ...alert, open: false });
        if (shouldRedirect) {
          navigate('/login'); // Redirige solo si el registro fue exitoso
        }
      };
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const navigate = useNavigate(); // Para redireccionar después del registro

    const onSubmit = async (data) => {
        try {
            const response = await api.post("/users/Register", data); // Enviamos datos a la API
            setAlert({ open: true, severity: 'success', message: 'Se registró correctamente' });
            setShouldRedirect(true);
        } catch (error) {
            console.error("Error al registrar usuario:", error.response?.data || error.message);
            setAlert({ open: true, severity: 'error', message: 'No se puede registrar. Por favor inténtelo más tarde' });
        }
    };

    return (
        <Container maxWidth="xs">
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
            <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                <Box border={1} p={3} borderRadius={2} borderColor={"grey.500"}>
                    <Typography variant="h5" textAlign={"center"} sx={{ m: 0, pb: 3 }}>
                        Registrarse
                    </Typography>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                            <TextField {...register("name")} label="Nombre" variant="outlined" error={!!errors.name} helperText={errors.name?.message} />
                            <TextField {...register("email")} label="Correo" variant="outlined" error={!!errors.email} helperText={errors.email?.message} />
                            <TextField {...register("password")} type="password" label="Contraseña" variant="outlined" error={!!errors.password} helperText={errors.password?.message} />
                            <Button type="submit" variant="contained">Registrarse</Button>
                            <Link to="/login">Iniciar sesión</Link>
                        </Box>
                    </form>
                </Box>
            </Box>
        </Container>
    );
};

export default Register;
