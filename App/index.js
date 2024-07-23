// Filename: index.js
// Combined code from all files

import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, ScrollView, View, TouchableOpacity, ActivityIndicator } from 'react-native';

const WorkoutList = () => {
    const [workouts, setWorkouts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWorkouts = async () => {
            try {
                const response = await fetch('https://apihub.p.appply.xyz:3300/workouts');
                const data = await response.json();
                setWorkouts(data.workouts);
            } catch (error) {
                console.error('Error fetching workouts:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchWorkouts();
    }, []);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <View>
            {workouts.map((workout) => (
                <View key={workout.id} style={styles.workoutContainer}>
                    <Text style={styles.workoutTitle}>{workout.name}</Text>
                    <Text style={styles.workoutDetails}>Duration: {workout.duration} mins</Text>
                    <Text style={styles.workoutDetails}>Calories Burned: {workout.calories} kcal</Text>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => alert(`Selected workout: ${workout.name}`)}
                    >
                        <Text style={styles.buttonText}>Start</Text>
                    </TouchableOpacity>
                </View>
            ))}
        </View>
    );
};

const App = () => {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <Text style={styles.title}>Workout Tracker</Text>
                <WorkoutList />
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
        paddingHorizontal: 16,
        backgroundColor: '#f5f5f5',
    },
    scrollViewContent: {
        paddingVertical: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    workoutContainer: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 2,
    },
    workoutTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    workoutDetails: {
        fontSize: 14,
        color: '#666',
        marginVertical: 4,
    },
    button: {
        backgroundColor: '#007bff',
        borderRadius: 8,
        padding: 10,
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
    },
});

export default App;