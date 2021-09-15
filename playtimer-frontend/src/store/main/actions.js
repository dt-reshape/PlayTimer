import axios from 'axios'
import Store from '../index'
import router from "../../router";

axios.defaults.baseURL = 'http://localhost:3000/api/'


axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
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

export function login(_, {login, password}) {
    return axios
        .post('user/login', {login, password})
        .then(async res => {
            localStorage.setItem("jwt", res.data?.accessToken)
            localStorage.setItem("id", res.data?.id)
            await router.push("/")
        })
        .catch(error => {
            return error.response
        })
}

export async function logout() {
    localStorage.removeItem("jwt")
    localStorage.removeItem("id")
    await router.push("/login")
}

export async function getUserData(_, id) {
    return axios
        .get("user/profile/" + id)
        .then(res => {
            return res.data
        });
}

export async function getUserCalendar(_, {id, dateNow, fromDate}) {
    return axios
        .get(`/time-log/report/${id}?fromDate=${fromDate}&toDate=${dateNow}`).then(res => {
            return res.data
        })
}

export async function getUserStatistics(_, id) {
    return axios
        .get(`/time-log/statistics/${id}`).then(res => {
            return res.data
        })
}

export async function getLastUserGames(_, id) {
    return axios
        .get(`/time-log/history/${id}`).then(res => {
            return res.data
        })

}

export async function loadGamesList({state}, {page, search}) {
    return axios
        .get(`https://api.rawg.io/api/games?key=c6c782578cf746279aeec0e1761bd257&page=${page}&page_size=8${search ? '&search=' + search : ''}`)
        .then(res => {
            state.gamesList = res.data.results
            state.gamesCount = res.data.count
        })
}

export async function getGamesDetails(_, gameId) {
    return axios
        .get(`https://api.rawg.io/api/games/${gameId}?key=c6c782578cf746279aeec0e1761bd257`)
        .then(res => {
            return res.data
        })
}

export async function loadReleasesList({state}, {page, startDate, endDate}) {
    return axios
        .get(`https://api.rawg.io/api/games?key=c6c782578cf746279aeec0e1761bd257&dates=${startDate},${endDate}&ordering=released&page=${page}`)
        .then(res => {
            state.releasesList = res.data.results
            state.releasesCount = res.data.count
        })
}

export function getGame(_, apiIdent) {
    return axios
        .get('/game/' + apiIdent)
        .then(res => {
            return res.data.id
        })
}

export function track(_, {userId, gameId, hours, date}) {
    return axios
        .post('time-log', {userId, gameId, hours, date})
        .then(() => {
        })
}
