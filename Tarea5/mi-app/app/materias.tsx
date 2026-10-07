import { FlatList, StyleSheet, Text, View } from 'react-native';

const materias = [
{ id: '1', nombre: 'Matemática' },
{ id: '2', nombre: 'Programación' },
{ id: '3', nombre: 'Base de Datos' },
{ id: '4', nombre: 'Inglés' },
{ id: '5', nombre: 'Física' },
];

export default function Materias() {
return (
    <View style={styles.container}>
    <Text style={styles.title}>Mis materias</Text>

    <FlatList
        data={materias}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
        <View style={styles.item}>
            <Text style={styles.materia}>{item.nombre}</Text>
        </View>
        )}
    />
    </View>
);
}

const styles = StyleSheet.create({
container: {
    flex: 1,
    padding: 25,
},
title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
},
item: {
    padding: 18,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
},
materia: {
    fontSize: 18,
},
});
