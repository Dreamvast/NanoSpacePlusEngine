const { EmbedBuilder } = require('discord.js');
const GLang = require('../../plugins/schemas/language.js'); 
module.exports = { 
  name: "language",
  description: "Change the language for the bot",
  options: [
      {
          name: "input",
          description: "The new language",
          required: true,
          type: 3
      }
  ],
run: async (interaction, client, language) => {
        await interaction.deferReply({ ephemeral: false });
            const input = interaction.options.getString("input");

            if (!interaction.member.permissions.has('MANAGE_GUILD')) return interaction.editReply(`${client.i18n.get(language, "utilities", "lang_perm")}`);
            const languages = client.i18n.getLocales();

            if (!languages.includes(input)) return interaction.editReply(`${client.i18n.get(language, "utilities", "provide_lang", {
                languages: languages.join(', ')
            })}`);
    
            const newLang = await GLang.findOne({ guild: interaction.guild.id });
            if(!newLang) {
                const newLang = new GLang({
                    guild: interaction.guild.id,
                    language: input,
                });
                newLang.save().then(() => {
                    const embed = new EmbedBuilder()
                    .setDescription(`${client.i18n.get(language, "utilities", "lang_set", {
                        language: input
                    })}`)
                    .setColor(client.color)
    
                    interaction.editReply({ content: " ", embeds: [embed] });
                }
                ).catch(() => {
                    interaction.editReply(`${client.i18n.get(language, "utilities", "Lang_error")}`);
                });
            }
            else if(newLang) {
                newLang.language = input;
                newLang.save().then(() => {
                    const embed = new EmbedBuilder()
                    .setDescription(`${client.i18n.get(language, "utilities", "lang_change", {
                        language: input
                    })}`)
                    .setColor(client.color)
        
                    interaction.editReply({ content: " ", embeds: [embed] });
                }
                ).catch(() => {
                    interaction.editReply(`${client.i18n.get(language, "utilities", "Lang_error")}`);
                });
            }
    }
};