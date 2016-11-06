import * as ReactDOM from "react-dom";
import * as React from "react";

import { ComponentsRefs } from "./../components-refs";
import { CustomComponent } from './../custom-component';
import { Http } from "./../http";
import { FeedParser } from "./../feed-parser";
import { StoredFeed } from "./../storage";

export class Feed extends CustomComponent<FeedProp, FeedState>{

    constructor(props: FeedProp) {
        super();

        this.props = props;

        this.state = {
            articles: this.props.articles,
            selected: false
        };

        this.handleSelect = this.handleSelect.bind(this);
    }

    fetch() {
        Http.get(this.props.link).then(xmlContent => {
            //this.mergeArticles(FeedParser.parse(xmlContent));
        }, error => {
            alert(`Error while fetching feed: ${error}`);
        });
    }

    render() {
        return (
            <li className={this.state.selected && "selected"} onClick={this.handleSelect} >
                <i className="fa fa-rss" aria-hidden="true"></i>
                <span className="title">{this.props.title}</span>
                <span className="notif">2</span>
            </li>
        );
    }

    handleSelect(event: React.MouseEvent<HTMLLIElement>) {
        ComponentsRefs.feedList.feedComponents.forEach(feedComponent => { feedComponent.editState({ selected: false }) });
        this.editState({ selected: true });

        ComponentsRefs.articleList.updateArticles(this.state.articles);
    }

    getStoreValue(): StoredFeed {
        return {
            uuid: this.props.uuid,
            title: this.props.title,
            link: this.props.link,
            articles: this.state.articles
        }
    }
}

export interface FeedProp {
    uuid: string;
    title: string;
    link: string;
    articles: IArticle[];
}
interface FeedState {
    articles: IArticle[];
    selected: boolean;
}

export interface IArticle {
    id: string;
    title: string;
    content: string;
    link: string;
    date: number;
    read?: boolean;
}