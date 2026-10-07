import { router } from 'expo-router';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function Home() {
return (
    <View style={styles.container}>
    <Text style={styles.title}>Bienvenido</Text>

    <Text style={styles.nombre}>Cristian Sánchez</Text>
    <Text style={styles.matricula}>Matrícula: T2020-0592</Text>

    <Button
        title="Ver materias"
        onPress={() => router.push('/materias')}
    />
    </View>
);
}

const styles = StyleSheet.create({
container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25,
},
title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 25,
},
nombre: {
    fontSize: 22,
    marginBottom: 10,
},
matricula: {
    fontSize: 18,
    marginBottom: 30,
},
});

