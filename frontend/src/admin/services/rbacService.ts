import type { AdminRole } from '../types/admin'

export type PermissionAction =
  | 'destination.read'
  | 'destination.create'
  | 'destination.update'
  | 'destination.publish'
  | 'destination.delete'
  | 'attraction.read'
  | 'attraction.create'
  | 'attraction.update'
  | 'attraction.publish'
  | 'attraction.verify'
  | 'attraction.delete'
  | 'hotel.read'
  | 'hotel.create'
  | 'hotel.update'
  | 'hotel.delete'
  | 'restaurant.read'
  | 'restaurant.create'
  | 'restaurant.update'
  | 'restaurant.delete'
  | 'cuisine.manage'
  | 'experience.manage'
  | 'verification.manage'
  | 'dataQuality.view'
  | 'dataQuality.fix'
  | 'duplicate.merge'
  | 'import.execute'
  | 'import.rollback'
  | 'media.manage'
  | 'tripLab.simulate'
  | 'analytics.read'
  | 'moderation.manage'
  | 'users.read'
  | 'users.suspend'
  | 'system.diagnostics'
  | 'settings.manage'
  | 'audit.read'
  | 'audit.revert'

// Master permission mapping
// "Admin is admin he must be able to do all the things"
const ROLE_PERMISSIONS: Record<AdminRole, Set<PermissionAction>> = {
  Admin: new Set<PermissionAction>([
    'destination.read',
    'destination.create',
    'destination.update',
    'destination.publish',
    'destination.delete',
    'attraction.read',
    'attraction.create',
    'attraction.update',
    'attraction.publish',
    'attraction.verify',
    'attraction.delete',
    'hotel.read',
    'hotel.create',
    'hotel.update',
    'hotel.delete',
    'restaurant.read',
    'restaurant.create',
    'restaurant.update',
    'restaurant.delete',
    'cuisine.manage',
    'experience.manage',
    'verification.manage',
    'dataQuality.view',
    'dataQuality.fix',
    'duplicate.merge',
    'import.execute',
    'import.rollback',
    'media.manage',
    'tripLab.simulate',
    'analytics.read',
    'moderation.manage',
    'users.read',
    'users.suspend',
    'system.diagnostics',
    'settings.manage',
    'audit.read',
    'audit.revert',
  ]),

  'Content Admin': new Set<PermissionAction>([
    'destination.read',
    'destination.create',
    'destination.update',
    'attraction.read',
    'attraction.create',
    'attraction.update',
    'hotel.read',
    'hotel.create',
    'hotel.update',
    'restaurant.read',
    'restaurant.create',
    'restaurant.update',
    'cuisine.manage',
    'experience.manage',
    'media.manage',
    'tripLab.simulate',
    'analytics.read',
    'dataQuality.view',
    'audit.read',
  ]),

  'Tourism Data Editor': new Set<PermissionAction>([
    'destination.read',
    'attraction.read',
    'attraction.create',
    'attraction.update',
    'hotel.read',
    'hotel.create',
    'hotel.update',
    'restaurant.read',
    'restaurant.create',
    'restaurant.update',
    'cuisine.manage',
    'experience.manage',
    'dataQuality.view',
    'dataQuality.fix',
    'media.manage',
    'tripLab.simulate',
    'audit.read',
  ]),

  'Verification Manager': new Set<PermissionAction>([
    'destination.read',
    'attraction.read',
    'attraction.verify',
    'hotel.read',
    'restaurant.read',
    'verification.manage',
    'dataQuality.view',
    'dataQuality.fix',
    'duplicate.merge',
    'media.manage',
    'audit.read',
  ]),

  Moderator: new Set<PermissionAction>([
    'moderation.manage',
    'users.read',
    'users.suspend',
    'destination.read',
    'attraction.read',
    'audit.read',
  ]),

  Analyst: new Set<PermissionAction>([
    'analytics.read',
    'destination.read',
    'attraction.read',
    'hotel.read',
    'restaurant.read',
    'tripLab.simulate',
    'dataQuality.view',
    'system.diagnostics',
    'audit.read',
  ]),
}

export const rbacService = {
  /**
   * Check if a specific role is allowed to perform an action
   */
  can(role: AdminRole, action: PermissionAction): boolean {
    if (role === 'Admin') return true
    return ROLE_PERMISSIONS[role]?.has(action) ?? false
  },

  /**
   * Get all permission states for a given role
   */
  getPermissionsForRole(role: AdminRole): Record<PermissionAction, boolean> {
    const allActions: PermissionAction[] = [
      'destination.read',
      'destination.create',
      'destination.update',
      'destination.publish',
      'destination.delete',
      'attraction.read',
      'attraction.create',
      'attraction.update',
      'attraction.publish',
      'attraction.verify',
      'attraction.delete',
      'hotel.read',
      'hotel.create',
      'hotel.update',
      'hotel.delete',
      'restaurant.read',
      'restaurant.create',
      'restaurant.update',
      'restaurant.delete',
      'cuisine.manage',
      'experience.manage',
      'verification.manage',
      'dataQuality.view',
      'dataQuality.fix',
      'duplicate.merge',
      'import.execute',
      'import.rollback',
      'media.manage',
      'tripLab.simulate',
      'analytics.read',
      'moderation.manage',
      'users.read',
      'users.suspend',
      'system.diagnostics',
      'settings.manage',
      'audit.read',
      'audit.revert',
    ]

    const result = {} as Record<PermissionAction, boolean>
    allActions.forEach((action) => {
      result[action] = this.can(role, action)
    })
    return result
  },

  getRoles(): AdminRole[] {
    return ['Admin', 'Content Admin', 'Tourism Data Editor', 'Verification Manager', 'Moderator', 'Analyst']
  },
}
