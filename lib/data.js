const fs = require("fs");
const path = require("path");

const lib = {};

lib.basedir = path.join(__dirname, "../.data/");

console.log(lib);

/**
 * open file
 * @param {string} dir Folder / Sub Folder name
 * @param {string} file file name
 * @param {*} data Data to read
 * @param {() => {}} callback
 */

// create file if not exists
lib.create = (dir, file, data, callback) => {
	fs.open(
		lib.basedir + dir + "/" + file + ".json",
		"wx",
		(err, fileDescriptor) => {
			if (!err && fileDescriptor) {
				const stringData = JSON.stringify(data);

				fs.writeFile(fileDescriptor, stringData, (err) => {
					if (!err) {
						fs.close(fileDescriptor, (err) => {
							if (!err) {
								callback(false);
								console.log("File create successfully");
							} else {
								console.log("Error closing the file");
								callback(err);
							}
						});
					} else {
						console.log("Error writing to new file!");
						callback(err);
					}
				});
			} else {
				console.log("Could not create new file, it may already exists!");
				callback(err);
			}
		}
	);
};

// read file
lib.read = (dir, file, callback) => {
	fs.readFile(`${lib.basedir + dir}/${file}.json`, "utf8", (err, data) => {
		callback(err, data);
	});
};

lib.update = (dir, file, data, callback) => {
	fs.open(
		`${lib.basedir + dir}/${file}.json`,
		"r+",
		(openErr, fileDescriptor) => {
			if (!openErr && fileDescriptor) {
				const stringData = JSON.stringify(data);

				fs.truncate(fileDescriptor, (truncateErr) => {
					if (!truncateErr) {
						fs.writeFile(fileDescriptor, stringData, (writeErr) => {
							if (!writeErr) {
								fs.close(fileDescriptor, (closeErr) => {
									if (!closeErr) {
										callback(false);
										console.log("Update successful");
									} else {
										console.log("Error closing file!");
										callback(closeErr);
									}
								});
							} else {
								console.log("Error while writing file");
								callback(writeErr);
							}
						});
					} else {
						console.log("Error while truncating file");
						callback(truncateErr);
					}
				});
			} else {
				console.log("Error updating. File not exists!");
				callback(openErr);
			}
		}
	);
};

lib.delete = (dir, file, callback) => {
	fs.unlink(`${lib.basedir + dir}/${file}.json`, (err) => {
		if (!err) {
			callback(false);
			console.log("Delete successfully");
		} else {
			console.log("Error while deleting file");
			callback(err);
		}
	});
};

module.exports = lib;
