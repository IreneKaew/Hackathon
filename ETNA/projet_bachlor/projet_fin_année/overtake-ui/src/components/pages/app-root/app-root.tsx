
import { Component, h } from '@stencil/core';
import { useAuth } from '../../../Interface/auth';

@Component({
  tag: 'app-root',
})
export class AppRoot {

  // private auth = useAuth();

  render() {
    const isLoginPage = window.location.pathname === '/login';
    return (
      <div>
        {!isLoginPage && <navigate-menu></navigate-menu>}
        <main>
          <stencil-router>
            <stencil-route-switch scrollTopOffset={0}>
              <stencil-route url="/" component="app-home" exact={true} />
              <stencil-route url="/login" component="app-login" />
              <stencil-route url="/protected" component="app-protected" />
              <stencil-route url="/article" component="app-article" />
            </stencil-route-switch>
          </stencil-router>
        </main>
      </div>
    );
  }
}

