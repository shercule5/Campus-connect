import { router } from 'expo-router';
import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

export default function ForgotPasswordScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inner}>
        <Text style={styles.logo}>Reset Password</Text>
        <Text style={styles.subtitle}>We’ll send a reset link to your school email</Text>

        <View style={styles.card}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            placeholder="name@nyit.edu"
            placeholderTextColor="#94A3B8"
            style={styles.input}
          />

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Send Reset Link</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push('/login')}>
            <Text style={styles.link}>Back to Login</Text>
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
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
  },
  link: {
    color: '#60A5FA',
    textAlign: 'center',
    marginTop: 4,
  },
});