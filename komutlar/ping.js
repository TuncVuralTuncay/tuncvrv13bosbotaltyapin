module.exports = {
    name: "ping",
    description: "Botun pingini gösterir.",
    execute(client,message, args) {
        message.channel.send(`:ping_pong: Pong! ${client.ws.ping}ms`);
    }
}
