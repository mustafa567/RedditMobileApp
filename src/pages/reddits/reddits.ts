import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

//services
import { RedditService } from '../../app/services/reddit.services'

//pages
import { DetailsPage } from '../details/details'

@Component({
    selector: 'reddits',
    templateUrl: 'reddits.html'
})
export class RedditsPage {

    items: any;
    category: any;
    limit: any;
    constructor(public navCtrl: NavController, private redditService: RedditService) {

        this.getDefault();
    }


    ngOnInit() {

        this.loadposts(this.category, this.limit);

    }

    getDefault() {
        if (localStorage.getItem('category') != null) {
            this.category = localStorage.getItem('category');
        } else {
            this.category = 'sports';
        }

        if (localStorage.getItem('limit') != null) {
            this.limit = localStorage.getItem('limit');
        } else {
            this.limit = 10;
        }
    }


    loadposts(category, limit) {

        this.redditService.getPosts(category, limit).subscribe(response => {
            this.items = response.data.children;
        });
    }

    viewItem(item) {

        this.navCtrl.push(DetailsPage, {
            item: item
        });
    }


    changeCategory() {

        this.loadposts(this.category, this.limit);
    }


}
