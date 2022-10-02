
export interface IFeed {
    author: IUser,
    book: IBook,
    reviews: IReview[]
}
export interface IReview {
    description: string,
    bookId: string,
    reviewerName: string,
    reviewId: string,
    reviewerDetails: IUser
}
export interface IBook {
    bookName: string,
    authorName: string,
    pages: number,
    description: string,
    id: string,
    bookImage: string,
    authorId: string,
}
export interface IUser {
    id: string;
    firstname: string;
    lastname: string;
}