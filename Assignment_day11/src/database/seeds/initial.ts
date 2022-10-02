import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    await knex("authors").del();


    await knex("authors").insert([
        {
            "id":"60656eb1-04ab-4623-ac64-1267cdf2023e",
            "firstname":"Anudeeps Naga",
            "lastname":"lakanavarapu",
            "mail":"anudeepss@gmail.com",
            "password":"coolcooll"
        }
    ])
    // Deletes ALL existing entries
    await knex("books").del();

    // Inserts seed entries
    await knex("books").insert([
        {
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
        }
    ]);
};
