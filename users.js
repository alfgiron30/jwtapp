//representacion de base de datos
const users = [
    { username: 'alfredo', password: '$2b$10$UcnnKMeukmietELhseuPBOa5F7GSf8KF8i/wDFgehXb8UxDXJWODe' },//pass: password1
    { username: 'brian', password: '$2b$10$QRbmKHDyMfSkKu.nWb0LH.aZ/K19JVMAayIWFsYBtoAM2UdGEQc6C' },//pass: password2
    { username: 'octavio', password: '$2b$10$11/CgA3VL1UEhwxR5vbVnOAjhAlLnjMVK2V2hQzpVAre4H1jCU8Ym' }//pass: password3
];

function findUserByUsername(username) {
    return users.find(user => user.username === username);
}

module.exports = findUserByUsername;