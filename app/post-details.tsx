import { Ionicons } from '@expo/vector-icons';
import { Stack, useLocalSearchParams } from 'expo-router';
import React, { useMemo, useState } from 'react';
import {
  Alert,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { usePosts } from '../context/PostsContext';

export default function PostDetailsScreen() {
  const { postId } = useLocalSearchParams<{ postId: string }>();
  const { posts, getCommentsForPost, addComment, likePost, isPostLiked } = usePosts();
  const [commentText, setCommentText] = useState('');

  const post = useMemo(
    () => posts.find((item) => item.id === postId),
    [posts, postId]
  );

  const comments = getCommentsForPost(postId || '');
  const liked = postId ? isPostLiked(postId) : false;

  const handleAddComment = () => {
    if (!postId || !commentText.trim()) {
      Alert.alert('Missing comment', 'Please type a comment first.');
      return;
    }

    addComment(postId, commentText.trim());
    setCommentText('');
  };

  if (!post) {
    return (
      <SafeAreaView style={styles.container}>
        <Stack.Screen options={{ headerShown: true, title: 'Post Details' }} />
        <View style={styles.notFoundWrap}>
          <Text style={styles.notFoundText}>Post not found.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: true, title: 'Post Details' }} />

      <FlatList
        data={comments}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <>
            <View style={styles.postCard}>
              <View style={styles.cardTop}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>{post.author.charAt(0)}</Text>
                </View>

                <View style={styles.userInfo}>
                  <Text style={styles.author}>{post.author}</Text>
                  <Text style={styles.meta}>{post.major}</Text>

                  <View style={styles.tagRow}>
                    <View style={styles.communityTag}>
                      <Text style={styles.communityTagText}>{post.community}</Text>
                    </View>
                    <View style={styles.typeTag}>
                      <Text style={styles.typeTagText}>{post.postType}</Text>
                    </View>
                  </View>

                  <Text style={styles.course}>{post.course}</Text>
                </View>

                <Text style={styles.time}>{post.createdAt}</Text>
              </View>

              <Text style={styles.postText}>{post.content}</Text>

              <View style={styles.actions}>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => likePost(post.id)}
                >
                  <Ionicons
                    name={liked ? 'heart' : 'heart-outline'}
                    size={18}
                    color={liked ? '#EF4444' : '#CBD5E1'}
                  />
                  <Text style={[styles.actionText, liked && styles.likedText]}>
                    {post.likes}
                  </Text>
                </TouchableOpacity>

                <View style={styles.actionButton}>
                  <Ionicons
                    name="chatbubble-outline"
                    size={18}
                    color="#CBD5E1"
                  />
                  <Text style={styles.actionText}>{post.comments}</Text>
                </View>
              </View>
            </View>

            <View style={styles.commentInputCard}>
              <Text style={styles.sectionTitle}>Add a Comment</Text>
              <TextInput
                value={commentText}
                onChangeText={setCommentText}
                placeholder="Write something helpful..."
                placeholderTextColor="#64748B"
                style={styles.input}
                multiline
              />
              <TouchableOpacity style={styles.button} onPress={handleAddComment}>
                <Text style={styles.buttonText}>Post Comment</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.sectionTitle}>Comments</Text>
          </>
        }
        renderItem={({ item }) => (
          <View style={styles.commentCard}>
            <View style={styles.commentTop}>
              <Text style={styles.commentAuthor}>{item.author}</Text>
              <Text style={styles.commentTime}>{item.createdAt}</Text>
            </View>
            <Text style={styles.commentText}>{item.text}</Text>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.emptyWrap}>
            <Text style={styles.emptyText}>No comments yet. Start the conversation.</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020617',
  },
  content: {
    padding: 16,
    paddingBottom: 120,
  },
  postCard: {
    backgroundColor: '#0F172A',
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#1E293B',
  },
  cardTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#2563EB',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  avatarText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 18,
  },
  userInfo: {
    flex: 1,
  },
  author: {
    color: '#F8FAFC',
    fontSize: 16,
    fontWeight: '700',
  },
  meta: {
    color: '#94A3B8',
    fontSize: 13,
    marginTop: 2,
  },
  tagRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 6,
    flexWrap: 'wrap',
  },
  communityTag: {
    backgroundColor: '#1E3A8A',
    borderRadius: 999,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  communityTagText: {
    color: '#DBEAFE',
    fontSize: 11,
    fontWeight: '800',
  },
  typeTag: {
    backgroundColor: '#3F3F46',
    borderRadius: 999,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  typeTagText: {
    color: '#E4E4E7',
    fontSize: 11,
    fontWeight: '800',
  },
  course: {
    color: '#60A5FA',
    fontSize: 13,
    marginTop: 6,
    fontWeight: '700',
  },
  time: {
    color: '#64748B',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 10,
  },
  postText: {
    color: '#E2E8F0',
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 14,
  },
  actions: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#1E293B',
    paddingTop: 12,
    gap: 18,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  actionText: {
    color: '#CBD5E1',
    fontSize: 13,
    fontWeight: '600',
  },
  likedText: {
    color: '#FCA5A5',
  },
  commentInputCard: {
    backgroundColor: '#0F172A',
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#1E293B',
  },
  sectionTitle: {
    color: '#F8FAFC',
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 12,
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
    minHeight: 100,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#2563EB',
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 14,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
  commentCard: {
    backgroundColor: '#0F172A',
    borderRadius: 18,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#1E293B',
  },
  commentTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  commentAuthor: {
    color: '#F8FAFC',
    fontSize: 14,
    fontWeight: '700',
  },
  commentTime: {
    color: '#64748B',
    fontSize: 12,
  },
  commentText: {
    color: '#CBD5E1',
    fontSize: 14,
    lineHeight: 21,
  },
  emptyWrap: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  emptyText: {
    color: '#94A3B8',
    fontSize: 14,
    textAlign: 'center',
  },
  notFoundWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notFoundText: {
    color: '#F8FAFC',
    fontSize: 18,
    fontWeight: '700',
  },
});