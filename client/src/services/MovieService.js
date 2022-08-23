import axios from "axios";

export const queryFetch = async (query, page) => {
    if(query === '') {
        let response = await axios({
            method: "get",
            url: `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=fr-FR&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&without_genres=35,99,10751,36,10770,10749,10402,14&with_watch_monetization_types=flatrate`,
        });
        return response;
    } else if (query !== '') {
        let response = await axios({
            method: "get",
            url: `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=fr-FR&query=${query}&page=${page}&include_adult=false`,
        });
        return response;
    }
    
}

export const singleSearch = async (id) => {
    let response = await axios({
        method: "get",
        url: `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=fr-FR`,
    });
    return response;
}

export const getClientFilms = async () => {
    let response = await axios({
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Access-Control-Allow-Origin": process.env.REACT_APP_API_URL,
        },
        withCredentials: true,
        credentials: 'include',
        cors: true,
        method: "get",
        url: `${process.env.REACT_APP_API_URL}/getmyfilms`
    });
    return response;
}


export const addFilm = async(status, poster_path, original_title, title , overview, vote_average, id) => {
    let response = await axios({
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            data: {
                status: status,
                poster_path: poster_path,
                original_title: original_title,
                title: title,
                overview: overview,
                vote_average: vote_average,
                id: id
            },
            withCredentials: true,
            method: "post",
            url: `${process.env.REACT_APP_API_URL}/create`
    })

    return response;
}