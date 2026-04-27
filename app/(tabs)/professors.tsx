import React, { useMemo, useState } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

type Review = {
  id: number;
  professorName: string;
  courseCode: string;
  semester: string;
  rating: number;
  difficulty: number;
  workload: 'Light' | 'Medium' | 'Heavy';
  wouldTakeAgain: 'Yes' | 'No';
  comment: string;
};

const courses = [
  'CSCI 101',
  'CSCI 135',
  'CSCI 260',
  'MATH 170',
  'PHYS 101',
  'ENG 110',
  'BUS 101',
  'CYBR 200',
];

const professors = [
  'Dr. Smith',
  'Professor Johnson',
  'Dr. Patel',
  'Professor Garcia',
  'Dr. Lee',
];

const starterReviews: Review[] = [
  {
    id: 1,
    professorName: 'Dr. Smith',
    courseCode: 'CSCI 260',
    semester: 'Spring 2026',
    rating: 5,
    difficulty: 3,
    workload: 'Medium',
    wouldTakeAgain: 'Yes',
    comment:
      'Explains concepts clearly and gives useful examples. Projects take time, but they help you actually understand the class.',
  },
  {
    id: 2,
    professorName: 'Dr. Smith',
    courseCode: 'CSCI 260',
    semester: 'Fall 2025',
    rating: 4,
    difficulty: 4,
    workload: 'Heavy',
    wouldTakeAgain: 'Yes',
    comment:
      'Good professor, but do not wait until the last minute. The assignments can stack up fast.',
  },
  {
    id: 3,
    professorName: 'Dr. Patel',
    courseCode: 'MATH 170',
    semester: 'Spring 2026',
    rating: 4,
    difficulty: 3,
    workload: 'Medium',
    wouldTakeAgain: 'Yes',
    comment:
      'Fair exams and clear review sessions. You still need to practice outside of class.',
  },
  {
    id: 4,
    professorName: 'Dr. Patel',
    courseCode: 'MATH 170',
    semester: 'Fall 2025',
    rating: 3,
    difficulty: 4,
    workload: 'Heavy',
    wouldTakeAgain: 'No',
    comment:
      'Knows the material, but the class moves fast. You need to stay on top of homework.',
  },
  {
    id: 5,
    professorName: 'Professor Johnson',
    courseCode: 'CSCI 135',
    semester: 'Spring 2026',
    rating: 5,
    difficulty: 2,
    workload: 'Light',
    wouldTakeAgain: 'Yes',
    comment:
      'Very clear with beginner programming topics. Good professor if you are still getting comfortable with coding.',
  },
  {
    id: 6,
    professorName: 'Professor Johnson',
    courseCode: 'CSCI 135',
    semester: 'Fall 2025',
    rating: 4,
    difficulty: 3,
    workload: 'Medium',
    wouldTakeAgain: 'Yes',
    comment:
      'Pretty fair professor. The class is easier if you show up and follow the examples.',
  },
  {
    id: 7,
    professorName: 'Professor Garcia',
    courseCode: 'ENG 110',
    semester: 'Spring 2026',
    rating: 4,
    difficulty: 2,
    workload: 'Light',
    wouldTakeAgain: 'Yes',
    comment:
      'Chill professor. Gives useful feedback on writing and does not make the class feel stressful.',
  },
  {
    id: 8,
    professorName: 'Professor Garcia',
    courseCode: 'ENG 110',
    semester: 'Fall 2025',
    rating: 5,
    difficulty: 2,
    workload: 'Medium',
    wouldTakeAgain: 'Yes',
    comment:
      'Really helpful with essays. Workload is reasonable if you keep up with drafts.',
  },
  {
    id: 9,
    professorName: 'Dr. Lee',
    courseCode: 'CYBR 200',
    semester: 'Spring 2026',
    rating: 5,
    difficulty: 3,
    workload: 'Medium',
    wouldTakeAgain: 'Yes',
    comment:
      'Great professor if you like hands-on security topics. Labs are useful and feel realistic.',
  },
  {
    id: 10,
    professorName: 'Dr. Lee',
    courseCode: 'CYBR 200',
    semester: 'Fall 2025',
    rating: 4,
    difficulty: 3,
    workload: 'Medium',
    wouldTakeAgain: 'Yes',
    comment:
      'Good class. The assignments make more sense after the lectures, so attendance helps a lot.',
  },
];

