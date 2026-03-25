import { router, useLocalSearchParams } from 'expo-router';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import React, { useState } from 'react';
import {
    Alert,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { auth, db } from './firebaseConfig';

export default function CreatePostScreen() {
  const params = useLocalSearchParams();
  const [selectedCourse, setSelectedCourse] = useState(
    typeof params.courseId === 'string' ? params.courseId : ''
  );
  const [selectedCourseTitle, setSelectedCourseTitle] = useState(
    typeof params.courseTitle === 'string' ? params.courseTitle : ''
  );
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [loading, setLoading] = useState(false);

  const handlePublishPost = async () => {
    if (!selectedCourse.trim()) {
      Alert.alert('Missing class', 'Please choose a class community first.');
      return;
    }

    if (!title.trim() || !body.trim()) {
      Alert.alert('Missing info', 'Please add both a title and post body.');
      return;
    }

    try {
      setLoading(true);

      const currentUser = auth.currentUser;

      await addDoc(collection(db, 'posts'), {
        courseId: selectedCourse.trim(),
        courseTitle: selectedCourseTitle.trim() || selectedCourse.trim(),
        title: title.trim(),
        body: body.trim(),
        isAnonymous,
        userId: currentUser?.uid || 'guest',
        userEmail: currentUser?.email || 'unknown',
        displayName: isAnonymous
          ? 'Anonymous'
          : currentUser?.email || 'Student',
        comments: 0,
        likes: 0,
        createdAt: serverTimestamp(),
      });

      Alert.alert('Success', 'Post published successfully.');
      router.back();
    } catch (error: any) {
      console.log('Create post error:', error.message);
      Alert.alert('Post failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.topRow}>
          <Text style={styles.pageTitle}>Create Post</Text>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.cancelText}>Close</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Category / Course</Text>
          <View style={styles.fakeSelect}>
            <Text
              style={[
                styles.fakeSelectText,
                selectedCourse ? styles.selectedText : null,
              ]}
            >
              {selectedCourse
                ? `${selectedCourse}${selectedCourseTitle ? ` - ${selectedCourseTitle}` : ''}`
                : 'Select a course from the community page'}
            </Text>
          </View>

          <Text style={styles.label}>Title</Text>
          <TextInput
            placeholder="What do you need help with?"
            placeholderTextColor="#94A3B8"
            style={styles.input}
            value={title}
            onChangeText={setTitle}
          />

          <Text style={styles.label}>Post Body</Text>
          <TextInput
            placeholder="Write your post here..."
            placeholderTextColor="#94A3B8"
            multiline
            style={styles.bodyInput}
            value={body}
            onChangeText={setBody}
          />

          <View style={styles.toggleRow}>
            <View>
              <Text style={styles.toggleTitle}>Post Anonymously</Text>
              <Text style={styles.toggleSubtitle}>
                Hide your identity from other students
              </Text>
            </View>
            <Switch value={isAnonymous} onValueChange={setIsAnonymous} />
          </View>

          <TouchableOpacity
            style={[styles.postButton, loading && styles.postButtonDisabled]}
            onPress={handlePublishPost}
            disabled={loading}
          >
            <Text style={styles.postButtonText}>
              {loading ? 'Publishing...' : 'Publish Post'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.tipCard}>
          <Text style={styles.tipTitle}>Posting Tips</Text>
          <Text style={styles.tipText}>
            Be clear, respectful, and specific. The more context you give, the easier
            it is for other students to help.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  content: {
    padding: 20,
    paddingBottom: 120,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },
  pageTitle: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '800',
  },
  cancelText: {
    color: '#60A5FA',
    fontWeight: '700',
  },
  card: {
    backgroundColor: '#111827',
    borderRadius: 22,
    padding: 18,
    marginBottom: 18,
  },
  label: {
    color: '#E5E7EB',
    fontSize: 15,
    marginBottom: 8,
    marginTop: 10,
    fontWeight: '600',
  },
  fakeSelect: {
    backgroundColor: '#1F2937',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 15,
  },
  fakeSelectText: {
    color: '#94A3B8',
  },
  selectedText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#1F2937',
    color: '#FFFFFF',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  bodyInput: {
    backgroundColor: '#1F2937',
    color: '#FFFFFF',
    borderRadius: 14,
    minHeight: 140,
    paddingHorizontal: 16,
    paddingVertical: 14,
    textAlignVertical: 'top',
  },
  toggleRow: {
    backgroundColor: '#1F2937',
    borderRadius: 16,
    padding: 16,
    marginTop: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  toggleTitle: {
    color: '#FFFFFF',
    fontWeight: '700',
    marginBottom: 4,
  },
  toggleSubtitle: {
    color: '#94A3B8',
    maxWidth: 220,
    fontSize: 12,
    lineHeight: 18,
  },
  postButton: {
    backgroundColor: '#2563EB',
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 18,
  },
  postButtonDisabled: {
    opacity: 0.7,
  },
  postButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
  },
  tipCard: {
    backgroundColor: '#111827',
    borderRadius: 20,
    padding: 18,
  },
  tipTitle: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '800',
    marginBottom: 8,
  },
  tipText: {
    color: '#CBD5E1',
    lineHeight: 22,
  },
});