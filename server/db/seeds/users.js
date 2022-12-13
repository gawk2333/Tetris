/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {
      id: 1,
      user_name: 'testuser1',
      password: '1234567',
      score: 1000,
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOlt7ImlkIjoxfV0sInVzZXJOYW1lIjoiMjMzIiwiaWF0IjoxNjcwOTAxNDE5LCJleHAiOjE2NzA5MDg2MTl9.NQvUzMc7eTKS8HsUSwdrBFM8DV53shvtXVWDDHFpdao1'
    },
    {
      id: 2,
      user_name: 'testuser2',
      password: '1234567',
      score: 2000,
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOlt7ImlkIjoxfV0sInVzZXJOYW1lIjoiMjMzIiwiaWF0IjoxNjcwOTAxNDE5LCJleHAiOjE2NzA5MDg2MTl9.NQvUzMc7eTKS8HsUSwdrBFM8DV53shvtXVWDDHFpdao2'
    },
    {
      id: 3,
      user_name: 'testuser3',
      password: '1234567',
      score: 3000,
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOlt7ImlkIjoxfV0sInVzZXJOYW1lIjoiMjMzIiwiaWF0IjoxNjcwOTAxNDE5LCJleHAiOjE2NzA5MDg2MTl9.NQvUzMc7eTKS8HsUSwdrBFM8DV53shvtXVWDDHFpdao3'
    }
  ])
}
