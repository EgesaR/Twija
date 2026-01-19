import {
  type RouteConfig,
  index,
  layout,
  route,
} from '@react-router/dev/routes';

export default [
  layout('./layouts/default.tsx', [
    index('routes/home.tsx'),
    //route('/contact-us', 'routes/contactUs.tsx'),
    //route('/book-tour', 'routes/bookTour.tsx'),
    //route('/kigali-experiences', 'routes/kigaliExperiences.tsx'),
    //route('/tours', 'routes/tours.tsx'),
    //route('/tours/:tourId', 'routes/tours.$tourId.tsx'),
  ]),
] satisfies RouteConfig;
