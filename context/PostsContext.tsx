import React, { createContext, useContext, useMemo, useState } from 'react';
import { courses } from '../data/courses';

export type Comment = {
  id: string;
  author: string;
  text: string;
  createdAt: string;
};

export type PostType = 'General' | 'Question' | 'Study Group' | 'Notes' | 'Event';

export type Post = {
  id: string;
  author: string;
  major: string;
  community: string;
  course: string;
  postType: PostType;
  content: string;
  likes: number;
  comments: number;
  createdAt: string;
};

type PostsContextType = {
  posts: Post[];
  commentsByPost: Record<string, Comment[]>;
  likedPostIds: string[];
  addPost: (
    post: Omit<Post, 'id' | 'likes' | 'comments' | 'createdAt'>
  ) => void;
  likePost: (id: string) => void;
  addComment: (postId: string, text: string) => void;
  getCommentsForPost: (postId: string) => Comment[];
  isPostLiked: (postId: string) => boolean;
};

const PostsContext = createContext<PostsContextType | undefined>(undefined);

const studentNames = [
  'Maya Johnson',
  'Jordan Lee',
  'Ava Smith',
  'Chris Rivera',
  'Nina Patel',
  'Ryan Thompson',
  'Emma Davis',
  'Zoe Martin',
  'Liam Carter',
  'Sophia Brown',
  'Daniel White',
  'Olivia Moore',
  'Ethan Clark',
  'Isabella Hall',
  'Noah King',
  'Grace Young',
  'Jalen Brooks',
  'Camila Flores',
  'Marcus Reed',
  'Layla Bennett',
  'Tyler Adams',
  'Leah Parker',
  'Mason Scott',
  'Amara Wilson',
];

const majors = [
  'Computer Science',
  'Biology',
  'Business',
  'Cybersecurity',
  'Engineering',
  'Mathematics',
  'Psychology',
  'Marketing',
  'Physics',
  'Chemistry',
];

const postTypes: PostType[] = ['General', 'Question', 'Study Group', 'Notes', 'Event'];

const generalTemplates = [
  'Just checking in — how is everyone feeling about this class right now?',
  'This community has been really helpful lately.',
  'Anyone else trying to stay ahead before the next exam?',
  'Lowkey this class is more interesting than I expected.',
];

const questionTemplates = [
  'Did anyone understand what the professor said about the next assignment?',
  'What chapters are most important for the upcoming test?',
  'Is anyone else finding the homework harder than expected?',
  'Do we need to know the reading in detail for the quiz?',
];

const studyGroupTemplates = [
  'Would anybody be down to make a study group for this class?',
  'Who wants to meet up before the exam and review together?',
  'Trying to build a group chat for this course — who’s in?',
  'Would people want to do a quick study session after class?',
];

const notesTemplates = [
  'I missed part of lecture today — does anyone have good notes?',
  'I can trade notes with someone from today’s class if needed.',
  'Did anybody write down the examples from lecture?',
  'If anyone needs notes from the last class, I can send them.',
];

const eventTemplates = [
  'Would anyone be interested in a review session this weekend?',
  'Thinking about organizing a meetup for this class before the next test.',
  'Who would pull up to a library study event for this course?',
  'Might put together a quick campus meetup for this class community.',
];

const commentTemplates = [
  'Yeah, I was wondering the same thing.',
  'I can share my notes later if you want.',
  'We should definitely make a study group.',
  'I heard the professor is focusing on the recent chapters.',
  'I’m in this class too, that would help a lot.',
  'Good question honestly.',
  'I can probably make it after my other class.',
  'Same here, I’ve been trying to figure that out too.',
];

function pickByIndex<T>(arr: T[], index: number) {
  return arr[index % arr.length];
}

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

function getTemplateForType(type: PostType, seed: number): string {
  switch (type) {
    case 'General':
      return pickByIndex(generalTemplates, seed);
    case 'Question':
      return pickByIndex(questionTemplates, seed);
    case 'Study Group':
      return pickByIndex(studyGroupTemplates, seed);
    case 'Notes':
      return pickByIndex(notesTemplates, seed);
    case 'Event':
      return pickByIndex(eventTemplates, seed);
    default:
      return pickByIndex(generalTemplates, seed);
  }
}

