// simple query
export const usernameQuery = `
query {
    user {
        login
    }
}
`


// arguments queries
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

// `
// query {
//     transaction(where: { type: { _eq: "down" }) {
//         id
//         type
//         amount
//         userId
//     }
// }
// `