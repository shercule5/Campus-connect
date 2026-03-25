import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { router } from 'expo-router';
import React, { useMemo, useState } from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { PostType, usePosts } from '../../context/PostsContext';
import { courses } from '../../data/courses';

function getCommunityFromCourse(course: string): string {
  if (course === 'Campus General') return 'Campus General';
  if (course.startsWith('CSCI')) return 'Computer Science';
  if (course.startsWith('MATH')) return 'Mathematics';
  if (course.startsWith('PHYS')) return 'Physics';
  if (course.startsWith('BIOL')) return 'Biology';
  if (course.startsWith('CHEM')) return 'Chemistry';
  if (course.startsWith('PSYC')) return 'Psychology';
  if (course.startsWith('MGMT') || course.startsWith('MKTG') || course.startsWith('ACCT') || course.startsWith('ECON')) {
    return 'Business';
  }
  if (course.startsWith('ENGR')) return 'Engineering';
  if (course.startsWith('ENG')) return 'Writing';
  if (course.startsWith('SOC')) return 'Sociology';
  return 'General';
}

export default function CreatePostScreen() {
  const { addPost } = usePosts();

  const postTypes: PostType[] = ['General', 'Question', 'Study Group', 'Notes', 'Event'];

  const [author, setAuthor] = useState('Schyler Hercules');
  const [major, setMajor] = useState('Computer Science');
  const [selectedCommunity, setSelectedCommunity] = useState<string>(courses[0]);
  const [selectedPostType, setSelectedPostType] = useState<PostType>(postTypes[0]);
  const [content, setContent] = useState('');

  const activeCommunity = useMemo(
    () => getCommunityFromCourse(selectedCommunity),
    [selectedCommunity]
  );

  const handlePost = () => {
    if (!selectedCommunity.trim() || !content.trim()) {
      Alert.alert('Missing info', 'Please choose a community and write your post.');
      return;
    }

    addPost({
      author: author.trim(),
      major: major.trim(),
      community: activeCommunity,
      course: selectedCommunity,
      postType: selectedPostType,
      content: content.trim(),
    });

    setContent('');
    setSelectedCommunity(courses[0]);
    setSelectedPostType(postTypes[0]);

    Alert.alert('Posted', 'Your post has been added to the Community Feed.');
    router.push('/(tabs)');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Create Post</Text>
          <Text style={styles.subtitle}>
            Pick a class community and share something useful
          </Text>
        </View>

        <View style={styles.formCard}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            value={author}
            onChangeText={setAuthor}
            placeholder="Your name"
            placeholderTextColor="#64748B"
            style={styles.input}
          />

          <Text style={styles.label}>Major</Text>
          <TextInput
            value={major}
            onChangeText={setMajor}
            placeholder="Your major"
            placeholderTextColor="#64748B"
            style={styles.input}
          />

          <Text style={styles.label}>Choose Community / Class</Text>

          <View style={styles.selectedValueCard}>
            <Ionicons name="school-outline" size={18} color="#60A5FA" />
            <Text style={styles.selectedValueText}>{selectedCommunity}</Text>
          </View>

          <View style={styles.communityBadge}>
            <Text style={styles.communityBadgeText}>Community: {activeCommunity}</Text>
          </View>

          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={selectedCommunity}
              onValueChange={(itemValue: string) => setSelectedCommunity(itemValue)}
              dropdownIconColor="#F8FAFC"
              style={styles.picker}
              itemStyle={styles.pickerItem}
            >
              {courses.map((community) => (
                <Picker.Item
                  key={community}
                  label={community}
                  value={community}
                  color="#FFFFFF"
                />
              ))}
            </Picker>
          </View>

          <Text style={styles.label}>Post Type</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={selectedPostType}
              onValueChange={(itemValue: PostType) => setSelectedPostType(itemValue)}
              dropdownIconColor="#F8FAFC"
              style={styles.picker}
              itemStyle={styles.pickerItem}
            >
              {postTypes.map((type) => (
                <Picker.Item key={type} label={type} value={type} color="#FFFFFF" />
              ))}
            </Picker>
          </View>

          <Text style={styles.label}>Post</Text>
          <TextInput
            value={content}
            onChangeText={setContent}
            placeholder="Ask a question, start a study group, share notes..."
            placeholderTextColor="#64748B"
            multiline
            style={[styles.input, styles.textArea]}
          />

          <TouchableOpacity style={styles.button} onPress={handlePost}>
            <Text style={styles.buttonText}>Publish Post</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.previewCard}>
          <Text style={styles.previewTitle}>Preview</Text>
          <Text style={styles.previewCommunity}>{selectedCommunity}</Text>
          <Text style={styles.previewMeta}>
            {activeCommunity} • {major} • {selectedPostType}
          </Text>
          <Text style={styles.previewText}>
            {content.trim() || 'Your post preview will appear here...'}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020617',
  },
  scrollContent: {
    padding: 18,
    paddingBottom: 120,
  },
  header: {
    marginBottom: 16,
  },
  title: {
    color: '#F8FAFC',
    fontSize: 28,
    fontWeight: '800',
  },
  subtitle: {
    color: '#94A3B8',
    fontSize: 14,
    marginTop: 4,
  },
  formCard: {
    backgroundColor: '#0F172A',
    borderRadius: 22,
    padding: 18,
    borderWidth: 1,
    borderColor: '#1E293B',
    marginBottom: 16,
  },
  label: {
    color: '#CBD5E1',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 8,
    marginTop: 14,
  },
  input: {
    backgroundColor: '#111827',
    borderColor: '#1E293B',
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 14,
    color: '#F8FAFC',
    fontSize: 15,
  },
  selectedValueCard: {
    backgroundColor: '#111827',
    borderColor: '#1E293B',
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 10,
  },
  selectedValueText: {
    color: '#F8FAFC',
    fontSize: 14,
    fontWeight: '700',
    flex: 1,
  },
  communityBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#1E3A8A',
    borderRadius: 999,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 10,
  },
  communityBadgeText: {
    color: '#DBEAFE',
    fontSize: 12,
    fontWeight: '800',
  },
  pickerWrapper: {
    backgroundColor: '#111827',
    borderColor: '#1E293B',
    borderWidth: 1,
    borderRadius: 16,
    overflow: 'hidden',
  },
  picker: {
    color: '#F8FAFC',
  },
  pickerItem: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  textArea: {
    minHeight: 130,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#2563EB',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 24,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
  previewCard: {
    backgroundColor: '#0F172A',
    borderRadius: 22,
    padding: 18,
    borderWidth: 1,
    borderColor: '#1E293B',
  },
  previewTitle: {
    color: '#F8FAFC',
    fontSize: 17,
    fontWeight: '800',
    marginBottom: 10,
  },
  previewCommunity: {
    color: '#60A5FA',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 4,
  },
  previewMeta: {
    color: '#94A3B8',
    fontSize: 13,
    marginBottom: 10,
  },
  previewText: {
    color: '#E2E8F0',
    fontSize: 14,
    lineHeight: 21,
  },
});