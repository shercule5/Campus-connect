import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function ProfileScreen() {
  const schedule = [
    {
      course: 'CSCI 310',
      title: 'Mobile App Development',
      time: 'Mon / Wed • 10:00 AM',
      room: 'Anna Rubin Hall 204',
    },
    {
      course: 'CSCI 330',
      title: 'Database Systems',
      time: 'Tue / Thu • 12:30 PM',
      room: 'Harry Schure Hall 112',
    },
    {
      course: 'CSCI 355',
      title: 'Artificial Intelligence',
      time: 'Fri • 2:00 PM',
      room: 'Online / Hybrid',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.headerCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>S</Text>
          </View>

          <Text style={styles.name}>Schyler Hercules</Text>
          <Text style={styles.role}>Computer Science • Network & Security</Text>

          <View style={styles.locationRow}>
            <Ionicons name="location-outline" size={16} color="#94A3B8" />
            <Text style={styles.locationText}>NYIT • White Plains, NY</Text>
          </View>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>28</Text>
            <Text style={styles.statLabel}>Posts</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statNumber}>142</Text>
            <Text style={styles.statLabel}>Connections</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statNumber}>6</Text>
            <Text style={styles.statLabel}>Courses</Text>
          </View>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.sectionText}>
            Cybersecurity-focused computer science student building Campus Connect
            to help students network, share resources, and support each other on campus.
          </Text>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>This Week’s Schedule</Text>

          {schedule.map((item, index) => (
            <View
              key={index}
              style={[
                styles.scheduleItem,
                index !== schedule.length - 1 && styles.scheduleSpacing,
              ]}
            >
              <View style={styles.scheduleBadge}>
                <Text style={styles.scheduleBadgeText}>{item.course}</Text>
              </View>

              <View style={styles.scheduleInfo}>
                <Text style={styles.scheduleTitle}>{item.title}</Text>
                <Text style={styles.scheduleMeta}>{item.time}</Text>
                <Text style={styles.scheduleMeta}>{item.room}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Interests</Text>

          <View style={styles.tagsRow}>
            <View style={styles.tag}>
              <Text style={styles.tagText}>Cybersecurity</Text>
            </View>
            <View style={styles.tag}>
              <Text style={styles.tagText}>Networking</Text>
            </View>
            <View style={styles.tag}>
              <Text style={styles.tagText}>Full-Stack Dev</Text>
            </View>
            <View style={styles.tag}>
              <Text style={styles.tagText}>Campus Life</Text>
            </View>
          </View>
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
  headerCard: {
    backgroundColor: '#0F172A',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1E293B',
    marginBottom: 16,
  },
  avatar: {
    width: 92,
    height: 92,
    borderRadius: 46,
    backgroundColor: '#2563EB',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 34,
    fontWeight: '800',
  },
  name: {
    color: '#F8FAFC',
    fontSize: 25,
    fontWeight: '800',
    textAlign: 'center',
  },
  role: {
    color: '#94A3B8',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 6,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  locationText: {
    color: '#94A3B8',
    fontSize: 13,
    marginLeft: 6,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    gap: 10,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#0F172A',
    borderRadius: 18,
    paddingVertical: 18,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1E293B',
  },
  statNumber: {
    color: '#F8FAFC',
    fontSize: 22,
    fontWeight: '800',
  },
  statLabel: {
    color: '#94A3B8',
    fontSize: 13,
    marginTop: 4,
  },
  sectionCard: {
    backgroundColor: '#0F172A',
    borderRadius: 22,
    padding: 18,
    borderWidth: 1,
    borderColor: '#1E293B',
    marginBottom: 16,
  },
  sectionTitle: {
    color: '#F8FAFC',
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 12,
  },
  sectionText: {
    color: '#CBD5E1',
    fontSize: 14,
    lineHeight: 22,
  },
  scheduleItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#111827',
    borderRadius: 16,
    padding: 14,
  },
  scheduleSpacing: {
    marginBottom: 12,
  },
  scheduleBadge: {
    backgroundColor: '#1D4ED8',
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginRight: 12,
  },
  scheduleBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },
  scheduleInfo: {
    flex: 1,
  },
  scheduleTitle: {
    color: '#F8FAFC',
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 4,
  },
  scheduleMeta: {
    color: '#94A3B8',
    fontSize: 13,
    marginTop: 2,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  tag: {
    backgroundColor: '#111827',
    borderRadius: 999,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: '#1E293B',
  },
  tagText: {
    color: '#CBD5E1',
    fontSize: 13,
    fontWeight: '700',
  },
});