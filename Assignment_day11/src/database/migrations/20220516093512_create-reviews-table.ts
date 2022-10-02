

import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('reviews',(table:Knex.TableBuilder)=>{
        table.uuid('reviewId').primary().notNullable().unique();
        table.uuid('userId').references('id').inTable('users').onUpdate('CASCADE') // If Article PK is changed, update FK as well.
        .onDelete('CASCADE') ;
        table.uuid('bookId').references('id').inTable('books').onUpdate('CASCADE') // If Article PK is changed, update FK as well.
        .onDelete('CASCADE') ;
        table.string('description').nullable();
        table.string('reviewerName').nullable();
    })
}


export async function down(knex: Knex): Promise<void> {
}


