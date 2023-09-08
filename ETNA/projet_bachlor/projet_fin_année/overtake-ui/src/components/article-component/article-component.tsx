import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'article-component',
  styleUrl: 'article-component.css',
  shadow: true,
})
export class ArticleComponent {

  @Prop() imageSrc: string;
  @Prop() title: string;
  @Prop() description: string;

  render() {
    return (
  
      <div class="article-container">
        <div class="image-container">
          <img src={this.imageSrc} alt={this.title} />
        </div>
        <div class="content">
          <h2>{this.title}</h2>
          <p>{this.description}</p>
        </div>
      </div>
    );
  }
}
