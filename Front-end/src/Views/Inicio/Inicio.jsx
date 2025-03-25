import { Container, TextField, Button, Box, Typography } from "@mui/material";
import { useState } from "react";
import React from 'react'
import NavBar from "../../Components/NavBar/NavBar";
import Stack from '@mui/material/Stack';
import DynamicComponentLoader from "../../Components/DynamicComponentLoader";

const Inicio = () => {

    const [componentName, setComponentName] = useState('ListaEnvios');

    // Función para manejar la selección de componente
    const handleComponentChange = (componentName) => {
        setComponentName(componentName);
    };
    return (
        <>
            <NavBar />
            <Container>
                <Box marginTop={3} sx={{ display: "flex", flexDirection: "column", flexWrap: "wrap" }}>
                    <Stack marginBottom={3} spacing={2} direction="row">
                        <Button onClick={() => handleComponentChange('Envio')} variant="contained">Nuevo</Button>
                    </Stack>
                    <DynamicComponentLoader componentName={componentName} />
                </Box>
            </Container >
        </>
    )
}
export default Inicio