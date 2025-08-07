import { Pressable, ScrollView, StyleSheet, Text, View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

interface Memory {
    id: string;
    title: string;
    imageUrl: string;
}

const HomeScreen = () => {

  const navigation: any = useNavigation();
  const [memories, setMemories] = useState<Memory[]>([]);

    // fetch memories in real time
    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db,'memories'), (snapshot) => {
            const memoriesData: Memory[] = snapshot.docs.map((doc)=> ({
                id: doc.id,
                ...doc.data(),
            })) as Memory[];

            setMemories(memoriesData);
        }, (error) => {
            console.log('Error fetching memories:', error);
        });

        // cleanup subscription on unmount
        return () =>  unsubscribe();
    },[]);

  return (
    <ScrollView style={styles.container}>
        <Pressable onPress={() => navigation.navigate("Add")}>
            <MaterialIcons name="add-photo-alternate" size={24} color="green" />
        </Pressable>
        
        {/* loop through memories and render cards */}
        {memories.map((memory)=> (
            <View key={memory.id} style={styles.card}>
                <Image
                    style={styles.img}
                    source ={{
                        uri: memory.imageUrl,
                    }}
                />
            </View>
        ))}
    </ScrollView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    card: {
        flex: 1,
        backgroundColor: 'white',
        padding: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 20
    },
    img: {
        width: '100%',
        height: 200,
        objectFit: 'cover'
    }
})