import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { router } from 'expo-router';
import React, { useMemo, useRef, useState } from 'react';
import {
  Animated,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Post, PostType, usePosts } from '../../context/PostsContext';
import { courses } from '../../data/courses';

type SortOption = 'Latest' | 'Most Liked';

function getCommunityFromCourse(course: string): string {
  if (course === 'Campus General') return 'Campus General';
  if (course.startsWith('CSCI')) return 'Computer Science';
  if (course.startsWith('MATH')) return 'Mathematics';
  if (course.startsWith('PHYS')) return 'Physics';
  if (course.startsWith('BIOL')) return 'Biology';
  if (course.startsWith('CHEM')) return 'Chemistry';
  if (course.startsWith('PSYC')) return 'Psychology';
  if (
    course.startsWith('MGMT') ||
    course.startsWith('MKTG') ||
    course.startsWith('ACCT') ||
    course.startsWith('ECON')
  ) {
    return 'Business';
  }
  if (course.startsWith('ENGR')) return 'Engineering';
  if (course.startsWith('ENG')) return 'Writing';
  if (course.startsWith('SOC')) return 'Sociology';
  return 'General';
}

const COMMUNITY_OPTIONS = [
  'All Communities',
  'Campus General',
  'Computer Science',
  'Mathematics',
  'Physics',
  'Biology',
  'Chemistry',
  'Psychology',
  'Business',
  'Engineering',
  'Writing',
  'Sociology',
];

const POST_TYPE_OPTIONS: Array<'All Types' | PostType> = [
  'All Types',
  'General',
  'Question',
  'Study Group',
  'Notes',
  'Event',
];

const SORT_OPTIONS: SortOption[] = ['Latest', 'Most Liked'];

