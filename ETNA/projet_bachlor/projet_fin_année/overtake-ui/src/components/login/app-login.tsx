// LoginComponent.tsx
import { Component, h, State } from '@stencil/core';
import { useAuth } from '../../Interface/auth';

@Component({
  tag: 'app-login',
  styleUrl: 'app-login.css',
})
export class AppLogin {
  @State() email: string;
  @State() password: string;

  private auth = useAuth();

  async handleSubmit(event: Event) {
    event.preventDefault();
    const success = await this.auth.login(this.email, this.password);
    if (success) {
      // Redirect or perform other actions upon successful login
    } else {
      // Handle login failure
    }
  }

  render() {
    return (
      <div class="login-container" >
        <h2 class="login-title">Welcome Back</h2>
        <form class="input-container" onSubmit={e => this.handleSubmit(e)}>
          <div class="input-name">
            <input class="login-input" type="text" placeholder="Email" value={this.email} onInput={(e: InputEvent) => (this.email = (e.target as HTMLInputElement).value)} />
            <span class="underline-animation"></span>
          </div>

          <div class="input-name">
            <input
              class="login-input"
              type="text"
              placeholder="Password"
              value={this.password}
              onInput={(e: InputEvent) => (this.password = (e.target as HTMLInputElement).value)}
            />
            <span class="underline-animation"></span>
          </div>
          <button class="login-button" type="submit">
            Login
          </button>
        </form>
      </div>
    );
  }
}
