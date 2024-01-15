// nested query
export const usernameQuery = `
query {
    user {
        login
    } result {
        id
        user {
          id
          login
        }
      }
    
}
`


// arguments query
export const auditUpQuery = `
query {
    transaction(where: { type: { _eq: "up" } }) {
        id
        type
        amount
        userId
    }
}
`

// arguments query
export const auditDownQuery =
    `
query {
    transaction(where: { type: { _eq: "down" } }) {
        id
        type
        amount
        userId
    }
}
`

// simple query
// Trying to limit query to just transactions that contain "skill_" was unsuccessful 
export const skillsQuery =
    `
    query {
        transaction {
          id
          type
          amount
          userId
        }
      }   
`

// simple query, that also uses an argument
export const levelQuery =
    `
    query {
        transaction(where: { type: { _eq: "level" } }) {
          id
          type
          amount
          userId
        }
      }   
`

// argument query
export const xpQuery =  `query{
  transaction(where: {_and: [
      {path: {_like: "%div-01%"}},
      {path: {_nlike: "%div-01/piscine-js-up/%"}},
  ],type :{_eq : "xp"}}){
      amount
      createdAt
  }
  } `;
