'use client'

const apiPostRequest = async (urlKMeans, data) => {


    console.log(urlKMeans)
    try {
        const response = await fetch(urlKMeans, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
            mode: 'no-cors'
        });

        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }

        return response;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

export const exportFunctionDataForKMeans = (urlKMeans, data) => {
    return (
        apiPostRequest(urlKMeans, data)
    )
};