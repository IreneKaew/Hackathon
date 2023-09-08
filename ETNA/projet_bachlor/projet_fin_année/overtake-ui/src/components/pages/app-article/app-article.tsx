import { Component, Host, h } from '@stencil/core';




@Component({
  tag: 'app-article',
  styleUrl: 'app-article.css',
  shadow: true
})
export class AppArticle {
  render() {
    return (
      <Host>

      
        
        <article-component 
          imageSrc="overtake-ui/src/assets/image/IMG-4130.jpg" 
          title="Article Title" 
          description="Description of the article goes here.">
        </article-component>

        <article-component 
          imageSrc="/path/to/your/image.jpg" 
          title="Article Two" 
          description="Description of the article goes here.">
        </article-component>

        <article-component 
          imageSrc="/path/to/your/image.jpg" 
          title="Article Three" 
          description="Description of the article goes here.">
        </article-component>

      </Host>
    );
  }
}
