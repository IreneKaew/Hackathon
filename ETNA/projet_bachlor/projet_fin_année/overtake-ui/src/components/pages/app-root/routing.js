
import { createRouter } from '@stencil/router-v2';

export const Router = createRouter();

Router.register('/', 'app-home');
Router.register('/login', 'app-login');
Router.register('/protected', 'app-protected');
Router.register('/article', 'app-article');
