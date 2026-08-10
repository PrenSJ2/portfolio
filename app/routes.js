import { index, layout, route } from '@react-router/dev/routes';

export default [
  index('routes/home/route.js'),
  route('uses', 'routes/uses/route.js'),
  route('articles', 'routes/articles_._index/route.jsx'),
  layout('routes/articles/route.jsx', [
    route('articles/django-elastic-beanstalk', 'routes/articles.django-elastic-beanstalk.mdx'),
    route('articles/instagram-platform-api', 'routes/articles.instagram-platform-api.mdx'),
  ]),
  route('projects/ancient-bots', 'routes/projects.ancient-bots/route.js'),
  route('projects/fitcheck', 'routes/projects.fitcheck/route.js'),
  route('projects/mormonize', 'routes/projects.mormonize/route.js'),
  route('projects/slice', 'routes/projects.slice/route.js'),
  route('projects/smart-sparrow', 'routes/projects.smart-sparrow/route.js'),
  route('projects/teamworks', 'routes/projects.teamworks/route.js'),
  route('projects/thoth', 'routes/projects.thoth/route.js'),
  route('projects/volkihar-knight', 'routes/projects.volkihar-knight/route.js'),
  route('projects/voulez-vous', 'routes/projects.voulez-vous/route.js'),
  route('*', 'routes/$.jsx'),
];
