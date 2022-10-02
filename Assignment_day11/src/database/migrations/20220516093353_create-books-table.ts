
import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('books',(table:Knex.TableBuilder)=>{
        table.string('bookName').nullable();
        table.string('authorName').nullable();
        table.integer('pages');
        table.string('description').nullable();
        table.uuid('id').primary().notNullable().unique();
        table.string('bookImage').nullable();
        table.uuid('authorId').references('id').inTable('users').onUpdate('CASCADE') // If Article PK is changed, update FK as well.
        .onDelete('CASCADE') ;
        })
}


export async function down(knex: Knex): Promise<void> {
}

