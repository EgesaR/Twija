import {
  type RouteConfig,
  index,
  layout,
  route,
} from '@react-router/dev/routes';

export default [
  layout('./layouts/default.tsx', [
    index('routes/home.tsx'),
    route('/contact-us', 'routes/contactUs.tsx'),
    route('/book-tour', 'routes/bookTour.tsx'),
    route('/booking', 'routes/booking.tsx'),
    route('/kigali-experiences', 'routes/kigaliExperiences.tsx'),
    route('/tours', 'routes/tours.tsx'),
    route('/tours/:tourId', 'routes/tours.$tourId.tsx'),
  ]),

  // // Auth Routes (Publicly accessible)
  layout('./layouts/auth/layout.tsx', [
    route('/auth/login', 'routes/auth.login.tsx'),
    route('/auth/request', 'routes/auth.request.tsx'),
  ]),
  // route('/admin/finish-setup', 'routes/admin.finish-setup.tsx'),
  // route('/admin/forgot-password', 'routes/admin.forgot-password.tsx'),
  // route('/admin/reset-password', 'routes/admin.reset-password.tsx'),

  // PROTECTED Admin Routes
  layout('./layouts/admin/layout.tsx', [
    route('/admin/dashboard', 'routes/admin.dashboard.tsx'),
    //   // route('/admin/users', 'routes/admin.users.tsx'),
    //   // route('/admin/users/:userId', 'routes/admin.users.$userId.tsx'),
    //   // route('/admin/roles', 'routes/admin.roles.tsx'),
    //   // route('/admin/roles/:roleId', 'routes/admin.roles.$roleId.tsx'),
    //   // route('/admin/permissions', 'routes/admin.permissions.tsx'),
    //   // route('/admin/permissions/:permissionId', 'routes/admin.permissions.$permissionId.tsx'),
    //   // route('/admin/settings', 'routes/admin.settings.tsx'),
    //   // route('/admin/settings/:settingId', 'routes/admin.settings.$settingId.tsx'),
    //   // route('/admin/logs', 'routes/admin.logs.tsx'),
    //   // route('/admin/logs/:logId', 'routes/admin.logs.$logId.tsx'),
    //   // route('/admin/logs/:logId/details', 'routes/admin.logs.$logId.details.tsx'),
  ]),
] satisfies RouteConfig;
