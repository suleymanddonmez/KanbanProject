import mongoose from 'mongoose';

const connect = async () => {
    try {
        await mongoose.connect(process.env.CONNECTIONSTR)

    } catch {
        throw new Error('Veritabanına bağlanırken bir hata oluştu!')
    }
}

export default connect;