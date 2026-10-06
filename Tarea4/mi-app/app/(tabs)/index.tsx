import { Text, View } from '@/components/Themed';
import { Link } from 'expo-router';
import { Button, StyleSheet } from 'react-native';

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mi aplicación Expo</Text>

      <Text style={styles.nombre}>Cristian Sánchez</Text>
      <Text style={styles.carnet}>Carnet: T2020-0592</Text>

      <Text style={styles.mensaje}>
        Bienvenido a mi aplicación
      </Text>

      <Link href="/(tabs)/two" asChild>
        <Button title="Ver lista de libros" />
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 25,
  },
  nombre: {
    fontSize: 22,
    marginBottom: 10,
  },
  carnet: {
    fontSize: 18,
    marginBottom: 25,
  },
  mensaje: {
    fontSize: 16,
    marginBottom: 25,
  },
});
