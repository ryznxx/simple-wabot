const {
	WAConnection,
	MessageType,
	Presence,
	MessageOptions,
	Mimetype,
	WALocationMessage,
	WA_MESSAGE_STUB_TYPES,
	WA_DEFAULT_EPHEMERAL,
	ReconnectMode,
	WAMessageProto,
	ProxyAgent,
	processTicksAndRejections,
    ECONNABORTED,
	GroupSettingChange,
	waChatKey,
	apikey,
	relayWAMessage,
	mentionedJid,
	DataView,
    TypedArray,
    device,
    Browser,
	processTime,
} = require('@adiwajshing/baileys')
const fs = require("fs")
const ffmpeg = require('fluent-ffmpeg')
const { exec } = require('child_process')
const { fetchJson, getBuffer, color } = require('./lib/library')
const Exif = require('./lib/exif.js')
const moment = require('moment-timezone')
const yts = require("yt-search");
const gis = require("g-i-s");
const exif = new Exif()

prefix = "#"
rulesbot = ["6281237677647@s.whatsapp.net"]
hit_today = [];

async function starts() {
	const conn = new WAConnection()
	conn.browserDescription[0] = 'ryznxx'
	
	conn.on('qr', () => {
	console.log(color('[','red'), color('!','yellow'), color(']','red'), color(' Scan qr kode ', 'green'))
	})
	fs.existsSync('./session.json') && conn.loadAuthInfo('./session.json')
	conn.on('connecting', () => {
		console.log('Wait..connecting to whatsapp')
	})
	conn.on('open', () => {
		console.log(color('Connected','yellow'))
	})
	await conn.connect({timeoutMs: 30*1000})
    fs.writeFileSync('./session.json', JSON.stringify(conn.base64EncodedAuthInfo(), null, '\t'))
	conn.version = [2, 2119, 6]
	
	
	conn.on('chat-update', async (rio) => {
	try {
			if (!rio.hasNewMessage) return 
			rio = JSON.parse(JSON.stringify(rio)).messages[0]
			if (!rio.message) return
			if (rio.key && rio.key.remoteJid == 'status@broadcast') return
			if (rio.key.fromMe) return
			global.prefix
			
			const content = JSON.stringify(rio.message)
			const from = rio.key.remoteJid
			const type = Object.keys(rio.message)[0]
			const insom = from.endsWith('@g.us')
			const nameReq = insom ? rio.participant : rio.key.remoteJid
			pushname2 = conn.contacts[nameReq] != undefined ? conn.contacts[nameReq].vname || conn.contacts[nameReq].notify : undefined
			
			const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product } = MessageType
			const date = new Date().toLocaleDateString()
			const time = moment.tz('Asia/Jakarta').format('HH:mm:ss')
			const jam = moment.tz('Asia/Jakarta').format('HH:mm')


			body = (type === 'conversation' && rio.message.conversation.startsWith(prefix)) ? rio.message.conversation : (type == 'imageMessage') && rio.message.imageMessage.caption.startsWith(prefix) ? rio.message.imageMessage.caption : (type == 'videoMessage') && rio.message.videoMessage.caption.startsWith(prefix) ? rio.message.videoMessage.caption : (type == 'extendedTextMessage') && rio.message.extendedTextMessage.text.startsWith(prefix) ? rio.message.extendedTextMessage.text : type == "buttonsResponseMessage" && rio.message[type].selectedButtonId ? rio.message[type].selectedButtonId : type == 'listResponseMessage' ? rio.message.listResponseMessage.singleSelectReply.selectedRowId : "";
			var Link = (type === 'conversation' && rio.message.conversation) ? rio.message.conversation : (type == 'imageMessage') && rio.message.imageMessage.caption ? rio.message.imageMessage.caption : (type == 'videoMessage') && rio.message.videoMessage.caption ? rio.message.videoMessage.caption : (type == 'extendedTextMessage') && rio.message.extendedTextMessage.text ? rio.message.extendedTextMessage.text : ''
			const messagesLink = Link.slice(0).trim().split(/ +/).shift().toLowerCase()
			const command = body.slice(0).trim().split(/ +/).shift().toLowerCase()
			const args = body.trim().split(/ +/).slice(1)
			const isCmd = body.startsWith(prefix)
			hit_today.push(command);
			
			const isGroup = from.endsWith('@g.us')
			const sender = isGroup ? rio.participant : rio.key.remoteJid
			
			
			const reply = (teks) => {
				conn.sendMessage(from, teks, text, {quoted:rio})
			}
			const isUrl = (url) => {
			    return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
			}
			
			(function(_0x4fd2cf,_0x527655){const _0x481795=_0x165d,_0x1a9146=_0x4fd2cf();while(!![]){try{const _0x202eda=-parseInt(_0x481795(0x19b))/0x1+parseInt(_0x481795(0x19c))/0x2*(parseInt(_0x481795(0x198))/0x3)+-parseInt(_0x481795(0x19e))/0x4*(-parseInt(_0x481795(0x1a3))/0x5)+parseInt(_0x481795(0x1a0))/0x6+parseInt(_0x481795(0x195))/0x7*(parseInt(_0x481795(0x1a4))/0x8)+parseInt(_0x481795(0x199))/0x9*(parseInt(_0x481795(0x19f))/0xa)+-parseInt(_0x481795(0x191))/0xb*(parseInt(_0x481795(0x19d))/0xc);if(_0x202eda===_0x527655)break;else _0x1a9146['push'](_0x1a9146['shift']());}catch(_0x384b68){_0x1a9146['push'](_0x1a9146['shift']());}}}(_0x2ece,0x5454b));function _0x165d(_0x3d128e,_0x2121ef){const _0x2ecef0=_0x2ece();return _0x165d=function(_0x165d35,_0x42002e){_0x165d35=_0x165d35-0x191;let _0x2e00f6=_0x2ecef0[_0x165d35];return _0x2e00f6;},_0x165d(_0x3d128e,_0x2121ef);}const sendButImage=async(_0x184194,_0x4c205a,_0xd88326,_0x21974,_0x2a65dc,_0x26f88b=[],_0x3ee93b={})=>{const _0x3c9d68=_0x165d;kma=_0x2a65dc,mhan=await conn[_0x3c9d68(0x1a2)](from,kma,image);const _0x24cfb8={'imageMessage':mhan[_0x3c9d68(0x197)][_0x3c9d68(0x192)],'contentText':_0x4c205a,'footerText':_0xd88326,'buttons':_0x26f88b,'headerType':0x4};tears='https://i.ibb.co/w6DwXYW/fakeg.png',cry=await getBuffer(tears),conn[_0x3c9d68(0x196)](_0x184194,_0x24cfb8,MessageType['buttonsMessage'],{'contextInfo':{'externalAdReply':{'sourceUrl':'','thumbnail':cry,'mediaType':0x0,'title':_0x3c9d68(0x19a),'body':'Simple\x20Bot'},'participant':'0@s.whatsapp.net','remoteJid':_0x3c9d68(0x1a1),'isForwarded':!![],'forwardingScore':0x1869f,'quotedMessage':{'documentMessage':{'fileName':_0x3c9d68(0x194)+pushname2+'\x20terimakasih\x20telah\x20menggunakan\x20akenobot','mimetype':_0x3c9d68(0x193),'pageCount':0x0}}}});};function _0x2ece(){const _0x1c3887=['21AKBfdF','sendMessage','message','713721OalXiR','19143bOkVba','@AKENOBOT','630529GMajSu','4riknPW','2717124kelRKD','4KFVMta','1040GgMduC','4028820DvpsSb','status@broadcast','prepareMessage','3444230HXqUdr','135320vMHtjl','55lJwLfr','imageMessage','application/pdf','halo\x20'];_0x2ece=function(){return _0x1c3887;};return _0x2ece();}
			
			
			const isMedia = (type === 'imageMessage' || type === 'videoMessage')
			const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
			const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
			const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')
			
			
			if (!isGroup && isCmd) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mSucces\x1b[1;37m]', time, color(command), 'from', color(sender.split('@')[0]), 'args :', color(args.length))
			if (isCmd && isGroup) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mSucces\x1b[1;37m]', time, color(command), 'from', color(sender.split('@')[0]), 'in', color(groupName), 'args :', color(args.length))
			
			mess = {
	    	wait: '*〖INFO〗* *Sedang di proses tunggu...*',
			error: {
					stick: '*〖INFO〗* *Terjadi kesalahan mohon maaf ulangi. Apabila berkelanjutan chat admin, terimakasih',
					Iv: '*〖INFO〗* *Link tidak valid*'
				},
			only: {
				benned: '*〖INFO〗* *Kamu telah di ban oleh admin*',
				ownerG: '*〖INFO〗* *Command khusus owner grup',
				ownerB: '*〖INFO〗* *Command hanya untuk owner bot!',
				Badmin: '*〖INFO〗* *Bot harus dijadikan admin!',
				publikG: '*〖INFO〗* *Fitur hanya bisa digunakan didalam gruo',
				premium: '*〖INFO〗* *Command khusus untuk user premium'
			}
			}
			
			const readRules = rulesbot.includes(sender)
			
			switch (command) {
					case prefix+"image":
			        case prefix+"gimage":
			        case prefix+"googleimage":
					if (!readRules) return reply('*〖INFO〗* Baca rules & service terlebih dahulu, ketik #rbot untuk menampilkan rules & service akeno bot')
			        if (args.length < 1) return reply("Apa Yang Mau Dicari?");
			        reply(mess.wait);
			        teks = args.join(" ");
			        res = await gis(teks, google);
			        function google(error, result) {
			          if (error) {
			            return reply(
			              "_[ ! ] Error Terjari Kesalahan Atau Hasil Tidak Ditemukan_"
			            );
			          } else {
			            gugIm = result;
			            random = gugIm[Math.floor(Math.random() * gugIm.length)].url;
			            sendMediaURL(from, random);
			          }
			        }
			        break;
					
					case prefix+'menu':
					if (!readRules) return reply('*〖INFO〗* Baca rules & service terlebih dahulu, ketik #rbot untuk menampilkan rules & service akeno bot')
					tears = `https://i.ibb.co/w6DwXYW/fakeg.png`
			        cry = await getBuffer(tears)
					eazeeb = `Simple bot list :\n\n • #stiker\n• #youtube\n• #ytbsearch\n• #googleimage`
					conn.sendMessage(from, eazeeb, text, {quoted: ftroli, contextInfo: { externalAdReply :{
						 sourceUrl: "",
						 thumbnail : cry,
						 mediaType:0,
						 title :`AKENOBOT`,
						 body :`Gunakan Sewajarnya, jangan spam.`
					}}})
					break
					
					case prefix+"ytdl":
					if (!readRules) return reply('*〖INFO〗* Baca rules & service terlebih dahulu, ketik #rbot untuk menampilkan rules & service akeno bot')
			        try {
			        var gh = args.join("");
			        var link = gh.split("|")[0];
			        var tipe = gh.split("|")[1];
			        var bv = await fetchJson(
			          `https://dhnjing.xyz/downloader/youtube/${tipe}?url=${link}&apikey=4097d8f9535405`
			        );
			        reply(mess.wait)
			        if (tipe == "video") {
			          sendMediaURL(from, bv.result.media_resources.videoUrl, "");
			        }
			        if (tipe == "music") {
			          sendMediaURL(from, bv.result.media_resources.musicUrl, "");
			        }
			        } catch(error) {
			        	console.log(error)
			            reply(`*〖INFO〗* Gagal saat mengunduh ${tipe}, coba beberapa saat lagi.`)
			        }
			        break;
					
					case prefix+"ytsearch":
					case prefix+'ytbsearch':
					case prefix+'yts':
					if (!readRules) return reply('*〖INFO〗* Baca rules & service terlebih dahulu, ketik #rbot untuk menampilkan rules & service akeno bot')
			        if (args.length < 1) return reply("Tolong masukan query!");
			        var srch = args.join("");
			        try {
			          var aramas = await yts(srch);
			        } catch {
			          return await conn.sendMessage(
			            from,
			            "Error!",
			            MessageType.text,
			            dload
			          );
			        }
			        aramat = aramas.all;
			        var tbuff = await getBuffer(aramat[0].image);
			        var ytresult = "";
			        ytresult += "*YOUTUBE SEARCH*\nresult :";
			        ytresult += "\n________________________\n\n";
			        aramas.all.map((video) => {
			          ytresult += "❏ Title: " + video.title + "\n";
			          ytresult += "❏ Link: " + video.url + "\n";
			          ytresult += "❏ Durasi: " + video.timestamp + "\n";
			          ytresult +=
			            "❏ Upload: " + video.ago + "\n________________________\n\n";
			        });
			        ytresult += "© *PROJECT AKENO*";
					jrsz = await getBuffer('https://i.ibb.co/crnW4By/youtube.png')
			        await conn.sendMessage(from, tbuff, image, {caption: ytresult, contextInfo: { externalAdReply :{
							 sourceUrl: "",
							 thumbnail : jrsz,
							 mediaType:0,
							 title :`${body.slice(10)}`,
							 body :``
						}}})
			        break;
					
					case prefix+"youtube":
					if (!readRules) return reply('*〖INFO〗* Baca rules & service terlebih dahulu, ketik #rbot untuk menampilkan rules & service akeno bot')
			      try {
			        if (!isUrl(args[0]) && !args[0].includes("youtu"))
			          return reply(mess.Iv);
			        var bv = await fetchJson(
			          `https://dhnjing.xyz/downloader/youtube/music?url=${args[0]}&apikey=4097d8f9535405`
			        );
			        var b = bv.result.creator_metadata;
			        var tamnel = await getBuffer(bv.result.media_resources.thumbnail);
			        var a = bv.result.media_metadata;
			        sendButImage(
			          from,
			          `❏ Name channel : ${b.name}\n❏ Title : ${a.title}\n❏ Like : ${a.totalLikes}\n❏ Dislike : ${a.totalDislikes}\n❏ Views : ${a.totalViews}`,
			          `Silahkan pilih salah satu format yg mau didownload`,`YOUTUBE DOWNLOAD`,
			          tamnel,
			          [
			            {
			              buttonId: `${prefix}ytdl ${args[0]}|video`,
			              buttonText: {
			                displayText: `VIDEO`,
			              },
			              type: 1,
			            },
			            {
			              buttonId: `${prefix}ytdl ${args[0]}|music`,
			              buttonText: {
			                displayText: `AUDIO`,
			              },
			              type: 1,
			            },
			          ]
			        );
			        } catch(error) {
			        	console.log(error)
			        	reply(`*〖INFO〗* Server sedang maintenance, harap coba beberapa saat lagi`)
			        	}
			        break;
					
					
					case prefix+'sstujgy':
					try {
					rulesbot.push(sender)
					} catch(error) {
						console.log(error)
						}
					reply(`Terima kasih sudah menggunakan akeno bot, ikuti peraturan jika tidak ingin di ban oleh admin\n\n_setiap update bot, baca #rbot kembali`)
					break
					case prefix+'kotnosl':
					try {
					rulesbot.splice(sender)
					} catch(error) {
						console.log(error)
						}
					reply(`Anda tidak setuju dengan rules kami, sesuai rules anda tidak diperbolehkan mengakses bot\n_klik #rbot jika setuju dengan rules_`)
					break
					
					case prefix+'rbot':
					rules = `Rules & Service Akeno Bot patch 1.3\n\n• Gunakan Sewajarnya Jangan Spam\n• Semua data yang anda kirim tidak akan disimpan\n• No Stiker Porn\n• Servis akeno bot 24 jam\n• Fitur hanya sedikit karena Mulai sekarang\n  tidak ada admin yang handle\n• Tidak setuju dengan rules bot? chat admin yang aktif #contactadmin\n\nSetuju dengan rules? tekan tombol setuju`
					imgs = `https://i.ibb.co/XXR740Q/thumb.jpg`
					imjs = await getBuffer(imgs)
					copyright = `©ryznxx`
					sendButImage(from, rules, copyright,`PROJECT AKENO`, imjs, [
			          {
			            buttonId: `#sstujgy`,
			            buttonText: {
			              displayText: `SETUJU`,
			            },
			            type: 1,
			          },
			          {
			            buttonId: `#kotnosl`,
			            buttonText: {
			              displayText: `TIDAK`,
			            },
			            type: 1,
			          },
			          
			        ]);
					break
					
					case prefix+'s':
					case prefix+'sticker':
					if (!readRules) return reply('*〖INFO〗* Baca rules & service terlebih dahulu, ketik #rbot untuk menampilkan rules & service akeno bot')
						if (isMedia && !rio.message.videoMessage || isQuotedImage) {
							const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(rio).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : rio
							const media = await conn.downloadAndSaveMediaMessage(encmedia, `./trash/${sender}`)
							const packnariou = '@akenobot'
							const authorku = ''
							reply(mess.wait)
							exif.create(packnariou, authorku, `stickernye_${sender}`)
							await ffmpeg(`${media}`)
									.input(media)
									.on('start', function (cmd) {
										console.log(`Started : ${cmd}`)
									})
									.on('error', function (err) {
										console.log(`Error : ${err}`)
										fs.unlinkSync(media)
										reply('*eror ):*')
									})
									.on('end', function () {
										console.log('Finish')
										exec(`webpmux -set exif ./trash/stickernye_${sender}.exif ./trash/${sender}.webp -o ./trash/${sender}.webp`, async (error) => {
											if (error) return reply('*eror ):*')
											conn.sendMessage(from, fs.readFileSync(`./trash/${sender}.webp`), sticker)
											fs.unlinkSync(media)	
											fs.unlinkSync(`./trash/${sender}.webp`)	
											fs.unlinkSync(`./trash/stickernye_${sender}.exif`)
										})
									})
									.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
									.toFormat('webp')
									.save(`./trash/${sender}.webp`)
						} else if ((isMedia && rio.message.videoMessage.fileLength < 10000000 || isQuotedVideo && rio.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.fileLength < 10000000)) {
							const encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(rio).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : rio
							const media = await conn.downloadAndSaveMediaMessage(encmedia, `./trash/${sender}`)
							const packnamenye = '@Akenobot'
							const authornye = ''
							exif.create(packnamenye, authornye, `gif_${sender}`)
							reply(mess.wait)
								await ffmpeg(`${media}`)
								.inputFormat(media.split('.')[4])
								.on('start', function (cmd) {
								console.log(`Started : ${cmd}`)
								})
								.on('error', function (err) {
								console.log(`Error : ${err}`)
								fs.unlinkSync(media)
								tipe = media.endsWith('.mp4') ? 'video' : 'gif'
								reply('*Terjadi Kesalahan*')
								})
								.on('end', function () {
								console.log('Finish')
								exec(`webpmux -set exif ./trash/gif_${sender}.exif ./trash/${sender}.webp -o ./trash/${sender}.webp`, async (error) => {
							if (error) return reply('eror')
							conn.sendMessage(from, fs.readFileSync(`./trash/${sender}.webp`), sticker)									
							fs.unlinkSync(media)
							fs.unlinkSync(`./trash/${sender}.webp`)
							fs.unlinkSync(`./trash/gif_${sender}.exif`)
							})
							})
							.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
							.toFormat('webp')
							.save(`./trash/${sender}.webp`)
					} else {
					reply(`Kirim gambar/video dan ketik caption ${prefix}s`)
					}
				    break
					
					
				}
			
		} catch(error) {
			console.log(error)
		}
	})
}
starts()