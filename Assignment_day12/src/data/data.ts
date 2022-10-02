import { IBook, IReview, IUser } from "../models/Ifeeds"

export let reviews:IReview[]
export let authorDetails:IUser[]
export let books:IBook[]
reviews=[{

    "description": "nice and cool harry potter 9",
    "bookId": "2b5fccf9-f6a2-440e-8de8-63723d610a75",
    "reviewerName": "Anudeeps Naga",
    "reviewId": "410f8eaf-af87-4f83-9aa3-619c3843ad24",
    "reviewerDetails": {
        "id": "60656eb1-04ab-4623-ac64-1267cdf2023e",
        "firstname": "Anudeeps Naga",
        "lastname": "lakanavarapu"
    }
}, {

    "description": "nice and cool harry potter 10",
    "bookId": "493d30e2-d3a6-45dd-9b2f-c4a584fc1f04",
    "reviewerName": "Anudeeps Naga",
    "reviewId": "db134245-230d-4009-aa94-249b230ab8ba",
    "reviewerDetails": {
        "id": "60656eb1-04ab-4623-ac64-1267cdf2023e",
        "firstname": "Anudeeps Naga",
        "lastname": "lakanavarapu"
    }
}


]
 authorDetails=[{
    "id": "60656eb1-04ab-4623-ac64-1267cdf2023e",
    "firstname": "Anudeeps Naga",
    "lastname": "lakanavarapu"
}]


 books=[{
    "bookName": "potter part 9",
    "authorName": "Jk rowlings",
    "pages": 3000,
    "description": "witch story",
    "id": "2b5fccf9-f6a2-440e-8de8-63723d610a75",
    "bookImage": "/a/a/a",
    "authorId": "60656eb1-04ab-4623-ac64-1267cdf2023e"
}, {
    "bookName": "potter part 10",
    "authorName": "Jk rowlings",
    "pages": 3000,
    "description": "witch story",
    "id": "493d30e2-d3a6-45dd-9b2f-c4a584fc1f04",
    "bookImage": "/a/a/a",
    "authorId": "60656eb1-04ab-4623-ac64-1267cdf2023e"
}]


export let feeds={  "data": [
    {
        "author": {
            "id": "60656eb1-04ab-4623-ac64-1267cdf2023e",
            "firstname": "Anudeeps Naga",
            "lastname": "lakanavarapu"
        },
        "book": {
            "bookName": "potter part 9",
            "authorName": "Jk rowlings",
            "pages": 3000,
            "description": "witch story",
            "id": "2b5fccf9-f6a2-440e-8de8-63723d610a75",
            "bookImage": "/a/a/a",
            "authorId": "60656eb1-04ab-4623-ac64-1267cdf2023e"
        },
        "reviews": [
            {
                "description": "nice and cool harry potter 9",
                "bookId": "2b5fccf9-f6a2-440e-8de8-63723d610a75",
                "reviewerName": "Anudeeps Naga",
                "reviewId": "410f8eaf-af87-4f83-9aa3-619c3843ad24",
                "reviewerDetails": {
                    "id": "60656eb1-04ab-4623-ac64-1267cdf2023e",
                    "firstname": "Anudeeps Naga",
                    "lastname": "lakanavarapu"
                }
            },
            {
                "description": "nice and cool harry potter 10",
                "bookId": "493d30e2-d3a6-45dd-9b2f-c4a584fc1f04",
                "reviewerName": "Anudeeps Naga",
                "reviewId": "db134245-230d-4009-aa94-249b230ab8ba",
                "reviewerDetails": {
                    "id": "60656eb1-04ab-4623-ac64-1267cdf2023e",
                    "firstname": "Anudeeps Naga",
                    "lastname": "lakanavarapu"
                }
            }
        ]
    },
    {
        "author": {
            "id": "60656eb1-04ab-4623-ac64-1267cdf2023e",
            "firstname": "Anudeeps Naga",
            "lastname": "lakanavarapu"
        },
        "book": {
            "bookName": "potter part 10",
            "authorName": "Jk rowlings",
            "pages": 3000,
            "description": "witch story",
            "id": "493d30e2-d3a6-45dd-9b2f-c4a584fc1f04",
            "bookImage": "/a/a/a",
            "authorId": "60656eb1-04ab-4623-ac64-1267cdf2023e"
        },
        "reviews": [
            {
                "description": "nice and cool harry potter 9",
                "bookId": "2b5fccf9-f6a2-440e-8de8-63723d610a75",
                "reviewerName": "Anudeeps Naga",
                "reviewId": "410f8eaf-af87-4f83-9aa3-619c3843ad24",
                "reviewerDetails": {
                    "id": "60656eb1-04ab-4623-ac64-1267cdf2023e",
                    "firstname": "Anudeeps Naga",
                    "lastname": "lakanavarapu"
                }
            },
            {
                "description": "nice and cool harry potter 10",
                "bookId": "493d30e2-d3a6-45dd-9b2f-c4a584fc1f04",
                "reviewerName": "Anudeeps Naga",
                "reviewId": "db134245-230d-4009-aa94-249b230ab8ba",
                "reviewerDetails": {
                    "id": "60656eb1-04ab-4623-ac64-1267cdf2023e",
                    "firstname": "Anudeeps Naga",
                    "lastname": "lakanavarapu"
                }
            }
        ]
    }
]
}
