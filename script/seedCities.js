// scripts/seedCities.js

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Модель City (если отдельно не импортируется)
const CitySchema = new Schema({
  name: { type: String, required: true, unique: true },
});
const City = mongoose.model("City", CitySchema);

// Подключение к MongoDB Atlas
mongoose
  .connect(
    "mongodb+srv://nurrs:data@cluster0.njpnsaj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    {
      dbName: "test", // замени на имя своей базы
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("✅ Успешное подключение к MongoDB Atlas");
    seedCities();
  })
  .catch((err) => {
    console.error("❌ Ошибка подключения:", err);
  });

const cities = [
  "Астана",
  "Алматы",
  "Шымкент",
  "Караганда",
  "Павлодар",
  "Семей",
  "Актобе",
  "Тараз",
  "Кызылорда",
  "Усть-Каменогорск",
  "Костанай",
  "Атырау",
  "Уральск",
  "Кокшетау",
  "Талдыкорган",
  "Петропавловск",
  "Актау",
  "Аркалык",
  "Рудный",
  "Темиртау",
  "Туркестан",
];

async function seedCities() {
  try {
    for (const name of cities) {
      await City.findOneAndUpdate(
        { name },
        { name },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
    }
    console.log("✅ Города успешно добавлены.");
  } catch (err) {
    console.error("❌ Ошибка при добавлении городов:", err);
  } finally {
    mongoose.disconnect();
  }
}
