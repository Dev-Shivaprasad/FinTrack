export function Vibrate(sec: number = 250) {
    navigator.vibrate(sec)
}


export function GetCurrentDateTimeWithSecondsInString() {
    const now = new Date()
    const date = now.getDate()
    const month = now.getMonth() + 1
    const year = now.getFullYear()
    let hr = now.getHours()
    const min = now.getMinutes().toString().padStart(2, '0')
    const sec = now.getSeconds().toString().padStart(2, '0')
    const ms = now.getMilliseconds().toString().padStart(3, '0')

    const period = hr >= 12 ? 'pm' : 'am'
    hr = hr % 12 || 12

    return `(${date}-${month}-${year})  ${hr}:${min}:${sec}.${ms} ${period}`
}