function generateStarterData() {
  const generatedPosts: Post[] = [];
  const generatedComments: Record<string, Comment[]> = {};

  courses.forEach((course, courseIndex) => {
    const community = getCommunityFromCourse(course);
    const postsPerCourse = course === 'Campus General' ? 4 : 3;

    for (let i = 0; i < postsPerCourse; i++) {
      const postId = `seed-post-${courseIndex + 1}-${i + 1}`;
      const postType = pickByIndex(postTypes, courseIndex + i) as PostType;
      const author = pickByIndex(studentNames, courseIndex * 3 + i);
      const major = pickByIndex(majors, courseIndex + i);
      const content = getTemplateForType(postType, courseIndex + i);
      const likes = ((courseIndex + 3) * (i + 2)) % 21 + 2;
      const createdAt = pickByIndex(
        ['Just now', '12m ago', '35m ago', '1h ago', '2h ago', '4h ago', '6h ago'],
        courseIndex + i
      );

      const commentCount = ((courseIndex + i) % 4) + 1;

      const comments: Comment[] = Array.from({ length: commentCount }).map((_, commentIndex) => ({
        id: `${postId}-comment-${commentIndex + 1}`,
        author: pickByIndex(studentNames, courseIndex + i + commentIndex + 4),
        text: pickByIndex(commentTemplates, courseIndex + commentIndex),
        createdAt: pickByIndex(['9m ago', '25m ago', '1h ago', '2h ago'], commentIndex),
      }));

      generatedPosts.push({
        id: postId,
        author,
        major,
        community,
        course,
        postType,
        content,
        likes,
        comments: comments.length,
        createdAt,
      });

      generatedComments[postId] = comments;
    }
  });

  const prioritizedCourses = [
    'Campus General',
    'CSCI 355 - Artificial Intelligence',
    'CSCI 310 - Mobile App Development',
    'CSCI 380 - Network Security',
    'MATH 170 - Calculus I',
    'PHYS 180 - Physics I',
  ];

  generatedPosts.sort((a, b) => {
    const aPriority = prioritizedCourses.indexOf(a.course);
    const bPriority = prioritizedCourses.indexOf(b.course);

    if (aPriority !== -1 && bPriority !== -1) return aPriority - bPriority;
    if (aPriority !== -1) return -1;
    if (bPriority !== -1) return 1;

    return a.course.localeCompare(b.course);
  });

  return {
    posts: generatedPosts,
    commentsByPost: generatedComments,
  };
}

const starterData = generateStarterData();

export function PostsProvider({ children }: { children: React.ReactNode }) {
  const [posts, setPosts] = useState<Post[]>(starterData.posts);
  const [commentsByPost, setCommentsByPost] =
    useState<Record<string, Comment[]>>(starterData.commentsByPost);
  const [likedPostIds, setLikedPostIds] = useState<string[]>([]);

  const addPost = (
    post: Omit<Post, 'id' | 'likes' | 'comments' | 'createdAt'>
  ) => {
    const newPost: Post = {
      id: Date.now().toString(),
      author: post.author,
      major: post.major,
      community: post.community,
      course: post.course,
      postType: post.postType,
      content: post.content,
      likes: 0,
      comments: 0,
      createdAt: 'Just now',
    };

    setPosts((prev) => [newPost, ...prev]);
    setCommentsByPost((prev) => ({
      ...prev,
      [newPost.id]: [],
    }));
  };

  const likePost = (id: string) => {
    const alreadyLiked = likedPostIds.includes(id);

    if (!alreadyLiked) {
      setPosts((prev) =>
        prev.map((post) =>
          post.id === id ? { ...post, likes: post.likes + 1 } : post
        )
      );
      setLikedPostIds((prev) => [...prev, id]);
    }
  };

  const addComment = (postId: string, text: string) => {
    const newComment: Comment = {
      id: Date.now().toString(),
      author: 'Schyler',
      text,
      createdAt: 'Just now',
    };

    setCommentsByPost((prev) => {
      const existing = prev[postId] || [];
      return {
        ...prev,
        [postId]: [newComment, ...existing],
      };
    });

    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId ? { ...post, comments: post.comments + 1 } : post
      )
    );
  };

  const getCommentsForPost = (postId: string) => commentsByPost[postId] || [];
  const isPostLiked = (postId: string) => likedPostIds.includes(postId);

  const value = useMemo(
    () => ({
      posts,
      commentsByPost,
      likedPostIds,
      addPost,
      likePost,
      addComment,
      getCommentsForPost,
      isPostLiked,
    }),
    [posts, commentsByPost, likedPostIds]
  );

  return <PostsContext.Provider value={value}>{children}</PostsContext.Provider>;
}

export function usePosts() {
  const context = useContext(PostsContext);

  if (!context) {
    throw new Error('usePosts must be used inside PostsProvider');
  }

  return context;
}