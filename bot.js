const TelegramBot = require("node-telegram-bot-api");
const token = "5077680794:AAEzwGRTRcL0pUigkbQ-qkosWxfa_p2a9cc";
const bot = new TelegramBot(token, { polling: true });

bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  const messageText = msg.text;

  if (messageText === "/start") {
    bot.sendMessage(
      chatId,
      "Ma'lumotlarni to'g'ri shaklda to'ldiring. \n\n1. F.I.SH \n\n2. Telefon raqamingiz \n\n3. Murojaat mazmuni"
    );

    bot.once("message", (msg) => {
      bot.sendMessage(
        chatId,
        `Murojaatingiz qabul qilindi. Tez orada javob beramiz.`
      );

      const adminGroupId = "-1002066855228";

      bot.forwardMessage(adminGroupId, chatId, msg.message_id);

      // Foydalanuvchiga reply orqali habar yozish
      bot.once("message", (msg) => {
        // Foydalanuvchiga javob yozish
        bot.sendMessage(chatId, `Admin javobi: ${msg.text}`);
        bot.sendMessage(chatId, `Qayta murojaat uchun /start ni bosing`);
      });
    });
  }
});
