module.exports = async (client, node, error) => {
	client.logger.error(`Node ${node.options.identifier} Errored!`);
}