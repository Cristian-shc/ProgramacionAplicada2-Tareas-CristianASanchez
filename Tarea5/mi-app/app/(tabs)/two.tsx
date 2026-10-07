import { Text, View } from '@/components/Themed';
import { useState } from 'react';
import { Button, FlatList, StyleSheet, TextInput } from 'react-native';

const libros = [
  { id: '1', titulo: 'Cien años de soledad' },
  { id: '2', titulo: 'Don Quijote de la Mancha' },
  { id: '3', titulo: 'El principito' },
  { id: '4', titulo: '1984' },
  { id: '5', titulo: 'La sombra del viento' },
];

export default function TwoScreen() {
  const [texto, setTexto] = useState('');
  const [resultado, setResultado] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de libros</Text>

      <FlatList
        data={libros}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.libro}>{item.titulo}</Text>
          </View>
        )}
      />

      <TextInput
        style={styles.input}
        placeholder="Escribe algo"
        value={texto}
        onChangeText={setTexto}
      />

      <Button
        title="Mostrar texto"
        onPress={() => setResultado(texto)}
      />

      {resultado !== '' && (
        <Text style={styles.resultado}>
          Escribiste: {resultado}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  item: {
    padding: 12,
    marginBottom: 8,
  },
  libro: {
    fontSize: 18,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  resultado: {
    fontSize: 17,
    marginTop: 15,
  },
});
