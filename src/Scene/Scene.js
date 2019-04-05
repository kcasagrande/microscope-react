const Entity = require('Entity/Entity');
const uuid = require('uuid/v4');

const Scene = (id = uuid()) => (question = 'The question', requiredCharacters = []) => {
	return Object.freeze({
		id: id,
		question: question,
		requiredCharacters: requiredCharacters,

		setQuestion: (question) => {
			return Scene(id)(question, requiredCharacters);
		},

		requireCharacter: (description) => {
			return Scene(id)(question, requiredCharacters.slice().concat([description]));
		},

		equals: (otherScene) => {
			return (otherScene.id === id && otherScene.question === question && otherScene.requiredCharacters.every((requiredCharacter, index) => requiredCharacters[index] === requiredCharacter));
		}
	});
}

Scene.fromJSON = (json) => {
	return Scene(json.id)(json.question, json.requiredCharacters.slice());
}

module.exports = Scene;
