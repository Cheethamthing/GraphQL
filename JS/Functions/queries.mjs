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


export const transactionQuery = `
            query {
                user {
                    id
                    login
                }
                transaction {
                    id
                    type
                    amount
                    userId
                    path
                }
                progress {
                    id
                    userId
                    objectId
                    grade
                }
                result {
                    id
                    objectId
                    userId
                    grade
                }
                object {
                    id
                    name
                    type
                    attrs
                }
            }
        `