function FeedPostCard({
  item,
  onLike,
  onCommentPress,
  liked,
}: {
  item: Post;
  onLike: () => void;
  onCommentPress: () => void;
  liked: boolean;
}) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handleLikePress = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.25,
        duration: 120,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 120,
        useNativeDriver: true,
      }),
    ]).start();

    onLike();
  };

  return (
    <View style={styles.card}>
      <View style={styles.cardTop}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{item.author.charAt(0)}</Text>
        </View>

        <View style={styles.userInfo}>
          <Text style={styles.author}>{item.author}</Text>
          <Text style={styles.meta}>{item.major}</Text>

          <View style={styles.tagRow}>
            <View style={styles.communityTag}>
              <Text style={styles.communityTagText}>{item.community}</Text>
            </View>
            <View style={styles.typeTag}>
              <Text style={styles.typeTagText}>{item.postType}</Text>
            </View>
          </View>

          <Text style={styles.course}>{item.course}</Text>
        </View>

        <Text style={styles.time}>{item.createdAt}</Text>
      </View>

      <Text style={styles.postText}>{item.content}</Text>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton} onPress={handleLikePress}>
          <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
            <Ionicons
              name={liked ? 'heart' : 'heart-outline'}
              size={18}
              color={liked ? '#EF4444' : '#CBD5E1'}
            />
          </Animated.View>
          <Text style={[styles.actionText, liked && styles.likedText]}>
            {item.likes}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={onCommentPress}>
          <Ionicons name="chatbubble-outline" size={18} color="#CBD5E1" />
          <Text style={styles.actionText}>{item.comments}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="share-social-outline" size={18} color="#CBD5E1" />
          <Text style={styles.actionText}>Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function FeedScreen() {
  const { posts, likePost, isPostLiked } = usePosts();

  const [searchText, setSearchText] = useState('');
  const [selectedCommunity, setSelectedCommunity] = useState('All Communities');
  const [selectedCourse, setSelectedCourse] = useState('All Classes');
  const [selectedPostType, setSelectedPostType] =
    useState<'All Types' | PostType>('All Types');
  const [selectedSort, setSelectedSort] = useState<SortOption>('Latest');
  const [showFilters, setShowFilters] = useState(false);

  const classOptions = useMemo(() => {
    const filteredCourses =
      selectedCommunity === 'All Communities'
        ? courses
        : courses.filter(
            (course) => getCommunityFromCourse(course) === selectedCommunity
          );

    return ['All Classes', ...filteredCourses];
  }, [selectedCommunity]);

  const filteredPosts = useMemo(() => {
    const trimmed = searchText.trim().toLowerCase();

    let result = [...posts];

    if (trimmed) {
      result = result.filter((post) => {
        const haystack = [
          post.community,
          post.course,
          post.postType,
          post.content,
          post.author,
          post.major,
        ]
          .join(' ')
          .toLowerCase();

        return haystack.includes(trimmed);
      });
    }

    if (selectedCommunity !== 'All Communities') {
      result = result.filter((post) => post.community === selectedCommunity);
    }

    if (selectedCourse !== 'All Classes') {
      result = result.filter((post) => post.course === selectedCourse);
    }

    if (selectedPostType !== 'All Types') {
      result = result.filter((post) => post.postType === selectedPostType);
    }

    if (selectedSort === 'Most Liked') {
      result.sort((a, b) => b.likes - a.likes);
    }

    return result;
  }, [posts, searchText, selectedCommunity, selectedCourse, selectedPostType, selectedSort]);

  const clearFilters = () => {
    setSelectedCommunity('All Communities');
    setSelectedCourse('All Classes');
    setSelectedPostType('All Types');
    setSelectedSort('Latest');
    setSearchText('');
  };

  const activeFilterCount =
    (selectedCommunity !== 'All Communities' ? 1 : 0) +
    (selectedCourse !== 'All Classes' ? 1 : 0) +
    (selectedPostType !== 'All Types' ? 1 : 0) +
    (selectedSort !== 'Latest' ? 1 : 0);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={filteredPosts}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            <View style={styles.header}>
              <View>
                <Text style={styles.title}>Community Feed</Text>
                <Text style={styles.subtitle}>Connect with students on campus</Text>
              </View>

              <View style={styles.headerIcon}>
                <Ionicons name="people" size={22} color="#3B82F6" />
              </View>
            </View>

            <View style={styles.searchWrap}>
              <Ionicons name="search" size={18} color="#94A3B8" />
              <TextInput
                value={searchText}
                onChangeText={setSearchText}
                placeholder="Search community, class, post type, or keyword"
                placeholderTextColor="#64748B"
                style={styles.searchInput}
              />
              {searchText.length > 0 && (
                <TouchableOpacity onPress={() => setSearchText('')}>
                  <Ionicons name="close-circle" size={18} color="#94A3B8" />
                </TouchableOpacity>
              )}
            </View>

            <View style={styles.filterBar}>
              <TouchableOpacity
                style={styles.filterButton}
                onPress={() => setShowFilters((prev) => !prev)}
              >
                <Ionicons name="options-outline" size={18} color="#F8FAFC" />
                <Text style={styles.filterButtonText}>
                  Filters{activeFilterCount > 0 ? ` (${activeFilterCount})` : ''}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.clearButton} onPress={clearFilters}>
                <Text style={styles.clearButtonText}>Clear</Text>
              </TouchableOpacity>
            </View>

            {showFilters && (
              <View style={styles.filtersPanel}>
                <Text style={styles.filterLabel}>Community</Text>
                <View style={styles.pickerWrap}>
                  <Picker
                    selectedValue={selectedCommunity}
                    onValueChange={(itemValue: string) => {
                      setSelectedCommunity(itemValue);
                      setSelectedCourse('All Classes');
                    }}
                    dropdownIconColor="#F8FAFC"
                    style={styles.picker}
                    itemStyle={styles.pickerItem}
                  >
                    {COMMUNITY_OPTIONS.map((option) => (
                      <Picker.Item
                        key={option}
                        label={option}
                        value={option}
                        color="#FFFFFF"
                      />
                    ))}
                  </Picker>
                </View>

                <Text style={styles.filterLabel}>Class</Text>
                <View style={styles.pickerWrap}>
                  <Picker
                    selectedValue={selectedCourse}
                    onValueChange={(itemValue: string) => setSelectedCourse(itemValue)}
                    dropdownIconColor="#F8FAFC"
                    style={styles.picker}
                    itemStyle={styles.pickerItem}
                  >
                    {classOptions.map((option) => (
                      <Picker.Item
                        key={option}
                        label={option}
                        value={option}
                        color="#FFFFFF"
                      />
                    ))}
                  </Picker>
                </View>

                <Text style={styles.filterLabel}>Post Type</Text>
                <View style={styles.pickerWrap}>
                  <Picker
                    selectedValue={selectedPostType}
                    onValueChange={(itemValue: 'All Types' | PostType) =>
                      setSelectedPostType(itemValue)
                    }
                    dropdownIconColor="#F8FAFC"
                    style={styles.picker}
                    itemStyle={styles.pickerItem}
                  >
                    {POST_TYPE_OPTIONS.map((option) => (
                      <Picker.Item
                        key={option}
                        label={option}
                        value={option}
                        color="#FFFFFF"
                      />
                    ))}
                  </Picker>
                </View>

                <Text style={styles.filterLabel}>Sort</Text>
                <View style={styles.pickerWrap}>
                  <Picker
                    selectedValue={selectedSort}
                    onValueChange={(itemValue: SortOption) => setSelectedSort(itemValue)}
                    dropdownIconColor="#F8FAFC"
                    style={styles.picker}
                    itemStyle={styles.pickerItem}
                  >
                    {SORT_OPTIONS.map((option) => (
                      <Picker.Item
                        key={option}
                        label={option}
                        value={option}
                        color="#FFFFFF"
                      />
                    ))}
                  </Picker>
                </View>
              </View>
            )}

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.activeFiltersRow}
            >
              {selectedCommunity !== 'All Communities' && (
                <View style={styles.activeChip}>
                  <Text style={styles.activeChipText}>{selectedCommunity}</Text>
                </View>
              )}
              {selectedCourse !== 'All Classes' && (
                <View style={styles.activeChip}>
                  <Text style={styles.activeChipText}>{selectedCourse}</Text>
                </View>
              )}
              {selectedPostType !== 'All Types' && (
                <View style={styles.activeChip}>
                  <Text style={styles.activeChipText}>{selectedPostType}</Text>
                </View>
              )}
              {selectedSort !== 'Latest' && (
                <View style={styles.activeChip}>
                  <Text style={styles.activeChipText}>{selectedSort}</Text>
                </View>
              )}
              {activeFilterCount === 0 && searchText.trim().length === 0 && (
                <View style={styles.activeChipMuted}>
                  <Text style={styles.activeChipMutedText}>All posts</Text>
                </View>
              )}
            </ScrollView>

            <View style={styles.filterInfoWrap}>
              <Text style={styles.filterInfoText}>Results: {filteredPosts.length}</Text>
            </View>
          </>
        }
        renderItem={({ item }) => (
          <FeedPostCard
            item={item}
            liked={isPostLiked(item.id)}
            onLike={() => likePost(item.id)}
            onCommentPress={() =>
              router.push({
                pathname: '/post-details',
                params: { postId: item.id },
              })
            }
          />
        )}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>No posts found</Text>
            <Text style={styles.emptySubtitle}>
              Change your filters or search to see a different community.
            </Text>
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
  listContent: {
    paddingBottom: 120,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#111827',
    alignItems: 'center',
    justifyContent: 'center',
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
  searchWrap: {
    marginHorizontal: 16,
    marginTop: 6,
    marginBottom: 10,
    backgroundColor: '#0F172A',
    borderWidth: 1,
    borderColor: '#1E293B',
    borderRadius: 16,
    paddingHorizontal: 14,
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  searchInput: {
    flex: 1,
    color: '#F8FAFC',
    fontSize: 15,
  },
  filterBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    gap: 10,
    marginBottom: 10,
  },
  filterButton: {
    flex: 1,
    backgroundColor: '#2563EB',
    borderRadius: 14,
    height: 46,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  filterButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },
  clearButton: {
    backgroundColor: '#9A3412',
    borderRadius: 14,
    minWidth: 86,
    height: 46,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 14,
  },
  clearButtonText: {
    color: '#FED7AA',
    fontSize: 14,
    fontWeight: '800',
  },
  filtersPanel: {
    marginHorizontal: 16,
    marginBottom: 10,
    backgroundColor: '#0F172A',
    borderWidth: 1,
    borderColor: '#1E293B',
    borderRadius: 18,
    padding: 14,
  },
  filterLabel: {
    color: '#CBD5E1',
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 8,
    marginTop: 8,
  },
  pickerWrap: {
    backgroundColor: '#111827',
    borderWidth: 1,
    borderColor: '#1E293B',
    borderRadius: 14,
    overflow: 'hidden',
  },
  picker: {
    color: '#F8FAFC',
  },
  pickerItem: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  activeFiltersRow: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  activeChip: {
    backgroundColor: '#1E3A8A',
    borderRadius: 999,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 8,
  },
  activeChipText: {
    color: '#DBEAFE',
    fontSize: 12,
    fontWeight: '800',
  },
  activeChipMuted: {
    backgroundColor: '#111827',
    borderRadius: 999,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#1E293B',
  },
  activeChipMutedText: {
    color: '#94A3B8',
    fontSize: 12,
    fontWeight: '700',
  },
  filterInfoWrap: {
    paddingHorizontal: 18,
    paddingBottom: 8,
  },
  filterInfoText: {
    color: '#60A5FA',
    fontSize: 13,
    fontWeight: '700',
  },
  card: {
    backgroundColor: '#0F172A',
    borderRadius: 20,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 14,
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
    justifyContent: 'space-between',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  actionText: {
    color: '#CBD5E1',
    fontSize: 13,
    fontWeight: '600',
  },
  likedText: {
    color: '#FCA5A5',
  },
  emptyState: {
    marginTop: 80,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  emptyTitle: {
    color: '#F8FAFC',
    fontSize: 20,
    fontWeight: '700',
  },
  emptySubtitle: {
    color: '#94A3B8',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 21,
  },
});