function getFirstReviewedCourseForProfessor(
  reviews: Review[],
  professorName: string
) {
  const match = reviews.find((review) => review.professorName === professorName);
  return match ? match.courseCode : 'CSCI 260';
}

function getProfessorStats(reviews: Review[], professorName: string) {
  const professorReviews = reviews.filter(
    (review) => review.professorName === professorName
  );

  if (professorReviews.length === 0) {
    return {
      rating: 'N/A',
      difficulty: 'N/A',
      takeAgain: 'N/A',
      reviewCount: 0,
      mainCourse: 'No reviews',
    };
  }

  const rating = (
    professorReviews.reduce((sum, review) => sum + review.rating, 0) /
    professorReviews.length
  ).toFixed(1);

  const difficulty = (
    professorReviews.reduce((sum, review) => sum + review.difficulty, 0) /
    professorReviews.length
  ).toFixed(1);

  const takeAgain = Math.round(
    (professorReviews.filter((review) => review.wouldTakeAgain === 'Yes')
      .length /
      professorReviews.length) *
      100
  );

  return {
    rating,
    difficulty,
    takeAgain: `${takeAgain}%`,
    reviewCount: professorReviews.length,
    mainCourse: professorReviews[0].courseCode,
  };
}

export default function ProfessorsScreen() {
  const [reviews, setReviews] = useState<Review[]>(starterReviews);

  const [selectedCourse, setSelectedCourse] = useState('CSCI 260');
  const [selectedProfessor, setSelectedProfessor] = useState('Dr. Smith');

  const [semester, setSemester] = useState('');
  const [rating, setRating] = useState(5);
  const [difficulty, setDifficulty] = useState(3);
  const [workload, setWorkload] = useState<'Light' | 'Medium' | 'Heavy'>(
    'Medium'
  );
  const [wouldTakeAgain, setWouldTakeAgain] = useState<'Yes' | 'No'>('Yes');
  const [comment, setComment] = useState('');

  const professorStats = useMemo(() => {
    return professors.map((professor) => ({
      professorName: professor,
      ...getProfessorStats(reviews, professor),
    }));
  }, [reviews]);

  const filteredReviews = useMemo(() => {
    return reviews.filter(
      (review) =>
        review.courseCode === selectedCourse &&
        review.professorName === selectedProfessor
    );
  }, [reviews, selectedCourse, selectedProfessor]);

  const averageRating =
    filteredReviews.length > 0
      ? (
          filteredReviews.reduce((sum, review) => sum + review.rating, 0) /
          filteredReviews.length
        ).toFixed(1)
      : 'N/A';

  const averageDifficulty =
    filteredReviews.length > 0
      ? (
          filteredReviews.reduce((sum, review) => sum + review.difficulty, 0) /
          filteredReviews.length
        ).toFixed(1)
      : 'N/A';

  const wouldTakeAgainPercent =
    filteredReviews.length > 0
      ? Math.round(
          (filteredReviews.filter((review) => review.wouldTakeAgain === 'Yes')
            .length /
            filteredReviews.length) *
            100
        )
      : 0;

  const handleProfessorSelect = (professor: string) => {
    setSelectedProfessor(professor);
    setSelectedCourse(getFirstReviewedCourseForProfessor(reviews, professor));
  };

  const handleAddReview = () => {
    if (!semester.trim() || !comment.trim()) {
      Alert.alert('Missing Info', 'Please enter a semester and review comment.');
      return;
    }

    const newReview: Review = {
      id: Date.now(),
      professorName: selectedProfessor,
      courseCode: selectedCourse,
      semester: semester.trim(),
      rating,
      difficulty,
      workload,
      wouldTakeAgain,
      comment: comment.trim(),
    };

    setReviews((currentReviews) => [newReview, ...currentReviews]);

    setSemester('');
    setRating(5);
    setDifficulty(3);
    setWorkload('Medium');
    setWouldTakeAgain('Yes');
    setComment('');

    Alert.alert('Review Added', 'Your professor review was posted.');
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>Professor Ratings</Text>
      <Text style={styles.subtitle}>
        Filter by class, choose a professor, and read real student reviews before
        registration.
      </Text>

      <Text style={styles.sectionTitle}>Professor Overview</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {professorStats.map((professor) => (
          <TouchableOpacity
            key={professor.professorName}
            style={[
              styles.overviewCard,
              selectedProfessor === professor.professorName &&
                styles.activeOverviewCard,
            ]}
            onPress={() => handleProfessorSelect(professor.professorName)}
          >
            <Text style={styles.overviewName}>{professor.professorName}</Text>
            <Text style={styles.overviewCourse}>{professor.mainCourse}</Text>

            <View style={styles.overviewStatsRow}>
              <View style={styles.overviewStatBox}>
                <Text style={styles.overviewNumber}>{professor.rating}</Text>
                <Text style={styles.overviewLabel}>Rating</Text>
              </View>

              <View style={styles.overviewStatBox}>
                <Text style={styles.overviewNumber}>{professor.difficulty}</Text>
                <Text style={styles.overviewLabel}>Diff.</Text>
              </View>

              <View style={styles.overviewStatBox}>
                <Text style={styles.overviewNumber}>{professor.takeAgain}</Text>
                <Text style={styles.overviewLabel}>Again</Text>
              </View>
            </View>

            <Text style={styles.overviewReviews}>
              {professor.reviewCount} student reviews
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Text style={styles.sectionTitle}>Choose Class</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {courses.map((course) => (
          <TouchableOpacity
            key={course}
            style={[
              styles.chip,
              selectedCourse === course && styles.activeChip,
            ]}
            onPress={() => setSelectedCourse(course)}
          >
            <Text
              style={[
                styles.chipText,
                selectedCourse === course && styles.activeChipText,
              ]}
            >
              {course}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Text style={styles.sectionTitle}>Choose Professor</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {professors.map((professor) => (
          <TouchableOpacity
            key={professor}
            style={[
              styles.chip,
              selectedProfessor === professor && styles.activeChip,
            ]}
            onPress={() => handleProfessorSelect(professor)}
          >
            <Text
              style={[
                styles.chipText,
                selectedProfessor === professor && styles.activeChipText,
              ]}
            >
              {professor}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.summaryCard}>
        <Text style={styles.professorName}>{selectedProfessor}</Text>
        <Text style={styles.courseText}>{selectedCourse}</Text>

        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{averageRating}</Text>
            <Text style={styles.statLabel}>Rating</Text>
          </View>

          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{averageDifficulty}</Text>
            <Text style={styles.statLabel}>Difficulty</Text>
          </View>

          <View style={styles.statBox}>
            <Text style={styles.statNumber}>
              {filteredReviews.length > 0 ? `${wouldTakeAgainPercent}%` : 'N/A'}
            </Text>
            <Text style={styles.statLabel}>Take Again</Text>
          </View>
        </View>
      </View>

      <View style={styles.formCard}>
        <Text style={styles.formTitle}>Add Review</Text>

        <View style={styles.selectedReviewTarget}>
          <Text style={styles.selectedReviewTargetLabel}>Reviewing</Text>
          <Text style={styles.selectedReviewTargetText}>
            {selectedProfessor} • {selectedCourse}
          </Text>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Semester, example: Spring 2026"
          placeholderTextColor="#64748B"
          value={semester}
          onChangeText={setSemester}
        />

        <Text style={styles.smallLabel}>Overall Rating</Text>
        <View style={styles.ratingBubbleRow}>
          {[1, 2, 3, 4, 5].map((number) => (
            <TouchableOpacity
              key={number}
              style={[
                styles.ratingBubble,
                rating === number && styles.selectedRatingBubble,
              ]}
              onPress={() => setRating(number)}
            >
              <Text
                style={[
                  styles.ratingBubbleText,
                  rating === number && styles.selectedRatingBubbleText,
                ]}
              >
                {number}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.smallLabel}>Difficulty</Text>
        <View style={styles.ratingBubbleRow}>
          {[1, 2, 3, 4, 5].map((number) => (
            <TouchableOpacity
              key={number}
              style={[
                styles.ratingBubble,
                difficulty === number && styles.selectedRatingBubble,
              ]}
              onPress={() => setDifficulty(number)}
            >
              <Text
                style={[
                  styles.ratingBubbleText,
                  difficulty === number && styles.selectedRatingBubbleText,
                ]}
              >
                {number}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.smallLabel}>Workload</Text>
        <View style={styles.optionRow}>
          {(['Light', 'Medium', 'Heavy'] as const).map((option) => (
            <TouchableOpacity
              key={option}
              style={[
                styles.optionButton,
                workload === option && styles.selectedOption,
              ]}
              onPress={() => setWorkload(option)}
            >
              <Text
                style={[
                  styles.optionText,
                  workload === option && styles.selectedOptionText,
                ]}
              >
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.smallLabel}>Would take again?</Text>
        <View style={styles.optionRow}>
          {(['Yes', 'No'] as const).map((option) => (
            <TouchableOpacity
              key={option}
              style={[
                styles.optionButton,
                wouldTakeAgain === option && styles.selectedOption,
              ]}
              onPress={() => setWouldTakeAgain(option)}
            >
              <Text
                style={[
                  styles.optionText,
                  wouldTakeAgain === option && styles.selectedOptionText,
                ]}
              >
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TextInput
          style={[styles.input, styles.commentInput]}
          placeholder="Write your review..."
          placeholderTextColor="#64748B"
          value={comment}
          onChangeText={setComment}
          multiline
        />

        <TouchableOpacity style={styles.submitButton} onPress={handleAddReview}>
          <Text style={styles.submitButtonText}>Post Review</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Student Reviews</Text>

      {filteredReviews.length === 0 ? (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyText}>
            No reviews yet for {selectedProfessor} in {selectedCourse}.
          </Text>
        </View>
      ) : (
        filteredReviews.map((review) => (
          <View key={review.id} style={styles.reviewCard}>
            <View style={styles.reviewHeader}>
              <View>
                <Text style={styles.reviewRating}>{review.rating}/5</Text>
                <Text style={styles.reviewCourse}>{review.courseCode}</Text>
              </View>
              <Text style={styles.reviewSemester}>{review.semester}</Text>
            </View>

            <Text style={styles.reviewMeta}>
              Professor: {review.professorName}
            </Text>

            <Text style={styles.reviewMeta}>
              Difficulty: {review.difficulty}/5 • Workload: {review.workload}
            </Text>

            <Text style={styles.reviewMeta}>
              Would take again: {review.wouldTakeAgain}
            </Text>

            <Text style={styles.reviewComment}>{review.comment}</Text>
          </View>
        ))
      )}

      <View style={{ height: 30 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020617',
    padding: 18,
  },
  title: {
    color: '#F8FAFC',
    fontSize: 30,
    fontWeight: '800',
    marginTop: 12,
  },
  subtitle: {
    color: '#94A3B8',
    fontSize: 15,
    lineHeight: 22,
    marginTop: 8,
    marginBottom: 18,
  },
  sectionTitle: {
    color: '#F8FAFC',
    fontSize: 18,
    fontWeight: '700',
    marginTop: 20,
    marginBottom: 10,
  },
  overviewCard: {
    backgroundColor: '#0F172A',
    borderRadius: 20,
    padding: 16,
    width: 235,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#1E293B',
  },
  activeOverviewCard: {
    borderColor: '#3B82F6',
  },
  overviewName: {
    color: '#F8FAFC',
    fontSize: 17,
    fontWeight: '800',
  },
  overviewCourse: {
    color: '#60A5FA',
    fontSize: 13,
    fontWeight: '700',
    marginTop: 4,
  },
  overviewStatsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 14,
  },
  overviewStatBox: {
    width: '31%',
  },
  overviewNumber: {
    color: '#F8FAFC',
    fontSize: 18,
    fontWeight: '800',
  },
  overviewLabel: {
    color: '#94A3B8',
    fontSize: 11,
    marginTop: 3,
  },
  overviewReviews: {
    color: '#94A3B8',
    fontSize: 12,
    fontWeight: '700',
    marginTop: 12,
  },
  chip: {
    backgroundColor: '#1E293B',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 18,
    marginRight: 10,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#334155',
  },
  activeChip: {
    backgroundColor: '#3B82F6',
    borderColor: '#3B82F6',
  },
  chipText: {
    color: '#CBD5E1',
    fontWeight: '700',
  },
  activeChipText: {
    color: '#FFFFFF',
  },
  summaryCard: {
    backgroundColor: '#0F172A',
    borderRadius: 22,
    padding: 18,
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#1E293B',
  },
  professorName: {
    color: '#F8FAFC',
    fontSize: 24,
    fontWeight: '800',
  },
  courseText: {
    color: '#60A5FA',
    fontSize: 16,
    fontWeight: '700',
    marginTop: 4,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 18,
  },
  statBox: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 12,
    width: '31%',
    alignItems: 'center',
  },
  statNumber: {
    color: '#F8FAFC',
    fontSize: 22,
    fontWeight: '800',
  },
  statLabel: {
    color: '#94A3B8',
    fontSize: 12,
    marginTop: 4,
  },
  formCard: {
    backgroundColor: '#0F172A',
    borderRadius: 22,
    padding: 18,
    marginTop: 22,
    borderWidth: 1,
    borderColor: '#1E293B',
  },
  formTitle: {
    color: '#F8FAFC',
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 14,
  },
  selectedReviewTarget: {
    backgroundColor: '#1E293B',
    borderRadius: 14,
    padding: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#334155',
  },
  selectedReviewTargetLabel: {
    color: '#94A3B8',
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  selectedReviewTargetText: {
    color: '#F8FAFC',
    fontSize: 16,
    fontWeight: '800',
  },
  input: {
    backgroundColor: '#1E293B',
    color: '#F8FAFC',
    borderRadius: 14,
    padding: 14,
    fontSize: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#334155',
  },
  commentInput: {
    height: 110,
    textAlignVertical: 'top',
  },
  smallLabel: {
    color: '#CBD5E1',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 8,
  },
  ratingBubbleRow: {
    flexDirection: 'row',
    marginBottom: 14,
    flexWrap: 'wrap',
  },
  ratingBubble: {
    backgroundColor: '#1E293B',
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#334155',
  },
  selectedRatingBubble: {
    backgroundColor: '#3B82F6',
    borderColor: '#3B82F6',
  },
  ratingBubbleText: {
    color: '#CBD5E1',
    fontSize: 16,
    fontWeight: '800',
  },
  selectedRatingBubbleText: {
    color: '#FFFFFF',
  },
  optionRow: {
    flexDirection: 'row',
    marginBottom: 12,
    flexWrap: 'wrap',
  },
  optionButton: {
    backgroundColor: '#1E293B',
    paddingVertical: 9,
    paddingHorizontal: 14,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#334155',
  },
  selectedOption: {
    backgroundColor: '#3B82F6',
    borderColor: '#3B82F6',
  },
  optionText: {
    color: '#CBD5E1',
    fontWeight: '700',
  },
  selectedOptionText: {
    color: '#FFFFFF',
  },
  submitButton: {
    backgroundColor: '#3B82F6',
    padding: 15,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 4,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
  emptyCard: {
    backgroundColor: '#0F172A',
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: '#1E293B',
  },
  emptyText: {
    color: '#94A3B8',
    fontSize: 15,
  },
  reviewCard: {
    backgroundColor: '#0F172A',
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#1E293B',
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  reviewRating: {
    color: '#60A5FA',
    fontSize: 20,
    fontWeight: '800',
  },
  reviewCourse: {
    color: '#60A5FA',
    fontSize: 13,
    fontWeight: '700',
    marginTop: 2,
  },
  reviewSemester: {
    color: '#94A3B8',
    fontWeight: '700',
  },
  reviewMeta: {
    color: '#CBD5E1',
    fontSize: 14,
    marginBottom: 4,
  },
  reviewComment: {
    color: '#F8FAFC',
    fontSize: 15,
    lineHeight: 21,
    marginTop: 8,
  },
});