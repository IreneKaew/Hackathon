import { Component, h } from '@stencil/core';

@Component({
  tag: 'navigate-menu',
  styleUrl: 'navigate-menu.css',
})
export class NavigateMenu {

  render() {
    return (
      <nav>
        <ul class="menu-items">
          <li><menu-component text="Home" url="/" /></li>
          <li><menu-component text="Article" url="/article" /></li>
          <li><menu-component text="About Us" url="/about" /></li>
          <li><menu-component text="Contact" url="/contact" /></li>
          <li><menu-component text="Login" url="/login" /></li>
        </ul>
      </nav>
    );
  }

}
