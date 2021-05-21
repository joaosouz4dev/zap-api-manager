const main = require('../controllers/main')

module.exports = router => {
    router.get('/', ctx => {
        ctx.body = 'OK'
    })
    .post('/whatsapp/connect', async ctx => {
        main.connect(ctx)
        ctx.body = {"result": 200, "status": "CONNECTING"}

    })
    .post('/whatsapp/disconnect', async ctx => {     
        await main.disconnect(ctx)
    })
    .post('/whatsapp/send/text', async ctx =>{
        await main.sendText(ctx)
    })
    .post('/whatsapp/send/image', async ctx =>{
        await main.sendImage(ctx)
    })
    .post('/whatsapp/send/sticker', async ctx =>{
        await main.sendSticker(ctx)
    })
    .post('/whatsapp/send/voice', async ctx =>{
        await main.sendVoice(ctx)
    })
    .post('/whatsapp/send/voicebase64', async ctx =>{
        await main.sendVoiceBase64(ctx)
    })
    .post('/whatsapp/send/video', async ctx =>{
        await main.sendVideo(ctx)
    })
    .post('/whatsapp/send/audio', async ctx =>{
        await main.sendAudio(ctx)
    })
    .post('/whatsapp/send/ptt', async ctx =>{
        await main.sendPtt(ctx)
    })
    .post('/whatsapp/send/file', async ctx =>{
        await main.sendFile(ctx)
    })
    .post('/whatsapp/send/link', async ctx =>{
        await main.sendLink(ctx)
    })
    .post('/whatsapp/send/contact', async ctx =>{
        await main.sendContact(ctx)
    })
    .post('/whatsapp/send/location', async ctx =>{
        await main.sendLocation(ctx)
    })
    .post('/whatsapp/batterylevel', async ctx =>{
        await main.getBatteryLevel(ctx)
    })
    .post('/whatsapp/allcontacts', async ctx =>{
        await main.getAllContacts(ctx)
    })
    .post('/whatsapp/blocklist', async ctx =>{
        await main.getBlockList(ctx)
    })
    .post('/whatsapp/messageschat', async ctx => {
        await main.getMessagesChat(ctx)
    })
    .post('/whatsapp/profilepic', async ctx => {
        await main.getProfilePic(ctx)
    })
    .post('/whatsapp/verifynumber', async ctx => {
        await main.verifyNumber(ctx)
    })
    .post('/whatsapp/allgroups', async ctx => {
        await main.getAllGroups(ctx)
    })
    .post('/whatsapp/joingroup', async ctx => {
        await main.joinGroup(ctx)
    })
    .post('/whatsapp/creategroup', async ctx => {
        await main.createGroup(ctx)
    })
    .post('/whatsapp/leavegroup', async ctx => {
        await main.leaveGroup(ctx)
    })
    .post('/whatsapp/groupmembers', async ctx => {
        await main.getGroupMembers(ctx)
    })
    .post('/whatsapp/addparticipant', async ctx => {
        await main.addParticipant(ctx)
    })
    .post('/whatsapp/removeparticipant', async ctx => {
        await main.removeParticipant(ctx)
    })
    .post('/whatsapp/promoteparticipant', async ctx => {
        await main.promoteParticipant(ctx)
    })
    .post('/whatsapp/demoteparticipant', async ctx => {
        await main.demoteParticipant(ctx)
    })
    .post('/whatsapp/groupadmins', async ctx => {
        await main.getGroupAdmins(ctx)
    })
    .post('/whatsapp/groupinvitelink', async ctx => {
        await main.getGroupInviteLink(ctx)
    })
    .post('/whatsapp/deletechat', async ctx => {
        await main.deleteChat(ctx)
    })
    .post('/whatsapp/clearchat', async ctx => {
        await main.clearChat(ctx)
    })
    .post('/whatsapp/archivechat', async ctx => {
        await main.archiveChat(ctx)
    })
    .post('/whatsapp/deletemessage', async ctx => {
        await main.deleteMessage(ctx)
    })
    .post('/whatsapp/markunseencontact', async ctx => {
        await main.markUnseenMessage(ctx)
    })
    .post('/whatsapp/blockcontact', async ctx => {
        await main.blockContact(ctx)
    })
    .post('/whatsapp/unblockcontact', async ctx => {
        await main.unblockContact(ctx)
    })
    .post('/whatsapp/numberprofile', async ctx => {
        await main.getNumberProfile(ctx)
    })
    .post('/whatsapp/connectionstate', async ctx => {
        await main.getConnectionState(ctx)
    })
    .post('/whatsapp/gethostdevice', async ctx => {
        await main.getHostDevice(ctx)
    })
    .post('/whatsapp/reply', async ctx => {
        await main.reply(ctx)
    })
    .post('/whatsapp/forwardMessages', async ctx => {
        await main.forwardMessages(ctx)
    })

    .post('/whatsapp/addstatustext', async ctx => {
        await main.addStatusText(ctx)
    })
    .post('/whatsapp/addstatusimage', async ctx => {
        await main.addStatusImage(ctx)
    })
    .post('/whatsapp/addstatusvideo', async ctx => {
        await main.addStatusVideo(ctx)
    })
    .post('/whatsapp/set/image/group', async ctx =>{
        await main.setGroupPic(ctx)
    })
}

