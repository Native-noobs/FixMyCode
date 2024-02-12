export function sendToTelegram(message: string) {
    fetch("https://api.telegram.org/bot" + process.env.NEXT_APP_TELEGRAM_BOT_TOKEN + "/sendMessage", {
        method: "POST",
        body: JSON.stringify({
            chat_id: process.env.NEXT_APP_CHAT_ID,
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
