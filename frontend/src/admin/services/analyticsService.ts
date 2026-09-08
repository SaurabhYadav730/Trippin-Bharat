export interface UserReviewModeration {
  id: string
  userName: string
  userEmail: string
  entityType: 'attraction' | 'destination' | 'hotel' | 'restaurant'
  entityName: string
  rating: number
  reviewText: string
  createdAt: string
  status: 'pending' | 'published' | 'flagged' | 'hidden'
  moderationNotes?: string
  flaggedReason?: string
}

export interface RecommendationMetric {
  id: string
  placeName: string
  destination: string
  category: string
  impressionsCount: number
  acceptedCount: number
  acceptanceRate: number // percent
  avgPosition: number
}

class AnalyticsService {
  private reviews: UserReviewModeration[] = [
    {
      id: 'rev-001',
      userName: 'Aarav Sharma',
      userEmail: 'aarav@outlook.com',
      entityType: 'attraction',
      entityName: 'City Palace Complex, Udaipur',
      rating: 5,
      reviewText: 'Arrived at 9 AM per the guide recommendation. Natural morning light in the glass chamber was surreal, and audio guide was top notch.',
      createdAt: '2026-09-08T07:20:00Z',
      status: 'published',
    },
    {
      id: 'rev-002',
      userName: 'Meera Deshmukh',
      userEmail: 'meera.d@gmail.com',
      entityType: 'attraction',
      entityName: 'Monsoon Palace (Sajjangarh)',
      rating: 4,
      reviewText: 'Sunset view was breathtaking. However the forest jeep queues took 35 minutes, start early!',
      createdAt: '2026-09-07T18:45:00Z',
      status: 'published',
    },
    {
      id: 'rev-003',
      userName: 'Anonymous Explorer',
      userEmail: 'traveler991@temp.co',
      entityType: 'restaurant',
      entityName: 'Natraj Dining Hall',
      rating: 1,
      reviewText: 'Check out cheap travel deals on my telegram channel bit.ly/spamdeal!!!',
      createdAt: '2026-09-07T14:10:00Z',
      status: 'flagged',
      flaggedReason: 'Spam URL promotion detected',
    },
    {
      id: 'rev-004',
      userName: 'Rohan Gupta',
      userEmail: 'rohan.g@yahoo.com',
      entityType: 'attraction',
      entityName: 'Jagdish Temple',
      rating: 5,
      reviewText: 'The 5:30 AM morning aarti was the highlight of our Rajasthan journey. Very peaceful.',
      createdAt: '2026-09-06T06:30:00Z',
      status: 'pending',
    },
  ]

  getPlatformMetrics() {
    return {
      activeUsersDaily: 14820,
      activeUsersMonthly: 184500,
      tripsCreatedToday: 184,
      tripsCreatedMonthly: 5920,
      tripsCompleted: 4310,
      avgTripDurationDays: 3.8,
      avgTripBudgetInr: 9400,
      budgetFitRatePercent: 88.4,
      popularDestinations: [
        { name: 'Udaipur', count: 1840, percentage: 31 },
        { name: 'Jaipur', count: 1420, percentage: 24 },
        { name: 'Varanasi', count: 1120, percentage: 19 },
        { name: 'Agra', count: 890, percentage: 15 },
        { name: 'Goa', count: 650, percentage: 11 },
      ],
      mostSelectedAttractions: [
        { name: 'City Palace Complex (Udaipur)', adds: 1420, locks: 980 },
        { name: 'Lake Pichola Boat Ghat (Udaipur)', adds: 1350, locks: 860 },
        { name: 'Amber Fort (Jaipur)', adds: 1290, locks: 790 },
        { name: 'Taj Mahal (Agra)', adds: 1210, locks: 950 },
        { name: 'Dashashwamedh Ghat (Varanasi)', adds: 980, locks: 620 },
      ],
      userActionsDistribution: {
        addedToPlan: 68,
        lockedAsMustVisit: 24,
        reordered: 18,
        removedFromPlan: 8,
      },
    }
  }

  getRecommendationAnalytics(): RecommendationMetric[] {
    return [
      {
        id: 'rec-001',
        placeName: 'Lake Pichola Sunset Boat Ride',
        destination: 'Udaipur',
        category: 'Lake / Cruise',
        impressionsCount: 1200,
        acceptedCount: 742,
        acceptanceRate: 61.8,
        avgPosition: 1.2,
      },
      {
        id: 'rec-002',
        placeName: 'Bagore Ki Haveli Dharohar Dance',
        destination: 'Udaipur',
        category: 'Culture / Performance',
        impressionsCount: 980,
        acceptedCount: 568,
        acceptanceRate: 57.9,
        avgPosition: 2.1,
      },
      {
        id: 'rec-003',
        placeName: 'Jagdish Temple Early Morning Aarti',
        destination: 'Udaipur',
        category: 'Spiritual / Heritage',
        impressionsCount: 840,
        acceptedCount: 420,
        acceptanceRate: 50.0,
        avgPosition: 2.8,
      },
      {
        id: 'rec-004',
        placeName: 'Natraj Unlimited Mewari Thali',
        destination: 'Udaipur',
        category: 'Food / Lunch',
        impressionsCount: 1100,
        acceptedCount: 680,
        acceptanceRate: 61.8,
        avgPosition: 1.5,
      },
    ]
  }

  getReviews(status = 'all'): UserReviewModeration[] {
    if (status !== 'all') {
      return this.reviews.filter((r) => r.status === status)
    }
    return this.reviews
  }

  updateReviewStatus(
    id: string,
    status: 'published' | 'hidden' | 'flagged',
    notes = ''
  ): boolean {
    const review = this.reviews.find((r) => r.id === id)
    if (!review) return false

    review.status = status
    if (notes) review.moderationNotes = notes
    return true
  }
}

export const analyticsService = new AnalyticsService()
