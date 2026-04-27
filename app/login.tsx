import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
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
const CURRENT_USER_KEY = 'campusconnect_current_user';

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

async function saveCurrentUser(user: DemoUser) {
  const currentUser = {
    id: user.id,
    name: user.name,
    email: user.email,
    major: user.major,
  };

  await AsyncStorage.setItem(CURRENT_USER_KEY, JSON.stringify(currentUser));
}

export default function LoginScreen() {
  const [email, setEmail] = useState('schyler@nyit.edu');
  const [password, setPassword] = useState('password123');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Missing info', 'Please enter both email and password.');
      return;
    }

    try {
      setLoading(true);

      const users = await getDemoUsers();

      const foundUser = users.find(
        (user) =>
          user.email.toLowerCase() === email.trim().toLowerCase() &&
          user.password === password
      );

      if (!foundUser) {
        Alert.alert(
          'Login failed',
          'No demo account matched that email and password.'
        );
        return;
      }

      await saveCurrentUser(foundUser);

      router.replace('/(tabs)');
    } catch (error) {
      console.log('Demo login error:', error);
      Alert.alert('Login failed', 'Something went wrong during login.');
    } finally {
      setLoading(false);
    }
  };

  const loginAsDemoUser = async (user: DemoUser) => {
    await saveCurrentUser(user);
    router.replace('/(tabs)');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.card}>
        <Text style={styles.title}>Campus Connect</Text>
        <Text style={styles.subtitle}>Sign in to continue</Text>

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="student@nyit.edu"
          placeholderTextColor="#94A3B8"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="password123"
          placeholderTextColor="#94A3B8"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Logging in...' : 'Login'}
          </Text>
        </TouchableOpacity>

        <Text style={styles.demoTitle}>Quick Demo Accounts</Text>

        <TouchableOpacity
          style={styles.demoButton}
          onPress={() => loginAsDemoUser(starterUsers[0])}
        >
          <Text style={styles.demoButtonText}>Log in as Schyler</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.demoButton}
          onPress={() => loginAsDemoUser(starterUsers[1])}
        >
          <Text style={styles.demoButtonText}>Log in as Friend</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/signup')}>
          <Text style={styles.linkText}>Don’t have an account? Sign up</Text>
        </TouchableOpacity>

        <Text style={styles.note}>
          Demo mode uses local accounts so the prototype can run without
          Firebase login errors.
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  card: {
    backgroundColor: '#1E293B',
    borderRadius: 20,
    padding: 24,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: '#CBD5E1',
    textAlign: 'center',
    marginBottom: 24,
  },
  label: {
    color: '#E2E8F0',
    fontSize: 14,
    marginBottom: 8,
    marginTop: 10,
    fontWeight: '700',
  },
  input: {
    backgroundColor: '#334155',
    color: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    paddingVertical: 15,
    marginTop: 24,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
  demoTitle: {
    color: '#CBD5E1',
    fontSize: 13,
    fontWeight: '800',
    marginTop: 22,
    marginBottom: 10,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  demoButton: {
    backgroundColor: '#0F172A',
    borderWidth: 1,
    borderColor: '#334155',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 10,
  },
  demoButtonText: {
    color: '#E0F2FE',
    fontWeight: '800',
  },
  linkText: {
    color: '#93C5FD',
    textAlign: 'center',
    marginTop: 12,
    fontSize: 14,
    fontWeight: '700',
  },
  note: {
    color: '#94A3B8',
    textAlign: 'center',
    fontSize: 12,
    lineHeight: 18,
    marginTop: 14,
  },
});