function dataUser(user) {
    return {
        Nama: user.nama,
        Umur: user.umur,
        Hobi: user.hobi
    };
}

module.exports = dataUser;