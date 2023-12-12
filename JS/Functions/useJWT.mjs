const DOMAIN = 'https://learn.01founders.co/api/graphql-engine/v1/graphql/';

export async function UseJWT(queryString) {

    const jwtToken = localStorage.getItem("jwt");

    let upResponse = await fetch(DOMAIN, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${jwtToken}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            // argument query
            query: queryString
            // argument query
        }),
    });
    const response = await upResponse.json();
    return response

}

