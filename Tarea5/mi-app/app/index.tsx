import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

const iniciarSesion = () => {
    if (email === 'cristian@gmail.com' && password === '123456') {
    router.push('/home');
    } else {
    Alert.alert('Error', 'Correo o contraseña incorrectos');
    }
};

return (
    <View style={styles.container}>
    <Text style={styles.title}>Iniciar sesión</Text>

    <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
    />

    <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
    />

    <Button title="Iniciar sesión" onPress={iniciarSesion} />
    </View>
);
}

const styles = StyleSheet.create({
container: {
    flex: 1,
    justifyContent: 'center',
    padding: 25,
},
title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
},
input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
},
});

