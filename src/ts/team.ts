export class Team {
    article: string;
    members: string[];
    markedForRedo: boolean;

    constructor(article: string, members: string[]) {
        this.article = article;
        this.members = members;
        this.markedForRedo = false;
    }
    
    copyData(other: Team) {
        this.article = other.article;
        this.members = other.members;
    }
}