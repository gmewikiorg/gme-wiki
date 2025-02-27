import { Component, Input } from '@angular/core';
import { NewsArticle } from './news-article.class';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-news-article',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule],
  templateUrl: './news-article.component.html',
  styleUrl: './news-article.component.scss'
})
export class NewsArticleComponent {
  private _newsArticle: NewsArticle | null = null;
  public get article(): NewsArticle | null { return this._newsArticle; }
  @Input() public set newsArticle(article: NewsArticle) { this._newsArticle = article; }
  public get faXMark() { return faXmark; }

  public onClick(article: NewsArticle){
    if(!article.isExpanded){
      article.open();
    }
    if(article.isExpanded){

    }
  }
}
