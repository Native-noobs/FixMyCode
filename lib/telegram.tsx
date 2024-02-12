export function sendToTelegram(message: string) {
    fetch("https://api.telegram.org/bot1776989865:AAE44uMgmtGYhmSWcZy165cPfVOs6-7O_54/sendMessage", {
        method: "POST",
        body: JSON.stringify({
            chat_id: "836696307",
            text: message,
            'parse_mode': 'Markdown'
        }),
        headers: {
            "Content-type": "application/json"
        }
    }).then(res => res.json())
        .then(data => {
            console.log(data);
        })
}
