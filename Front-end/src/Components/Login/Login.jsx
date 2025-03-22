import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Container, TextField, Button, Box, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../Api/auth"; // Asumiendo que loginUser está en el archivo auth.js
import { useDispatch } from "react-redux";
import { login } from "../../Redux/authSlice"; // Reducer para guardar el token
import * as yup from "yup";

const schema = yup.object().shape({
    email: yup.string().email("Correo inválido").required("El correo es obligatorio"),
    password: yup.string().min(6, "Debe tener al menos 6 caracteres").required("La contraseña es obligatoria"),
});

const Login = () => {
    const [errorMessage, setErrorMessage] = useState("");
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            // Llamamos a la API para hacer login
            const token = await loginUser(data.email, data.password);
            // Si el login es exitoso, guardamos el token en el estado global y redirigimos
            dispatch(login({ token }));  // Guardamos el token en el estado de Redux
            localStorage.setItem('token', token); // Guardamos el token en localStorage para persistencia
            navigate('/Inicio'); // Redirigimos al Dashboard (o página protegida)
        } catch (error) {
            setErrorMessage("Credenciales incorrectas. Intenta nuevamente.");
        }
    };

    return (
        <Container maxWidth="xs">
            <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                <Box border={1} p={3} borderRadius={2} borderColor={"grey.500"}>
                    <Typography variant="h5" textAlign={"center"} sx={{ m: 0, pb: 3 }}>
                        Iniciar Sesión
                    </Typography>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                            <TextField
                                {...register("email")}
                                id="email"
                                label="Email"
                                variant="outlined"
                                error={!!errors.email}
                                helperText={errors.email?.message}
                            />
                            <TextField
                                {...register("password")}
                                id="password"
                                type="password"
                                label="Contraseña"
                                variant="outlined"
                                error={!!errors.password}
                                helperText={errors.password?.message}
                            />
                            {errorMessage && <Typography color="error">{errorMessage}</Typography>}
                            <Button type="submit" variant="contained">
                                Ingresar
                            </Button>
                            <p>
                                <Link to="/Register">Registrarse</Link>
                            </p>
                        </Box>
                    </form>
                </Box>
            </Box>
        </Container>
    );
};

export default Login;
