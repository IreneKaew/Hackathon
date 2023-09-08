import { Component, h, Prop, State, Watch } from '@stencil/core';

@Component({
  tag: 'menu-component',
  styleUrl: 'menu-component.css',
  shadow: true,
})
export class MenuComponent {

  @Prop() text: string;
  @Prop() url: string;
  @State() isActive: boolean = false;

  @Watch('isActive')
  handleActiveChange() {
    // Check if this menu item should be active based on the current URL
    const currentPath = window.location.pathname;
    this.isActive = currentPath === this.url;
  }

  render() {

    const itemClass = this.isActive ? 'menu-item active' : 'menu-item';

    return (
      <li class={itemClass}>
        <stencil-route-link url={this.url}>{this.text}</stencil-route-link>
      </li>
    );
   
  }
}
