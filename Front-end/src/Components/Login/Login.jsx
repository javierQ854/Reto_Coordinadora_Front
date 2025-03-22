import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Container, TextField, Button, Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import * as yup from "yup";
const schema = yup.object().shape({
    email: yup.string().email("Correo inválido").required("El correo es obligatorio"),
    password: yup.string().min(6, "Debe tener al menos 6 caracteres").required("La contraseña es obligatoria"),
});

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data) => {
        console.log("Formulario válido", data);
    };

    return (
        <Container maxWwidth="xs">
            <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100vh", }}>             
                <Box border={1} p={3} borderRadius={2} borderColor={"grey.500"}>
                <Typography variant="h5" textAlign={"center"} sx={{ m:0, pb:3  }}>
                    Iniciar Sesión
                </Typography>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                            <TextField {...register("email")} id="outlined-basic" label="Email" variant="outlined" />
                            {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}
                            <TextField {...register("password")} id="outlined-basic" type="password" label="Contraseña" variant="outlined" />
                            {errors.password && <p style={{ color: "red" }}>{errors.password.message}</p>}
                            <Button type="submit" variant="contained" >Ingresar</Button>
                            <p>
                                <Link to="/Register">Registrarse</Link>
                            </p>
                        </Box>
                    </form>
                </Box>
            </Box>
        </Container>
    )
}
export default Login