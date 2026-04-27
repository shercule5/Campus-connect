import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
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

type DemoUser = {
  id: string;
  name: string;
  email: string;
  password: string;
  major: string;
};

const DEMO_USERS_KEY = 'campusconnect_demo_users';

const starterUsers: DemoUser[] = [
  {
    id: 'user_001',
    name: 'Schyler Hercules',
    email: 'schyler@nyit.edu',
    password: 'password123',
    major: 'Computer Science / Network Security',
  },
  {
    id: 'user_002',
    name: 'Maya Chen',
    email: 'maya@nyit.edu',
    password: 'password123',
    major: 'Cybersecurity',
  },
];

async function getDemoUsers() {
  const savedUsers = await AsyncStorage.getItem(DEMO_USERS_KEY);

  if (!savedUsers) {
    await AsyncStorage.setItem(DEMO_USERS_KEY, JSON.stringify(starterUsers));
    return starterUsers;
  }

  return JSON.parse(savedUsers) as DemoUser[];
}

export default function SignupScreen() {
  const [name, setName] = useState('');
  const [major, setMajor] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('password123');
  const [confirmPassword, setConfirmPassword] = useState('password123');
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (
      !name.trim() ||
      !major.trim() ||
      !email.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
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

      const users = await getDemoUsers();

      const accountExists = users.some(
        (user) => user.email.toLowerCase() === email.trim().toLowerCase()
      );

      if (accountExists) {
        Alert.alert(
          'Account already exists',
          'Use the login screen for that email.'
        );
        return;
      }

      const newUser: DemoUser = {
        id: `user_${Date.now()}`,
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password,
        major: major.trim(),
      };

      const updatedUsers = [...users, newUser];

      await AsyncStorage.setItem(DEMO_USERS_KEY, JSON.stringify(updatedUsers));

      setName('');
      setMajor('');
      setEmail('');
      setPassword('password123');
      setConfirmPassword('password123');

      Alert.alert(
        'Account Created',
        'Your demo account was created. Now log in with that email and password.',
        [
          {
            text: 'Go to Login',
            onPress: () => router.replace('/login'),
          },
        ]
      );
    } catch (error: any) {
      console.log('Demo signup error:', error);
      Alert.alert('Signup failed', 'Something went wrong creating the account.');
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
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Example: Jordan Lee"
            placeholderTextColor="#64748B"
            value={name}
            onChangeText={setName}
          />

          <Text style={styles.label}>Major</Text>
          <TextInput
            style={styles.input}
            placeholder="Example: Computer Science"
            placeholderTextColor="#64748B"
            value={major}
            onChangeText={setMajor}
          />

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="student@nyit.edu"
            placeholderTextColor="#64748B"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="At least 6 characters"
            placeholderTextColor="#64748B"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <Text style={styles.label}>Confirm Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Confirm password"
            placeholderTextColor="#64748B"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
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
              Already have an account?{' '}
              <Text style={styles.linkBold}>Log in</Text>
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
    fontWeight: '700',
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
    fontWeight: '800',
    fontSize: 16,
  },
  linkSecondary: {
    color: '#CBD5E1',
    textAlign: 'center',
  },
  linkBold: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
});