import { useRouter } from 'expo-router';
import { signOut } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Button, FlatList, Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { auth, db } from '../../firebase';
import { Car } from '../utils/car';

export default function HomeScreen() {
  
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.replace('/screens/loginScreen');
    } catch (error: any) {
      Alert.alert('Sign Out Failed', error.message || 'Something went wrong.');
    }
  };

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'cars'));
        console.log('Fetched cars:', querySnapshot.docs.map(doc => doc.data()));
        const carsData: Car[] = [];
        querySnapshot.forEach((doc) => {
          console.log('Documents :', doc.id, doc.data());
          carsData.push({ id: doc.id, ...doc.data() } as Car);
        });
        setCars(carsData);
      } catch (error) {
        console.error('Error fetching cars:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#000" style={{ marginTop: 100 }} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}> Welcome Back! </Text>
        <Text style={styles.subText}>Available car deals for you!.</Text>
      </View>

      <FlatList
        data={cars}
        keyExtractor={(item) => item.id!}
        renderItem={({ item }) => (
          <View style={styles.carCard}>
            <Image source={{ uri: item.imageUrl }} style={styles.carImage} resizeMode='cover' />
            <Text style={styles.carTitle}>{item.year} {item.make} {item.model}</Text>
            <Text style={styles.carPrice}>${item.price.toLocaleString()}</Text>
            <Text style={styles.carCompany}>{item.company}</Text>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 80 }}
      />

      <View style={styles.footer}>
        <Button title="Sign Out" onPress={handleSignOut} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 20,
  },
  header: {
    marginTop: 40,
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
  },
  subText: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
    textAlign: 'center',
  },
  spacer: {
    flex: 1,
  },
  footer: {
    paddingBottom: 60
  },
  carCard: { 
    backgroundColor: '#fff', 
    padding: 12, 
    borderRadius: 10, 
    marginVertical: 8, 
    shadowColor: '#000', 
    shadowOpacity: 0.1, 
    shadowOffset: { width: 0, height: 2 }, 
    shadowRadius: 4, 
    elevation: 3 
  },
  carImage: { 
    width: '100%', 
    height: 180, 
    borderRadius: 10 
  },
  carTitle: { 
    fontSize: 18, 
    fontWeight: '600', 
    marginTop: 8 
  },
  carPrice: { 
    fontSize: 16, 
    color: '#00aaff', 
    marginTop: 4 
  },
  carCompany: { 
    fontSize: 14, 
    color: '#888', 
    marginTop: 2 
  },
});
