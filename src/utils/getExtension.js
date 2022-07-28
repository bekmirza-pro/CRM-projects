module.exports = function getExtension(filename) {
	var i = filename.lastIndexOf(".");
	return i < 0 ? "" : filename.substr(i);
}