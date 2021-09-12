import axios from 'axios'
import Store from '../index'
import router from "../../router";

axios.defaults.baseURL = 'http://localhost:3000/api/'


axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error.response && (401 === error.response.status || 406 === error.response.status)) {
        Store.dispatch('main/logout')
    }
    return Promise.reject(error);
})

axios.interceptors.request.use(function (request) {
    const token = localStorage.getItem("jwt");
    if (token && !request.headers.Authorization) {
        request.headers.Authorization = "Bearer " + token;
    }
    return request;
})

export function signUp({dispatch}, userCredentials) {
    return axios.post('user', userCredentials).then(() => {
            dispatch("login", userCredentials)
    })
}

// eslint-disable-next-line no-empty-pattern
export function login({}, {login, password}) {
    return axios.post('user/login', {login, password}).then(async res => {
        localStorage.setItem("jwt", res.data?.accessToken)
        localStorage.setItem("id", res.data?.id)
        console.log(router)
        await router.push("/")
    })
}

// eslint-disable-next-line no-empty-pattern
export async function logout({}, {}) {
    localStorage.removeItem("jwt")
    localStorage.removeItem("id")
    console.log('logout')
    await router.push("/login")
}

// eslint-disable-next-line no-empty-pattern
export async function getUserData({}, id) {
    return axios
        .get("user/profile/" + id)
        .then(res => {
            return res.data
        });
}

// eslint-disable-next-line no-empty-pattern
export async function getUserCalendar({}, {id, dateNow, fromDate}) {
    return axios
        .get(`/time-log/report/${id}?fromDate=${fromDate}&toDate=${dateNow}`).then(res => {
            return res.data
        })
}

// eslint-disable-next-line no-empty-pattern
export async function getUserStatistics({}, id) {
    return axios
        .get(`/time-log/statistics/${id}`).then(res => {
            return res.data
        })
}

// eslint-disable-next-line no-empty-pattern
export async function getLastUserGames({}, id) {
    return axios
        .get(`/time-log/history/${id}`).then(res => {
            return res.data
        })

}

export async function loadGamesList({state},page) {
    return axios
        .get(`https://api.rawg.io/api/games?key=c6c782578cf746279aeec0e1761bd257&page=${page}&page_size=8`)
        .then(res => {
            console.log(res.data.results)
            state.gamesList = res.data.results
            state.gamesCount = res.data.count
        })
}
// eslint-disable-next-line no-empty-pattern
export async function getGamesDetails({},gameId) {
    return axios
        .get(`https://api.rawg.io/api/games/${gameId}?key=c6c782578cf746279aeec0e1761bd257`)
        .then(res => {
            console.log(res.data)
            return res.data
        })
}
// eslint-disable-next-line no-empty-pattern
export async function searchGame ({},searchItem){
    return axios
        .get(`https://api.rawg.io/api/games?key=c6c782578cf746279aeec0e1761bd257&search=${searchItem}`)
        .then(res => {
            console.log(res.data)
            return res.data
        })
}
export async function loadReleasesList ({state},startDate,endDate){
    return axios
        .get(`https://api.rawg.io/api/games?key=c6c782578cf746279aeec0e1761bd257&dates=${startDate},${endDate}`)
        .then(res => {
            console.log(res.data.results)
            state.releasesList = res.data.results
            state.releasesCount = res.data.count
        })
}