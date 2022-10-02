import { IBook, IFeed, IReview, IUser } from "../models/Ifeeds";


export const feed = async (book: any, user: any, review: any) => {
    let feeds: any = {}
    feeds.data = []
    book.forEach((bookObj: any) => {
        let feed: any = {};
        const ArrayIReview: any[] = [];
        const bookO: IBook = {
            bookName: bookObj.bookName,
            authorName: bookObj.authorName,
            pages: bookObj.pages,
            description: bookObj.description,
            id: bookObj.id,
            bookImage: bookObj.bookImage,
            authorId: bookObj.authorId,
        }
        feed.bookData = bookO;
        user.forEach((userObj: any) => {
            if (userObj.id===bookObj.authorId){

                const userO: IUser = {
                    id: userObj.id,
                    firstname: userObj.firstname,
                    lastname: userObj.lastname
                }
                feed.authorData = userO;
            }
            if (userObj.id === bookObj.authorId && userObj.id===bookObj.authorId) {
                review.forEach((reviewObj: any) => {
                    if (reviewObj[0] === []) {
                        ArrayIReview.push([]);
                        feed.reviewData = ArrayIReview;
                    }
                    if (reviewObj[0] !== [] && reviewObj[0].bookId === bookObj.id) {
                        reviewObj.forEach((each: any) => {
                            const reviewO: IReview = {
                                description: each.description,
                                bookId: each.bookId,
                                reviewerName: each.reviewerName,
                                reviewId: each.reviewId,
                                reviewerDetails: {
                                    id: each.reviewerDetails.id,
                                    firstname: each.reviewerDetails.firstname,
                                    lastname: each.reviewerDetails.lastname
                                }
                            }
                            ArrayIReview.push(reviewO)
                            feed.reviewData = ArrayIReview;
                        })

                    }
                });
            }

        });
        const feedO: IFeed = {
            author: feed.authorData,
            book: feed.bookData,
            reviews: feed.reviewData
        }
        feeds.data.push(feedO)
    });
    return feeds
}