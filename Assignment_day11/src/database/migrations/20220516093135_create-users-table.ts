import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('users',(table:Knex.TableBuilder)=>{
        table.uuid('id').primary().notNullable().unique();
        table.string('firstname').nullable();
        table.string('lastname').nullable();
        table.string('mail').nullable();
        table.string('password').nullable();
    })
}


export async function down(knex: Knex): Promise<void> {
}

