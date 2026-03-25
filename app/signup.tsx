import { router } from 'expo-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import {
    Alert,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { auth, db } from './firebaseConfig';

export default function SignupScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!email.trim() || !password.trim() || !confirmPassword.trim()) {
      Alert.alert('Missing info', 'Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Password mismatch', 'Passwords do not match.');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Weak password', 'Password must be at least 6 characters.');
      return;
    }

    try {
      setLoading(true);

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

      await setDoc(doc(db, 'users', userCredential.user.uid), {
        email: userCredential.user.email,
        uid: userCredential.user.uid,
        createdAt: serverTimestamp(),
      });

      Alert.alert('Success', 'Account created successfully.');
      router.replace('/(tabs)');
    } catch (error: any) {
      console.log('Signup error:', error.message);
      Alert.alert('Signup failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inner}>
        <Text style={styles.logo}>Create Account</Text>
        <Text style={styles.subtitle}>
          Join Campus Connect and find your people
        </Text>

        <View style={styles.card}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            placeholder="name@nyit.edu"
            placeholderTextColor="#94A3B8"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <Text style={styles.label}>Password</Text>
          <TextInput
            placeholder="Create a password"
            placeholderTextColor="#94A3B8"
            secureTextEntry
            style={styles.input}
            value={password}
            onChangeText={setPassword}
          />

          <Text style={styles.label}>Confirm Password</Text>
          <TextInput
            placeholder="Confirm your password"
            placeholderTextColor="#94A3B8"
            secureTextEntry
            style={styles.input}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleSignup}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? 'Creating Account...' : 'Create Account'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push('/login')}>
            <Text style={styles.linkSecondary}>
              Already have an account? <Text style={styles.linkBold}>Log in</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  inner: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  logo: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    color: '#94A3B8',
    textAlign: 'center',
    marginBottom: 32,
    fontSize: 14,
  },
  card: {
    backgroundColor: '#111827',
    borderRadius: 24,
    padding: 22,
  },
  label: {
    color: '#E5E7EB',
    fontSize: 15,
    marginBottom: 8,
    marginTop: 10,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#1F2937',
    color: '#FFFFFF',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#2563EB',
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 22,
    marginBottom: 16,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
  },
  linkSecondary: {
    color: '#CBD5E1',
    textAlign: 'center',
  },
  linkBold: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
});