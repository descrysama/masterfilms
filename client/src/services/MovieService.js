import axios from "axios";

export const queryFetch = async (query, page) => {
    if(query == '') {
        let response = await axios({
            method: "get",
            url: `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=fr-FR&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&without_genres=35,99,10751,36,10770,10749,10402,14&with_watch_monetization_types=flatrate`,
        });
        return response;
    } else if (query != '') {
        let response = await axios({
            method: "get",
            url: `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=fr-FR&query=${query}&page=${page}&include_adult=false`,
        });
        return response;
    }
    
}

