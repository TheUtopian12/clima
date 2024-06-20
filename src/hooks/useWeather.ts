import axios from "axios"
import { z } from 'zod'
import { SearchType } from "../types"
import { useMemo, useState } from "react"

//ZOD
const Weather = z.object({
    name: z.string(),
    main: z.object({
        temp: z.number(),
        temp_max: z.number(),
        temp_min: z.number()
    })
})

export type Weather = z.infer<typeof Weather>

export default function useWeather() {
    const [weather, setWeather] = useState<Weather>(
        {
            name: '',
            main: {
                temp: 0,
                temp_max: 0,
                temp_min: 0
            }
        }
    )

    const [loading, setLoading] = useState(false)
    const [notFound, setNotFound] = useState(false)
    const fetchWeather = async (search: SearchType) => {
        setLoading(true)
        setWeather({
            name: '',
            main: {
                temp: 0,
                temp_max: 0,
                temp_min: 0
            }
        })
        try {
            const apiKey = import.meta.env.VITE_API_KEY
            const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${apiKey}`
            const { data } = await axios.get(geoUrl)
            if (!data[0]) {
                console.log('Clima no encontrado')
                setNotFound(true)
                return
            }
            const lat = data[0].lat
            const lon = data[0].lon
            const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
            const { data: weather } = await axios.get(weatherUrl)
            const result = Weather.safeParse(weather)
            if (result.success) {
                setWeather(result.data)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }
    const hasWeatherData = useMemo(() => weather.name, [weather])
    return {
        fetchWeather,
        notFound,
        weather,
        loading,
        hasWeatherData
    }
}