export default function ({ $axios }) {
    $axios.onRequest((config) => {

        let token = localStorage && localStorage.getItem('token')
        if (token) {
            config.headers.common['Authorization'] = `Bearer ${token}`
        }
    })
}