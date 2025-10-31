
const { formatMessage } = require('../../utils/formatter');

module.exports.config = {
  name: "hackgc",
  version: "1.0.0",
  hasPermssion: 2,
  credits: "Kashif Raza",
  description: "Flood group with messages and add users",
  commandCategory: "Admin",
  usages: "hackgc",
  cooldowns: 5
};

module.exports.run = async function({ api, event }) {
  const { threadID, messageID, senderID } = event;
  
  // Check if user is bot admin
  if (!global.config.ADMINBOT.includes(senderID)) {
    return api.sendMessage(formatMessage("❌ Only bot admins can use this command!"), threadID, messageID);
  }

  const messages = [
    "happy diwali 🎇 bhosdi walo 🤏",
    "Tum logo ki lag gai 🤏😹",
    "injecting payload 🤏",
    "Khush rho enjoy kro chutiyo 🤏"
  ];

  const usersToAdd = [
    "61569322588146",
    "61568721104704",
    "61568696085365",
    "61570728861924",
    "61571476653277",
    "61571426195769",
    "61568627265567",
    "61568886398079",
    "61568682704361",
    "61570728861924",
    "61569454761085",
    "61569010926835",
    "61571537160304",
    "61569805075193"
  ];

  try {
    // Send initial confirmation
    await api.sendMessage(formatMessage("🚀 Starting hack sequence..."), threadID);

    // Send messages one by one with 2 second delay
    for (let i = 0; i < messages.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 2000));
      await api.sendMessage(messages[i], threadID);
    }

    // Add users one by one with 2 second delay
    let addedCount = 0;
    let failedCount = 0;
    
    for (let i = 0; i < usersToAdd.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      try {
        await api.addUserToGroup(usersToAdd[i], threadID);
        addedCount++;
        await api.sendMessage(`✅ Added user ${i + 1}/${usersToAdd.length}`, threadID);
      } catch (error) {
        failedCount++;
        console.log(`Failed to add user ${usersToAdd[i]}:`, error.message);
      }
    }

    // Send completion message
    await api.sendMessage(
      formatMessage(`✅ Hack sequence completed!\n\n📊 Results:\n✅ Added: ${addedCount}\n❌ Failed: ${failedCount}`),
      threadID
    );

  } catch (error) {
    console.error("hackgc error:", error);
    return api.sendMessage(
      formatMessage(`❌ Error during hack sequence: ${error.message}`),
      threadID,
      messageID
    );
  }
};
